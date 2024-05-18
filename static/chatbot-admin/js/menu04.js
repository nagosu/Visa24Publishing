document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(
    ".company-management__button-select"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // 모든 버튼의 active 클래스를 제거
      buttons.forEach((btn) => btn.classList.remove("active"));
      // 클릭된 버튼에 active 클래스 추가
      this.classList.add("active");
    });
  });
});
