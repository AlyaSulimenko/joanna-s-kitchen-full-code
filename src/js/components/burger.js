//Burger menu
//DOM Objects
const burgerButton = document.querySelector(".icon-menu");
const tabletMenu = document.querySelector(".menu__body");
const headerEl = document.querySelector(".header");
const body = document.querySelector("body");
const menuLinks = document.querySelectorAll(".menu__link");
//Event Listeners
burgerButton &&
  burgerButton.addEventListener("click", (event) => {
    event.preventDefault();
    burgerButton.classList.toggle("open");
    tabletMenu.classList.toggle("opened");
    body.classList.toggle("lock");
  });

menuLinks.forEach((link) =>
  link.addEventListener("click", () => {
    burgerButton.classList.toggle("open");
    tabletMenu.classList.toggle("opened");
    body.classList.toggle("lock");
  })
);
