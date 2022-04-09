export default class User {
  //Создаем класс отвечающий за каждого пользователя.
  constructor(data) {
    this.firstName = data["firstName"];
    this.lastName = data["lastName"];
    this.age = data["age"];
    this.salary = data["salary"];
    this.template = document.querySelector("#user-template");
    this._number = data.number;
  }

  createNewUser() {
    //Метод возвращает разметку для нового пользователя
    this.newUser = this.template.content
      .querySelector(".content__item")
      .cloneNode(true);

    this.newUser.querySelector(".content__number").textContent =
      this._number;
    this.newUser.querySelector(".content__firstname").textContent =
      this.firstName;
    this.newUser.querySelector(".content__lastname").textContent =
      this.lastName;
    this.newUser.querySelector(".content__age").textContent = this.age;
    this.newUser.querySelector(".content__salary").textContent = this.salary;

    return this.newUser;
  }
}
