const imgBase = "../imgs/"

let orderedProduct = {}

const renderProduct = () => {
  const sessionData = sessionStorage.getItem("orderItem")
  const orderedProductEl = document.querySelector(".order-product")

  if (!sessionData) {
    orderedProductEl.innerHTML = "<p>선택된 상품이 없습니다.</p>"
    return
  }

  try {
    orderedProduct = JSON.parse(sessionData)
  } catch (error) {
    console.error("Error parsing session data:", error)
    orderedProductEl.innerHTML = "<p>선택된 상품이 없습니다.</p>"
    return
  }

  orderedProductEl.innerHTML = `
    <img src="${imgBase + orderedProduct.productImgFileName}" alt="${
    orderedProduct.productName
  }">
  <div>
    <p>${orderedProduct.productName}</p>
    <p>${orderedProduct.productPrice}원</p>
  </div>
  `
}

const submitBtn = document.querySelector("#submitOrder")

submitBtn.addEventListener("click", () => {
  const name = document.querySelector("#orderName").value
  const phone = document.querySelector("#orderPhoneNum").value
  const address = document.querySelector("#orderAddress").value

  if (!name || !phone || !address) {
    alert("모든 정보를 입력해주세요")
    return
  }

  const orderConfirm = confirm(
    `name: ${name}\n\n` +
      `phone: ${phone}\n\n` +
      `address: ${address}\n\n` +
      `위 정보로 주문하시겠습니까?`
  )

  if (!orderConfirm) {
    alert("주문이 취소되었습니다.")
    return
  }

  const order = {
    product: orderedProduct,
    name,
    phone,
    address,
    date: new Date().toISOString(),
  }

  const existingOrders = JSON.parse(localStorage.getItem("orders")) || []

  existingOrders.push(order)
  localStorage.setItem("orders", JSON.stringify(existingOrders))
  sessionStorage.removeItem("orderItem")

  alert("주문이 완료되었습니다.")
  window.location.href = "../index.html"
})

renderProduct()
