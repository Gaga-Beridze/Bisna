/*-------------------------------------------
# Hero
-------------------------------------------*/
var swiper = new Swiper(".mySwiper", {
  pagination: {
    el: ".swiper-pagination",
    dynamicBullets: true,
  },
});

/*-------------------------------------------
# Dark and light mode
-------------------------------------------*/
$(document).ready(function () {
  const body = $('body');
  const themeIcon = $('#theme-icon');
  const savedThemePreference = localStorage.getItem('themePreference');

  function setTheme(theme) {
    body.removeClass('dark');
    themeIcon.removeClass('fa-sun fa-moon');

    if (theme === 'dark') {
      body.addClass('dark');
      themeIcon.addClass('fa-sun');
    } else {
      themeIcon.addClass('fa-moon');
    }
  }

  $('#light-option').on('click', function () {
    setTheme('light');
    localStorage.setItem('themePreference', 'light');
  });

  $('#dark-option').on('click', function () {
    setTheme('dark');
    localStorage.setItem('themePreference', 'dark');
  });

  $('#system-option').on('click', function () {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDarkMode ? 'dark' : 'light');
    localStorage.setItem('themePreference', prefersDarkMode ? 'dark' : 'light');
  });

  if (savedThemePreference === 'light') {
    setTheme('light');
  } else if (savedThemePreference === 'dark') {
    setTheme('dark');
  } else {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDarkMode ? 'dark' : 'light');
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
    const prefersDarkMode = e.matches;
    setTheme(prefersDarkMode ? 'dark' : 'light');
    localStorage.setItem('themePreference', prefersDarkMode ? 'dark' : 'light');
  });
});
