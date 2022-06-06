import { getProducts, deleteProduct } from '../api/product';
import { reRender } from '../helpers/reRender';


export const Product = {
    render: async () => {

        const response = await getProducts();
        const { data } = response;

        return `<div>   
            <div>
                <a href="/product/add" class='btn btn-success'>Tạo mới</a>
            </div>
            ${data.map((product) => (
            `<div>
                        <div>ID: ${product.id}</div>
                        <div>Name: ${product.name}</div>
                        <div>Avatar: ${product.avatar}</div>
                        <div>Description: ${product.des}</div>
                        <div>Price: ${product.price}</div>
                        <div>Status: ${product.status}</div>
                        <div>
                            <a href="/products/detail/${product.id}">
                                 <button> chi tiet</button>
                            </a>
                            <button class='btn btn-danger' data-id="${product.id}" data-name="${product.name}"> xoa </button>
                        </div>
                    </div>`
        )).join('')
            }
        </div>`
    },
    afterRender: () => {
        const deleteBtns = document.querySelectorAll('.btn-danger');
        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', async () => {
                const btnId = btn.dataset.id;
                await deleteProduct(btnId);
                await reRender(Product);
            });
        });
    }
};