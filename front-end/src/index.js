import "./styles/index.css";
import User from "./components/User";
import Table from "./components/Table";
import EditForm from "./components/EditForm";
import AddForm from "./components/AddForm";
import FormValidator from "./components/FormValidator";
import config from "./utils/config";
import api from "../src/utils/Api";

const formEditElement = document.querySelector(".type_edit");
const formAddElement = document.querySelector(".type_add");

function createUser(data) {
  // функция, создающая нового ползьзователя и возвращающая его разметку.

  const user = new User(data);
  const userElement = user.createNewUser();

  return userElement;
}

//создаем необходимые экземпляры классов

const table = new Table(
  (user) => {
    table.addUser(createUser(user));
  },
  (element) => {
    addForm.closeForm();
    editForm.setForm(element);
  },
  (data) => api.updateUser(data),
  (id) => api.deleteUser(id),
  (data) => api.saveUser(data),
);

const editForm = new EditForm({
  containerSelector: "form-container",
  setButtonHandler: () => formEditValidator.setButtonState(),
  updateUserHandler: (data) => table.updateItem(data),
  deleteUserHandler: () => table.deleteItem(),
});

const addForm = new AddForm({
  containerSelector: "form-container",
  addUserHandler: (user) => {
    table.createUser(user);
    table.addUser(createUser(user));
  },
});

const formEditValidator = new FormValidator(config, formEditElement);
const formAddValidator = new FormValidator(config, formAddElement);

formEditValidator.enableValidation();
formAddValidator.enableValidation();

//formValidator - класс отвечающий исключительно за валидацию

editForm.setEventListeners();
addForm.setEventListeners();

api.getUsers().then((res) => {
  table.renderItems(res); //Сразу же вызываем рендер начальных данных
});

table.setEventListeners();

document
  .querySelector(".buttons-container__button")
  .addEventListener("click", (e) => {
    editForm.closeForm();
    addForm.openForm();
  });
