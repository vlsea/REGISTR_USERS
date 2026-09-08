const usersDataBase = {
  gender: [
    { gen: "Мужской", id: 1 },
    { gen: "Женский", id: 2 },
  ],
  systemRole: [
    { role: "администратор", id: 1 },
    { role: "пользователь", id: 2 },
  ],
  rate: [
    { rate: "Обычный", id: 1 },
    { rate: "Премиум", id: 2 },
    { rate: "VIP", id: 3 },
  ],
  users: [],
  info: getUsersToLocalStorage(`info`),
};

export const getHashPassword = function (password) {
  let hash = "";
  for (let i = 0; i < password.length; i++) {
    hash += password[i].charCodeAt().toString(16);
  }
  return hash;
};

usersDataBase.getRandomId = function () {
  return Math.trunc(Math.random() * 9000 + 1000);
};
usersDataBase.getRandomId();

usersDataBase.uniqueLogin = function (newLogin) {
  return this.users.some((user) => {
    return user.login === newLogin;
  });
};

usersDataBase.newRegUser = function (
  login,
  password,
  gender,
  rate,
  name,
  surname,
) {
  if (!login || !password || !gender || !rate || !name || !surname) {
    console.log(`регистрация не прошла :`);
    return false;
  }
  if (this.uniqueLogin(login)) {
    console.log(`логин не уникальный : `);
    return false;
  }
  const hashPassword = getHashPassword(password);
  const id = this.getRandomId();
  const user = new Data(login, id, hashPassword);
  this.users.push(user);
  const info = new Info(name, surname, gender, id, 2, rate);
  this.info.push(info);
  return true;
};

usersDataBase.newRegAdmin = function (login, password, gender, name, surname) {
  if (!login || !password || !gender || !name || !surname) {
    console.log(`регистрация не прошла :`);
    return;
  }
  if (this.uniqueLogin(login)) {
    console.log(`логин не уникальный : `);
    return;
  }
  const hashPassword = getHashPassword(password);
  const id = this.getRandomId();
  const admin = new Data(login, id, hashPassword);
  this.users.push(admin);
  const info = new Info(name, surname, gender, id, 1);
  this.info.push(info);
};

function Data(login, id, password) {
  this.login = login;
  this.id = id;
  this.password = password;
}
function Info(name, surname, gender, id, systemRole, rate) {
  this.name = name;
  this.surname = surname;
  this.gender = gender;
  this.id = id;
  this.systemRole = systemRole;
  if (rate) {
    this.rate = rate;
  }
}

const name = document.querySelector(`#first-name`);
const lastName = document.querySelector(`#last-name`);
const login = document.querySelector(`#login`);
const password = document.querySelector(`#password`);
const usersList = document.querySelector(`.users__form__list`);
function getRadio(name) {
  const selected = document.querySelector(`[name=${name}]:checked`);
  if (selected) {
    return +selected.value;
  }
  console.log(selected);
}

document.querySelector(`form`).addEventListener(`submit`, (event) => {
  event.preventDefault();
  getRadio("gender");
  getRadio("rate");
  const registration = usersDataBase.newRegUser(
    login.value.trim(),
    password.value.trim(),
    getRadio("gender"),
    getRadio("rate"),
    name.value.trim(),
    lastName.value.trim(),
  );
  const information = document.querySelector(`.info`);
  if (registration) {
    information.textContent = "успешная регистрация";
    information.classList.add("correct");
    setTimeout(() => information.classList.remove("correct"), 1000);
    render(usersDataBase.info);
    setUsersToLocalStorage(`info`, usersDataBase.info);
  } else {
    information.textContent = "неуспешная регистрация";
    information.classList.add("un-correct");
    setTimeout(() => information.classList.remove("un-correct"), 1000);
  }

  console.log(usersDataBase);
});

const render = function (users) {
  const usersListHtml = users.map(
    (item) => `<li><h3>${item.name} ${item.surname}</h3></li>`,
  );
  console.log(usersListHtml);
  usersList.innerHTML = usersListHtml.join(" ");
};
const setUsersToLocalStorage = function (key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};
function getUsersToLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
render(usersDataBase.info);
