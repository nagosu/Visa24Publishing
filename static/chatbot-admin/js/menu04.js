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

  // 테이블 편집 버튼 클릭 이벤트 추가
  const editButton = document.querySelector(".company-management__button-edit");
  editButton.addEventListener("click", function () {
    const tableHeader = document.querySelector(".usage-history__table-header");
    const tableDataRows = document.querySelectorAll(
      ".usage-history__table-data"
    );

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
    editButton.outerHTML = `
      <button class="company-management__button-edit done">
        <span class="company-management__button-edit-text">완료</span>
        <img src="../../static/chatbot-admin/images/white-pencil.svg" />
      </button>
    `;

    // Edit 아이콘 클릭 이벤트 추가
    const editIcons = document.querySelectorAll(".edit-icon img");
    const modal = document.querySelector(".modal-background");

    editIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        // 모달을 표시
        modal.style.display = "flex";
      });
    });
  });

  // 추가 버튼 클릭 이벤트 추가
  const addButton = document.querySelector(".company-management__button-add");
  const modalAdd = document.querySelector(".modal-background.add");

  addButton.addEventListener("click", function () {
    // 모달을 표시
    modalAdd.style.display = "flex";
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

  // 이벤트 위임을 사용하여 agencyDelete 클래스의 클릭 이벤트 처리
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("agency-delete")) {
      modalBackground.style.display = "flex";
      modalFirst.style.display = "flex";
    }
  });

  // 저장 버튼 클릭 시 첫 번째 모달 닫고 두 번째 모달 열기
  modalSaveButton.addEventListener("click", function () {
    modalFirst.style.display = "none";
    modalSecond.style.display = "flex";
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
