import { getProduct } from "../../api/product";
import { formatMoney } from "../../helpers/format";
import { reRender } from '../../helpers/reRender';

export const ProductDetail = {
    render: async (id) => {
        const response = await getProduct(id);
        const { data } = response;

        return (
            `<div class="flex justify-around items-center flex-wrap">
                <div class="w-[500px] flex text-center flex-col my-[20px]">
                    <div>Name: ${data.name}</div>
                    <div>Category: ${data.categoryId.name}</div>
                    <div>Price: ${formatMoney(data.price)}</div>
                    <div>Sale Price: ${formatMoney(data.price * (100 - data.salePrice) / 100)}</div>
                    <div class="flex flex-col justify-around items-center">
                        <input type='number' class='input input-bordered w-full max-w-xs' id='cartValue' value='1' min='1' />
                        <button
                            class='btn btn-info mt-[10px]'
                            data-id="${data._id}"
                            data-name="${data.name}"
                            id='btn-add-cart'
                        >Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>`
        );
    },
    afterRender: () => {
        const btnAddCart = document.querySelector('#btn-add-cart');
        btnAddCart.addEventListener('click', () => {
            const item = {
                id: btnAddCart.dataset.id,
                name: btnAddCart.dataset.name,
                value: +document.querySelector('#cartValue').value || 1
            };
            const cartItemsString = localStorage.getItem('cart');
            const cartItems = JSON.parse(cartItemsString || '[]');

            if (!cartItems.length) {
                cartItems.push(item);
            } else {
                const existItem = cartItems.find((cartItem) => cartItem.id === item.id);
                if (existItem) {
                    existItem.value += item.value;
                } else {
                    cartItems.push(item);
                }
            }

            localStorage.setItem('cart', JSON.stringify(cartItems));
        });
    }
}