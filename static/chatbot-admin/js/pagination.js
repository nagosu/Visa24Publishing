document.addEventListener("DOMContentLoaded", function () {
  const paginationButtons = document.querySelectorAll(".pagination__button");

  // pagination__button--active 시 background 색상 변경
  paginationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      paginationButtons.forEach((btn) =>
        btn.classList.remove("pagination__button--active")
      );
      this.classList.add("pagination__button--active");
    });
  });
});
