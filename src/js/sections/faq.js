import { faqItems } from "../data/faq-data.js";
//DOM objects
const faqItemsContainer = document.querySelector(".faq__items");
//to render FAQ items
const renderFaqItems = () => {
  faqItems.forEach((item) => {
    const faqItem = document.createElement("li");
    faqItem.classList.add("faq__item", "item-faq");
    const faqMarkup = `<a href="" class="item-faq__title">
<span class="item-faq__span subtitle"
  >${item.question}</span
><img
  class="item-faq__arrow"
  src="../img/common-icons/chevron-down-svgrepo-com.svg"
  alt=""
/>
</a>
<div class="item-faq__body">${item.answer}
</div>`;
    faqItem.innerHTML = faqMarkup;
    faqItemsContainer.appendChild(faqItem);
  });
};
renderFaqItems();
//Showing & hiding answers
//DOM objects
const tabLinks = document.querySelectorAll(".item-faq__title");
const tabBodies = document.querySelectorAll(".item-faq__body");
//Event listeners
tabLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      event.target.classList.contains("item-faq__title") ||
      event.target.parentElement.classList.contains("item-faq__title")
    ) {
      if (!link.classList.contains("active")) {
        tabBodies.forEach((body) => {
          body.classList.remove("visible");
        });
        tabLinks.forEach((link) => {
          link.classList.remove("active");
        });
        link.nextElementSibling.classList.add("visible");
        link.classList.add("active");
        console.log("new link");
      } else {
        console.log("link to close");
        tabLinks.forEach((link) => {
          link.classList.remove("active");
        });
        link.nextElementSibling.classList.remove("visible");
      }
    }
  });
});
