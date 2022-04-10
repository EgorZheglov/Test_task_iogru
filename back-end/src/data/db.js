const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
//Очевидно, читать и писать синхронно в файлы - плохое решение. Но как я понимаю в серьезной ситуации всегда пользуются БД

const initialRead = () => {
  const array = JSON.parse(fs.readFileSync(__dirname + "/data", "utf8"));

  if (array.length > 0) {
    array.forEach((element) => {
      if (!element.id) {
        element.id = uuidv4();
      }
    });
    writeFile(array);
  } else {
    writeFile([]);
  }
};

const getUsers = () => {
  return JSON.parse(fs.readFileSync(__dirname + "/data", "utf8"));
};

const updateUser = (data) => {
  const arr = getUsers();
  const newArr = arr.filter((el) => el.id !== data.id);

  newArr.push(data);
  writeFile(newArr);
};

const deleteUser = (id) => {
  const arr = getUsers();
  const newArr = arr.filter((el) => el.id !== id);

  writeFile(newArr);
};

const createUser = (user) => {
  array = getUsers();
  user.id = uuidv4();
  
  writeFile(array);
};

const writeFile = (array) => {
  fs.writeFileSync(__dirname + "/data", JSON.stringify(array), "utf8");
};

module.exports = {
  createUser,
  writeFile,
  getUsers,
  updateUser,
  deleteUser,
  initialRead,
};
