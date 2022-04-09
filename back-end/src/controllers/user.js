const { getUsers, createUser, deleteUser, updateUser } = require("../data/db");

const getUsersController = () => {
  return getUsers();
};

const updateUserController = (data) => {
  return updateUser(data);
};

const createUserController = (data) => {
  return createUser(data);
};

const deleteUserController = (id) => {
  return deleteUser(id);
};

module.exports = {
  createUserController,
  getUsersController,
  deleteUserController,
  updateUserController,
};
