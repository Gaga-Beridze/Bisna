/*----------------------------------------------
# Preloader
----------------------------------------------*/

/*---------------------------------
# header
---------------------------------*/
const navbar = document.querySelector('.navbar')
const scrollThreshold = 100

function activateNavbar() {
  navbar.classList.add('active')
}

function deactivateNavbar() {
  navbar.classList.remove('active')
}

function handleScroll() {
  if (window.scrollY > scrollThreshold) {
    activateNavbar()
  } else {
    deactivateNavbar()
  }
}

window.addEventListener('scroll', handleScroll)

/*----------------------------------------------
# Cookie System
----------------------------------------------*/
function setCookie(name, value, days) {
  var expires = ''
  if (days) {
    var date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

function getCookie(name) {
  var nameEQ = name + '='
  var ca = document.cookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

function eraseCookie(name) {
  document.cookie = name + '=; Max-Age=-99999999;'
}

var cookiePopup = document.querySelector('.cookie-container')
var acceptButton = document.getElementById('accept-cookie')
var learnMoreLink = document.getElementById('learn-more')

acceptButton.addEventListener('click', function () {
  setCookie('cookie-accepted', true, 365)
  cookiePopup.style.display = 'none'
})

learnMoreLink.addEventListener('click', function (event) {
  event.preventDefault()
  alert('Learn more about our cookie policy!')
})

if (!getCookie('cookie-accepted')) {
  cookiePopup.style.display = 'block'
}

if (getCookie('cookie-accepted')) {
  cookiePopup.style.display = 'none'
}

/*----------------------------------------------
# Change color mode
----------------------------------------------*/
function setColor(color) {
  // remove all color classes from body
  document.body.classList.remove(
    'red',
    'green',
    'orange',
    'black',
    'pink',
    'default'
  )

  // add selected color class to body
  document.body.classList.add(color)

  // set cookie with selected color
  document.cookie = `color=${color}`

  // set active state on selected color checkbox
  document
    .querySelectorAll('.color-checked.active')
    .forEach((el) => el.classList.remove('active'))
  const selectedCheckbox = document.querySelector(`#${color} .color-checked`)
  selectedCheckbox.classList.add('active')

  // add selected class to clicked color div
  document
    .querySelectorAll('.color.selected')
    .forEach((el) => el.classList.remove('selected'))
  const selectedColorDiv = document.querySelector(`#${color}`)
  selectedColorDiv.classList.add('selected')
}

// retrieve cookie value if it exists
const cookie = document.cookie
if (cookie.includes('color=')) {
  const color = cookie.split('color=')[1].split(';')[0]
  setColor(color)
}

// add click event listeners to color checkboxes
document.querySelectorAll('.color').forEach((el) => {
  el.addEventListener('click', () => {
    const color = el.id
    setColor(color)
  })
  // add selected class to clicked color div on initial load
  if (el.classList.contains('selected')) {
    el.click()
  }
})

/*----------------------------------------------
# Font size mode
----------------------------------------------*/
const fontSizes = {
  small: 'FontSize-small',
  normal: 'FontSize-medium',
  big: 'FontSize-big',
}

function setFontSize(size) {
  Object.values(fontSizes).forEach((value) =>
    document.body.classList.remove(value)
  )
  document.body.classList.add(fontSizes[size])
  localStorage.setItem('fontSize', size)
}

const fontsize_small = document.getElementById('FontSize-small')
const fontsize_normall = document.getElementById('FontSize-normall')
const fontsizeBig = document.getElementById('FontSize-big')

// Set the checked state of the radio inputs based on the stored value
const selectedFontSize = localStorage.getItem('fontSize')
if (selectedFontSize) {
  switch (selectedFontSize) {
    case 'small':
      fontsize_small.checked = true
      break
    case 'normal':
      fontsize_normall.checked = true
      break
    case 'big':
      fontsizeBig.checked = true
      break
  }
  setFontSize(selectedFontSize)
}

fontsize_small.addEventListener('change', () => setFontSize('small'))
fontsize_normall.addEventListener('change', () => setFontSize('normal'))
fontsizeBig.addEventListener('change', () => setFontSize('big'))

/*----------------------------------------------
# Dark & Light mode
----------------------------------------------*/
const darkModeOn = document.getElementById('dark-mode-on'),
  darkModeOff = document.getElementById('dark-mode-off')

darkModeOn.addEventListener('change', () => {
  document.body.classList.toggle('dark')
  setCookie('dark-mode', 'true', 365)
  darkMode = 'true'
})

darkModeOff.addEventListener('click', () => {
  document.body.classList.remove('dark')
  eraseCookie('dark-mode')
  darkMode = null
})

var darkMode = getCookie('dark-mode')

if (darkMode === 'true') {
  document.body.classList.add('dark')
  if (darkModeOn.value === '1') {
    darkModeOn.checked = true
    darkModeOff.checked = false
  }
}

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
})

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
})

/*---------------------------------
# popular tours
---------------------------------*/
var swiper = new Swiper('.popular-tours', {
  slidesPerView: 4,
  effect: 'slide',
  centeredSlides: true,
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
})

/*---------------------------------
# Popular places
---------------------------------*/
var swiper = new Swiper('.popular-place', {
  effect: 'slide',
  slidesPerView: 4,
  spaceBetween: 10,
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
      slidesPerView: 'auto',
      centeredSlides: false,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },
  navigation: {
    nextEl: '.swiper-button-prev',
    prevEl: '.swiper-button-next',
  },
})

/*---------------------------------
# guides section
---------------------------------*/
var swiper = new Swiper('.guides-section', {
  effect: 'slide',
  slidesPerView: 4,
  centeredSlides: true,
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
})

/*---------------------------------
# car rent section
---------------------------------*/
var swiper = new Swiper('.car-rent-section', {
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
})

/*---------------------------------
# car rent section
---------------------------------*/
var swiper = new Swiper('.car-rent-section', {
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
})

/*---------------------------------
# Food section
---------------------------------*/
var swiper = new Swiper('.food-section', {
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
})

/*---------------------------------
# Hotel section
---------------------------------*/
var swiper = new Swiper('.hotel-section', {
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
})

/*---------------------------------
# Extrem section
---------------------------------*/
var swiper = new Swiper('.extrem-section', {
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
})

/*---------------------------------
# Entertainment section
---------------------------------*/
var swiper = new Swiper('.entertainment-section', {
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
})
