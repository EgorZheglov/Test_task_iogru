import Form from "./Form";

export default class EditForm extends Form {
  constructor({
    containerSelector,
    setButtonHandler,
    updateUserHandler,
    deleteUserHandler,
  }) {
    super(containerSelector, "type_edit");
    this._setButtonHandler = setButtonHandler;
    this._deleteUserHandler = deleteUserHandler;
    this._updateUserHandler = updateUserHandler;
  }

  setForm(element) {
    //устанавливаем значение инпутов при нажатии на юзера
    //или сортировке
    if (element) {
      this._selectedElement = element;

      //Устанавливаем значения
      this._setButtonHandler(); //устанавливаем изначальное значение кнопки(неактивное т.к. изменений нет)

      this._firstNameInput.value = this._selectedElement.querySelector(
        ".content__firstname",
      ).textContent;
      this._secondNameInput.value =
        this._selectedElement.querySelector(".content__lastname").textContent;
      this._ageInput.value =
        this._selectedElement.querySelector(".content__age").textContent;
      this._salaryInput.value =
        this._selectedElement.querySelector(".content__salary").textContent;

      this._form.classList.add(`form-container_is-active`); //открываем форму
    } else {
      this._form.classList.remove(`form-container_is-active`);
    }
  }

  setEventListeners() {
    //обработчик сабмита
    this._form
      .querySelector(".form-container__delete-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this._deleteUserHandler();
      });

    this._form
      .querySelector(".form-container__close-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.closeForm();
      });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      this._querySelector;

      this._selectedElement.querySelector(".content__firstname").textContent =
        this._firstNameInput.value;
      this._selectedElement.querySelector(".content__lastname").textContent =
        this._secondNameInput.value;
      this._selectedElement.querySelector(".content__age").textContent =
        this._ageInput.value;
      this._selectedElement.querySelector(".content__salary").textContent =
        this._salaryInput.value;
      this._updateUserHandler({
        firstName: this._firstNameInput.value,
        lastName: this._secondNameInput.value,
        age: this._ageInput.value,
        salary: this._salaryInput.value,
      });
      this._form.classList.remove(`form-container_is-active`);
    });
  }
}
