import { createProduct } from "../api/product.js";

export const ProductAdd = {
    render: () => {
        return (
            `<div>
                <form>
                    <div>
                        <label>Ten</label>
                        <input class='input input-bordered w-full max-w-xs' id='name'/>
                    </div>
                    <div>
                        <label>Avatar</label>
                        <input class='input input-bordered w-full max-w-xs' id='avatar'/>
                    </div>
                    <div>
                        <label>mo ta</label>
                        <input class='input input-bordered w-full max-w-xs' id='des'/>
                    </div>
                    <div>
                    <label>Price</label>
                        <input class='input input-bordered w-full max-w-xs' id='price'/>
                    </div>
                    <div>
                        <label>Status</label>
                        <select name="status" id="status" class="select select-bordered w-full max-w-xs">
                            <option value="true">Hiện</option>
                            <option value="false">Ẩn</option>
                        </select>
                    </div>
                    <div>
                        <button type='button' class='btn btn-success'>Tạo mới</button>
                    </div>
                </form>
            </div>`

        )


    },
    afterRender: () => {
        const submitBtn = document.querySelector('.btn');
        submitBtn.addEventListener('click', async () => {
            const name = document.querySelector('#name').value;
            const avatar = document.querySelector('#avatar').value;
            const des = document.querySelector('#des').value;
            const price = document.querySelector('#price').value;
            const status = document.querySelector('#status').value;

            const submitData = { name, avatar,des,price,status };
            console.log(submitData);
            await createProduct(submitData);
            window.location.replace('/products');
        });
    }
};