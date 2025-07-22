///////////////////////////////////////////////////////////
//Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
//Make mobile navigarion work

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");

if (btnNavEl) {
  btnNavEl.addEventListener("click", function () {
    headerEl.classList.toggle("nav-open");
  });
}

///////////////////////////////////////////////////////////
//Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");

    // 내부 링크(#으로 시작하면서 현재 페이지일 경우)에만 기본 동작 막기
    if (href.startsWith("#")) {
      e.preventDefault();

      if (href === "#") {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        const sectionEl = document.querySelector(href);
        if (sectionEl) {
          const headerHeight = headerEl.offsetHeight;
          const sectionTop =
            sectionEl.getBoundingClientRect().top + window.pageYOffset;

          window.scrollTo({
            top: sectionTop - headerHeight,
            behavior: "smooth",
          });
        }
      }

      // 모바일 내비 닫기
      if (link.classList.contains("main-nav-link")) {
        headerEl.classList.toggle("nav-open");
      }
    }
  });
});

///////////////////////////////////////////////////////////
//sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log("ent:", ent);
    console.log("ent.isIntersecting:", ent.isIntersecting);

    if (ent.isIntersecting === false) {
      headerEl.classList.add("header-show");
      headerEl.classList.remove("header-normal");
    }
    if (ent.isIntersecting === true) {
      headerEl.classList.add("header-normal");
      headerEl.classList.remove("header-show");
    }
  },
  {
    //In the viewport
    root: null,
    thresold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
