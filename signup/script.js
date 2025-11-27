const inputUserId = document.getElementById("inputUserId")
const inputUserPw = document.getElementById("inputUserPw")
const inputUserName = document.getElementById("inputUserName")
const signupBtn = document.getElementById("signup");

// 유저 정보 입력받기
inputUserId.addEventListener("change", e => {
  signupUserInfo.setId(e.target.value);
});

inputUserPw.addEventListener("change", e => {
  signupUserInfo.setPw(e.target.value);
})

inputUserName.addEventListener("change", e => {
  signupUserInfo.setUserName(e.target.value);
});

//유효성 검사
signupBtn.addEventListener("click", () => {
  if(signupUserInfo.id === ""){
    alert("아이디를 입력하세요");
    inputUserId.focus();
    return;
  }

  if(signupUserInfo.pw === ""){
    alert("비밀번호를 입력하세요");
    inputUserPw.focus();
    return;
  }

  if(signupUserInfo.username === ""){
    alert("이름을 입력하세요");
    inputUserName.focus();
    return;
  }

  // 회원가입 확인하고 로그인 페이지로 이동
  const isConfirm = confirm(`id => ${signupUserInfo.id} \npw => ${signupUserInfo.pw} \nname => ${signupUserInfo.username} \n입력하신 정보가 정확한지 확인해주세요`);
  
  if(isConfirm){
    alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
    const userInfo = JSON.parse(localStorage.getItem("signupUserInfo")) ?? [];
    const newUserInfo = [...userInfo, signupUserInfo]
    
    //로컬 스토리지에 유저 회원가입 정보 저장
    localStorage.setItem("signupUserInfo", JSON.stringify(newUserInfo));
    location.href="../login/index.html";
  } else {
    alert("회원가입에 실패했습니다.");
  }

})


//글자 수 제한 검사 
let signupUserInfo = {
  id: "",
  pw: "",
  username: "",

  setId(v){
    if(v.length < 6){
      alert("입력받은 ID가 6자 이하입니다. 다시 입력해주세요");
      inputUserId.value = ""
      inputUserId.focus();
      return;
    } 
    this.id = v;
  },

  setPw(v) {
    if(v.length < 8){
      alert("입력받은 PW가 8자 이하입니다. 다시 입력해주세요");
      inputUserPw.value = ""
      inputUserPw.focus();
      return;
    }
    this.pw = v;
  },

  setUserName(v) {
    console.log(v);
    this.username = v;
  },
};

