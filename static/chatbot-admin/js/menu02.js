document.addEventListener("DOMContentLoaded", function () {
  const searchButton = document.querySelector(
    ".content-modify__sidebar-search-button"
  );
  const modal = document.querySelector(".modal");

  // 조회 버튼 클릭 시 모달 창 열기
  searchButton.addEventListener("click", function () {
    modal.style.display = "flex";
  });

  // 확인 버튼 클릭 시 모달 창 닫기
  modalConfirmButton.addEventListener("click", function () {
    modal.style.display = "none";
  });
});
