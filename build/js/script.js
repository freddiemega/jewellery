'use strict';

// основное меню
var navMain = document.querySelector('.page-header__wrapper');
var navToggle = document.querySelector('.page-header__toggle');

navMain.classList.remove('page-header__wrapper--nojs');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('page-header__wrapper--closed')) {
    navMain.classList.remove('page-header__wrapper--closed');
    navMain.classList.add('page-header__wrapper--opened');
    document.body.style.overflow = 'hidden';
  } else {
    navMain.classList.add('page-header__wrapper--closed');
    navMain.classList.remove('page-header__wrapper--opened');
    document.body.style.overflow = 'visible';
  }
});

// аккордеон
var faqList = document.querySelector('.faq__list');
var faqListItems = faqList.getElementsByClassName("faq__item");

faqList.querySelectorAll('.faq__icon-opened').forEach(n => n.classList.remove('faq__icon-opened--nojs'));
faqList.querySelectorAll('.faq__icon-closed').forEach(n => n.classList.remove('faq__icon-closed--nojs'));
faqList.querySelectorAll('.faq__answer').forEach(n => n.classList.remove('faq__answer--nojs'));

for (var i = 0; i < faqListItems.length; i++) {
  faqListItems[i].querySelector('.faq__button').addEventListener('click', setHandler(i),false);
  }
  function setHandler(i){
    return function (e) {
    faqListItems[i].querySelector('.faq__answer').classList.toggle('faq__answer--show');
    faqListItems[i].querySelector('.faq__icon-closed').classList.toggle('faq__icon-closed--show');
    faqListItems[i].querySelector('.faq__icon-opened').classList.toggle('faq__icon-opened--show');
  };
}

// карусель
let mouse = {
  pressed: false
  , lastX: 0}
let ul = null;

var carousel = document.querySelector('.slider');
var buttonPrev = carousel.querySelector('.slider__button--prev');
var buttonNext = carousel.querySelector('.slider__button--next');
// вычисляем количество элементов в слайдере
var numberSliderElement = carousel.querySelectorAll('.slider__item').length;
// получаем элемент в который надо вставить пагинацию
var slider = document.querySelector('.slider');
var currentPage = 1;
pagination (currentPage , numberSliderElement);

var formPagination = slider.querySelector('.slider__pagination');
//console.log(formPagination);
if (getAdaptabilityOption() == 'desktop') {
  var maxPage = numberSliderElement / 4;
} else {
  var maxPage = numberSliderElement / 2;
}

buttonPrev.addEventListener('click', function () {
  move('right', 1);
});

buttonNext.addEventListener('click', function () {
  move('left', 1);
});

function mouseDown(e) {
  mouse.pressed = true;
  ul.style.transition = "all 0s";
  mouse.lastX = e.clientX;
}

function mouseUp(e) {
  if (!mouse.pressed) return;
  mouse.pressed = false;
  ul.style.transition = "all 0.5s";
  let inFrame = document.body.querySelector('.slider__wrapper').getBoundingClientRect();
  let left = ul.getBoundingClientRect().x - inFrame.x;
  left = Math.round(left / 130) * 130;
  let maxLeft = document.body.querySelector('.slider__list li:last-child');
  maxLeft = -(maxLeft.offsetLeft + maxLeft.offsetWidth - inFrame.width);
  if (left < maxLeft) left = maxLeft;
  if (left > 0) left = 0;
  ul.style.left = left + 'px';
  //console.log(e);
}

function mouseMove(e) {
  if (!mouse.pressed) return;
  if (e.buttons == 0) return;
  let inFrame = document.body.querySelector('.slider__wrapper').getBoundingClientRect();
  let left = ul.getBoundingClientRect().x - inFrame.x;
  ul.style.left = left + e.clientX - mouse.lastX + 'px';
  //console.log(e);
  mouse.lastX = e.clientX;
}

function move(direction, numberOfSlideGroups) {
  let inFrame = document.body.querySelector('.slider__wrapper').getBoundingClientRect();
  let left = ul.getBoundingClientRect().x - inFrame.x;
  let maxLeft = document.body.querySelector('.slider__list li:last-child');
  maxLeft = -(maxLeft.offsetLeft + maxLeft.offsetWidth - inFrame.width);
  switch (direction) {
  case 'left':
    left = left - inFrame.width - 30;
    left = left * numberOfSlideGroups;
    ul.style.left = left + 'px';
    if (left < maxLeft) {
      ul.style.left = maxLeft - 200 + 'px';
      setTimeout(() => {
        ul.style.left = maxLeft + 'px'
      }, 400)
    }
    if (currentPage < maxPage) {
      currentPage = currentPage + numberOfSlideGroups;
    }
    pagination (currentPage, numberSliderElement);
    break;
  case 'right':
    left = left + (inFrame.width + 30) * numberOfSlideGroups;

    ul.style.left = left + 'px';
    if (left > 0) {
      ul.style.left = 200 + 'px';
      setTimeout(() => {
        ul.style.left = 0 + 'px'
      }, 400)
    }
    if (currentPage > 1) {
      currentPage = currentPage - numberOfSlideGroups;
    }
    pagination (currentPage, numberSliderElement);
    break;
  }
};
// отметить картинки для удобства разработки
// этот код может быть удалён по вашему усмотрению

/*
let j = 1;
for (let li of carousel.querySelectorAll('li')) {
  li.style.position = 'relative';
  li.insertAdjacentHTML('beforeend', `<span style="position:absolute;right:65px;bottom:5px">${j}</span>`);
  j++;
}
*/
carousel.onmousedown = mouseDown;
carousel.onmouseup = mouseUp;
carousel.onmouseout = mouseUp;
carousel.onmousemove = mouseMove;
ul = slider.querySelector('.slider__list');

function pagination (currentPage, totalSlides) {
  // удаляем старую пагинацию, если она существует
  if (slider.querySelector('.slider__pagination')) {
    slider.querySelector('.slider__pagination').remove();
  }
  //создаём форму-список
  var paginationContainer = document.createElement('form');
  paginationContainer.name = 'pagination-form';
  // добавляем элементу списка класс
  paginationContainer.classList.add('slider__pagination');

  if (getAdaptabilityOption() == 'mobile') {
    var paginationContainer = document.createElement('p');
    // добавляем элементу списка класс
    paginationContainer.classList.add('slider__pagination');
    // добавляем значение
    paginationContainer.textContent = '1 of  ' + (totalSlides / 2);
  } else {
    if (getAdaptabilityOption() == 'desktop') {
      var totalPages = totalSlides / 4;
    } else {
      // 'tablet' case
      var totalPages = totalSlides / 2;
    }
    for (var i = 1; i <= totalPages; i++) {
      // создаём кнопку пагинации
      var buttonElement = document.createElement('button');
      buttonElement.type = 'button';
      // задаём кнопке параметр name
      buttonElement.name = 'slider-button-' + i;
      // добавляем кнопке класс
      buttonElement.classList.add('slider__pagination-button');
      //
      if (i == currentPage) {
        buttonElement.classList.add('slider__pagination-button--active');
        buttonElement.disabled = true;
      }
      // добавляем кнопке значение
      buttonElement.textContent = i;

      buttonElement.addEventListener('click', function (event) {
        var numberOfCurrentButton = paginationContainer.querySelector('.slider__pagination-button--active').textContent;
        if([...event.target.classList].includes('slider__pagination-button')) {
          var numberOfPressedButton = event.target.textContent;
        }
        if (numberOfPressedButton > numberOfCurrentButton) {
          var rangeToMoveLeft = numberOfPressedButton - numberOfCurrentButton;
            move('left', rangeToMoveLeft);
        } else {
          var rangeToMoveRight= numberOfCurrentButton - numberOfPressedButton;
            //console.log(rangeToMoveRight);
            move('right', rangeToMoveRight);
        }
      });

      // вставляем кнопку внутрь <form>
      paginationContainer.appendChild(buttonElement);
    }
  }


  //вставка списка
  slider.append(paginationContainer);

}

function getAdaptabilityOption() {
  if (window.innerWidth >= 1024) {
    return 'desktop';
  } if (window.innerWidth < 1024 && window.innerWidth >= 768) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}
