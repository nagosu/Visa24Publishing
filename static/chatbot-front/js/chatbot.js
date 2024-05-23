document.addEventListener("DOMContentLoaded", function () {
  const inputBox = document.querySelector(".input-box");
  const voiceButton = document.querySelector(".voice-button");
  const chatContainer = document.querySelector(".chat__container");
  const chatWrapper = document.querySelector(".chat__wrapper");
  const sendButton = document.querySelector(".send-button");
  const categorySelect = document.querySelectorAll(".category-dropdown-select");
  const warningText = document.querySelectorAll(".warning-text");
  const chatSelectDoneButton = document.querySelectorAll(
    ".chat__select-done-button"
  );
  const doneButton = document.querySelector(".button-container__button.done");
  const editButton = document.querySelector(".edit-button__container button");

  // 시작 시 최초 접속 메시지 및 1단계 표시
  showInitialMessage();

  // 시작 시 채팅창 맨 아래로 이동
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // 버튼 클릭 이벤트 처리
  document.addEventListener("click", function (event) {
    // 1단계 버튼 클릭 시 2단계 표시
    if (event.target.classList.contains("first-step__button")) {
      const buttonText = event.target.textContent;
      sendMessage(buttonText);
      showSecondStep();
    }

    // 2단계 버튼 클릭 시 3단계 표시
    if (event.target.classList.contains("chat__select-done-button")) {
      const parentSelect = event.target
        .closest(".chat__select")
        .querySelector("select");
      const selectedValue = parentSelect.value;

      // 카테고리에 선택된 값이 없을 경우 1초간 빨간색으로 경고
      if (selectedValue === "업무를 선택해 주세요") {
        const warningText = event.target
          .closest(".chat__select")
          .querySelector(".warning-text");
        warningText.style.color = "red";

        setTimeout(() => {
          warningText.style.color = "";
        }, 1000);

        return;
      }

      sendMessage(selectedValue);

      if (event.target.id === "secondStepButton") {
        showThirdStep();
      }
    }

    // 처음으로 버튼 클릭 시 1단계 표시
    if (
      event.target.classList.contains("chat__reset-button") &&
      event.target.classList.contains("home")
    ) {
      resetToInitial();
    }

    if (event.target.closest(".edit-button__container button")) {
      const chatSelect = event.target.closest(".chat__select");
      const filledTexts = chatSelect.querySelectorAll(".filled-text");

      filledTexts.forEach((span) => {
        const input = document.createElement("input");
        input.type = "text";
        input.value = span.textContent;
        span.parentNode.replaceChild(input, span);
      });
    }

    // "수정하기" 버튼의 텍스트를 "수정완료"로 변경
    const editButton = event.target
      .closest(".edit-button__container")
      .querySelector("button");
    editButton.innerHTML = `
    수정완료<svg class="info-down-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 9L12 15L6 9" stroke="#fff" stroke-width="3"/>
    </svg>
    `;
  });

  // 채팅창 초기화 및 초기 메시지 표시
  function resetToInitial() {
    chatContainer.scrollTo(0, 0);
  }

  // 메시지 서버통신
  async function server_chat(userMessage) {
    // 더미 데이터
    let data = {
      assistant_message: "HI",
    };

    // 서버 통신 구현 부분

    if (data && userMessage) {
      // AI 챗봇 메시지 가져오기
      const aiMessage = data.assistant_message;

      if (aiMessage !== "") {
        return aiMessage;
      } else {
        console.log("aiMessage가 없습니다.");
        return null;
      }
    } else {
      console.error("Error response");
      return null;
    }
  }

  // 클라이언트 메시지 전송 및 서버 응답 채팅창에 표시
  async function sendMessage(text) {
    const messageText = text || inputBox.value.trim();

    if (messageText !== "") {
      // 사용자 메시지 생성
      const userInput = messageText;

      const userMessage = document.createElement("div");
      userMessage.classList.add("chat__user");

      const userMessageContainer = document.createElement("div");
      userMessageContainer.classList.add("chat__user-text-container");

      const userMessageText = document.createElement("div");
      userMessageText.classList.add("chat__user-text");
      userMessageText.textContent = userInput;

      userMessageContainer.appendChild(userMessageText);
      userMessage.appendChild(userMessageContainer);

      chatWrapper.appendChild(userMessage);

      const aiMessage = await server_chat(userInput);
    }

    // 입력창 초기화
    inputBox.value = "";

    // 스크롤 맨 아래로 이동
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  // 최초 접속 메시지 표시하는 함수
  function showInitialMessage() {
    const chatChatbot = document.createElement("div");
    chatChatbot.classList.add("chat__chatbot");

    const chatTextContainer = document.createElement("div");
    chatTextContainer.classList.add("chat__text-container");

    const avatarImage = document.createElement("div");
    avatarImage.innerHTML = `<img
    src="../../static/chatbot-front/images/avatar.png"
    alt="avatar"
  />`;

    const chatText = document.createElement("div");
    chatText.classList.add("chat__text");
    chatText.innerHTML = `<span
    >VISA24입니다. 무엇을 도와드릴까요? 아래 비자 업무를
    선택하거나 궁금한 사항을 입력해 주세요.</span
  >`;

    const firstStep = document.createElement("div");
    firstStep.classList.add("chat__text");
    firstStep.innerHTML = `
    <div class="chat__select">
                      <button type="button" class="first-step__button">
                        VISA(국내)
                      </button>
                      <button type="button" class="first-step__button">
                        VISA(해외)
                      </button>
                      <button type="button" class="first-step__button">
                        VISA(관련)
                      </button>
                      <button type="button" class="first-step__button">
                        VISA(국적신청)
                      </button>
                    </div>
    `;

    chatChatbot.appendChild(avatarImage);
    chatTextContainer.appendChild(chatText);
    chatTextContainer.appendChild(firstStep);
    chatChatbot.appendChild(chatTextContainer);
    chatWrapper.appendChild(chatChatbot);
  }

  // 1단계를 표시하는 함수
  function showFirstStep() {
    const chatChatbot = document.createElement("div");
    chatChatbot.classList.add("chat__chatbot");

    const chatTextContainer = document.createElement("div");
    chatTextContainer.classList.add("chat__text-container");

    const avatarImage = document.createElement("div");
    avatarImage.innerHTML = `
    <img
                  src="../../static/chatbot-front/images/avatar.png"
                  alt="avatar"
                />
    `;

    const firstStep = document.createElement("div");
    firstStep.classList.add("chat__text");

    firstStep.innerHTML = `
    <div class="chat__select">
                      <button type="button" class="first-step__button">
                        VISA(국내)
                      </button>
                      <button type="button" class="first-step__button">
                        VISA(해외)
                      </button>
                      <button type="button" class="first-step__button">
                        VISA(관련)
                      </button>
                      <button type="button" class="first-step__button">
                        VISA(국적신청)
                      </button>
                    </div>
    `;

    chatChatbot.appendChild(avatarImage);
    chatTextContainer.appendChild(firstStep);
    chatChatbot.appendChild(chatTextContainer);
    chatWrapper.appendChild(chatChatbot);
  }

  // 2단계를 표시하는 함수
  function showSecondStep() {
    const chatChatbot = document.createElement("div");
    chatChatbot.classList.add("chat__chatbot");

    const chatTextContainer = document.createElement("div");
    chatTextContainer.classList.add("chat__text-container");

    // 아바타 이미지 생성
    const avatarImage = document.createElement("div");
    avatarImage.innerHTML = `
    <img
                  src="../../static/chatbot-front/images/avatar.png"
                  alt="avatar"
                />
    `;

    // 텍스트 생성
    const secondStep = document.createElement("div");
    secondStep.classList.add("chat__text");
    secondStep.innerHTML = `
    <div class="chat__text">
                    <div class="chat__select">
                      <span class="chat__select-text"
                        >2단계 아래의 VISA 코드를 선택해 주세요.</span
                      >
                      <div class="divCol">
                        <!-- 카테고리 드롭다운 -->
                        <div class="category-dropdown">
                          <select
                            id="categorySelectSecond"
                            class="category-dropdown-select second"
                          >
                            <option
                              value="업무를 선택해 주세요"
                              selected
                              hidden
                            >
                              업무를 선택해 주세요
                            </option>
                            <option value="H-2(방문취업)">H-2(방문취업)</option>
                            <option value="F-4(통합연장)">F-4(통합연장)</option>
                            <option value="F-4(재외동포)">F-4(재외동포)</option>
                            <option value="F-5(국민의배우자 영주권*동포영주권)">
                              F-5(국민의배우자 영주권*동포영주권)
                            </option>
                            <option value="A-1(외교)">A-1(외교)</option>
                            <option value="A-2(공무)">A-2(공무)</option>
                          </select>
                          <svg
                            class="category-dropdown-icon"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M11.8079 14.7695L8.09346 10.3121C7.65924 9.79109 8.02976 9 8.70803 9L15.292 9C15.9702 9 16.3408 9.79108 15.9065 10.3121L12.1921 14.7695C12.0921 14.8895 11.9079 14.8895 11.8079 14.7695Z"
                              fill="#1b3133"
                            />
                          </svg>
                        </div>
                        <span class="warning-text">* 카테고리를 선택 후 입력해 주세요.</span>
                      </div>
                      <button
                        class="chat__select-done-button"
                        id="secondStepButton"
                      >
                        다음
                      </button>
                    </div>
                  </div>
    `;

    const chatReset = document.createElement("div");
    chatReset.classList.add("chat__reset");
    chatReset.innerHTML = `
    <button class="chat__reset-button prev">
                      <span>이전으로</span
                      ><svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 8L3.29289 8.70711L2.58579 8L3.29289 7.29289L4 8ZM9 20C8.44772 20 8 19.5523 8 19C8 18.4477 8.44772 18 9 18L9 20ZM8.29289 13.7071L3.29289 8.70711L4.70711 7.29289L9.70711 12.2929L8.29289 13.7071ZM3.29289 7.29289L8.29289 2.29289L9.70711 3.70711L4.70711 8.70711L3.29289 7.29289ZM4 7L14.5 7L14.5 9L4 9L4 7ZM14.5 20L9 20L9 18L14.5 18L14.5 20ZM21 13.5C21 17.0898 18.0898 20 14.5 20L14.5 18C16.9853 18 19 15.9853 19 13.5L21 13.5ZM14.5 7C18.0899 7 21 9.91015 21 13.5L19 13.5C19 11.0147 16.9853 9 14.5 9L14.5 7Z"
                          fill="#33363F"
                        />
                      </svg>
                    </button>
                    <button class="chat__reset-button home">
                      <span>처음으로</span
                      ><svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.27446 10.1262C5 10.7229 5 11.4018 5 12.7595V16.9999C5 18.8856 5 19.8284 5.58579 20.4142C6.11733 20.9457 6.94285 20.9949 8.5 20.9995V16C8.5 14.8954 9.39543 14 10.5 14H13.5C14.6046 14 15.5 14.8954 15.5 16V20.9995C17.0572 20.9949 17.8827 20.9457 18.4142 20.4142C19 19.8284 19 18.8856 19 16.9999V12.7595C19 11.4018 19 10.7229 18.7255 10.1262C18.4511 9.52943 17.9356 9.08763 16.9047 8.20401L15.9047 7.34687C14.0414 5.74974 13.1098 4.95117 12 4.95117C10.8902 4.95117 9.95857 5.74974 8.09525 7.34687L7.09525 8.20401C6.06437 9.08763 5.54892 9.52943 5.27446 10.1262ZM13.5 20.9999V16H10.5V20.9999H13.5Z"
                          fill="#222222"
                        />
                      </svg>
                    </button>
    `;

    chatChatbot.appendChild(avatarImage);
    chatTextContainer.appendChild(secondStep);
    chatTextContainer.appendChild(chatReset);
    chatChatbot.appendChild(chatTextContainer);
    chatWrapper.appendChild(chatChatbot);
  }

  // 3단계를 표시하는 함수
  function showThirdStep() {
    const chatChatbot = document.createElement("div");
    chatChatbot.classList.add("chat__chatbot");

    const chatTextContainer = document.createElement("div");
    chatTextContainer.classList.add("chat__text-container");

    // 아바타 이미지 생성
    const avatarImage = document.createElement("div");
    avatarImage.innerHTML = `
    <img
                  src="../../static/chatbot-front/images/avatar.png"
                  alt="avatar"
                />
    `;

    // 텍스트 생성
    const thirdStep = document.createElement("div");
    thirdStep.classList.add("chat__text");
    thirdStep.innerHTML = `
    <div class="chat__select">
    <span class="chat__select-text"
      >3단계 아래의 VISA 코드를 선택해 주세요.</span
    >
    <div class="divCol">
      <!-- 카테고리 드롭다운 -->
      <div class="category-dropdown">
        <select
          id="categorySelectThird"
          class="category-dropdown-select third"
        >
          <option
            value="업무를 선택해 주세요"
            selected
            hidden
          >
            업무를 선택해 주세요
          </option>
          <option value="H-2(방문취업)">H-2(방문취업)</option>
          <option value="F-4(통합연장)">F-4(통합연장)</option>
          <option value="F-4(재외동포)">F-4(재외동포)</option>
          <option value="F-5(국민의배우자 영주권*동포영주권)">
            F-5(국민의배우자 영주권*동포영주권)
          </option>
          <option value="A-1(외교)">A-1(외교)</option>
          <option value="A-2(공무)">A-2(공무)</option>
        </select>
        <svg
          class="category-dropdown-icon"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.8079 14.7695L8.09346 10.3121C7.65924 9.79109 8.02976 9 8.70803 9L15.292 9C15.9702 9 16.3408 9.79108 15.9065 10.3121L12.1921 14.7695C12.0921 14.8895 11.9079 14.8895 11.8079 14.7695Z"
            fill="#1b3133"
          />
        </svg>
      </div>
      <span class="warning-text">* 카테고리를 선택 후 입력해 주세요.</span>
    </div>
    <button class="chat__select-done-button third">
      완료
    </button>
  </div>
    `;

    chatChatbot.appendChild(avatarImage);
    chatTextContainer.appendChild(thirdStep);
    chatChatbot.appendChild(chatTextContainer);
    chatWrapper.appendChild(chatChatbot);
  }

  // 입력창 엔터키 이벤트
  inputBox.addEventListener("keydown", function (e) {
    if (e.isComposing) return;
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  // 전송 버튼 클릭 시 메시지 전송
  sendButton.addEventListener("click", function () {
    sendMessage();
  });

  // 음성인식 버튼 클릭 시 active
  voiceButton.addEventListener("click", function () {
    voiceButton.classList.toggle("active");
  });

  // 필수 개인정보 미입력 시 경고 메시지 표시
  doneButton.addEventListener("click", function () {
    const requiredInputs = document.querySelectorAll(".input-required");

    requiredInputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.placeholder = "필수 입력 개인정보입니다."; // placeholder 변경
        input.classList.add("placeholder-red"); // 빨간색 placeholder 스타일 적용
      }
    });
  });
});
