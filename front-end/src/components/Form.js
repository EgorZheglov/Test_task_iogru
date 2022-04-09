export default class Form {
  constructor(containerSelector, typeSelector) {
    this._containerSelector = containerSelector;
    this._typeSelector = typeSelector;
    this._form = document.querySelector(`.${this._typeSelector}`);
    this._firstNameInput = this._form.querySelector(
      `#${this._containerSelector}__input_firstname`,
    );
    this._secondNameInput = this._form.querySelector(
      `#${this._containerSelector}__input_lastname`,
    );
    this._ageInput = this._form.querySelector(
      `#${this._containerSelector}__input_age`,
    );
    this._salaryInput = this._form.querySelector(
      `#${this._containerSelector}__input_salary`,
    );
  }

  closeForm() {
    this._form.classList.remove(`form-container_is-active`);
  }
}
