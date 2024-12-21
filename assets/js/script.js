// ON SCROLL NAVIGATION STYLING SCRIPT STARTS HERE
window.addEventListener('scroll', () => {
  document.querySelector('nav').classList.toggle('window-scroll', window.scrollY > 0);
});

// Loading animation for the page
var loaderImg = document.querySelector(".img");
var loader = document.querySelector(".loader");

window.addEventListener('load', hides);

function hides() {
  loader.classList.add("hide");
  loaderImg.classList.add("ImgNone");
}

// NAVIGATION MENU TOGGLE BUTTON SCRIPT STARTS HERE
const Menu = document.querySelector(".nav__navigation");
const menuBtn = document.querySelector(".menuBtn");

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle("menu-active");
  Menu.classList.toggle("active");
});

const nav = document.querySelector('nav');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    // Scrolling down, hide the navigation
    nav.classList.add('hidden');
    nav.classList.remove('visible');

    // Close the menu if open
    if (Menu.classList.contains("active")) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
    }
  } else {
    // Scrolling up, show the navigation and close the menu
    nav.classList.add('visible');
    nav.classList.remove('hidden');

    if (Menu.classList.contains("active")) {
      menuBtn.classList.remove("menu-active");
      Menu.classList.remove("active");
    }
  }
  lastScrollTop = currentScrollTop;
});

// Close menu when clicking outside of it
document.addEventListener('click', (event) => {
  const isMenuOpen = Menu.classList.contains('active');
  const isClickInsideMenu = Menu.contains(event.target);
  const isClickInsideButton = menuBtn.contains(event.target);

  if (isMenuOpen && !isClickInsideMenu && !isClickInsideButton) {
    menuBtn.classList.remove("menu-active");
    Menu.classList.remove("active");
  }
});

// -------<<<<<<<>>>>>>----------
// FAQ'S SECTION CODE STARTS HERE

document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('click', () => {
    item.classList.toggle('active');
    const answer = item.querySelector('.faq-answer');
    if (item.classList.contains('active')) {
      answer.style.display = 'block';
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = 0;
      answer.style.display = 'none';
    }
  });
});




// Function to handle the count-up effect
function countUp(element, target) {
  let start = 0;
  const duration = 2000;
  const interval = 20;
  const increment = target / (duration / interval);

  const counter = setInterval(() => {
    start += increment;
    if (start >= target) {
      start = target;
      clearInterval(counter);
    }
    element.textContent = Math.floor(start);
  }, interval);
}

function isInView(element) {
  const rect = element.getBoundingClientRect();
  return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
}

let hasCounted = false;

window.addEventListener('scroll', () => {
  const countElement = document.querySelector('.count');

  if (isInView(countElement)) {
    if (!hasCounted) {
      countUp(countElement, 10); // Replace '10' with your target number
      hasCounted = true;
    }
  } else {
    hasCounted = false;
    countElement.textContent = "0"; // Reset the count when out of view
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const slider = document.querySelector(".testimonial-slider");
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.querySelector(".testimonial-dots");
  let currentIndex = 0;

  // Create navigation dots
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  // Function to update slider
  function updateSlider() {
    slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  // Swipe functionality
  let startX = 0;
  let endX = 0;

  slider.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    if (startX > endX + 50) {
      // Swipe left
      currentIndex = (currentIndex + 1) % slides.length;
    } else if (startX < endX - 50) {
      // Swipe right
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    }
    updateSlider();
  });

  // Dot click functionality
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateSlider();
    });
  });
});