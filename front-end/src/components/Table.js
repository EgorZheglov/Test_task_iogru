export default class Table {
  //Создадим класс отвечающий за таблицу
  constructor(
    renderer,
    setFormHandler,
    updateUserHandler,
    deleteUserHandeler,
    createUserHadler,
  ) {
    this._items = []; //Так как данные приходят только один раз, то мы  сразу передаем их в класс Table
    this._renderer = renderer; //Передаем функцию, которая вернет нам разметку карты
    this._table = document.querySelector(".content__table");
    this._setFormHandler = setFormHandler;
    this._updateUserHandler = updateUserHandler;
    this._createUserHadler = createUserHadler;
    this._deleteUserHandeler = deleteUserHandeler;
  }

  setEventListeners() {
    this.selectedItem; //задаем выбранный элемент

    this._table.addEventListener("click", (evt) => {
      //Используем всплыте событий, чтобы отлавливать клик по юзеру
      //Есть вариант ставить слушатель на каждую строчку. Возможно это лучше с точки зрения логики.

      if (!evt.target.classList.contains("content__person-info")) {
        return; //В event target также могут попасть не те объекты, которые мы ожидаем при неточном клике.
      }

      if (!this.selectedItem) {
        //Если при нажатии еще не выбран никакой элемент
        this.selectedItem = evt.target.parentElement;
      } else {
        this.selectedItem.classList.toggle("content__item_selected");
        this.selectedItem = evt.target.parentElement;
      }

      this._setFormHandler(evt.target.parentElement);

      this.selectedItem.classList.toggle("content__item_selected");
    });

    this._table
      .querySelectorAll(".content__header")
      .forEach((button, i, array) => {
        button.addEventListener("click", (e) => {
          e.stopPropagation(); //Используем отмену стандартного всплытия, чтобы событие, произошедшее на хедерах не попало в глобальный Listener.

          array.forEach((button) => {
            button.classList.remove("content__header_is-active");
          });

          e.target.classList.toggle("content__header_is-active");

          this.setSort(e.target.id);
        });
      });
  }

  _byField(id) {
    //выбираем по какому полю мы должны сортировать объекты

    if (id !== "salary" || id !== "age") {
      return (a, b) => (a[id] > b[id] ? 1 : -1);
    } else {
      return (a, b) => (Number(a[id]) > Number(b[id]) ? 1 : -1);
    }
  }

  setSort(id) {
    this._setFormHandler(null);

    this._items.sort(this._byField(id));

    this.renderItems(this._items);
  }

  updateItem(data) {
    //Обновляем Юзера благодаря номеру
    let number =
      this.selectedItem.querySelector(".content__number").textContent;
    let user = this._items.find(
      (item) => Number(item.number) === Number(number),
    );
    user.firstName = data.firstName;
    user.lastName = data.lastName;
    user.age = data.age;
    user.salary = data.salary;
    this._updateUserHandler(user);
  }

  deleteItem() {
    const number =
      this.selectedItem.querySelector(".content__number").textContent;
    const id = this._items.find(
      (item) => Number(item.number) !== Number(number),
    ).id;

    this._deleteUserHandeler(id).then((res) => {
      const newItems = this._items.filter(
        (item) => Number(item.number) !== Number(number),
      );
      this.renderItems(newItems);
    });
  }

  renderItems = (items) => {
    //Метод вызывается в случае смены сортировки или при открытии страницы.
    this._items = items;

    this._table.querySelectorAll(".content__item").forEach((el) => el.remove());

    //При соритровке - показываем все данные.
    this._table.querySelectorAll(".content__header").forEach((element) => {
      element.classList.remove("content_item-hidden");
    });

    this._items.forEach((item, i) => {
      item.number = i + 1;
      this._renderer(item);
    });
  };

  createUser(data) {
    this._createUserHadler(data).then(() => {
      this._items.push(data);
    });
  }

  addUser(element) {
    this._table.append(element);
  }
}
