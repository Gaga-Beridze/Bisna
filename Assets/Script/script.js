/*----------------------------------------------
# Preloader
----------------------------------------------*/
window.onload = function () {
  document.querySelector('.preloader').style.display = 'none'
}

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

var cookiePopup = document.getElementById('cookie-popup')
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

/* ----------------------------------------
# ScrollBar 
-----------------------------------------*/
const lineBackground = document.createElement('div')
lineBackground.classList.add('scrollbar-background')
document.querySelector('.scrollbar').appendChild(lineBackground)

const lineForeground = document.createElement('div')
lineForeground.classList.add('scrollbar-foreground')
document.querySelector('.scrollbar').appendChild(lineForeground)

const line = document.querySelector('.scrollbar')

window.addEventListener('scroll', function () {
  const scrollPercent =
    (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
  lineForeground.style.width = `${scrollPercent}%`
  lineForeground.style.opacity = 1
  lineBackground.style.opacity = 1 - scrollPercent / 100
})

const scrollBarOn = document.getElementById('scrollbar-on'),
  scrollBarOff = document.getElementById('scrollbar-off'),
  scrollBar = document.querySelector('.scrollbar')

scrollBarOn.addEventListener('change', () => {
  scrollBar.classList.toggle('active')
  setCookie('scrollBar', 'true', 365)
  scroll = 'true'
})

scrollBarOff.addEventListener('click', () => {
  scrollBar.classList.remove('active')
  eraseCookie('scrollBar')
  scroll = null
})

var scroll = getCookie('scrollBar')

if (scroll === 'true') {
  scrollBar.classList.add('active')
  if (scrollBarOn.value === '1') {
    scrollBarOn.checked = true
    scrollBarOff.checked = false
  }
}

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
#
---------------------------------*/

/*---------------------------------
#
---------------------------------*/

/*---------------------------------
#
---------------------------------*/

/*---------------------------------
#
---------------------------------*/

/*---------------------------------
#
---------------------------------*/
