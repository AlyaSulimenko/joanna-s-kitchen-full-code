import { blogPosts } from "../data/blog-data.js";
import { months, dateToString } from "../data/useful-data.js";

//DOM
const popupButtons = document.querySelectorAll(".button_popup"); //all buttons "Read More"
const allBackArrows = document.querySelectorAll(".popup__close"); //All closing arrows on pop-up windows
const allForms = document.querySelectorAll(".form-submit");
const confirmPopup = document.getElementById("small-popup");
const body = document.querySelector("body");
const blogBody = document.querySelector(".blog__body");
const blogPopups = document.querySelector(".popups-blog");

//Main functions======================================================================================================================
const openPopup = (actualButton) => {
  const popupName = actualButton.getAttribute("href").replace("#", "");
  const popupToOpen = document.getElementById(popupName);
  if (popupToOpen) {
    body.classList.add("lock");
    popupToOpen.classList.add("popup_show");
    popupToOpen.addEventListener("click", (event) => {
      if (!event.target.closest(".popup__content")) {
        const actualPopup = event.target.closest(".popup");
        closePopup(actualPopup);
      } //while clicking on opened pop-up window not inside content div - the whole pop-up window will close+
    });
  }
};

const closePopup = (actualButton) => {
  body.classList.remove("lock");
  actualButton.classList.remove("popup_show");
};

//Basic event listeners (for static popups)=========================================================================================
if (popupButtons.length > 0) {
  popupButtons.forEach((button, index) => {
    button.addEventListener("click", (event) => {
      event.preventDefault;
      const actualButton = popupButtons[index];
      openPopup(actualButton);
    });
  });
}

if (allBackArrows.length > 0) {
  allBackArrows.forEach((arrow, index) => {
    const actualBackArrow = allBackArrows[index];
    const actualPopup = actualBackArrow.closest(".popup");
    actualBackArrow.addEventListener("click", (event) => {
      event.preventDefault;
      closePopup(actualPopup); //for every cross we add closePopup f on click for nearest parent  with class popup, which is whole first div
    });
  });
}

document.addEventListener("keyup", (event) => {
  const activePopup = document.querySelector(".popup_show");
  if (event.keyCode === 27) {
    closePopup(activePopup);
  }
}); // closing pop-up on ESC

//For dynamicly created blog popups===================================================================================================
const createBlogPopups = () => {
  blogPosts.forEach((post) => {
    const blogPopup = document.createElement("div");
    const stringDate =
      new Date(post.published).getDate() +
      " " +
      months[new Date(post.published).getMonth()] +
      " " +
      new Date(post.published).getFullYear();
    blogPopup.setAttribute("id", `${post.popupId}`);
    blogPopup.setAttribute("aria-hidden", "true");
    blogPopup.classList.add("popup");
    blogPopup.classList.add("blog-popup");
    const blogPopupBodyMarkup =
      post.type === "gallery"
        ? ` <div class="popup__body blog-popup__body">
    <h2 class="popup__title blog-popup__title title brand_typ title_centered">
      ${post.title}
    </h2>
    <div class="blog-popup__slider swiper">
      <div class="blog-popup__slider-wrapper swiper-wrapper">
        <div class="blog-popup__slide swiper-slide">
          <img src="../img/blog/${post.imageUrl}" alt="${post.imageUrl}" />
        </div>
        <div class="blog-popup__slide swiper-slide">
          <img
            src="../img/blog/${post.gallerySlide2Url}"
            alt="${post.gallerySlide2Url}"
          />
        </div>
        <div class="blog-popup__slide swiper-slide">
          <img
            src="../img/blog/${post.gallerySlide3Url}"
            alt="${post.gallerySlide3Url}"
          />
        </div>
        <div class="blog-popup__slide swiper-slide">
          <img
            src="../img/blog/${post.gallerySlide4Url}"
            alt="${post.gallerySlide4Url}"
          />
        </div>
      </div>
      <div class="blog-popup__button-prev swiper-button-prev"></div>
      <div class="blog-popup__button-next swiper-button-next"></div>
    </div>
    <div thumbsSlider="" class="popup-thumbs__slider swiper">
      <div class="popup-thumbs__slider-wrapper swiper-wrapper">
        <div class="popup-thumbs__slide swiper-slide">
          <img src="../img/blog/${post.imageUrl}" alt="${post.imageUrl}" />
        </div>
        <div class="popup-thumbs__slide swiper-slide">
          <img
            src="../img/blog/${post.gallerySlide2Url}"
            alt="${post.gallerySlide2Url}"
          />
        </div>
        <div class="popup-thumbs__slide swiper-slide">
          <img
            src="../img/blog/${post.gallerySlide3Url}"
            alt="${post.gallerySlide3Url}"
          />
        </div>
        <div class="popup-thumbs__slide swiper-slide">
          <img
            src="../img/blog/${post.gallerySlide4Url}"
            alt="${post.gallerySlide4Url}"
          />
        </div>
      </div>
    </div>
  </div>`
        : `<div class="popup__body blog-popup__body">
        <h2 class="popup__title blog-popup__title title brand_typ title_centered">
          ${post.title}
        </h2>
        <div class="blog-popup__image">
          <img src="../img/blog/${post.imageUrl}" alt="${post.imageUrl}" />
        </div>
      </div>`;
    const blogPopupMarkup = `<div class="popup__wrapper blog-popup__wrapper">
    <div class="popup__content blog-popup__content">
      <button data-close type="button" class="popup__close blog-popup__close arrow">
        <span class="arrow_span"></span>
        <span class="arrow_span"></span>
        <span class="arrow_span"></span>
      </button>
${blogPopupBodyMarkup}
        <div class="blog-popup__published">${dateToString(post.published)}</div>
        <div class="popup__text blog-popup__text">
          ${post.fullText}
        </div>
      </div>
    </div>
  </div>`;
    blogPopup.innerHTML = blogPopupMarkup;
    blogPopups.appendChild(blogPopup);
  });
};
createBlogPopups();
//Event listeners for blog popups
blogBody.addEventListener("click", (event) => {
  if (event.target.classList.contains("button_popup")) {
    event.preventDefault();
    const actualButton = event.target;

    openPopup(actualButton);
  }
});

blogPopups.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("popup__close") ||
    event.target.classList.contains("arrow_span")
  ) {
    event.preventDefault();
    const actualBacklArrow = event.target;
    const actualPopup = actualBacklArrow.closest(".popup");
    closePopup(actualPopup);
  }
});
//confirmation of forms
allForms.forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    confirmPopup.classList.add("popup_show");
    form.classList.contains("join-popup__form") &&
      form.closest(".join-popup").classList.remove("popup_show");
    form.querySelectorAll("input").forEach((input) => (input.value = ""));
  })
);
