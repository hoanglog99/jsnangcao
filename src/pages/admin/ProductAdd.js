import { createProduct, getProduct, updateProduct } from "../../api/product.js";
import { getCategories } from "../../api/category.js";
import { router } from "../../helpers/router.js";
import { Sidebar } from "../../components/Sidebar.js";

export const ProductAdd = {
    render: async (id) => {
        let book = {
            name: '',
            price:'',
            salePrice:'',
            categoryId:{
                name: ''
            }
        };
        const responseCategory = await getCategories()
        const categories = responseCategory.data

        if (id) {
            const responseBook = await getProduct(id)
            book = responseBook.data
        }
        return `
        <div class="flex border">
            <div class="w-[300px] h-[500px] border-r-4">${Sidebar.render()}</div>
            <div class="flex flex-col justify-center flex-1">
                <h1 class="text-center text-[48px] font-bold">${id ? 'CHỈNH SỬA' : 'TẠO MỚI'} BOOK</h1>
                <form class="flex flex-col justify-around items-center">
                    <div class="flex flex-col text-center">
                        <label>Name</label>
                        <input class='input input-bordered w-[300px] max-w-xs text-center' id='name' value="${book.name}"/>
                    </div>
                    <div class="flex flex-col text-center">
                        <label>Category</label>
                        <select class='input input-bordered w-[300px] max-w-xs text-center' id='categoryId'">
                            ${categories.map((category) =>(
                                    `<option value="${category._id}" ${(category._id == book.categoryId._id) ? `selected` : ``}>
                                        ${category.name}
                                    </option>`
                                )
                            )}
                        </select>
                    </div>
                    <div class="flex flex-col text-center">
                        <label>Price</label>
                        <input class='input input-bordered w-[300px] max-w-xs text-center' id='price' value="${book.price}"/>
                    </div>
                    <div class="flex flex-col text-center">
                    <label>Sale Price</label>
                        <input type="number" class='input input-bordered w-[300px] max-w-xs text-center' id='salePrice' max="100" min="0" value="${book.salePrice || 0}"/>
                    </div>
                    <div>
                        <button type='button' class='btn btn-success my-[10px]'>${id ? 'Cập nhật' : 'Tạo mới'}</button>
                    </div>
                </form>
            </div>
        </div>`


    },
    afterRender: (id) => {
        Sidebar.afterRender();

        const submitBtn = document.querySelector('.btn');
        submitBtn.addEventListener('click', async () => {
            const name = document.querySelector('#name').value;
            const categoryId = document.querySelector('#categoryId').value;
            const price = document.querySelector('#price').value;
            const salePrice = document.querySelector('#salePrice').value;

            const submitData = { name, categoryId, price, salePrice};
            if (id) {
                await updateProduct(id, submitData)
            } else {
                await createProduct(submitData)
            }
            router.navigate('/admin/book');
        });
    }
};