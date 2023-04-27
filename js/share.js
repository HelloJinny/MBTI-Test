const btnEl = document.querySelector(".share-or-copy");
const shareFacebookEl = document.querySelector(".share-facebook");
const shareTwitterEl = document.querySelector(".share-twitter");

Kakao.init("76bdb83d580f7ca685325d80017d118e");

Kakao.Link.createCustomButton({
    container: ".share-kakao", templateId: 900877,
});

/**
 * Twitter 공유 함수a
 */
function shareTwitter() {
    let sendText = "내 안에 숨어있는 직업캐 찾기!";
    let sendUrl = location.href;
    window.open("https://twitter.com/intent/tweet?text=" + sendText + "&url=" + sendUrl ); //Twitter에 전송 정보 파라미터 삽입
}

/**
 * Facebook 공유 함수
 */
function shareFacebook() {
    let sendUrl = location.href;
    window.open("http://www.facebook.com/sharer/sharer.php?u=" + sendUrl); //Facebook에 전송 정보 파라미터 삽입
}

// 각 지원 기능 확인!
const isSupportedShare = !!navigator?.share;
const isSupportedClipboard = !!navigator?.clipboard;
const isSupportedClipboardCommand = document.queryCommandSupported?.("copy");

// 공유 및 복사 기능 상태 체크!
const healthEl = document.createElement("div");
healthEl.style.display = "none";
healthEl.innerHTML = `s: ${isSupportedShare}, c: ${isSupportedClipboard}, cc: ${isSupportedClipboardCommand}`;
document.body.append(healthEl);

// 모바일 브라우저 내장 공유 기능!
async function startNativeShare() {
    await navigator.share({
        title: "내 안에 숨어있는 직업캐 찾기!",
        text: "누구나 찰떡인 직업이 있어요! 내 안에 숨어있는 직업캐를 찾아보세요!",
        url: location.href, // 현재 페이지 주소!
    });
}

// 주소 복사 기능!
async function copyToClipboard() {
    // 레거시 우선!
    if(isSupportedClipboardCommand) {
        const textarea = document.createElement("textarea");
        textarea.style.position = "fixed";
        textarea.style.top = 0;
        textarea.style.left = 0;
        textarea.value = location.href;

        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("URL을 복사했습니다.");
        return;
    }
    if(isSupportedClipboard) {
        await navigator.clipboard.writeText(location.href);
        alert("URL을 복사했습니다.");
    }
}

// 모든 기능이 없는 경우 공유 버튼 제거!
if(
    !isSupportedShare &&
    !isSupportedClipboard &&
    !isSupportedClipboardCommand
) {
    btnEl.style.display = "none";
}

// 공유 버튼을 클릭했을 떄!
shareTwitterEl.addEventListener("click", function () {
    shareTwitter();
});

shareFacebookEl.addEventListener("click", function () {
    shareFacebook();
});

btnEl?.addEventListener("click", async function () {
    if(isSupportedShare) {
        await startNativeShare();
        return;
    }
    if(isSupportedClipboard || isSupportedClipboardCommand) {
        await copyToClipboard();
    }
});
