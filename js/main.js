const body = document.body;

const getScrollWidth = () => {
  let div = document.createElement('div');
  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  document.body.append(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

const lockBody = (lockPad) => {
  let paddingValue = `${lockPad}px`;
  body.classList.add('lock');
  body.style.paddingRight = `${paddingValue}`;
  // header.style.setProperty('--lock-pad', `${paddingValue}`);
};

const unlockBody = () => {
  body.classList.remove('lock');
  // header.style.removeProperty('--lock-pad');
  body.style.paddingRight = '';
};

const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};

const initSiteHeader = () => {
  let siteHeader = document.querySelector('.site-header');
  if (siteHeader) {
    if (document.documentElement.clientWidth < 768) {
      let headerHeight = siteHeader.offsetHeight;
      let nextFromHeader = siteHeader.nextElementSibling;
      nextFromHeader.style.paddingTop = `${headerHeight}px`;
    }

    let navToggle = siteHeader.querySelector(".nav__toggle");
    let navWrapper = siteHeader.querySelector(".nav__wrapper");

    const onClickAwayCloseMainMenu = (evt) => {
      if (!evt.target.closest('.nav__wrapper')) {
        closeMainMenu(navToggle);
      }
    };

    const addListenerOnOpenMainMenu = () => {
      setTimeout(() => {
        document.addEventListener('click', onClickAwayCloseMainMenu);
      }, 200);
    };

    const openMainMenu = (btn) => {
      addListenerOnOpenMainMenu();
      siteHeader.classList.add("active");
      navWrapper.classList.add("active");
      body.classList.add("active");
      btn.setAttribute("aria-label", "close menu");
      btn.setAttribute("aria-expanded", "true");
    };

    const closeMainMenu = (btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "menu");
      body.classList.remove("active");
      navWrapper.classList.remove("active");
      siteHeader.classList.remove("active");
      document.removeEventListener('click', onClickAwayCloseMainMenu);
    };

    navToggle.addEventListener("click", function () {
      if (navWrapper.classList.contains("active")) {
        closeMainMenu(navToggle);
      } else {
        openMainMenu(navToggle);
      }
    });

    let userMenuDropdownToggle = siteHeader.querySelector('.user-menu__dropdown-toggle');
    let userDropDownMenu = siteHeader.querySelector('.user-menu__list');

    const openUserMenu = (btn) => {
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "close user menu");
      userDropDownMenu.classList.add("active");
      addListenerOnOpenUserMenu();
    };

    const closeUserMenu = (btn) => {
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "open user menu");
      userDropDownMenu.classList.remove("active");
      document.removeEventListener('click', onClickAwayCloseUserMenu);
    };

    const onClickAwayCloseUserMenu = (evt) => {
      if (!evt.target.closest('.user-menu__list')) {
        closeUserMenu(userMenuDropdownToggle);
      }
    };

    const addListenerOnOpenUserMenu = () => {
      setTimeout(() => {
        document.addEventListener('click', onClickAwayCloseUserMenu);
      }, 200);
    };

    userMenuDropdownToggle.addEventListener("click", function (evt) {
      evt.preventDefault();
      if (userDropDownMenu.classList.contains("active")) {
        closeUserMenu(userMenuDropdownToggle);
      } else {
        openUserMenu(userMenuDropdownToggle);
      }
    });
  }
};

const initLearnModal = () => {
  // modal learn
  const learnModal = document.querySelector('.learn');
  if (learnModal) {
    const btnCloseLearnModal = learnModal.querySelector('.learn__btn-close');
    const linkLearnMore = learnModal.querySelector('.learn__cta');

    const showLearnMOdal = () => {
      learnModal.classList.add('active');
      btnCloseLearnModal.addEventListener('click', closeLearnMOdal);
      linkLearnMore.addEventListener('click', closeLearnMOdal);
    };
    const closeLearnMOdal = () => {
      learnModal.classList.remove('active');
      btnCloseLearnModal.removeEventListener('click', closeLearnMOdal);
      linkLearnMore.removeEventListener('click', closeLearnMOdal);
    };

    setTimeout(() => {
      showLearnMOdal();
    }, 2000)
  };
};

const initAccordion = () => {
  const accordion = document.querySelector('.accordion');
  if (accordion) {

    const togglerClass = 'footer__title';
    const itemClass = 'footer__title';
    const itemClosedClass = 'is-open';

    function closeAccordionItems() {
      accordion
        .querySelectorAll(`.${itemClass}`)
        .forEach((element, index) => {
          if (index !== 0) {
            element.classList.remove(itemClosedClass);
          }
        });
    }

    closeAccordionItems();

    accordion.addEventListener('click', (event) => {
      const toggler = event.target.closest(`.${togglerClass}`);

      if (toggler) {
        const item = toggler.closest(`.${itemClass}`);
        const isOpened = item.classList.contains(itemClosedClass);

        isOpened
          ? item.classList.remove(itemClosedClass)
          : item.classList.add(itemClosedClass);
      }

    })
  };
};

document.addEventListener('DOMContentLoaded', () => {

  initSiteHeader();
  initLearnModal();
  initAccordion();
});
