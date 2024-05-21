document.addEventListener("DOMContentLoaded", function () {
  const saveButton = document.querySelectorAll(".sms-management__save-button");
  const modalFirst = document.querySelector(".modal.first");
  const modalSecond = document.querySelector(".modal.second");
  const modalSaveButton = document.getElementById("modalSaveButton");
  const modalCancelButton = document.getElementById("modalCancelButton");
  const modalConfirmButton = document.getElementById("modalConfirmButton");

  // 조회 버튼 클릭 시 모달 창 열기
  saveButton.forEach(function (button) {
    button.addEventListener("click", function () {
      modalFirst.style.display = "flex";
    });
  });

  // 저장 버튼 클릭 시 첫 번째 모달 닫고 두 번째 모달 열기
  modalSaveButton.addEventListener("click", function () {
    modalFirst.style.display = "none";
    modalSecond.style.display = "flex";
  });

  // 확인 버튼 클릭 시 두 번째 모달 창 닫기
  modalConfirmButton.addEventListener("click", function () {
    modalSecond.style.display = "none";
  });

  // 아니오 버튼 클릭 시 첫 번째 모달 창 닫기
  modalCancelButton.addEventListener("click", function () {
    modalFirst.style.display = "none";
  });
});
