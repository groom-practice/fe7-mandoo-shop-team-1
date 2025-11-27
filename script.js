const headerLogin = document.getElementById("headerLoginLi");
const mainLogin = document.querySelector(".loginBtn");

const isLogin = JSON.parse(localStorage.getItem("isLogin"));
const signupUserInfos = JSON.parse(localStorage.getItem("signupUserInfo"));
console.log(mainLogin)
// 로그인 되어있으면 로그아웃으로 갈 수 있게
if(isLogin){
  mainLogin.style.display = "none";
  headerLogin.innerText = "Logout";
  headerLogin.href = "";

  headerLogin.addEventListener("click", () => {
    localStorage.removeItem("isLogin");
    window.location.reload();
  });
}

const namespan = document.getElementById("namespan");

namespan.innerText = isLogin ? `안녕하세요👋🏻 ${isLogin.username}님!` : `안녕하세요👋🏻 로그인 하시면 여기에 닉네임이 뜰거에요!`;

headerLogin.addEventListener("click", () => {
  localStorage.removeItem("isLogin");
  window.location.reload();
})