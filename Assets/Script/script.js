/*---------------------------------
# header
---------------------------------*/
const scrollThreshold = 100;

function activateNavbar() {
  $('.navbar').addClass('active');
}

function deactivateNavbar() {
  $('.navbar').removeClass('active');
}

function handleScroll() {
  if ($(window).scrollTop() > scrollThreshold) {
    activateNavbar();
  } else {
    deactivateNavbar();
  }
}

$(window).on('scroll', handleScroll);

/*----------------------------------------------
# Cookie System
----------------------------------------------*/
function setCookie(name, value, days) {
  var expires = '';
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/';
}

function getCookie(name) {
  var nameEQ = name + '=';
  var ca = document.cookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;';
}

var cookiePopup = $('.cookie-container');
var acceptButton = $('#accept-cookie');
var learnMoreLink = $('#learn-more');

acceptButton.on('click', function () {
  setCookie('cookie-accepted', true, 365);
  cookiePopup.css('display', 'none');
});

learnMoreLink.on('click', function (event) {
  event.preventDefault();
  alert('Learn more about our cookie policy!');
});

if (!getCookie('cookie-accepted')) {
  cookiePopup.css('display', 'block');
}

if (getCookie('cookie-accepted')) {
  cookiePopup.css('display', 'none');
}

/*----------------------------------------------
# Change color mode
----------------------------------------------*/
function setColor(color) {
  // remove all color classes from body
  $('body').removeClass(
    'red green orange black pink default'
  );

  // add selected color class to body
  $('body').addClass(color);

  // set cookie with selected color
  document.cookie = `color=${color}`;

  // set active state on selected color checkbox
  $('.color-checked.active').removeClass('active');
  $(`#${color} .color-checked`).addClass('active');

  // add selected class to clicked color div
  $('.color.selected').removeClass('selected');
  $(`#${color}`).addClass('selected');
}

// retrieve cookie value if it exists
const cookie = document.cookie;
if (cookie.includes('color=')) {
  const color = cookie.split('color=')[1].split(';')[0];
  setColor(color);
}

// add click event listeners to color checkboxes
$('.color').on('click', function () {
  const color = $(this).attr('id');
  setColor(color);
});

// add selected class to clicked color div on initial load
$('.color.selected').click();

/*----------------------------------------------
# Font size mode
----------------------------------------------*/
const fontSizes = {
  small: 'FontSize-small',
  normal: 'FontSize-medium',
  big: 'FontSize-big',
};

function setFontSize(size) {
  Object.values(fontSizes).forEach((value) =>
    $('body').removeClass(value)
  );
  $('body').addClass(fontSizes[size]);
  localStorage.setItem('fontSize', size);
}

const fontsize_small = $('#FontSize-small');
const fontsize_normall = $('#FontSize-normall');
const fontsizeBig = $('#FontSize-big');

// Set the checked state of the radio inputs based on the stored value
const selectedFontSize = localStorage.getItem('fontSize');
if (selectedFontSize) {
  switch (selectedFontSize) {
    case 'small':
      fontsize_small.prop('checked', true);
      break;
    case 'normal':
      fontsize_normall.prop('checked', true);
      break;
    case 'big':
      fontsizeBig.prop('checked', true);
      break;
  }
  setFontSize(selectedFontSize);
}

fontsize_small.on('change', () => setFontSize('small'));
fontsize_normall.on('change', () => setFontSize('normal'));
fontsizeBig.on('change', () => setFontSize('big'));

/*----------------------------------------------
# Dark & Light mode
----------------------------------------------*/
const darkModeOn = $('#dark-mode-on');
const darkModeOff = $('#dark-mode-off');

darkModeOn.on('change', () => {
  $('body').toggleClass('dark');
  setCookie('dark-mode', 'true', 365);
});

darkModeOff.on('click', () => {
  $('body').removeClass('dark');
  eraseCookie('dark-mode');
});

const darkMode = getCookie('dark-mode');

if (darkMode === 'true') {
  $('body').addClass('dark');
  darkModeOn.prop('checked', true);
  darkModeOff.prop('checked', false);
}


/* ----------------------------------------
# Sound mute sytstem
-----------------------------------------*/
const soundOn = $('#sound-on');
const soundOff = $('#sound-off');
const mediaSound = $('audio, video');

soundOn.on('change', () => {
  mediaSound.prop('muted', false);
  eraseCookie('sound');
  sound = true;
});

soundOff.on('click', () => {
  mediaSound.prop('muted', true);
  setCookie('sound', 'true', 365);
  sound = null;
});

var sound = getCookie('sound');

if (sound === 'true') {
  mediaSound.prop('muted', true);
  if (soundOff.val() === '1') {
    soundOn.prop('checked', false);
    soundOff.prop('checked', true);
  }
}

/* ----------------------------------------
# Tooltips
-----------------------------------------*/

/* ----------------------------------------
# Internet detector 
-----------------------------------------*/
const statusElement = $('#status');
let hasShownToast = false; // Add a boolean flag

function showToast(message, bgColor, color) {
  // Create a new toast element
  const toastElement = $('<div></div>')
    .addClass('toast fade')
    .attr('role', 'alert')
    .attr('aria-live', 'assertive')
    .attr('aria-atomic', 'true')
    .attr('data-bs-autohide', 'true')
    .attr('data-bs-delay', '25000')
    .css({
      backgroundColor: bgColor,
      color: color,
    });

  // Create a toast header
  const toastHeader = $('<div></div>')
    .addClass('toast-header')
    .html(`
    <strong class="me-auto"><i class="fa-solid fa-triangle-exclamation"></i> შეტყობინება</strong>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close">
      <i class="fa-solid fa-xmark"></i>
    </button>
  `);

  const toastBody = $('<div></div>')
    .addClass('toast-body')
    .text(message);
  toastElement.append(toastHeader, toastBody);

  // Add the toast to the container and show it
  $('.toast-container').append(toastElement);
  const bootstrapToast = new bootstrap.Toast(toastElement[0]);
  bootstrapToast.show();
}

// internet detection
function updateStatus() {
  if (navigator.onLine) {
    statusElement.text('Active');
    statusElement.css('color', 'var(--Main-color)');
    if (hasShownToast) {
      showToast(
        'პრობლემა მოგვარებულია, თქვენი ინტერნეტ კავშირი აღსდგა!',
        'var(--background-color-1)',
        'var(--Main-color)'
      );
      hasShownToast = false;
    }
  } else {
    statusElement.text('Offline');
    statusElement.css('color', 'red');
    if (!hasShownToast) {
      showToast(
        'წარმოიშვა შეცდომა, თქვენი ინტერნეტ კავშირი დაიკარგა!',
        'var(--background-color-1)',
        'red'
      );
      const alertSound = $('#internet-connection-sound')[0];
      alertSound.play();
      hasShownToast = true;
    }
  }
}

$(window).on('online', updateStatus);
$(window).on('offline', updateStatus);

// Initial status check
updateStatus();


/*---------------------------------
# Hero
---------------------------------*/
var swiper = new Swiper('.hero', {
  spaceBetween: 10,
  effect: 'fade',
  fadeEffect: {
    crossFade: false,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
  autoplay: {
    delay: 4000,
  },
});

/*---------------------------------
# services
---------------------------------*/
var swiper = new Swiper('.services', {
  effect: 'coverflow',
  followFinger: true,
  centeredSlides: true,
  coverflowEffect: {
    rotate: 0,
    stretch: 0,
    depth: 300,
    modifier: 1,
    slideShadows: false,
  },
  autoplay: {
    delay: 2000,
    pauseOnMouseEnter: true,
    waitForTransition: true,
    disableOnInteraction: true,
  },
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
  breakpoints: {
    320: {
      spaceBetween: 60,
      effect: 'coverflow',
      slidesPerView: 'auto',
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 60,
    },
  },
});

var swiperOptions = {
  effect: 'slide',
  slidesPerView: 4,
  centeredSlides: false,
  spaceBetween: 10,
  navigation: {
    nextEl: '.swiper-button-prev',
    prevEl: '.swiper-button-next',
  },
  breakpoints: {
    320: {
      centeredSlides: false,
      slidesPerView: 'auto',
    },
    640: {
      centeredSlides: false,
      slidesPerView: 'auto',
    },
    768: {
      centeredSlides: false,
    },
  },
};

var sectionClasses = [
  'popular-tours',
  'popular-place',
  'guides-section',
  'car-rent-section',
  'transport-section',
  'food-section',
  'accommodation-section',
  'extrem-section',
  'entertainment-section',
  'scheduled-tours',
];

sectionClasses.forEach(function (sectionClass) {
  var sectionSelector = '.' + sectionClass;
  new Swiper(sectionSelector, swiperOptions);
});