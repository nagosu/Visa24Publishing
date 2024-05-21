document.addEventListener("DOMContentLoaded", function () {
  const toggleList = document.querySelectorAll(".agency__toggle-switch");

  // 토글 ON/OFF 텍스트 색상 변경
  toggleList.forEach(($toggle) => {
    $toggle.addEventListener("click", () => {
      $toggle.classList.toggle("active");

      const isActive = $toggle.classList.contains("active");
      const statusOff = $toggle.parentElement.querySelector(
        ".agency__toggle-visa"
      );
      const statusOn = $toggle.parentElement.querySelector(
        ".agency__toggle-company"
      );

      if (isActive) {
        statusOff.style.color = "#a1a1a1";
        statusOn.style.color = "#1b3133";
      } else {
        statusOff.style.color = "#1b3133";
        statusOn.style.color = "#a1a1a1";
      }
    });
  });
});
