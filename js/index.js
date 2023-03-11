const hamburer = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const mexicoBtn = document.querySelector('#mexico-btn');


if (hamburer) {
  hamburer.addEventListener("click", () => {
    navList.classList.toggle("open");
  });
}


mexicoBtn.addEventListener('click', function() {
  // Redirect the user to the linked website when the button is clicked
  window.location.href = 'https://amzn.to/3yu54mY';
});