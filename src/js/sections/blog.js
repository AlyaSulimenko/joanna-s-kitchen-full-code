import { blogPosts } from "../data/blog-data.js";
import { dateToString } from "../data/useful-data.js";
//My preferences and starting conditions
let isFilteredByCategory = false;
let filteredByCategoryPosts = blogPosts;
let matchingPosts; //filtered by search input
let sortedPosts;
let currentPage;
const paginationLimit = 5;
//DOM objects
const blogBody = document.querySelector(".blog__body");
const searchInput = document.querySelector(".search__input");
const postsCounter = document.querySelector(".search__counter span");
const searchErase = document.getElementById("erase");
const selectOption = document.querySelector("#blog-sorting");
const paginationNumbers = document.getElementById("pagination-numbers");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");
//FUNCTIONS
//to filter array by category tag
const filterByCategory = (filter, array) => {
  return array.filter((post) => post.tip.toString() === filter);
};
//to filter array by input(search)
const filterByInput = (value, array) => {
  return array.filter((post) =>
    post.title.toLowerCase().includes(value.toLowerCase())
  );
};
//to sort array by value in select input
const sortBySelect = (selectValue, array) => {
  let sortedArray = [];
  switch (selectValue) {
    case "newest":
      sortedArray = array.sort(
        (a, b) => Number(new Date(b.published)) - Number(new Date(a.published))
      );
      break;
    case "oldest":
      sortedArray = array.sort(
        (a, b) => new Date(a.published) - new Date(b.published)
      );
      break;
    case "a-z":
      sortedArray = array.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "z-a":
      sortedArray = array
        .sort((a, b) => a.title.localeCompare(b.title))
        .reverse();
      break;
    default:
      sortedArray = array;
  }
  return sortedArray;
};
const getArrayFromRenderedPosts = (post) => {
  const blogItems = Array.from(blogBody.querySelectorAll(post));
  return blogItems;
};
//to render number of posts displayed in ".search__counter span"
const renderNumberOfPosts = (post) => {
  // const blogItems = Array.from(blogBody.querySelectorAll(post));
  postsCounter.textContent = getArrayFromRenderedPosts(post).length;
};
//to show tips on categories
const showTips = (trigger) => {
  const targets = document.querySelectorAll(trigger);
  targets.forEach((target) => {
    target.addEventListener("mouseover", () => {
      target.previousElementSibling.style.display = "block";
    });
  });
  targets.forEach((target) => {
    target.addEventListener("mouseleave", () => {
      target.previousElementSibling.style.display = "none";
    });
  });
};
//PAGINATION
//to set quantity of pages
const getPageCount = (post) => {
  //const blogItems = Array.from(blogBody.querySelectorAll(post));
  const pageCount = Math.ceil(
    getArrayFromRenderedPosts(post).length / paginationLimit
  );
  return pageCount;
};
//to render pagination numbers buttons
const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-blog__number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  paginationNumbers.appendChild(pageNumber);
};
//to show actual page
const setCurrentPage = (post, pageNumber = 1) => {
  //const blogItems = Array.from(blogBody.querySelectorAll(post));
  currentPage = pageNumber;
  handleActivePageNumber();
  handlePageButtonsStatus(post);
  const previousRange = (pageNumber - 1) * paginationLimit;
  const currentRange = pageNumber * paginationLimit;
  getArrayFromRenderedPosts(post).forEach((post, index) => {
    post.classList.add("d-none");
    if (index >= previousRange && index < currentRange) {
      post.classList.remove("d-none");
    }
  });
};
//to highlight number of current page
const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-blog__number").forEach((button) => {
    button.classList.remove("active");
    let pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};
//to enable/disable "previous" & "next" buttons
const handlePageButtonsStatus = (post) => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (getPageCount(post) === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};
const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};
//Render Posts
const renderPosts = (array) => {
  array = filterByInput(searchInput.value, array);
  array = sortBySelect(selectOption.value, array);
  blogBody.innerHTML = "";
  array.forEach((post) => {
    const blogItem = document.createElement("div");
    blogItem.classList.add("item-blog");
    const blogItemMarkup = `<div class="item-blog__image">
        <img src="../img/blog/${post.imageUrl}" alt="" />
       </div>
       <div class="item-blog__content">
        <div class="item-blog__title subtitle">${post.title}</div>
        <div class="item-blog__published transparent-text">${dateToString(
          post.published
        )}</div>
        <div class="item-blog__descr">
        ${post.description}
        </div>
        <div class="item-blog__footer">
          <p class="tooltip-text">${post.tip}</p>
          <button href="" class="item-blog__tag tooltip-trigger ${
            post.iconUrl
          }" >
           <img src="../img/blog/icons/${post.iconUrl}" alt="" />
          </button>
          <p class="tooltip-text">${post.tip}</p>
          <button href="" class="item-blog__tag_chosen hidden tooltip-trigger ${
            post.iconUrl
          }" >
           <img src="../img/blog/icons/${post.iconChosenUrl}" alt="" />
          </button>
          <a href="${
            post.aHref
          }" class="item-blog__read-more button button_popup">
           Read More
          </a>
        </div>
       </div>`;
    blogItem.innerHTML = blogItemMarkup;
    // Adding classes to category tags
    if (isFilteredByCategory) {
      blogItem.querySelector(".item-blog__tag").classList.add("hidden");
      blogItem
        .querySelector(".item-blog__tag_chosen")
        .classList.remove("hidden");
    } else if (!isFilteredByCategory) {
      blogItem.querySelector(".item-blog__tag_chosen").classList.add("hidden");
      blogItem.querySelector(".item-blog__tag").classList.remove("hidden");
    }
    //
    blogBody.appendChild(blogItem);
    showTips(".tooltip-trigger");
  });
  //Now we can render pagination number buttons based on number of posts to render
  renderNumberOfPosts(".item-blog");
  paginationNumbers.innerHTML = "";
  for (let index = 1; index <= getPageCount(".item-blog"); index++) {
    appendPageNumber(index);
  }
  //Render first page of blogs by default
  setCurrentPage(".item-blog");
  //Render page of blogs according to number button clicked (here???)
  document.querySelectorAll(".pagination-blog__number").forEach((button) => {
    let pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex) {
      button.addEventListener("click", (event) => {
        setCurrentPage(".item-blog", pageIndex);
      });
    }
  });
  //Render previous page of blogs on clicking "prev" or "next" (here???)
  document.querySelectorAll(".pagination-blog__arrow").forEach((arrow) => {
    if (arrow.classList.contains("pagination-blog__arrow_prev")) {
      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        setCurrentPage(".item-blog", currentPage - 1);
      });
    } else if (arrow.classList.contains("pagination-blog__arrow_next")) {
      arrow.addEventListener("click", (e) => {
        e.preventDefault();
        setCurrentPage(".item-blog", currentPage + 1);
      });
    }
  });
};
renderPosts(blogPosts);

//Event Listeners===================================================================================================================
// Filtering posts by icon tags & back
blogBody.addEventListener("click", (e) => {
  const parent = e.target.parentElement;
  let tip = parent.previousElementSibling.textContent;
  e.preventDefault();
  if (parent.classList.contains("item-blog__tag")) {
    filteredByCategoryPosts = filterByCategory(tip, blogPosts); //filter blogPosts by tip
    isFilteredByCategory = true;
    renderPosts(filteredByCategoryPosts);
    return filteredByCategoryPosts; // change the array from starting to filtered By Category
  } else if (parent.classList.contains("item-blog__tag_chosen")) {
    filteredByCategoryPosts = blogPosts; // come back to starting array
    isFilteredByCategory = false;
    renderPosts(filteredByCategoryPosts);
  }
});
//On searching
searchInput.addEventListener("keyup", (event) => {
  event.preventDefault();
  matchingPosts = filterByInput(searchInput.value, filteredByCategoryPosts); //which might be blogPosts or filtered by categorie posts retuned by previous addEL
  renderPosts(matchingPosts);
});
//Sorting by Select
selectOption.addEventListener("change", (event) => {
  event.preventDefault();
  sortedPosts = sortBySelect(selectOption.value, filteredByCategoryPosts);
  renderPosts(sortedPosts);
});
// x-button on search input
searchErase.addEventListener("click", (event) => {
  event.preventDefault();
  searchInput.value = "";
  renderPosts(filteredByCategoryPosts);
});
