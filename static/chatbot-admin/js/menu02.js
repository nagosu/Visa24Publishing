document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(
    ".content-modify__sidebar-search-button"
  );

  // 조회 버튼 클릭 시 모달 창 열기
  const modalFind = document.querySelector(".modal-background.find");
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
  const deleteIcon = document.querySelectorAll(
    ".usage-history__table-item--delete img"
  );
  deleteIcon.forEach((button) => {
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

  // 업무 비용 수정
  function addPencilClickListener(className) {
    const pencilIcon = document.querySelector(`.${className}`);
    pencilIcon.addEventListener("click", function () {
      const span = pencilIcon.previousElementSibling;
      const value = span.innerText;
      const input = document.createElement("input");
      input.type = "text";
      input.className = "content-modify__charge-text money";
      input.value = value;

      span.replaceWith(input);

      input.focus();
      input.setSelectionRange(value.length, value.length);

      // Enter key 이벤트로 다시 span으로 변경
      input.addEventListener("blur", function () {
        const newSpan = document.createElement("span");
        newSpan.className = "content-modify__charge-text money";
        newSpan.innerText = input.value;
        input.replaceWith(newSpan);
      });

      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          input.blur();
        }
      });
    });
  }

  addPencilClickListener("pencil-docs");
  addPencilClickListener("pencil-agency");
});
