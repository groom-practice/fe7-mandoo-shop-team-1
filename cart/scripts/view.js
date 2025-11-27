export const CartView = {
    render() {
    },

    getTemplate(product) {
        return `
           <li class='cart-item' id='cart-item-${product.id}'>
                <input type='checkbox' class='cart-item-checkbox' id='cart-item-checkbox-${product.id}'>
                <label for='cart-item-checkbox-${product.id}'>
                    <img src='../imgs/${product.productImgFileName}' alt='${product.productName}-${product.id}'>
                    <div class='cart-item-info'>
                        <h3>${product.productName}</h3>
                        <p>${product.productPrice.toLocaleString()}원</p>
                    </div>
                </label>
            </li>
        `;
    },

    /**
     * 장바구니 리스트 업데이트
     * @param {object[]} items 
     */
    updateCartListView(items) {
        const cartList = document.getElementById('cartList');
        if(items.length === 0) {
            cartList.innerHTML = '';
            return;
        }

        cartList.innerHTML = items.map(this.getTemplate).join('');
    },

    /**
     * 장바구니가 비어있을 때 보여줌
     */
    showEmptyCart() {
        const cartEmpty = document.getElementById('cartEmpty');
        cartEmpty.classList.remove('hidden');
    },

    /**
     * 장바구니가 비어있지 않을 때 숨김
     */
    hideEmptyCart() {
        const cartEmpty = document.getElementById('cartEmpty');
        cartEmpty.classList.add('hidden');
    },

    /**
     * 총 금액 업데이트
     * @param {number} totalPrice 
     */
    updateTotalPrice(price) {
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = `${price.toLocaleString()}원`;
    },
    /**
     * 
     * @param {boolean} isSelected 
     */
    selectedAllItems(isSelected) {
        this.updateAllChecked(isSelected);
        const cartItems = document.querySelectorAll('.cart-item-checkbox');
        cartItems.forEach(item => {
            item.checked = isSelected;
        });
    },

    /**
     * 선택 삭제 버튼 비활성화
     * @param {boolean} isDisabled 
     */
    updateSelectedDeleteBtnDisabled(isDisabled){
        const selectedDeleteBtn = document.getElementById('selectedDeleteBtn');
        selectedDeleteBtn.disabled = isDisabled;
    },

    /**
     * 전체 삭제 버튼 클릭
     * @param {boolean} isSelected 
     */
    updateAllChecked(isSelected){
        const allDeleteBtn = document.getElementById('selectAllCheckbox');
        allDeleteBtn.checked = isSelected;
    },
}