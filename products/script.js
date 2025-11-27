import {Cart} from '../cart/scripts/model.js' 

const cart = new Cart()

let products = []
async function loadProducts() {
    try {
        const res = await fetch("../db.json")
        products = await res.json()
        showProduct()
    } catch (error) {
        console.error("상품 데이터를 불러오는데 실패했습니다:", error)
    }
}

function createCard(item) {
    const card = document.createElement("div")
    card.className = "product-card"

    const img = document.createElement("img")
    img.src = "../imgs/" + item.productImgFileName
    img.className = "product-img"

    const info = document.createElement("div")
    info.className = "product-info"

    const name = document.createElement("p")
    name.className = "product-name"
    name.textContent = item.productName

    const bucket = document.createElement("button")
    bucket.className = "true"
    bucket.textContent = "Cart"

    if (cart.hasCarts(item.id)) {
        bucket.disabled = true;
    }
        
    bucket.addEventListener("click", () => { // 한번 누르면 비활성화
        try {
            cart.addItem(item)
            alert(`${item.productName}이 장바구니에 담겼습니다!`)
            bucket.disabled = true;
        }
        catch (e) {  // 없어도 되고?
            alert("이미 장바구니에 있는 상품입니다!");
        }
    })

    const order = document.createElement("button")
    order.textContent = "Order"
    order.addEventListener("click", ()=> {
        const orderItem = {
            productImgFileName:item.productImgFileName,
            productName: item.productName,
            productPrice : item.productPrice
        }
        sessionStorage.setItem("orderItem", JSON.stringify(orderItem))
        location.href = "../order/index.html"
    })

    info.appendChild(name)
    card.appendChild(img)
    card.appendChild(info)
    card.appendChild(bucket)
    card.appendChild(order)

    return card
}

const productList = document.querySelector(".product-list")

let count = 0
let showItem = 5

function scrollHandler() {
    if (productList.scrollTop + productList.clientHeight >= productList.scrollHeight - 5) {
        showProduct();
    }
}

productList.addEventListener("scroll", scrollHandler);

function showProduct() {
    for (let i = count; i < count + showItem; i++) {
        if (!products[i]) {
            productList.removeEventListener("scroll", scrollHandler);
            return;
        }
        const card = createCard(products[i]);
        productList.appendChild(card);
    }
    count += showItem
}


loadProducts()

