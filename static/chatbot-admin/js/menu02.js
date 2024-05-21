document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(
    ".content-modify__sidebar-search-button"
  );
  const modalAll = document.querySelectorAll(".modal-background");
  const modalFind = document.querySelector(".modal-background.find");

  // 조회 버튼 클릭 시 모달 창 열기
  searchButton.addEventListener("click", function () {
    modalFind.style.display = "flex";
  });

  // 확인 버튼 클릭 시 모달 창 닫기
  const modalConfirmButton = document.getElementById("modalConfirmButton");

  modalConfirmButton.addEventListener("click", function () {
    modalFind.style.display = "none";
  });

  // 저장 버튼 클릭 시 모달 창 열기
  const saveButton = document.querySelector(".content-modify__save-button");
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

  // 삭제 버튼 클릭 시 모달 창 열기
  const deleteButtons = document.querySelectorAll(
    ".usage-history__table-item--delete button"
  );

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modalDelete = document.querySelector(".modal-background.delete");
      modalDelete.style.display = "flex";
    });
  });

  // 취소/확인 버튼 클릭 시 모달 창 닫기
  const modalDeleteCancelButton = document.querySelector(".delete-cancel");
  const modalDeleteSaveButton = document.querySelector(".delete-save");
  const modalDelete = document.querySelector(".modal-background.delete");

  modalDeleteCancelButton.addEventListener("click", function () {
    modalDelete.style.display = "none";
  });

  modalDeleteSaveButton.addEventListener("click", function () {
    modalDelete.style.display = "none";
  });
});
