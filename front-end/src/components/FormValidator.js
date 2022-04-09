export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = form;
  }

  _showInputError = (_inputElement, _errorMessage) => {
    //Если инпут невалиден - делаем активным span сошибкой
    _inputElement.classList.add(this._config.inputErrorClass);
    const _errorElement = this._form.querySelector(
      `#${_inputElement.id}-error`,
    );
    _errorElement.classList.add(this._config.errorClass);
    _errorElement.textContent = _errorMessage;
  };

  _hideInputError = (_inputElement) => {
    const _errorElement = this._form.querySelector(
      `#${_inputElement.id}-error`,
    );
    _errorElement.classList.remove(this._config.errorClass);
    _inputElement.classList.remove(this._config.inputErrorClass);
    _errorElement.textContent = " ";
  };

  _checkInputValidity = (_inputElement) => {
    //проверяем валидность активного инпута, на основе его состояния скрываем или показываем ошибку
    if (_inputElement.validity.valid) {
      this._hideInputError(_inputElement);
    } else {
      this._showInputError(_inputElement, _inputElement.validationMessage);
    }
  };

  _hasInvalidInput = () => {
    //Проверяем - есть ли валидный инпут
    return this._inputList.some(
      (_inputElement) => !_inputElement.validity.valid,
    );
  };

  _toggleButtonState = () => {
    //Устанавливаем состояние кнопки по наличию валидных инпутов
    if (this._hasInvalidInput()) {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    }
  };

  _setEventListeners = () => {
    //добавляем слушатели
    this._buttonElement = this._form.querySelector(
      this._config.submitButtonSelector,
    );
    this._inputList = Array.from(
      this._form.querySelectorAll(this._config.inputSelector),
    );

    this._inputList.forEach((_inputElement) => {
      _inputElement.addEventListener("input", () => {
        //Проверяем - есть ли невалидные инпуты после каждого ввода
        this._checkInputValidity(_inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState(this._buttonElement, this._inputList);
  };

  enableValidation = () => {
    //включаем валидацию
    this._setEventListeners();
  };

  setButtonState = () => {
    //Передаем этот метод в класс формы, чтобы при каждом новом ее открытии кнопка задавалась заново неактивной.
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
  };

  removeInputError = () => {
    this._toggleButtonState();
    this._inputList.forEach((_inputElement) => {
      this._hideInputError(_inputElement);
    });
  };
}
