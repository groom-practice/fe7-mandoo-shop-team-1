const products = [
    {id: 1, name: "로고 가방", price: 20000, img: "../imgs/bag-05.png"},
    {id: 2, name: "로고 그릇", price: 9000, img: "../imgs/bowl-06.png"},
    {id: 3, name: "로고 블랙 케이스", price: 4000, img: "../imgs/colorCase-09.png"},
    {id: 4, name: "로고 레드 케이스", price: 4000, img: "../imgs/colorCase-10.png"},
    {id: 5, name: "로고 그린 케이스", price: 4000, img: "../imgs/colorCase-11.png"},
    {id: 6, name: "로고 컵", price: 8000, img: "../imgs/cup-04.png"},
    {id: 7, name: "손거울", price: 5000, img: "../imgs/handMirror-02.png"},
    {id: 8, name: "만두 노트북", price: 45000, img: "../imgs/laptop-07.png"},
    {id: 9, name: "만두 로션", price: 12000, img: "../imgs/lotion-08.png"},
    {id: 10, name: "찡그림 로고 노트북", price: 13000, img: "../imgs/note-17.png"},
    {id: 11, name: "발라당 로고 노트", price: 13000, img: "../imgs/note-18.png"},
    {id: 12, name: "포토카드", price: 10000, img: "../imgs/photoCard-01.png"},
    {id: 13, name: "[특별 한정] 포토카드", price: 13000, img: "../imgs/photoCard-19.png"},
    {id: 14, name: "찡그림 포토 케이스", price: 8000, img: "../imgs/photoCase-14.png"},
    {id: 15, name: "발라당 포토 케이스", price: 8500, img: "../imgs/photoCase-15.png"},
    {id: 16, name: "눈떙글 포토 케이스", price: 8500, img: "../imgs/photoCase-16.png"},
    {id: 17, name: "만두 로고 운동화", price: 30000, img: "../imgs/sneakers-13.png"},
    {id: 18, name: "로고 양말", price: 6000, img: "../imgs/socks-12.png"},
    {id: 19, name: "티셔츠", price: 15000, img: "../imgs/tshirt-03.png"},
]

function getCart() {
    return JSON.parse(localStorage.getItem("cart") || "[]");
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function createCard(item) {
    const card = document.createElement("div")
    card.className = "product-card"

    const img = document.createElement("img")
    img.src = item.img
    img.className = "product-img"

    const info = document.createElement("div")
    info.className = "product-info"

    const name = document.createElement("p")
    name.className = "product-name"
    name.textContent = item.name  

    const bucket = document.createElement("button")
    bucket.className = "true"
    bucket.textContent = "Cart"

    bucket.addEventListener("click", () => { // 한번 누르면 비활성화
        alert(`${item.name}이 장바구니에 담겼습니다!`)
        const cart = getCart()
        cart.push(item)
        saveCart(cart)
        bucket.disabled = true;
    })

    const order = document.createElement("button")
    order.className 
    order.textContent = "Order"
    order.addEventListener("click", ()=> {
        location.href="order.html" // 임시 링크

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
    count += showItem;
}
showProduct()

