import Form from "./Form";

export default class AddForm extends Form {
  constructor({ containerSelector, addUserHandler }) {
    super(containerSelector, "type_add");
    this._addUserHandler = addUserHandler;
  }

  setEventListeners() {
    //обработчик сабмита
    this._form
      .querySelector(".form-container__close-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.closeForm();
      });

    this._form
      .querySelector(".form-container__close-button")
      .addEventListener("click", (e) => {
        e.preventDefault();
        this.closeForm();
      });

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();

      const number = document.querySelectorAll('.content__item').length + 1
      this._addUserHandler({
        firstName: this._firstNameInput.value,
        lastName: this._secondNameInput.value,
        age: this._ageInput.value,
        salary: this._salaryInput.value,
        number: number,
      });

      this._form.classList.remove(`form-container_is-active`);
    });
  }

  openForm() {
    this._form.classList.add(`form-container_is-active`);
  }
}
