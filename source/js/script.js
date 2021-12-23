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

if (faqList) {
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
}

// аккордеон фильтры
var filtersList = document.querySelector('.filter__list');

if (filtersList) {
  var filterListItems = filtersList.getElementsByClassName("filter__item");

  filtersList.querySelectorAll('.filter__icon-opened').forEach(n => n.classList.remove('filter__icon-opened--nojs'));
  filtersList.querySelectorAll('.filter__icon-closed').forEach(n => n.classList.remove('filter__icon-closed--nojs'));
  filtersList.querySelectorAll('.checkbox-list').forEach(n => n.classList.remove('checkbox-list--nojs'));

  for (var i = 0; i < filterListItems.length; i++) {
    filterListItems[i].querySelector('.filter__button').addEventListener('click', setHandler(i),false);
    }
    function setHandler(i){
      return function (e) {
        e.preventDefault();
        filterListItems[i].querySelector('.checkbox-list').classList.toggle('checkbox-list--show');
        filterListItems[i].querySelector('.filter__icon-closed').classList.toggle('filter__icon-closed--show');
        filterListItems[i].querySelector('.filter__icon-opened').classList.toggle('filter__icon-opened--show');
    };
  }
}

// кнопка filter
var buttonToShowFilter = document.querySelector('.catalog__button');
var blockFilter = document.querySelector('.filter');
if (blockFilter) {
  var buttonToCloseFilter = blockFilter.querySelector('.filter__button-close')

  blockFilter.classList.remove('filter--nojs');
  buttonToShowFilter.classList.remove('catalog__button--nojs');
  buttonToCloseFilter.classList.remove('filter__button-close--nojs');

  buttonToShowFilter.addEventListener('click', function (event) {
    blockFilter.classList.toggle('filter--closed');
    document.body.style.overflow = 'hidden';
  });

  // кнопка закрыть filter
  buttonToCloseFilter.addEventListener('click', function (event) {
    document.body.style.overflow = 'visible';
    blockFilter.classList.toggle('filter--closed');
  });
}

// модальное окно

var modalOverlay = document.querySelector('.modal-overlay');
if (modalOverlay) {
  var modalCall = modalOverlay.querySelector('.modal-login');
  var buttonToOpenModal = document.querySelector('.page-header__login');
  var buttonToOpenModalTabletMobile = document.querySelector('.page-header__login-link');
  var buttonToCloseModal = document.querySelector('.modal-login__button-close');

  var userEmailField = modalCall.querySelector('[name="user-email"]');

  buttonToOpenModal.addEventListener('click', function (e) {
    e.preventDefault();
    modalOverlay.classList.remove('visually-hidden');
    modalOverlay.classList.add('modal-overlay--open');
    modalCall.classList.add('modal-login--open');
    userEmailField.focus();
    document.body.style.overflow = 'hidden';

    if (modalCall.classList.contains('modal-login--open')) {
      window.addEventListener('click', function (el) {
        if (el.target === modalOverlay) {
          document.body.style.overflow = 'visible';
          modalOverlay.classList.remove('modal-overlay--open');
          modalCall.classList.remove('modal-login--open');
        }
      });
      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          document.body.style.overflow = 'visible';
          modalOverlay.classList.remove('modal-overlay--open');
          modalCall.classList.remove('modal-login--open');
        }
      });
      buttonToCloseModal.addEventListener('click', function () {
        document.body.style.overflow = 'visible';
        modalOverlay.classList.remove('modal-overlay--open');
        modalCall.classList.remove('modal-login--open');
      });
    }

  });
}

if (buttonToOpenModalTabletMobile) {
  buttonToOpenModalTabletMobile.addEventListener('click', function (e) {
    e.preventDefault();
    modalOverlay.classList.remove('visually-hidden');
    modalOverlay.classList.add('modal-overlay--open');
    modalCall.classList.add('modal-login--open');
    userEmailField.focus();
    document.body.style.overflow = 'hidden';

    if (modalCall.classList.contains('modal-login--open')) {
      window.addEventListener('click', function (el) {
        if (el.target === modalOverlay) {
          document.body.style.overflow = 'visible';
          modalOverlay.classList.remove('modal-overlay--open');
          modalCall.classList.remove('modal-login--open');
        }
      });
      window.addEventListener('keydown', function (evt) {
        if (evt.keyCode === 27) {
          document.body.style.overflow = 'visible';
          modalOverlay.classList.remove('modal-overlay--open');
          modalCall.classList.remove('modal-login--open');
        }
      });
      buttonToCloseModal.addEventListener('click', function () {
        document.body.style.overflow = 'visible';
        modalOverlay.classList.remove('modal-overlay--open');
        modalCall.classList.remove('modal-login--open');
      });
    }

  });
}

// запись полей формы в Local Storage
var blockModalForm = document.querySelector('.modal-login__inner');
var formInModal = blockModalForm.querySelector('[method="post"]');
var userEmail = formInModal.querySelector('[name="user-email"]');
var userPassword = formInModal.querySelector('[name="user-password"]');

formInModal.addEventListener('submit', function (evt) {
  if (!userEmail.value || !userPassword.value) {
    evt.preventDefault();
  } else {
    localStorage.setItem('userEmail', userEmail.value);
  }
});
