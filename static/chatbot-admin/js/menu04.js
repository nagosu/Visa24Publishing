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
            <img src="../../static/chatbot-admin/images/Trash.svg" />
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
});
