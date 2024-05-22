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

  // 저장 버튼 클릭 시 모달 창 열기
  const saveButton = document.querySelector(".agency__info-save-button");
  const modalSave = document.querySelector(".modal-background.save");
  saveButton.addEventListener("click", function () {
    modalSave.style.display = "flex";
  });

  // 취소/확인 버튼 클릭 시 모달 창 닫기
  const modalCancelButton = document.getElementById("modalCancelButton");
  const modalSaveButton = document.getElementById("modalSaveButton");
  modalCancelButton.addEventListener("click", function () {
    modalSave.style.display = "none";
  });
  modalSaveButton.addEventListener("click", function () {
    modalSave.style.display = "none";
  });
});
