export class Cart {
    carts = [];

    constructor() {
        const carts = localStorage.getItem('carts');

        if(!carts) {
            this.carts = [];
            localStorage.setItem('carts', JSON.stringify(this.carts));
        } else {
            this.carts = JSON.parse(carts);
        }
    }

    /**
     * 장바구니에 아이템 추가
     * @param {*} item 
     */
    addItem(item) {
        const hasItem = this.hasCarts(item.id);
        if(hasItem) {
            throw new Error('이미 장바구니에 있는 아이템입니다.');
        }

        this.carts.push(item);
        this._save();
    }

    /**
     * 장바구니에서 아이템 제거
     * @param {*} item 
     */
    removeItem(item) {
        const hasItem = this.hasCarts(item.id);
        if(!hasItem) {
            throw new Error('장바구니에 없는 아이템입니다.');
        }

        this.carts = this.carts.filter(i => i.id !== item.id);
        this._save();
    }

    /**
     * 장바구니에 해당 아이템이 있는지 확인
     * @param {*} productId 
     * @returns {boolean}
     */
    hasCarts(productId) {
        return this.carts.findIndex(cart => cart.id === productId) > -1;
    }

    /**
     * 선택된 아이템 제거
     * @param {number[]} ids 
     */
    selectedRemoveItems(ids) {
        this.carts = this.carts.filter(cart => !ids.includes(cart.id));
        this._save();
    }

    /**
     * 모든 아이템 제거
     */
    allRemoveItems() {
        this.carts = [];
        this._save();
    }

    /**
     * 장바구니 데이터를 localstorage에 저장
     */
    _save() {
        localStorage.setItem('carts', JSON.stringify(this.carts));
    }


    /**
     * 장바구니 데이터 가져오기
     * @returns {object[]}
     */
    getCarts() {
        return this.carts;
    }

    /**
     * 총 금액 가져오기
     * @returns {number}
     */
    getTotalPrice() {
        return this.carts.reduce((acc, cart) => acc + cart.productPrice, 0);
    }

    /**
     * 장바구니 아이템 개수 가져오기
     * @returns {number}
     */
    getCartCount() {
        return this.carts.length;
    }


    /**
     * 장바구니가 비어있는지 확인
     * @returns {boolean}
     */
    isEmptyCart() {
        return this.getCartCount() === 0;
    }
}