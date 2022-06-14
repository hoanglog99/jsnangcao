import { getCategories } from '../../api/category';
import { getProducts, deleteProduct } from '../../api/product';
import { formatMoney } from '../../helpers/format';
import { reRender } from '../../helpers/reRender';
import { router } from '../../helpers/router';


export const Product = {
    render: async (id) => {
        const responseCategory = await getCategories()
        const categories = responseCategory.data;
        let data
        if (!id) {
            const response = await getProducts();
            data = response.data;
        } else {
            const response = await getProducts(id);
            data = response.data;
        }

        return`
        <div class="ml-[200px] mb-[10px] flex text-center items-center">
            <label class="mr-[10px]">Category</label>
            <select class='input input-bordered w-[300px] max-w-xs text-center' id='categoryId'">
                <option value="" ${(id == "") ? `selected` : ``}>
                    tất cả
                </option>
                ${categories.map((category) => (
                    `<option value="${category._id}" ${(category._id == id) ? `selected` : ``}>
                        ${category.name}
                    </option>`
                ))}
            </select>
        </div >
            <div class="flex justify-around items-center flex-wrap">
                
            ${data.map((book) => (
            `<div class="w-[500px] flex text-center flex-col my-[20px]">
                            <div>Name: ${book.name}</div>
                            <div>Category: ${book.categoryId.name}</div>
                            <div>Price: ${formatMoney(book.price)}</div>
                            <div>Sale Price: ${formatMoney(book.price * (100 - book.salePrice) / 100)}</div>
                            <div>
                                <button class="btn bg-blue-800 border-none" data-id="${book._id}">Chi tiết</button>
                            </div>
                        </div>`
        )).join('')
            }
        </div>`
    },
    afterRender: () => {
        const selectCategory = document.querySelector('#categoryId')
        selectCategory.addEventListener('change', async () => {
            router.navigate(`/${selectCategory.value}`);
        })

        const detailBtn = document.querySelectorAll('.btn.bg-blue-800')
        detailBtn.forEach(btn => {
            btn.addEventListener('click', async () => {
                const btnId = btn.dataset.id;
                router.navigate(`/detail/${ btnId }`);
            })
        });
    }
};