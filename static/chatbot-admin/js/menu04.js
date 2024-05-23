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

  let deletedRows = []; // 삭제된 행을 저장하기 위한 배열

  // 테이블 편집 버튼 클릭 이벤트 추가
  let editMode = false;
  const editButton = document.querySelector(".company-management__button-edit");
  editButton.addEventListener("click", function () {
    const tableHeader = document.querySelector(".usage-history__table-header");
    const tableDataRows = document.querySelectorAll(
      ".usage-history__table-data"
    );

    if (editMode) {
      // 완료 버튼 클릭 시 원래 상태로 되돌리기
      location.reload(); // 페이지 새로고침으로 원래 상태 복구
      return;
    }

    // 테이블 헤더 변경
    tableHeader.innerHTML = `
      <tr class="usage-history__table-container">
        <th class="usage-history__table-item usage-history__table-item--no"></th>
        <th class="usage-history__table-item usage-history__table-item--no">No.</th>
        <th class="usage-history__table-item usage-history__table-item--company">업체명</th>
        <th class="usage-history__table-item usage-history__table-item--representative">대표자</th>
        <th class="usage-history__table-item usage-history__table-item--phone">연락처</th>
        <th class="usage-history__table-item usage-history__table-item--email">이메일</th>
        <th class="usage-history__table-item usage-history__table-item--account">계좌번호</th>
        <th class="usage-history__table-item usage-history__table-item--holder">예금주</th>
        <th class="usage-history__table-item usage-history__table-item--no"></th>
        <th class="usage-history__table-item usage-history__table-item--no"></th>
      </tr>
    `;

    // 테이블 데이터 변경
    tableDataRows.forEach((row) => {
      const cells = row.querySelectorAll(".usage-history__table-item");

      // 각 셀의 텍스트를 가져와서 새로운 구조에 맞게 배치
      const no = cells[0].innerText;
      const company = cells[1].innerText;
      const representative = cells[2].innerText;
      const phone = cells[3].innerText;
      const email = cells[4].innerText;
      const account = cells[5].innerText;
      const holder = cells[6].innerText;

      row.innerHTML = `
        <tr class="usage-history__table-container">
          <th class="usage-history__table-item usage-history__table-item--no">
            <img src="../../static/chatbot-admin/images/Fluid.svg" />
          </th>
          <td class="usage-history__table-item usage-history__table-item--no">${no}</td>
          <td class="usage-history__table-item usage-history__table-item--company">${company}</td>
          <td class="usage-history__table-item usage-history__table-item--representative">${representative}</td>
          <td class="usage-history__table-item usage-history__table-item--phone">${phone}</td>
          <td class="usage-history__table-item usage-history__table-item--email">${email}</td>
          <td class="usage-history__table-item usage-history__table-item--account">${account}</td>
          <td class="usage-history__table-item usage-history__table-item--holder">${holder}</td>
          <th class="usage-history__table-item usage-history__table-item--no edit-icon">
            <img src="../../static/chatbot-admin/images/Edit_fill.svg" />
          </th>
          <th class="usage-history__table-item usage-history__table-item--no delete-icon">
            <img src="../../static/chatbot-admin/images/Trash.svg" class="agency-delete"/>
          </th>
        </tr>
      `;
    });

    // 버튼을 "완료" 버튼으로 변경
    editButton.innerHTML = `
      <span class="company-management__button-edit-text">완료</span>
      <img src="../../static/chatbot-admin/images/white-pencil.svg" />
    `;
    editButton.classList.add("done");

    editMode = true;

    // Edit 아이콘 클릭 이벤트 추가
    const editIcons = document.querySelectorAll(".edit-icon img");
    const modal = document.querySelector(".modal-background.edit");
    const modalInputCompany = modal.querySelector(
      ".agency__info-input.company input"
    );
    const modalInputRepresentative = modal.querySelector(
      ".agency__info-input.representative input"
    );
    const modalInputPhone = modal.querySelector(
      ".agency__info-input.phone input"
    );
    const modalInputEmail = modal.querySelector(
      ".agency__info-input.email input"
    );
    const modalInputAccount = modal.querySelector(
      ".agency__info-input.account input:nth-child(2)"
    );
    const modalInputHolder = modal.querySelector(
      ".agency__info-input.holder input"
    );
    let currentRow; // 현재 선택된 row를 저장하기 위한 변수

    editIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        currentRow = this.closest("tr"); // 현재 클릭된 row 저장
        const cells = currentRow.querySelectorAll(".usage-history__table-item");

        // 모달 input 필드에 현재 row의 데이터 채우기
        modalInputCompany.value = cells[2].innerText;
        modalInputRepresentative.value = cells[3].innerText;
        modalInputPhone.value = cells[4].innerText;
        modalInputEmail.value = cells[5].innerText;
        modalInputAccount.value = cells[6].innerText;
        modalInputHolder.value = cells[7].innerText;

        // 모달을 표시
        modal.style.display = "flex";
      });
    });

    // "등록하기" 버튼 클릭 이벤트 추가 (모달 닫기 및 데이터 업데이트 기능 포함)
    const saveButtonEdit = modal.querySelector(
      ".agency__info-input-wrapper.fourth button"
    );
    saveButtonEdit.addEventListener("click", function () {
      // 현재 row의 데이터 업데이트
      const cells = currentRow.querySelectorAll(".usage-history__table-item");
      cells[2].innerText = modalInputCompany.value;
      cells[3].innerText = modalInputRepresentative.value;
      cells[4].innerText = modalInputPhone.value;
      cells[5].innerText = modalInputEmail.value;
      cells[6].innerText = modalInputAccount.value;
      cells[7].innerText = modalInputHolder.value;

      // 모달을 닫기
      modal.style.display = "none";
    });
  });

  // 추가 버튼 클릭 이벤트 추가
  const addButton = document.querySelector(".company-management__button-add");
  const modalAdd = document.querySelector(".modal-background.add");

  addButton.addEventListener("click", function () {
    // 모달을 표시
    modalAdd.style.display = "flex";
  });

  // 추가 모달에서 등록 버튼 클릭 시 테이블에 행 추가
  const saveButtonAdd = modalAdd.querySelector(
    ".agency__info-input-wrapper.fourth button"
  );
  saveButtonAdd.addEventListener("click", function () {
    const company = modalAdd.querySelector(
      ".agency__info-input.company input"
    ).value;
    const representative = modalAdd.querySelector(
      ".agency__info-input.representative input"
    ).value;
    const phone = modalAdd.querySelector(
      ".agency__info-input.phone input"
    ).value;
    const email = modalAdd.querySelector(
      ".agency__info-input.email input"
    ).value;
    const account = modalAdd.querySelector(
      ".agency__info-input.account input:nth-child(2)"
    ).value;
    const holder = modalAdd.querySelector(
      ".agency__info-input.holder input"
    ).value;

    const newRow = document.createElement("tr");
    newRow.classList.add("usage-history__table-container");
    newRow.innerHTML = `
      <tr class="usage-history__table-container">
        <th class="usage-history__table-item usage-history__table-item--no">
          <img src="../../static/chatbot-admin/images/Fluid.svg" />
        </th>
        <td class="usage-history__table-item usage-history__table-item--no"></td>
        <td class="usage-history__table-item usage-history__table-item--company">${company}</td>
        <td class="usage-history__table-item usage-history__table-item--representative">${representative}</td>
        <td class="usage-history__table-item usage-history__table-item--phone">${phone}</td>
        <td class="usage-history__table-item usage-history__table-item--email">${email}</td>
        <td class="usage-history__table-item usage-history__table-item--account">${account}</td>
        <td class="usage-history__table-item usage-history__table-item--holder">${holder}</td>
        <th class="usage-history__table-item usage-history__table-item--no edit-icon">
          <img src="../../static/chatbot-admin/images/Edit_fill.svg" />
        </th>
        <th class="usage-history__table-item usage-history__table-item--no delete-icon">
          <img src="../../static/chatbot-admin/images/Trash.svg" class="agency-delete"/>
        </th>
      </tr>
    `;

    document.querySelector(".usage-history__table tbody").appendChild(newRow);

    // 추가된 행의 Edit 아이콘 클릭 이벤트 추가
    newRow
      .querySelector(".edit-icon img")
      .addEventListener("click", function () {
        currentRow = this.closest("tr"); // 현재 클릭된 row 저장
        const cells = currentRow.querySelectorAll(".usage-history__table-item");

        // 모달 input 필드에 현재 row의 데이터 채우기
        modalInputCompany.value = cells[2].innerText;
        modalInputRepresentative.value = cells[3].innerText;
        modalInputPhone.value = cells[4].innerText;
        modalInputEmail.value = cells[5].innerText;
        modalInputAccount.value = cells[6].innerText;
        modalInputHolder.value = cells[7].innerText;

        // 모달을 표시
        modal.style.display = "flex";
      });

    // 추가된 행의 삭제 아이콘 클릭 이벤트 추가
    newRow
      .querySelector(".delete-icon img")
      .addEventListener("click", function () {
        const row = this.closest("tr");
        const companyName = row.querySelector(
          ".usage-history__table-item--company"
        ).innerText;
        modalFirst.querySelector(
          ".modal-text"
        ).innerText = `정말 ${companyName} 업체의 정보를 삭제하시겠습니까?`;
        modalSecond.querySelector(
          ".modal-text"
        ).innerText = `${companyName}의 정보 삭제가 완료되었습니다.`;
        modalBackground.style.display = "flex";
        modalFirst.style.display = "flex";
        currentRow = row; // 현재 선택된 row 저장
      });

    // 모달을 닫기
    modalAdd.style.display = "none";
  });

  // 저장 버튼 클릭 이벤트 추가 (모달 닫기 기능 포함)
  const saveButton = document.querySelectorAll(
    ".agency__info-input-wrapper.fourth button"
  );
  const modal = document.querySelectorAll(".modal-background");

  saveButton.forEach((button) => {
    button.addEventListener("click", function () {
      modal.forEach((modal) => {
        modal.style.display = "none";
      });
    });
  });

  const modalBackground = document.querySelector(".modal-background.delete");
  const modalFirst = document.querySelector(".modal.first");
  const modalSecond = document.querySelector(".modal.second");
  const modalSaveButton = document.getElementById("modalSaveButton");
  const modalCancelButton = document.getElementById("modalCancelButton");
  const modalConfirmButton = document.getElementById("modalConfirmButton");
  let currentRow; // 현재 선택된 row를 저장하기 위한 변수

  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("agency-delete")) {
      const row = event.target.closest("tr");
      const companyName = row.querySelector(
        ".usage-history__table-item--company"
      ).innerText;
      modalFirst.querySelector(
        ".modal-text"
      ).innerText = `정말 ${companyName} 업체의 정보를 삭제하시겠습니까?`;
      modalSecond.querySelector(
        ".modal-text"
      ).innerText = `${companyName}의 정보 삭제가 완료되었습니다.`;
      modalBackground.style.display = "flex";
      modalFirst.style.display = "flex";
      currentRow = row; // 현재 선택된 row 저장
    }
  });

  // 저장 버튼 클릭 시 첫 번째 모달 닫고 두 번째 모달 열기 및 row 삭제
  modalSaveButton.addEventListener("click", function () {
    modalFirst.style.display = "none";
    modalSecond.style.display = "flex";
    if (currentRow) {
      deletedRows.push(currentRow); // 삭제된 row 저장
      currentRow.remove(); // 현재 선택된 row 삭제
      currentRow = null; // 현재 선택된 row 초기화
    }
  });

  // 확인 버튼 클릭 시 두 번째 모달 창 닫기
  modalConfirmButton.addEventListener("click", function () {
    modalBackground.style.display = "none";
    modalSecond.style.display = "none";
  });

  // 아니오 버튼 클릭 시 첫 번째 모달 창 닫기
  modalCancelButton.addEventListener("click", function () {
    modalBackground.style.display = "none";
    modalFirst.style.display = "none";
  });

  // 모달 배경 클릭 시 모달 창 닫기
  modalBackground.addEventListener("click", function (event) {
    if (event.target === modalBackground) {
      modalBackground.style.display = "none";
      modalFirst.style.display = "none";
      modalSecond.style.display = "none";
    }
  });
});
