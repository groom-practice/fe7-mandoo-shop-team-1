import {CartView} from './view.js';
import {Cart} from './model.js';
import data from '../../db.json';

const CartController = {
    cart: null,
    selectedItems: [],
    init() {
        this.cart = new Cart();
        this.bindEvents();
        this.updateView();
    },
    /**
     * 버튼 이벤트 바인딩
     */
    bindEvents() {
        // 뒤로가기 버튼 클릭 시,
        document.getElementById('backBtn').addEventListener('click', () => {
            window.history.back();
        });

        // 전체 선택 클릭 시,
        document.getElementById('selectAllCheckbox').addEventListener('change', (e) => {
            const { target: {checked}} = e;
            if(checked) {
                this.selectAllItems();
                CartView.updateSelectedDeleteBtnDisabled(this.selectedItems.length === 0);
                return;
            }

            this.cancelSelectAllItems();
            CartView.updateSelectedDeleteBtnDisabled(this.selectedItems.length === 0);
        });

        // 아이템 클릭 시, 
        // 이벤트 위임
        document.querySelector('.cart-list').addEventListener('click', (e) => {
            const { target } = e;
            
            if(target.tagName === 'LI') {
                const getId = target.getAttribute('id').split('cart-item-')[1];
                this.itemClicked(Number(getId));
                CartView.updateSelectedDeleteBtnDisabled(this.selectedItems.length === 0);
                return ;
            }

            if(target.tagName === 'INPUT') {
                const getId = target.getAttribute('id').split('cart-item-checkbox-')[1];
                this.itemClicked(Number(getId));
                CartView.updateSelectedDeleteBtnDisabled(this.selectedItems.length === 0);
                return ;
            }
        });

        // 선택 삭제 클릭 시,
        document.querySelector('#selectedDeleteBtn').addEventListener('click', () => {
            this.deleteSelectedItems();
        });

            
        // 전체 삭제 클릭 시,
        document.querySelector('#allDeleteBtn').addEventListener('click', () => {
            this.deleteAllItems();
        });
    },
    /**
     * 전체 화면 업데이트
     */
    updateView() {
        this.updateListView();
        this.updateTotalPrice();
        CartView.updateSelectedDeleteBtnDisabled(this.selectedItems.length === 0);
    },
    /**
     * 장바구니 리스트 업데이트
     */
    updateListView() {
        this.updateEmptyCart();
        this.updateCartList();
    },
    /**
     * 장바구니 리스트 업데이트
     */
    updateCartList() {
        CartView.updateCartListView(this.cart.getCarts());
    },
    /**
     * 총 금액 업데이트
     */
    updateTotalPrice() {
        CartView.updateTotalPrice(this.cart.getTotalPrice());
    },
    /**
     * 장바구니가 비어있을 때 보여줌
     */
    updateEmptyCart() {
        if(this.cart.getCarts().length === 0) {
            CartView.showEmptyCart();
        } else {
            CartView.hideEmptyCart();
        }
    },
    /**
     * 체크박스 전체 선택
     */
    selectAllItems() {
        this.selectedItems = this.cart.getCarts().map(cart => cart.id);
        CartView.selectedAllItems(true);
    },
    /**
     * 체크박스 전체 선택 취소
     */
    cancelSelectAllItems() {
        this.selectedItems = [];
        CartView.selectedAllItems(false);
    },
    /**
     * 아이템 클릭 시,
     * @param {number} id 
     */
    itemClicked(id) {
        if(this.selectedItems.includes(id)) {
            this.selectedItems = this.selectedItems.filter(item => item !== id);
        } else {
            this.selectedItems.push(id);
        }
    },
    /**
     * 선택 삭제 클릭 시,
     */
    deleteSelectedItems() {
        this.cart.selectedRemoveItems(this.selectedItems);
        this.selectedItems = [];
        this.updateView();
    },
    /**
     * 전체 삭제 클릭 시,
     */
    deleteAllItems() {
        this.cart.allRemoveItems();
        this.selectedItems = [];
        this.cancelSelectAllItems();
        this.updateView();
    }

    
}

CartController.init();