document.addEventListener("DOMContentLoaded", function () {
  const categorySelect = document.getElementById("categorySelect");
  const searchInput = document.getElementById("searchInput");
  const searchBarInputIcon = document.querySelector(".search-bar__input-icon");
  const searchBarInputWarning = document.querySelector(
    ".search-bar__input-warning"
  );

  // search-bar__input-icon 클릭 시 검색 기능
  searchBarInputIcon.addEventListener("click", function () {
    if (categorySelect.value === "카테고리 명") {
      // 경고 메시지 색상 변경
      searchBarInputWarning.style.color = "#ff0000";

      // 1초 후 원래 색상으로 변경
      setTimeout(() => {
        searchBarInputWarning.style.color = "#1b3133";
      }, 1000);
    } else {
      // 검색 API 연동
    }
  });

  // 카테고리 미선택 시 경고 메시지 색상 변경
  searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && categorySelect.value === "카테고리 명") {
      // 경고 메시지 색상 변경
      searchBarInputWarning.style.color = "#ff0000";

      // 1초 후 원래 색상으로 변경
      setTimeout(() => {
        searchBarInputWarning.style.color = "#1b3133";
      }, 1000);
    } else {
      // 검색 API 연동
    }
  });
});
