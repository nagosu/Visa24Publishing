// 메뉴_01 버튼을 눌렀을때
//     document.getElementById("menu_2").addEventListener("click", async(event) => {
    /* csrf 토큰 가져오기 */
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    async function menu_menu01() {

        console.log("menu01")
        if (1) {
            console.log("ok01")
        } else {
            /* 오류 발생 시 콘솔에 출력 */
            console.error("Error response");
        }

    };


//왼쪽 체크 라디오 버튼 가져오기
    let radio_image = document.getElementById('customRadio_left1');
    let radio_text = document.getElementById('customRadio_left2');
    let radio_opt = "image";

    radio_image.addEventListener('change', function() {
        if (this.checked) {
            // 여기에 최신순에 따른 처리 로직 추가
            radio_opt = "image"
            console.log('image 선택됨', radio_opt);
            //ui 가리고 나오게 하기
            document.getElementById('form_url').style.display = '';
            document.getElementById('form_image').style.display = '';
            document.getElementById('form_text').style.display = 'none';

        }
    });

    radio_text.addEventListener('change', function() {
        if (this.checked) {
            // 여기에 이름순에 따른 처리 로직 추가
            radio_opt = "text"
            console.log('text 선택됨', radio_opt);
            //ui 가리고 나오게 하기
            document.getElementById('form_url').style.display = 'none';
            document.getElementById('form_image').style.display = 'none';
            document.getElementById('form_text').style.display = '';
        }
    });




    // 파일 업로드 요소 선택
    var fileInput = document.querySelector(".custom-file-input");
    var file;

    // 파일 업로드 버튼 클릭 시 입력란 클릭 효과
    fileInput.addEventListener('change', function() {
        file = this.files[0];
    });




    // 입력란 요소 선택
    const imgNameInput = document.querySelectorAll(".form-control")[0];
    const imgGroupInput = document.querySelectorAll(".form-control")[1];
    const imgURLInput = document.querySelectorAll(".form-control")[2];
    const textInput = document.querySelectorAll(".form-control")[3];

    // 완료 버튼 요소 선택
    const confirmButton = document.querySelector(".btn-navy");

    confirmButton.addEventListener('click', async function() {
        var formData = new FormData();
        formData.append('img_file_upload', file);

        console.log(radio_opt);
        console.log(imgNameInput.value);
        console.log(imgGroupInput.value);
        console.log(imgURLInput.value);
        console.log(textInput.value);


        formData.append('radio_opt', radio_opt);
        formData.append('imgName', imgNameInput.value);
        formData.append('imgGroup', imgGroupInput.value);
        formData.append('imgURL', imgURLInput.value);
        formData.append('textInput', textInput.value);


        const response = await fetch('/chatbot_v1/admin/upload_media_data_img/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData,
        });

        if (response.ok) {
            alert("업로드가 완료되었습니다.");
            imgURLInput.value = '';
            imgGroupInput.value = '';
            imgNameInput.value = '';
            textInput.value = '';
        } else {
            alert("업로드가 실패하였습니다.");
        }
    });


//체크 라디오 버튼 가져오기
    let orderNew = document.getElementById('customRadio1');
    let orderName = document.getElementById('customRadio2');
    let order_opt = "new";
    orderNew.addEventListener('change', function() {
        if (this.checked) {
            // 여기에 최신순에 따른 처리 로직 추가
            order_opt = "new"
            console.log('최신순 선택됨', order_opt);
            //클릭시 다시 호출하기
            data_list("1");
        }
    });

    orderName.addEventListener('change', function() {
        if (this.checked) {
            // 여기에 이름순에 따른 처리 로직 추가
            order_opt = "name"
            console.log('이름순 선택됨', order_opt);
            //클릭시 다시 호출하기
            data_list("1");
        }
    });

    //검색 관련 변수 선언
    let searchButton = document.querySelector('.tbl-opt-right .search-inp .btn');
    let selectElement = document.querySelector('.tbl-opt-right .custom-select');
    let inputElement = document.querySelector('.tbl-opt-right .search-inp input');
    let search_opt; // 전역 변수 선언
    let search_text; // 전역 변수 선언

    //검색 버튼 클릭시
    searchButton.addEventListener('click', function() {
        search_opt = selectElement.value;
        search_text = inputElement.value;

        console.log('선택된 옵션:', search_opt);
        console.log('입력된 텍스트:', search_text);
        data_list("1");

        // 페이지 요소의 값 초기화
        // selectElement.value = "이름"; // select 요소를 '이름'으로 설정
        // inputElement.value = ""; // input 필드 비우기
    });

    //검색 버튼 누를 시
    //리스트 가져오기 펑션
    async function data_list(page_number){
        console.log("function start :", page_number)

        // 요청 보내기
        const response = await fetch("/chatbot_v1/admin/data_list_image/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken
            },
            body: new URLSearchParams({
                'page_number': page_number,
                'order_opt' : order_opt,
                'search_opt' : search_opt,
                'search_text' : search_text

            })
        });

        if (response.ok) {
            const data = await response.json();
            console.log("response OK")
            updateTable(data.list); // 테이블 업데이트 함수 호출


        }else{
            console.error("Error response");
        }

    }

    // updateTable 함수 실행(조건 넣어 검색)
    function updateTable(data) {
        const tbody = document.querySelector('.table tbody');
        tbody.innerHTML = ''; // 기존 내용을 비웁니다.

        data.forEach(row => {
            // 날짜-시간 포맷 변경
            const dateTime = new Date(row.img_datetime);
            const formattedDateTime = dateTime.toISOString().replace('T', ' ').substring(0, 19);

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <th scope="row">${row.id}</th>
                <td>${formattedDateTime}</td> 
                <td>${row.img_name}</td>
                <td>${row.img_group}</td>
                <td>${row.img_url}</td>
                <td class="ta-center">
                    <img src="/media/${row.img_file_upload}" alt="이미지 샘플" class="sample-img" style="max-width: 50px;">
                </td>
                <td class="text-cell" data-toggle="modal" data-target="#text-modal" data-text="${row.text_input}">${row.text_input}</td>
                <td>
                    <button type="button" class="btn btn-outline-danger" data-id="${row.id}" data-toggle="modal" data-target="#confirmation-modal">삭제</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // 모든 text-cell에 클릭 이벤트 리스너를 추가합니다.
        document.querySelectorAll('.text-cell').forEach(cell => {
            cell.addEventListener('click', function() {
                const modalText = document.querySelector('#text-modal .modal-body');
                modalText.textContent = this.getAttribute('data-text');
            });
        });

    }


    //삭제 버튼 클리기
    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById("confirmation-modal"); // 모달 요소 참조


        // tbody에 이벤트 리스너를 추가합니다.
        document.querySelector('.table tbody').addEventListener('click', function(event) {
            // 클릭된 요소가 삭제 버튼인지 확인합니다.
            if (event.target.classList.contains('btn-outline-danger')) {
                const id = event.target.getAttribute('data-id');
                console.log('삭제 버튼 클릭됨, ID:', id);
                modal.setAttribute('data-id', id); // 모달에 ID 저장
                //모달 표시는 다른곳에서 진행
            }
        });

        // 모달의 "네" 버튼에 이벤트 리스너 추가
        modal.querySelector('.btn-primary').addEventListener('click', async function() {
            const id = modal.getAttribute('data-id');
            console.log('삭제 처리, ID:', id);

            // 여기에 실제 삭제 처리 로직
            // 요청 보내기
            const response = await fetch("/chatbot_v1/admin/data_list_image_delete/", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': csrfToken
                },
                body: new URLSearchParams({
                    'img_number': id,
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("response OK")
                console.log("삭제 완료, 응답:", data);
                // 페이지 새로고침
                window.location.reload();
            }else{
                console.error("Error response");
            }

        });
    });



    //클릭된 페이지 번호의 로드 펑션 실행
    document.addEventListener('DOMContentLoaded', function() {
        // 페이지네이션 이벤트 리스너 설정
        document.querySelector('.pagination').addEventListener('click', function(event) {
            if (event.target.tagName === 'A') {
                event.preventDefault();
                //prev, next 클릭시 동작
                if (event.target.classList.contains('prev') || event.target.classList.contains('next')) {
                    handleArrowClick(event.target);
                // 숫자 클릭시 동작
                } else {
                    updateActiveLink(event.target);
                    data_list(event.target.textContent);
                }
            }
        });

        // 첫 번째 페이지 링크 자동 클릭 처리
        const firstPageLink = document.querySelector('.pagination .btn-group a:not(.prev):not(.next)');
        if (firstPageLink) {
            updateActiveLink(firstPageLink);
            data_list(firstPageLink.textContent);
        }
    });

    //번호 페이지 클릭하면 나머지 active제거, 해당 active 부여
    function updateActiveLink(clickedLink) {
        // 'prev' 또는 'next' 클래스가 있는 경우 함수를 종료합니다.
        if (clickedLink.classList.contains('prev') || clickedLink.classList.contains('next')) {
            return;
        }
        // 모든 <a> 요소에서 'active' 클래스 제거
        document.querySelectorAll('.pagination a').forEach(a => {
            a.classList.remove('active');
        });

        // 클릭된 <a> 요소에 'active' 클래스 추가
        clickedLink.classList.add('active');
    }

    //prev, next 클릭 시 숫자 늘리고 줄이기
    function handleArrowClick(clickedArrow) {
        const pageLinks = Array.from(document.querySelectorAll('.pagination .btn-group a:not(.prev):not(.next)'));
        const activeLinkIndex = pageLinks.findIndex(a => a.classList.contains('active'));
        let newIndex = activeLinkIndex;

        if (clickedArrow.classList.contains('next')) {
            newIndex = Math.min(pageLinks.length - 1, activeLinkIndex + 5);
            updatePageNumbers(5);
        } else if (clickedArrow.classList.contains('prev')) {
            newIndex = Math.max(0, activeLinkIndex - 5);
            updatePageNumbers(-5);
        }

        // 화살표 제외 첫 번째 페이지 자동 클릭 처리
        if (newIndex !== -1 && pageLinks[newIndex]) {
            updateActiveLink(pageLinks[newIndex]);
            data_list(pageLinks[newIndex].textContent);
        }
    }

    function updatePageNumbers(offset) {
        const pageLinks = document.querySelectorAll('.pagination .btn-group a:not(.prev):not(.next)');
        let canUpdate = true; // 페이지 번호를 업데이트할 수 있는지 확인하는 플래그

        // 첫 번째 페이지 번호가 1이고 offset이 음수인 경우 업데이트를 중단합니다.
        if (offset < 0 && parseInt(pageLinks[0].textContent, 10) === 1) {
            canUpdate = false;
        }

        if (canUpdate) {
            pageLinks.forEach(link => {
                const currentPageNumber = parseInt(link.textContent, 10);
                const newPageNumber = Math.max(1, currentPageNumber + offset);
                link.textContent = newPageNumber.toString();
            });
        }
    }


