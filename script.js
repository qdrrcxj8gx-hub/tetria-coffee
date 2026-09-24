/* ==================================================
   MENU IMAGES

   ТВОИ 12 КАРТИНОК МЕНЮ НАХОДЯТСЯ ЗДЕСЬ.
================================================== */

const menuImages = [

    /* 1 */
    "images/menu-01.jpg",

    /* 2 */
    "images/menu-02.jpg",

    /* 3 */
    "images/menu-03.jpg",

    /* 4 */
    "images/menu-04.jpg",

    /* 5 */
    "images/menu-05.jpg",

    /* 6 */
    "images/menu-06.jpg",

    /* 7 */
    "images/menu-07.jpg",

    /* 8 */
    "images/menu-08.jpg",

    /* 9 */
    "images/menu-09.jpg",

    /* 10 */
    "images/menu-10.jpg",

    /* 11 */
    "images/menu-11.jpg",

    /* 12 */
    "images/menu-12.jpg"

];


/* ==================================================
   INTRO
================================================== */

const intro =
    document.getElementById("intro");


window.addEventListener("load", () => {

    setTimeout(() => {

        intro.classList.add("hidden");

    }, 900);

});


/* ==================================================
   HEADER
================================================== */

const header =
    document.getElementById("header");


function updateHeader() {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* ==================================================
   MOBILE NAVIGATION
================================================== */

const burger =
    document.getElementById("burger");

const mobileNav =
    document.getElementById("mobileNav");


function openMobileNav() {

    burger.classList.add("active");

    mobileNav.classList.add("active");

    document.body.classList.add("no-scroll");

}


function closeMobileNav() {

    burger.classList.remove("active");

    mobileNav.classList.remove("active");

    document.body.classList.remove("no-scroll");

}


burger.addEventListener("click", () => {

    if (mobileNav.classList.contains("active")) {

        closeMobileNav();

    } else {

        openMobileNav();

    }

});


const mobileNavigationLinks =
    mobileNav.querySelectorAll("a");


mobileNavigationLinks.forEach(link => {

    link.addEventListener(
        "click",
        closeMobileNav
    );

});


/* ==================================================
   REVEAL
================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }


                entry.target.classList.add(
                    "visible"
                );


                revealObserver.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.1,
            rootMargin: "0px 0px -30px 0px"
        }

    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* ==================================================
   MENU VIEWER
================================================== */

const menuViewer =
    document.getElementById("menuViewer");

const menuViewerBg =
    document.getElementById("menuViewerBg");

const menuImage =
    document.getElementById("menuImage");

const menuProgress =
    document.getElementById("menuProgress");

const menuCurrent =
    document.getElementById("menuCurrent");

const menuTotal =
    document.getElementById("menuTotal");

const menuClose =
    document.getElementById("menuClose");

const menuPrev =
    document.getElementById("menuPrev");

const menuNext =
    document.getElementById("menuNext");

const menuPrevArrow =
    document.getElementById("menuPrevArrow");

const menuNextArrow =
    document.getElementById("menuNextArrow");

const openMenuButtons =
    document.querySelectorAll(".open-menu");


let currentMenuIndex = 0;

let menuAnimating = false;

let touchStartX = 0;
let touchStartY = 0;


/* ==================================================
   TOTAL
================================================== */

menuTotal.textContent =
    menuImages.length;


/* ==================================================
   CREATE PROGRESS
================================================== */

function createMenuProgress() {

    menuProgress.innerHTML = "";


    menuImages.forEach(() => {

        const item =
            document.createElement("div");


        item.className =
            "menu-progress-item";


        const fill =
            document.createElement("span");


        item.appendChild(fill);

        menuProgress.appendChild(item);

    });

}


createMenuProgress();


/* ==================================================
   UPDATE PROGRESS
================================================== */

function updateMenuProgress() {

    const items =
        menuProgress.querySelectorAll(
            ".menu-progress-item"
        );


    items.forEach((item, index) => {

        item.classList.remove(
            "done",
            "current"
        );


        if (index < currentMenuIndex) {

            item.classList.add("done");

        }


        if (index === currentMenuIndex) {

            item.classList.add("current");

        }

    });


    menuCurrent.textContent =
        currentMenuIndex + 1;


    updateArrowState();

}


/* ==================================================
   ARROW STATE
================================================== */

function updateArrowState() {

    if (currentMenuIndex === 0) {

        menuPrevArrow.classList.add(
            "disabled"
        );

    } else {

        menuPrevArrow.classList.remove(
            "disabled"
        );

    }


    if (
        currentMenuIndex ===
        menuImages.length - 1
    ) {

        menuNextArrow.classList.add(
            "disabled"
        );

    } else {

        menuNextArrow.classList.remove(
            "disabled"
        );

    }

}


/* ==================================================
   BACKGROUND
================================================== */

function updateMenuBackground() {

    menuViewerBg.style.backgroundImage =
        `url("${menuImages[currentMenuIndex]}")`;

}


/* ==================================================
   SET IMAGE WITHOUT ANIMATION
================================================== */

function setMenuImageInstantly() {

    const source =
        menuImages[currentMenuIndex];


    menuImage.src = source;


    menuImage.alt =
        `Меню Tétria — страница ${
            currentMenuIndex + 1
        }`;


    menuImage.className = "";


    updateMenuBackground();

    updateMenuProgress();

}


/* ==================================================
   OPEN MENU
================================================== */

function openMenuViewer() {

    closeMobileNav();


    currentMenuIndex = 0;


    setMenuImageInstantly();


    menuViewer.classList.add(
        "active"
    );


    menuViewer.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "no-scroll"
    );


    setTimeout(() => {

        menuClose.focus({
            preventScroll: true
        });

    }, 100);

}


/* ==================================================
   CLOSE MENU
================================================== */

function closeMenuViewer() {

    menuViewer.classList.remove(
        "active"
    );


    menuViewer.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "no-scroll"
    );

}


/* ==================================================
   CHANGE PAGE
================================================== */

function changeMenuPage(newIndex, direction) {

    /*
        Не даём нажимать много раз,
        пока идёт анимация.
    */

    if (menuAnimating) {
        return;
    }


    /*
        Проверяем границы.
    */

    if (
        newIndex < 0 ||
        newIndex >= menuImages.length
    ) {

        return;

    }


    menuAnimating = true;


    /*
        Старая страница плавно уезжает.
    */

    if (direction === "next") {

        menuImage.classList.add(
            "slide-out-left"
        );

    } else {

        menuImage.classList.add(
            "slide-out-right"
        );

    }


    setTimeout(() => {

        currentMenuIndex =
            newIndex;


        const source =
            menuImages[currentMenuIndex];


        /*
            Ставим новую картинку.
        */

        menuImage.src =
            source;


        menuImage.alt =
            `Меню Tétria — страница ${
                currentMenuIndex + 1
            }`;


        /*
            С какой стороны появляется
            новая страница.
        */

        menuImage.className =
            direction === "next"
                ? "prepare-right"
                : "prepare-left";


        updateMenuBackground();

        updateMenuProgress();


        /*
            Заставляем браузер применить
            стартовое положение.
        */

        void menuImage.offsetWidth;


        /*
            Плавно приводим изображение
            в обычное положение.
        */

        requestAnimationFrame(() => {

            menuImage.className = "";

        });


        setTimeout(() => {

            menuAnimating = false;

        }, 390);

    }, 220);

}


/* ==================================================
   NEXT
================================================== */

function nextMenuPage() {

    changeMenuPage(
        currentMenuIndex + 1,
        "next"
    );

}


/* ==================================================
   PREVIOUS
================================================== */

function previousMenuPage() {

    changeMenuPage(
        currentMenuIndex - 1,
        "previous"
    );

}


/* ==================================================
   OPEN BUTTONS
================================================== */

openMenuButtons.forEach(button => {

    button.addEventListener(
        "click",
        openMenuViewer
    );

});


/* ==================================================
   CLOSE BUTTON
================================================== */

menuClose.addEventListener(
    "click",
    closeMenuViewer
);


/* ==================================================
   TAP AREAS
================================================== */

menuNext.addEventListener(
    "click",
    nextMenuPage
);


menuPrev.addEventListener(
    "click",
    previousMenuPage
);


/* ==================================================
   DESKTOP ARROWS
================================================== */

menuNextArrow.addEventListener(
    "click",
    nextMenuPage
);


menuPrevArrow.addEventListener(
    "click",
    previousMenuPage
);


/* ==================================================
   KEYBOARD
================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (
            !menuViewer.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (event.key === "ArrowRight") {

            nextMenuPage();

        }


        if (event.key === "ArrowLeft") {

            previousMenuPage();

        }


        if (event.key === "Escape") {

            closeMenuViewer();

        }

    }
);


/* ==================================================
   TOUCH / SWIPE
================================================== */

menuViewer.addEventListener(

    "touchstart",

    event => {

        const touch =
            event.changedTouches[0];


        touchStartX =
            touch.clientX;


        touchStartY =
            touch.clientY;

    },

    {
        passive: true
    }

);


menuViewer.addEventListener(

    "touchend",

    event => {

        const touch =
            event.changedTouches[0];


        const differenceX =
            touchStartX - touch.clientX;


        const differenceY =
            touchStartY - touch.clientY;


        /*
            Если движение больше
            вертикальное, чем горизонтальное,
            свайп меню не запускаем.
        */

        if (
            Math.abs(differenceY) >
            Math.abs(differenceX)
        ) {

            return;

        }


        /*
            Минимальная дистанция свайпа.
        */

        if (
            Math.abs(differenceX) < 55
        ) {

            return;

        }


        if (differenceX > 0) {

            nextMenuPage();

        } else {

            previousMenuPage();

        }

    },

    {
        passive: true
    }

);


/* ==================================================
   PRELOAD MENU

   После загрузки главной страницы
   постепенно загружаем меню заранее.
================================================== */

function preloadMenuImages() {

    menuImages.forEach((source, index) => {

        setTimeout(() => {

            const image =
                new Image();


            image.src =
                source;

        }, index * 120);

    });

}


window.addEventListener("load", () => {

    setTimeout(
        preloadMenuImages,
        1200
    );

});