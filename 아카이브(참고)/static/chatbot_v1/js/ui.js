$(document).ready(function () {

    // a, button태그 title 속성 비어있을때 작성된text로 title 생성
    $('a, .btn, .elips, .elips02, .tag ,.wordName').each(function(){
        let attr = $(this).text().trim();
        attr = attr.replace(/(\r\n|\n|\r)/gm,"");
        attr = attr.replace(/\s/gi, "");

        if (!$(this).is('[title]')) {
            $(this).attr("title", attr);
        }
    });

    $('.questionMenuArea .btnQuestionUnFold').on({
        'click': function(){
            $(this).closest('.questionMenuArea').toggleClass('active');
            $(this).attr('aria-expanded', $(this).closest('.questionMenuArea').hasClass('active'));
            $(this).children('.hidden').text($(this).closest('.questionMenuArea').hasClass('active') ? '질문 리스트 닫기' : '질문 리스트 열기');
        }
    });

    $('.quickMenu .btnBot').on({
        'click': function(){
            $('.chatDiv').toggleClass('active');
            $(this).attr('aria-expanded', true);
        }
    });

    $('.btnChatClose').on({
        'click': function(){
            $(this).closest('.chatDiv').removeClass('active');
            $('.btnBot').attr('aria-expanded', false);
        }
    });

    $('.questionMenuList .btnQuestion').on({
        'click': function() {
            $(this).closest('li').addClass('active').siblings().removeClass('active');
        }
    });


    $("#message_user").keypress(function(e) {
        // 검색어 입력 후 엔터키 입력하면 조회버튼 클릭
        if (e.which == 13) { // 13은 엔터키의 keyCode입니다.
            $("#btn_send").trigger("click");
            e.preventDefault();
        }
    });

})

