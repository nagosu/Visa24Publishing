
// {#    {% comment %}로그인 - 변수{% endcomment %}#}
// {#    const login_pannel = document.querySelector('.login_pannel'); // 로그인 패널#}
// {#    const errorMsg = document.querySelector(".errorMsg"); // 에러메시지#}
// {#    const login_button= document.querySelector(".login_button"); //로그인버튼#}
// {#    const id_input = document.querySelector(".id"); // ID 값#}
// {#    const pw_input = document.querySelector(".pw"); // PW 값#}
// {##}
// {#    //로그인 버튼을 눌렀을 경우#}
// {#    login_button.addEventListener('click', ()=> {#}
// {#        loginCheck(); // 로그인 함수 호출#}
// {#    });#}
// {##}
// {#    //PW를 입력하고 엔터를 눌렀을 경우#}
// {#    pw_input.addEventListener('keydown', function (event) {#}
// {##}
// {#        //엔터를 눌렀을 경우#}
// {#        if(event.key == 'Enter') {#}
// {#            console.log('Enter를 눌렀습니다!');#}
// {#            loginCheck();#}
// {#        }#}
// {#    });#}
// {##}
// {#    //로그인 확인 Fuction#}
// {#    function loginCheck() {#}
// {##}
// {#        //임시(테스트용)#}
// {#        const id = 'mintpotapp@gmail.com';#}
// {#        const pw = 'doubleB07$$';#}
// {##}
// {#        //서버에서 true(아이디/비밀번호 일치), false(불일치) 값을 받기#}
// {#        var loginConfirm = 'false';#}
// {##}
// {#        //ID값과 PW를 서버에 보내기#}
// {##}
// {#        // 임시(테스트용)#}
// {#        if(id == id_input.value && pw == pw_input.value) {#}
// {#            loginConfirm = 'true';#}
// {#        }#}
// {##}
// {#        //정보가 맞지 않을 경우#}
// {#        if(loginConfirm == 'false') {#}
// {#            console.log('로그인 실패!');#}
// {#            errorMsg.style.display = 'block';#}
// {#        }#}
// {#        //정보가 맞을 경우#}
// {#        else if (loginConfirm == 'true') {#}
// {#            console.log('로그인 성공!');#}
// {#            login_pannel.style.display = 'none';#}
// {#        }#}
// {#    }#}

// 메뉴 선택시
    //카테고리 데이터를 서버에서 가져오기 위한 전역변수 선언
    var categoryListFromServer
    var categoryName;  // 전역 스코프에서 선언


// {#메뉴_1 버튼을 눌렀을때#}
    async function menu_index() {

        console.log("menu_1_clicked")

        // 카테고리 리스트 구조 가져오기
        const categoryList_list_container = document.querySelector('.list-item-grp');
        // div 삽입을 위한 변수선언
        const category_line_container = document.createElement('div');
        category_line_container.classList.add('list-item'); // 클래스 이름을 추가하여 상위 컨테이너와 일치시킴

        // 카테고리 한 라인 표시를 위한 카테고리명 표시박스, 수정버튼, 삭제버튼 등을 위 div 내용에 추가
        category_line_container.innerHTML = `
            <div class="list-item-top">
              <span class="num category_order"></span>
              <input type="text" class="form-control category_name" disabled>
              <button type="button" class="btn btn-navy category_edit">수정</button>
              <button type="button" class="btn btn-outline-danger" data-toggle="modal" data-target="#confirmation-modal">삭제</button>
            </div>
            <div class="list-item-bottom">
              <input type="text" class="form-control category_url" disabled>
            </div>`;


        //2. 복제할 카테고리 컨테이너 List 배열을 만든다
        let category_line_container_list = [];

//카테고리 불러오기
        /* csrf 토큰 가져오기 */
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        /* 응답 요청 await 함수는 async 내에서만 사용 가능*/
        const response = await fetch("/chatbot_v1/admin/category_list/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken
            },
            body: new URLSearchParams({
            })
        });

        if (response.ok) {
            console.log("/chatbot_v1/admin/category_list/")
            /* 데이터 가져오기 */
            const data = await response.json();

            //카테고리리스트_리스트_컨테이너 초기화
            categoryList_list_container.innerHTML = '';

            //1. 서버로 부터 카테고리 정보를 받는다. (서버연동 필요)
            categoryListFromServer = data.category_names

            //3.카테고리 구조를 서버에서 가져온 카테고리 개수에 맞게 복제한다
            for(var i=0; i<categoryListFromServer.length; i++) {
                // 미리 세팅한 것에서 카테고리 복제clone한다
                category_line_container_list[i] = category_line_container.cloneNode(true);
            }

            //4.복제한 카테고리 컨테이너 배열의 value를 서버에서 받아온 정보에 맞게 매칭 시키고 생성한다.
            for(var i=0; i<category_line_container_list.length; i++) {
                // categoryNameValue 변수를 초기화
                const categoryNameValue = categoryListFromServer[i]; // 이 부분을 추가
                //숫자, 자동으로 가져온 순서대로 숫자 만든다
                category_line_container_list[i].querySelector('.category_order').innerHTML = i+1;
                //카테고리명, 서버에서 가져온 리스트로 value 만든다
                category_line_container_list[i].querySelector('.category_name').value = categoryListFromServer[i];
                // 삭제 버튼에 data-category-name 속성 추가
                const deleteButton = category_line_container_list[i].querySelector('.btn-outline-danger');
                deleteButton.setAttribute('data-category-name', categoryNameValue);
                //카테고리 URL 값을 넣는다
                //getData 값을 넣는다
                category_line_container_list[i].querySelector('.category_url').value = "http://3.34.108.56/chatbot_v1/";
                //복제한 리스트를 생성하여 categoryList_list_container에 넣기
                categoryList_list_container.appendChild(category_line_container_list[i]);
            }

//카테고리 추가 버튼 클릭시
            //카테고리 추가 버튼 눌렀을때
            document.addEventListener('click', async function(event) {
              // 이벤트가 발생한 요소의 CLASS가 'category_add'인지 확인합니다.
              if (event.target.classList.contains('category_add')) {
                console.log('category_add 버튼이 클릭되었습니다.');

                // 카테고리 리스트의 개수가 9 이상인지 검사합니다.
                if (category_line_container_list.length >= 9) {
                    alert("카테고리 개수가 9개를 초과할 수 없습니다.")
                    return; // 추가 처리를 중단합니다.
                }

                // 카테고리 컨테이너(category_line_container_list) 리스트 배열에 카테고리를 하나 추가한다.
                category_line_container_list.push(category_line_container.cloneNode(true)); // 배열에 새로운 카테고리 추가하기
                categoryList_list_container.appendChild(category_line_container_list[category_line_container_list.length-1]); // 마지막에 추가된 배열을 표시하기
                // 생성된 카테고리에 정보 넣기
                category_line_container_list[category_line_container_list.length-1].querySelector('.category_order').innerHTML = category_line_container_list.length; // 순서 숫자 입력
                category_line_container_list[category_line_container_list.length-1].querySelector('.category_name').value = "'수정' 버튼 클릭하여 '전송' 필수"; // 이름 넣기

              }
            });

//카테고리에서 수정 버튼 클릭시
            //카테고리 수정 버튼 눌렀을때
            // document에 클릭 이벤트 리스너를 추가하여
            // 동적으로 생성되는 요소에 대해서도 이벤트를 처리할 수 있습니다.

            document.addEventListener('click', async function(event) {
              // 이벤트가 발생한 요소의 ID가 'category_edit'인지 확인합니다.
              // if (event.target.id === 'category_edit') {
              if (event.target.classList.contains('category_edit')) {

                console.log('category_edit 버튼이 클릭되었습니다.');

                // 클릭된 버튼이 속한 '.list-item-top' 요소를 찾습니다.
                const listItemTop = event.target.closest('.list-item-top');
                if (listItemTop) {
                    // '.list-item-top' 요소 내의 '.category_name' 인풋 요소의 값을 가져옵니다.
                    const categoryNameInput = listItemTop.querySelector('.category_name');
                    if (categoryNameInput) {
                        categoryName = categoryNameInput.value;
                        console.log('Category Name:', categoryName); // 이제 categoryName 변수를 사용할 수 있습니다.
                    }
                }

                /* 응답 요청 await 함수는 async 내에서만 사용 가능*/
                const response = await fetch("/chatbot_v1/admin/category_data/", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRFToken': csrfToken
                    },
                    body: new URLSearchParams({
                        'categoryName' : categoryName,
                    })
                });
                if (response.ok) {
                    /* 데이터 가져오기 */
                    const data = await response.json();

                    document.getElementById('categoryName_input').value = data.category_name;
                    // 데이터에 따라 체크 상태를 업데이트합니다.
                    if(data.category_GPT == "gpt-3.5-turbo"){
                        document.getElementById('customRadio3').click();
                    } else if(data.category_GPT == "gpt-4-turbo-preview"){
                        document.getElementById('customRadio4').click();
                    }
                    if(data.category_sound == "on"){
                        document.getElementById('customRadio5').click();
                    } else if(data.category_sound == "off"){
                        document.getElementById('customRadio6').click();
                    }
                    if(data.category_data_only == "only"){
                        document.getElementById('customRadio7').click();
                    } else if(data.category_data_only == "only_file"){
                        document.getElementById('customRadio8').click();
                    }
                    document.getElementById('categoryDataOrder_input').value = data.category_data_order;
                    console.log("data.category_data_order;", data.category_data_order)
                    document.getElementById('categoryDataText_input').value = data.category_data_text;
                    document.getElementById('categoryNodataMsg_input').value = data.category_msg_nodata;

                    document.getElementById('categoryHiMsg_input1').value = data.msg_ai_1;
                    document.getElementById('categoryPrompt_input1').value = data.msg_prompt_1;
                    document.getElementById('categoryHiMsg_input2').value = data.msg_ai_2;
                    document.getElementById('categoryPrompt_input2').value = data.msg_prompt_2;
                    document.getElementById('categoryHiMsg_input3').value = data.msg_ai_3;
                    document.getElementById('categoryPrompt_input3').value = data.msg_prompt_3;
                    document.getElementById('categoryHiMsg_input4').value = data.msg_ai_4;
                    document.getElementById('categoryPrompt_input4').value = data.msg_prompt_4;
                    document.getElementById('categoryHiMsg_input5').value = data.msg_ai_5;
                    document.getElementById('categoryPrompt_input5').value = data.msg_prompt_5;
                    document.getElementById('categoryHiMsg_input6').value = data.msg_ai_6;
                    document.getElementById('categoryPrompt_input6').value = data.msg_prompt_6;
                    document.getElementById('categoryHiMsg_input7').value = data.msg_ai_7;
                    document.getElementById('categoryPrompt_input7').value = data.msg_prompt_7;
                    document.getElementById('categoryHiMsg_input8').value = data.msg_ai_8;
                    document.getElementById('categoryPrompt_input8').value = data.msg_prompt_8;
                    document.getElementById('categoryHiMsg_input9').value = data.msg_ai_9;
                    document.getElementById('categoryPrompt_input9').value = data.msg_prompt_9;
                    document.getElementById('categoryHiMsg_input10').value = data.msg_ai_10;
                    document.getElementById('categoryPrompt_input10').value = data.msg_prompt_10;


                } else {
                /* 오류 발생 시 콘솔에 출력 */
                console.error("Error response");
                }

              }
            });

//카테고리 삭제 버튼 눌렀을때
            //카테고리 삭제 버튼
            // document에 클릭 이벤트 리스너를 추가하여
            // 동적으로 생성되는 요소에 대해서도 이벤트를 처리할 수 있습니다.

            document.addEventListener('click', async function(event) {
                if (event.target.classList.contains('btn-outline-danger')) { // '삭제' 버튼 클릭 시
                    const categoryName = event.target.getAttribute('data-category-name');
                    console.log('삭제 버튼 클릭: ' + categoryName);
                    // 여기서 categoryName 값을 사용하여 삭제 관련 작업 수행
                    document.getElementById('btn_confirm_category_delete').addEventListener('click', async function() {
                        console.log('확인 버튼 클릭, 삭제할 카테고리: ' + categoryName);

                        /* 응답 요청 await 함수는 async 내에서만 사용 가능*/
                        const response = await fetch("/chatbot_v1/admin/category_delete/", {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                                'X-CSRFToken': csrfToken
                            },
                            body: new URLSearchParams({
                                'categoryName' : categoryName,
                            })
                        });

                        if (response.ok) {
                            /* 데이터 가져오기 */
                            const data = await response.json();
                            console.log('삭제요청된 카테고리: ' + categoryName);
                            const categoryNameDeleted = data.category_name_deleted;
                            console.log('삭제된 카테고리: ' + categoryNameDeleted);
                            //페이지 새로고침
                            location.reload();

                        } else {
                        /* 오류 발생 시 콘솔에 출력 */
                        console.error("Error response");
                        }

                    });
                }
            });

        } else {
            /* 오류 발생 시 콘솔에 출력 */
            console.error("Error response");
        }

    };


//특정 라디오 버튼 클릭시 이벤트
    var form_data_order = document.getElementById('form_data_order');
    var form_data_text = document.getElementById('form_data_text');
    var form_data_file = document.getElementById('form_data_file');
    var form_nodata = document.getElementById('form_nodata');

    document.getElementById('customRadio7').addEventListener('click', function () {
        form_data_text.style.display = 'block'//오직 내 데이터에만 의존하면 찾기 실패 메시지 보이기
        form_data_file.style.display = 'none'
        // form_nodata.style.display = 'block'//오직 내 데이터에만 의존하면 찾기 실패 메시지 보이기
    });
    document.getElementById('customRadio8').addEventListener('click', function () {
        form_data_text.style.display = 'none'//오직 내 데이터에만 의존하면 찾기 실패 메시지 보이기
        form_data_file.style.display = 'block'
        // form_nodata.style.display = 'none'//오직 내 데이터에만 의존하면 찾기 실패 메시지 보이기
    });

//파일 업로드
    // 파일 업로드 요소 선택
    var fileInput = document.querySelector(".custom-file-input");
    var categoryDataFile_input;

    // 파일 업로드 버튼 클릭 시 입력란 클릭 효과
    fileInput.addEventListener('change', function() {
        categoryDataFile_input = this.files[0];
    });

//전송 버튼 눌렀을 때
    document.querySelector(".confirm_button").addEventListener("click", async(event) => {
        console.log("전송버튼 클릭")
        /* csrf 토큰 가져오기 */
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

        // 로딩 시작
        loading("start");

        //각 요소 값 가져오기
        const categoryName_input = document.getElementById('categoryName_input').value;
        let categoryDataOnly_input = "";
        let categoryGPT_input = "";
        let categorySound_input = "";

        // 라디오 버튼 요소를 선택
        const radioBtn3 = document.getElementById('customRadio3');
        const radioBtn4 = document.getElementById('customRadio4');
        const radioBtn5 = document.getElementById('customRadio5');
        const radioBtn6 = document.getElementById('customRadio6');
        const radioBtn7 = document.getElementById('customRadio7');
        const radioBtn8 = document.getElementById('customRadio8');


        if(radioBtn3.checked){
            console.log('customRadio3 버튼이 체크되었습니다.');
            categoryGPT_input = "gpt-3.5-turbo";
        }
        if(radioBtn4.checked){
            console.log('customRadio4 버튼이 체크되었습니다.');
            categoryGPT_input = "gpt-4-turbo-preview";
        }
        if(radioBtn5.checked){
            console.log('customRadio5 버튼이 체크되었습니다.');
            categorySound_input = "on";
        }
        if(radioBtn6.checked){
            console.log('customRadio6 버튼이 체크되었습니다.');
            categorySound_input = "off";
        }
        if(radioBtn7.checked){
            console.log('customRadio7 버튼이 체크되었습니다.');
            categoryDataOnly_input = "only";
        }
        if(radioBtn8.checked){
            console.log('customRadio8 버튼이 체크되었습니다.');
            categoryDataOnly_input = "only_file";
        }

        const categoryDataOrder_input = document.getElementById('categoryDataOrder_input').value;
        const categoryDataText_input = document.getElementById('categoryDataText_input').value;
        const categoryNodataMsg_input = document.getElementById('categoryNodataMsg_input').value;

        const categoryHiMsg_input1 = document.getElementById('categoryHiMsg_input1').value;
        const categoryPrompt_input1 = document.getElementById('categoryPrompt_input1').value;
        const categoryHiMsg_input2 = document.getElementById('categoryHiMsg_input2').value;
        const categoryPrompt_input2 = document.getElementById('categoryPrompt_input2').value;
        const categoryHiMsg_input3 = document.getElementById('categoryHiMsg_input3').value;
        const categoryPrompt_input3 = document.getElementById('categoryPrompt_input3').value;
        const categoryHiMsg_input4 = document.getElementById('categoryHiMsg_input4').value;
        const categoryPrompt_input4 = document.getElementById('categoryPrompt_input4').value;
        const categoryHiMsg_input5 = document.getElementById('categoryHiMsg_input5').value;
        const categoryPrompt_input5 = document.getElementById('categoryPrompt_input5').value;
        const categoryHiMsg_input6 = document.getElementById('categoryHiMsg_input6').value;
        const categoryPrompt_input6 = document.getElementById('categoryPrompt_input6').value;
        const categoryHiMsg_input7 = document.getElementById('categoryHiMsg_input7').value;
        const categoryPrompt_input7 = document.getElementById('categoryPrompt_input7').value;
        const categoryHiMsg_input8 = document.getElementById('categoryHiMsg_input8').value;
        const categoryPrompt_input8 = document.getElementById('categoryPrompt_input8').value;
        const categoryHiMsg_input9 = document.getElementById('categoryHiMsg_input9').value;
        const categoryPrompt_input9 = document.getElementById('categoryPrompt_input9').value;
        const categoryHiMsg_input10 = document.getElementById('categoryHiMsg_input10').value;
        const categoryPrompt_input10 = document.getElementById('categoryPrompt_input10').value;

        //파일 전송을 위해 formData 사용
        const formData = new FormData();
        formData.append('categoryName', categoryName);
        formData.append('categoryName_input', categoryName_input);
        formData.append('categoryGPT_input', categoryGPT_input);
        formData.append('categorySound_input', categorySound_input);
        formData.append('categoryDataOnly_input', categoryDataOnly_input);
        // 파일이 있을 경우에만 추가
        if(categoryDataFile_input) {
            formData.append('categoryDataFile_input', categoryDataFile_input);
        }
        formData.append('categoryDataOrder_input', categoryDataOrder_input);
        formData.append('categoryDataText_input', categoryDataText_input);
        formData.append('categoryNodataMsg_input', categoryNodataMsg_input);
        formData.append('categoryHiMsg_input1', categoryHiMsg_input1);
        formData.append('categoryPrompt_input1', categoryPrompt_input1);
        formData.append('categoryHiMsg_input2', categoryHiMsg_input2);
        formData.append('categoryPrompt_input2', categoryPrompt_input2);
        formData.append('categoryHiMsg_input3', categoryHiMsg_input3);
        formData.append('categoryPrompt_input3', categoryPrompt_input3);
        formData.append('categoryHiMsg_input4', categoryHiMsg_input4);
        formData.append('categoryPrompt_input4', categoryPrompt_input4);
        formData.append('categoryHiMsg_input5', categoryHiMsg_input5);
        formData.append('categoryPrompt_input5', categoryPrompt_input5);
        formData.append('categoryHiMsg_input6', categoryHiMsg_input6);
        formData.append('categoryPrompt_input6', categoryPrompt_input6);
        formData.append('categoryHiMsg_input7', categoryHiMsg_input7);
        formData.append('categoryPrompt_input7', categoryPrompt_input7);
        formData.append('categoryHiMsg_input8', categoryHiMsg_input8);
        formData.append('categoryPrompt_input8', categoryPrompt_input8);
        formData.append('categoryHiMsg_input9', categoryHiMsg_input9);
        formData.append('categoryPrompt_input9', categoryPrompt_input9);
        formData.append('categoryHiMsg_input10', categoryHiMsg_input10);
        formData.append('categoryPrompt_input10', categoryPrompt_input10);

        //필수입력 오류 처리
        if(categoryName_input == ""){
            //로딩 스탑 진행
            loading("stop");
            alert("카테고리 이름이 입력되지 않았습니다.");
            return;
        }
        // 'radioBtn8'이 체크되어 있는지, 그리고 파일이 입력되었는지 검사
        if(radioBtn8.checked && !categoryDataFile_input){
            //로딩 스탑 진행
            loading("stop");
            alert("파일이 입력되지 않았습니다.");
            return;
        }
        if(categoryHiMsg_input1 == ""){
            //로딩 스탑 진행
            loading("stop");
            alert("AI 인사메시지가 입력되지 않았습니다.");
            return;
        }

        /* 응답 요청 await 함수는 async 내에서만 사용 가능*/
        const response = await fetch("/chatbot_v1/admin/send_data/", {
            method: "POST",
            headers: {
                'X-CSRFToken': csrfToken
            },
            body: formData
        });

        if (response.ok) {
            /* 데이터 가져오기 */
            const data = await response.json();

            if (data.sys_msg != "response ok"){
                alert(data.sys_msg)
            }


            //로딩 스탑 진행
            loading("stop");
            //페이지 새로고침
            location.reload();

        } else {
            /* 오류 발생 시 콘솔에 출력 */
            console.error("Error response");

        }

    });



// 메뉴_01 버튼을 눌렀을때
//     document.getElementById("menu_2").addEventListener("click", async(event) => {
    async function menu_menu01() {

        console.log("menu01")
        if (1) {
            console.log("ok01")
        } else {
            /* 오류 발생 시 콘솔에 출력 */
            console.error("Error response");
        }

    };


// 로딩 동작
function loading(startstop) {

    if (startstop == "start"){
        //테스트, 추출된 텍스트를 콘솔에 출력
        console.log('startstop:', "start");
        document.querySelector('.loader').style.display = 'block';
    }else if (startstop == "stop"){
        //테스트, 추출된 텍스트를 콘솔에 출력
        console.log('startstop:', "stop");
        document.querySelector('.loader').style.display = 'none';
    }
}