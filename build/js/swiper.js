/* eslint-disable */
'use strict';

var swiper = new Swiper('.swiper', {
  // Default parameters
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerGroup: 4,
  navigation: {
    nextEl: '.slider__button--next',
    prevEl: '.slider__button--prev',
  },
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      allowTouchMove: true,
      pagination: {
        el: '.slider__pagination',
        clickable: false,
        type: 'custom',
        renderCustom: function (swiper, current, total) {
          return current + ' of ' + total;
        }
      },
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      allowTouchMove: true,
      pagination: {
        el: '.slider__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,
      allowTouchMove: false,
      pagination: {
        el: '.slider__pagination',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
      },
    }
  }
});
