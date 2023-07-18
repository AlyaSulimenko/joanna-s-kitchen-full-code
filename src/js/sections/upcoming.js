import { upcomingEvents } from "../data/upcoming-data.js";
import { dateToString } from "../data/useful-data.js";
//DOM Objects
const upcomingEventsBody = document.querySelector(".upcoming__items");
//render events
upcomingEvents.forEach((event) => {
  const eventItem = document.createElement("div");
  eventItem.classList.add("swiper-slide", "upcoming__slide", "slide");
  const eventMarkup = `<div class="slide__image">
  <img src=${event.imageUrl} alt="${event.theme}" />
</div>
<div class="slide__body">
  <div class="slide__title title brand_typ">${event.theme}</div>
  <div class="slide__info">
	 <div class="slide__descr">
	 ${event.description}
	 </div>
	 <div class="slide__subtitle subtitle">${event.subtitle}</div>
	 <ul class="slide__list">
	 </ul>
  </div>
  <div class="slide__details">
	 <div class="slide__date-time">
		Date & Time: ${dateToString(event.date)}, ${event.time}
	 </div>
	 <div class="slide__price">Price p/person: ${event.price}</div>
	 <div class="slide__places">Capacity: ${event.minPersons}-${
    event.maxPersons
  } persons</div>
	 <div class="slide__drinks">
		Drinks We serve: ${[...event.drinks]}
	 </div>
  </div>
</div>`;
  eventItem.innerHTML = eventMarkup;
  //menu
  const menuBody = eventItem.querySelector(".slide__list");
  const menuArray = event.menu;
  menuArray.forEach((dish) => {
    const dishItem = document.createElement("li");
    dishItem.classList.add("slide__item", "subtitle");
    dishItem.textContent = dish;
    menuBody.appendChild(dishItem);
  });
  upcomingEventsBody.appendChild(eventItem);
});
