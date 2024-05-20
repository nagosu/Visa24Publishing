// 카테고리네임 초기화
let categoryName = "";

// 챗 히스토리 초기화
let chatHistory = document.querySelector("#chat-history");
chatHistory.value = "";

//파일기반 채팅 기록 초기회
// let fileChat = "";

// 카테고리 이름 리스트로 버튼 생성
async function loadCategoryList() {
    //최초 초기화 부분//
    //코멘트 그룹은 메시지 그룹
    const allCommentGroups = document.querySelectorAll('.commentGroup');
    for(let i = 1; i < allCommentGroups.length; i++) { // 시작 인덱스를 1로 설정하여 첫 번째 요소를 건너뜁니다.
        allCommentGroups[i].remove();
    }

    console.log("empty");


    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    // 카테고리 리스트 가져오기
    const response = await fetch("/chatbot_v1/admin/category_list/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken
        },
        body: new URLSearchParams({
            //body 없이 요청만 보내고 카테고리 이름 리스트 받아오기
        })
    });
    if (response.ok) {
        /* 데이터 가져오기 */
        const data = await response.json();

        //서버로 부터 카테고리 정보를 받는다.
        categoryListFromServer = data.category_names

        //카테고리 업데이트를 한다.
        for (let i = 0; i < 9; i++) {
            const btn = document.getElementById(`btn_q${i + 1}`);
            if (i < categoryListFromServer.length) {
                btn.textContent = categoryListFromServer[i];
                btn.style.display = ""; // 버튼을 보이게 함
            } else {
                btn.style.display = "none"; // 버튼을 숨김
            }
        }

        //첫번쨰 버튼을 클릭
        $("#btn_q1").trigger("click");


    } else {
        /* 오류 발생 시 콘솔에 출력 */
        console.error("Error response");
    }
};

// 페이지 로드 시 함수 호출
document.addEventListener('DOMContentLoaded', loadCategoryList);


//모든 btnQuestion(카테고리 버튼)의 값을 가져옴
const buttons = document.querySelectorAll(".btnQuestion");

//카테고리 버튼이 눌렸을때 진행
buttons.forEach(button => {
    button.addEventListener("click", async(event) => {

        // 클릭된 버튼의 카테고리 값을 가져옴
        categoryName = event.target.textContent;
        console.log("categoryName : ", categoryName)

        //히스토리 초기화
        chatHistory.value = "";
        //메시지 초기화
        const allCommentGroups = document.querySelectorAll('.commentGroup');
        for(let i = 1; i < allCommentGroups.length; i++) { // 시작 인덱스를 1로 설정하여 첫 번째 요소를 건너뜁니다.
            allCommentGroups[i].remove();
        }

        //텍스트 메시지 생성 펑션 실행
        MsgCreate();

    });
});

//btn_send 버튼이 클릭되었을시

// 버튼 클릭을 추적하기 위한 변수 선언
let isSending = false;
document.getElementById("btn_send").addEventListener("click", async(event) => {
    /* 기본 이벤트 방지, 필요한가? */
    event.preventDefault();

    console.log("isSending : ", isSending)
    // 이미 메시지를 보내고 있는 경우, 추가 동작을 방지
    if (isSending) {
        console.log("메시지 전송 중입니다. 잠시 기다려 주세요.");
        return;
    }

    // 메시지 전송 상태로 설정
    isSending = true;

    //메시지 생성 보내기 펑션 실행
    MsgCreate();
});


//사용자 Text 메시지 생성
function MsgCreate()
{
    console.log("MsgCreate")

    var userMessage = "";

    //(카테고리 선택)이 아닌 경우 사용자 메시지 가져오기
    if (chatHistory.value != ""){
        /* 사용자 메시지 가져오기 */
        userMessage = document.getElementById("message_user").value;
        userMessage = userMessage.replace(/\n/g, "<br>"); //메시지 줄바꿈하기
    }


    // 새로운 commentGroup myChat div 생성
    var newCommentGroup = document.createElement('div');
    newCommentGroup.className = "commentGroup myChat";

    var newComments = document.createElement('div');
    newComments.className = "comments";

    var newRow = document.createElement('div');
    newRow.className = "row";

    var newText = document.createElement('p');
    newText.className = "text";
    //(카테고리 선택)인 경우 카테고리 이름 가져오기
    if (chatHistory.value == ""){
        newText.innerHTML = categoryName; // categoryName 값 설정
    //아닌경우 유저메시지 넣기
    }else {
        newText.innerHTML = userMessage; // userMessage 값 설정

    }


    // 구조를 조립
    newRow.appendChild(newText);
    newComments.appendChild(newRow);
    newCommentGroup.appendChild(newComments);

    //스크롤을 하단으로 위치
    $('.innerScroll')
        .stop()
        .animate({ scrollTop: $('.innerScroll')[0].scrollHeight }, 1500);


    // 마지막 commentGroup을 찾아서 새로운 commentGroup를 바로 아래에 추가
    var commentGroups = document.querySelectorAll('.commentGroup');
    var lastCommentGroup = commentGroups[commentGroups.length - 1];
    lastCommentGroup.insertAdjacentElement('afterend', newCommentGroup);


    // 새로운 commentGroup(ai chat) div 생성
    var newCommentGroup = document.createElement('div');
    newCommentGroup.className = "commentGroup";

    var newBotDiv = document.createElement('div');
    newBotDiv.className = "bot";

    var newSpan = document.createElement('span');
    newSpan.className = "hidden";
    newSpan.textContent = "챗봇 프로필";

    var newComments = document.createElement('div');
    newComments.className = "comments";

    var newRow = document.createElement('div');
    newRow.className = "row";

    var newText = document.createElement('p');
    newText.className = "text";
    newText.innerHTML = '';


    // 구조를 조립
    newRow.appendChild(newText);
    newComments.appendChild(newRow);
    newCommentGroup.appendChild(newBotDiv);  // bot div 추가
    newCommentGroup.appendChild(newComments);
    // 마지막 commentGroup을 찾아서 새로운 commentGroup를 바로 아래에 추가
    var commentGroups = document.querySelectorAll('.commentGroup.myChat');
    var lastCommentGroup = commentGroups[commentGroups.length - 1];
    lastCommentGroup.insertAdjacentElement('afterend', newCommentGroup);


    // 서버에 메시지 보내는 펑션 실행
    server_chat(userMessage);

}


// 펑션, 메시지 서버통신
async function server_chat(userMessage) {
    console.log("server_chat")

    // 서버 응답을 기다리는 최대 시간 설정 (예: 30000밀리초 = 30초)
    const timeoutDuration = 60000;
    let timeout = setTimeout(function() {
        window.location.reload();
    }, timeoutDuration);

    /* csrf 토큰 가져오기 */
    const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    var aiMessage = "";


    const fetchMessageStream = async () => {
        if(chatHistory.value == ""){
            return;  // 함수 실행 중단
        }
        const response = await fetch("/chatbot_v1/get_message_stream/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken
            },
            body: new URLSearchParams({})
        });

        //응답받기
        if (response.ok) {
            console.log("response1.ok")

            // 서버로부터 응답을 성공적으로 받으면 타이머 취소
            clearTimeout(timeout);

            const data = await response.json();
            /* AI 챗봇 메시지 가져오기 */
            aiMessage = data.assistant_message


            const allTextElements = document.querySelectorAll('.commentGroup .text');
            const lastTextElement = allTextElements[allTextElements.length - 1];
            if (lastTextElement) {
                lastTextElement.innerHTML = aiMessage;
            }

            //스크롤 하단 위치
            $('.innerScroll')
                .stop()
                .animate({ scrollTop: $('.innerScroll')[0].scrollHeight }, 1500);
        }
    };

    // setInterval을 사용하여 0.1초마다 fetchMessageStream 실행
    let intervalID;
    intervalID = setInterval(fetchMessageStream, 100);
    // if (fileChat != "true"){
    //     console.log("file_chat_false")
    //     intervalID = setInterval(fetchMessageStream, 100);
    // }



    //서버통신
    const response = await fetch("/chatbot_v1/", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRFToken': csrfToken
        },
        body: new URLSearchParams({
            'user_message': userMessage,
            'chat_history': chatHistory.value,
            'categoryName': categoryName,
            'msg_type' : "text",//"audio" or "text"
        })
    });
    //응답받기
    if (response.ok) {
        console.log("response2.ok")

        // 서버통신이 성공적으로 완료되면 setInterval 종료
        clearInterval(intervalID);

        // 서버로부터 응답을 성공적으로 받으면 타이머 취소
        clearTimeout(timeout);

        //스트림 데이터 초기화
        const response2 = await fetch("/chatbot_v1/get_message_stream_default/", {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'X-CSRFToken': csrfToken
            },
            body: new URLSearchParams({})
        });

        /* 데이터 가져오기 */
        const data = await response.json();

        //텍스트 줄바꿈 HTML에 맞게
        data.assistant_message = data.assistant_message.replace(/\n/g, "<br>");
        //AI 챗봇 메시지 생성하기
        /* AI 챗봇 메시지 가져오기 */
        aiMessage = data.assistant_message

        console.log("aiMessage2 :", aiMessage)

        const allTextElements = document.querySelectorAll('.commentGroup .text');
        const lastTextElement = allTextElements[allTextElements.length - 1];
        if (lastTextElement) {
            lastTextElement.innerHTML = aiMessage;
        }

        chatHistory.value = data.chat_history;

        //스크롤을 하단으로 위치
	    $('.innerScroll')
            .stop()
            .animate({ scrollTop: $('.innerScroll')[0].scrollHeight }, 1500);

        //보내기 버튼 재송신 막기
        isSending = false;

        // //파일 기반 응답인지 체크
        // if(data.file == "true"){
        //     console.log("file_true");
        //     fileChat = "true";
        // }else{
        //     fileChat = "";
        // }

        console.log("response.ok_end")
    } else {
        /* 오류 발생 시 콘솔에 출력 */
        console.error("Error response");
        clearInterval(intervalID);

        // 서버로부터 응답을 성공적으로 받으면 타이머 취소
        clearTimeout(timeout);


    }
    // 입력 내용 지우기, inputfield 리셋
    document.getElementById("message_user").value = "";
}