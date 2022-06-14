import { reRender } from "../../helpers/reRender";

export const Cart = {
    render: () => {
        const cartItems = localStorage.getItem('cart');
        const items = JSON.parse(cartItems);

        if (!items ||items.length == 0) return (
            `<div class="flex flex-1 justify-center items-center h-[400px]">
                <h1>chưa có sản phẩm</h1>
            </div>`
        )

        return (
            `<div class="flex flex-col justify-center overflow-x-auto">
                <table class="text-center table w-full">
                    <!-- head -->
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Value</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map((item, i) => (
                `<tr class="hover">
                                <th>${i+1}</th>
                                <td>${item.name}</td>
                                <td>${item.value}</td> 
                                <td><button class="btn bg-red-600 border-none" data-index="${i}">xóa</button></td>
                            </tr>`
            )).join('')}
                    </tbody>
                </table>
                <div class="flex flex-1 justify-center">
                    <button class="btn bg-blue-800 border-none">Mua</button>
                </div>
            </div>`
        )
    },
    afterRender: () => {

        const cartItems = localStorage.getItem('cart');
        const items = JSON.parse(cartItems);

        if (items && items.length != 0 ) {
            const submitBtn = document.querySelector('.btn.bg-blue-800')
            submitBtn.addEventListener('click', () => {
                localStorage.clear('cart');
                reRender('#content', Cart);
            })


            const delBtns = document.querySelectorAll('.btn.bg-red-600')
            delBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = btn.dataset.index;

                    items.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(items));
                    reRender('#content', Cart);
                })
            });
        }
    }
}