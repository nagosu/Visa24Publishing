document.addEventListener("DOMContentLoaded", function () {
  const toggleList = document.querySelectorAll(
    ".language-setting__toggle-switch"
  );

  // 토글 ON/OFF 텍스트 색상 변경
  toggleList.forEach(($toggle) => {
    $toggle.addEventListener("click", () => {
      $toggle.classList.toggle("active");

      const isActive = $toggle.classList.contains("active");
      const statusOff = $toggle.parentElement.querySelector(
        ".language-setting__toggle-status-off"
      );
      const statusOn = $toggle.parentElement.querySelector(
        ".language-setting__toggle-status-on"
      );

      if (isActive) {
        statusOff.style.color = "#d4d4d4";
        statusOn.style.color = "#1b3133";
      } else {
        statusOff.style.color = "#1b3133";
        statusOn.style.color = "#d4d4d4";
      }
    });
  });
});
