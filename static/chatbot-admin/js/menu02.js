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

  // 체크박스 전체 선택/해제 기능 추가
  function addCheckboxToggleListener(tableClass) {
    const table = document.querySelector(`.${tableClass}`);
    const theadCheckbox = table.querySelector("thead input[type='checkbox']");
    const tbodyCheckboxes = table.querySelectorAll(
      "tbody input[type='checkbox']"
    );
    const selectContent = table.nextElementSibling;
    const selectContentText = selectContent.querySelector(
      ".select-content-text"
    );

    theadCheckbox.addEventListener("change", function () {
      const isChecked = theadCheckbox.checked;
      tbodyCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
      updateSelectContent();
    });

    tbodyCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", function () {
        const allChecked = Array.from(tbodyCheckboxes).every(
          (checkbox) => checkbox.checked
        );
        theadCheckbox.checked = allChecked;
        updateSelectContent();
      });
    });

    function updateSelectContent() {
      const checkedCount = Array.from(tbodyCheckboxes).filter(
        (checkbox) => checkbox.checked
      ).length;
      if (checkedCount > 0) {
        selectContentText.textContent = `총 ${checkedCount}개의 항목이 선택되었습니다.`;
        selectContent.style.display = "flex";
      } else {
        selectContent.style.display = "none";
      }
    }

    // 해제 버튼 클릭 시
    selectContent
      .querySelector(".deselect-button")
      .addEventListener("click", function () {
        tbodyCheckboxes.forEach((checkbox) => {
          checkbox.checked = false;
        });
        theadCheckbox.checked = false;
        updateSelectContent();
      });

    // 삭제 버튼 클릭 시 (삭제 모달 창 열기)
    selectContent
      .querySelector(".delete-button")
      .addEventListener("click", function () {
        const modalDelete = document.querySelector(".modal-background.delete");
        modalDelete.style.display = "flex";
      });

    // 다운로드 버튼 클릭 시 (기능 추가 해야함)
    selectContent
      .querySelector(".download-button")
      .addEventListener("click", function () {
        console.log("다운로드 버튼 클릭됨");
      });
  }

  addCheckboxToggleListener("usage-history__table.form");
  addCheckboxToggleListener("usage-history__table.attach");
});
