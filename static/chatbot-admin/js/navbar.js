document.addEventListener("DOMContentLoaded", function () {
  const navbarMenuItems = document.querySelectorAll(".navbar__menu-item");

  // navbar__menu-item--active 시 텍스트 볼드 처리
  navbarMenuItems.forEach((button) => {
    button.addEventListener("click", function () {
      navbarMenuItems.forEach((btn) =>
        btn.classList.remove("navbar__menu-item--active")
      );
      this.classList.add("navbar__menu-item--active");
    });
  });
});
