const inputLoginId = document.getElementById("inputLoginId");
const inputLoginPw = document.getElementById("inputLoginPw");
const loginBtn = document.getElementById("login");

//유저정보 넘겨받기
const signupUserInfos = JSON.parse(localStorage.getItem("signupUserInfo"))

//정보 없으면 회원가입으로 보내버리기
if(!signupUserInfos){
  alert("해당 정보로 가입된 회원이 없습니다. 회원가입 페이지로 이동합니다.")
  location.href("../signup/index.html")
}

//로그인 정보 배열로 저장
let [loginId, loginPw] = ["", ""];

//정보 입력받기
inputLoginId.addEventListener("change", e => {
  loginId = e.target.value;
});

inputLoginPw.addEventListener("change", e => {
  loginPw = e.target.value;
});

//유효성 검사
loginBtn.addEventListener("click", (event) => {
  event.preventDefault();
  if(loginId === ""){
    alert("아이디를 입력해주세요");
    inputLoginId.focus();
    return;
  }

  if(loginPw === ""){
    alert("비밀번호를 입력해주세요");
    inputLoginPw.focus();
    return;
  }

  if(loginId !== "" && loginPw !== "" && !(signupUserInfos.some(user => user.id === loginId && user.pw === loginPw))){
    alert("입력한 아이디 또는 비밀번호가 일치하지 않습니다");
    inputLoginId.focus();
    return;
  }

  // isLogin으로 탭 껐다 켜도 로그인 유지
  const isLogin = signupUserInfos.find(user => user.id === loginId);
  localStorage.setItem("isLogin", JSON.stringify(isLogin));

  alert(`${signupUserInfos.filter((user) => user.id === loginId)[0].username}님 환영합니다!`);
  window.history.back();
})