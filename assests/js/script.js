//website navigation

const nav = document.querySelector(".primary-navigation");
const navBtn = document.querySelector(".menu-toggle");

navBtn.addEventListener("click", () => {
    const open = nav.getAttribute("data-open");
    
    if(open === "false") {
        nav.setAttribute("data-open", true);
        navBtn.setAttribute("aria-expanded", true);
    } else {
        nav.setAttribute("data-open", false);
        navBtn.setAttribute("aria-expanded", false);
    }
});


//tabs navigation

const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabContent)
}); 

let tabFous = 0;

function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        (tabs[tabFous]).setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFous++;
            if (tabFous >= tabs.length) {
                tabFous = 0
            }
        } else  if (e.keyCode === keydownLeft) {
            tabFous--;
            if (tabFous < 0) {
                tabFous = tabs.length -1;
            }
        }
    
        tabs[tabFous].setAttribute("tabindex", 0);
        tabs[tabFous].focus();
    }
}

function changeTabContent(e) {
    const targetTab = e.target;
    const targetContent = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image")

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    tabContainer.querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    mainContainer
        .querySelectorAll('article')
        .forEach((article) => article.setAttribute("hidden", true));
    
    mainContainer.querySelector([`#${targetContent}`]).removeAttribute('hidden');

    mainContainer
        .querySelectorAll('picture')
        .forEach((picture) => picture.setAttribute("hidden", true));

    mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden");

}

//technology navigation

const numberList = document.querySelector('[role="numberlist"]');
const numbers = numberList.querySelectorAll('[role="number"]');

numberList.addEventListener("keydown", (e) => {
  console.log(e);
})


numberList.addEventListener("keydown", changeNumberFocus);

numbers.forEach((number) =>
  number.addEventListener("click", changeNumberPanel)
);

let numberFocus = 0;
function changeNumberFocus(e) {
  const keydownUp = 40;
  const keydownDown = 38;

  if (e.keyCode === keydownDown || e.keyCode === keydownUp) {
    numbers[numberFocus].setAttribute("numberindex", -1);
    if (e.keyCode === keydownUp) {
      numberFocus++;
      if (numberFocus >= numbers.length) {
        numberFocus = 0;
      }
    } else if (e.keyCode === keydownDown) {
      numberFocus--;
      if (numberFocus < 0) {
        numberFocus = numbers.length - 1;
      }
    }
  }

  numbers[numberFocus].setAttribute("numberindex", 0);
  numbers[numberFocus].focus();
}

function changeNumberPanel(e) {
  const targetNumber = e.target;
  const targetPanel = targetNumber.getAttribute("aria-controls");
  const targetImage = targetNumber.getAttribute("data-image");

  const numberContainer = targetNumber.parentNode;
  const mainContainer = numberContainer.parentNode;

  console.log("Target number:", targetNumber);
  console.log("Target Panel:", targetPanel);
  console.log("Target Image:", targetImage);

  numberContainer
    .querySelector("[aria-selected='true']")
    .setAttribute("aria-selected", false);

  targetNumber.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="numberpanel"]');
  showContent(mainContainer, `#${targetPanel}`);

  hideContent(mainContainer, "img");
  showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
  parent.querySelector(content).removeAttribute("hidden");
}


  
  

