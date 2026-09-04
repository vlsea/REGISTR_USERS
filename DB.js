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
  info: [],
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

// usersDataBase.newRegUser("привет", "123", 1, 3, "Шахзод-убийца", "Прекрасный");

// usersDataBase.newRegUser("привет", "123", 1, 3, "Шахзод-убийца", "Прекрасный");

// usersDataBase.newRegUser("телепузик", "123", 1, 3, "фывфывфыв", "Прекрасный");

// usersDataBase.newRegAdmin("пока", "234", 1, "Биджон", "Красивый");

const name = document.querySelector(`#first-name`);
const lastName = document.querySelector(`#last-name`);
const login = document.querySelector(`#login`);
const password = document.querySelector(`#password`);
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
  } else {
    information.textContent = "неуспешная регистрация";
    information.classList.add("un-correct");
    setTimeout(() => information.classList.remove("un-correct"), 1000);
  }

  console.log(usersDataBase);
});

// const myArray = [];
// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   document.querySelector(`p`);
//   for (let i = 0; i <= 10; i++) {
//     myArray.push(i);
//   }
//   document.querySelector(`p`).textContent = myArray;
// });

// const myArray = ["Яблоко", "Банан", "Апельсин", "Манго"];
// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   document.querySelector(`p`);
//   document.querySelector(`p`).textContent = myArray;
// });

// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   let initialInput = document.querySelector(`input`).value;
//   document.querySelector(`p`).textContent = initialInput;
//   console.log(initialInput);

// const arr = [];
// for (let i = 1; i < 4; i++) {
//   arr.push(i);
// }
// console.log(arr);

// const myArray = [];
// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   myArray.length = 0;
//   for (let i = 0; i <= 10; i++) {
//     myArray.push(i);
//   }
//   document.querySelector(`p`).textContent = myArray;
// });
// const data = {
//   user: {
//     profile: {
//       tags: ["a", "b", "c"],
//     },
//   },
// };

// const arr = data?.user?.profile?.tags ?? [];
// console.log(arr); // ["a", "b", "c"]

// const products = [
//   { name: `Ноутбук`, price: 999 },
//   { name: `Мышка`, price: 25 },
//   { name: `Клавиатура`, price: 60 },
// ];

// const button = document.querySelector(`button`);
// const list = document.querySelector(`ul`);
// button.addEventListener(`click`, () => {
//   list.innerHTML = ``;
//   products.forEach((item) => {
//     const li = document.createElement(`li`);
//     li.textContent = `${item.name}-${item.price}$`;
//     list.appendChild(li);
//   });
// });

// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   document.querySelector(`ul li`).textContent = products.forEach((item) => {
//     item;
//   });
//   products.length = 0;
// });

// const users = [
//   { name: `Аня`, age: 25 },
//   { name: `Игорь`, age: 31 },
//   { name: `Света`, age: 19 },
// ];

// const button = document.querySelector(`button`);
// const div = document.querySelector(`#cards`);
// button.addEventListener(`click`, () => {
//   div.innerHTML = ``;
//   users.forEach((item) => {
//     const p = document.createElement(`p`);
//     p.textContent = `${item.name} - ${item.age}лет`;
//     div.appendChild(p);
//   });
// });

// const box = document.querySelector(`#box`);
// const p = document.createElement(`p`);
// p.textContent = `Привет!`;
// box.appendChild(p);

// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   let initialInput = document.querySelector(`input`).value;
//   document.querySelector(`p`).textContent = initialInput;
//   console.log(initialInput);

// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   let initialInput = document.querySelector(`input`).value;
//   document.querySelector(`p`).textContent = initialInput;
//   console.log(initialInput);

// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   event.preventDefault();

//   let initialInput_1 = +document.querySelector(`#insert_1`).value;
//   let initialInput_2 = +document.querySelector(`#insert_2`).value;

//   const result = (document.querySelector(`p`).textContent =
//     initialInput_1 + initialInput_2);
//   console.log(result);
// });
// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   event.preventDefault();
//   let firstLi = +document.querySelector(`#li1`).textContent;
//   let secondLi = +document.querySelector(`#li2`).textContent;
//   let thirdLi = +document.querySelector(`#li3`).textContent;
//   let fourthLi = +document.querySelector(`#li4`).textContent;
//   const result = (document.querySelector(`input`).value =
//     firstLi + secondLi + thirdLi + fourthLi);
//   console.log(result);
// });
// document.querySelector(`button`).addEventListener(`click`, (event) => {
//   event.preventDefault();
//   let liOne = +document.querySelector(`#num1`).textContent;
//   let liTwo = +document.querySelector(`#num2`).textContent;
//   let liThree = +document.querySelector(`#num3`).textContent;
//   let liFour = +document.querySelector(`#num4`).textContent;
//   const result = (document.querySelector(`input`).value =
//     (liOne + liTwo + liThree + liFour) / 4);
//   console.log(result);
// });
