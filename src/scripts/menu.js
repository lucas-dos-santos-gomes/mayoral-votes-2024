const header = document.querySelector('.header');
const main = document.querySelector('.main');

const menuLabel = document.querySelector("#x-menu");
const menuContainer = document.querySelector(".hamburguer-nav");
const menuListItems = menuContainer.querySelectorAll(".hamburguer-nav_list_item a");

function checkMenu() {
  if(menuLabel.checked) {
    header.style.position = 'absolute';
    main.style.marginTop = '80px';
    menuContainer.style.transform = "translateY(0)";
  } else {
    menuContainer.style.transform = "translateY(-100dvh)";
    main.style.marginTop = '0';
    header.style.position = 'static';
  }
}

menuLabel.onclick = checkMenu;

menuListItems.forEach(links => {
  links.onclick = () => {
    menuLabel.checked = false;
    checkMenu();
  }
});