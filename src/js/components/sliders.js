//Slider (swiper) - Upcoming events
const swiperUpcoming = new Swiper(".upcoming__slider", {
  loop: true,
  pagination: {
    el: ".upcoming__pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
  },
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
});

//Slider (swiper) - Blog posts with gallery
const swiperPostGalleryThumbs = new Swiper(".popup-thumbs__slider", {
  spaceBetween: 10,
  slidesPerView: 4,
  freeMode: true,
  watchSlidesProgress: true,
});
const swiperPostGallery = new Swiper(".blog-popup__slider", {
  navigation: {
    nextEl: ".blog-popup__button-next",
    prevEl: ".blog-popup__button-prev",
  },
  thumbs: {
    swiper: swiperPostGalleryThumbs,
  },
});
