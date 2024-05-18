document.addEventListener("DOMContentLoaded", function () {
  const paginationButtons = document.querySelectorAll(".pagination__button");

  paginationButtons.forEach((button) => {
    button.addEventListener("click", function () {
      paginationButtons.forEach((btn) =>
        btn.classList.remove("pagination__button--active")
      );
      this.classList.add("pagination__button--active");
    });
  });
});
