import { Sidebar } from "../../components/Sidebar"
import { getCategories } from '../../api/category';
import { getProducts, deleteProduct } from '../../api/product';
import { formatMoney } from '../../helpers/format';
import { reRender } from '../../helpers/reRender';
import { router } from '../../helpers/router';

export const ListProductAdmin = {
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

        return `
        <div class="flex border">
            <div class="w-[300px] h-[500px]">${Sidebar.render()}</div>
            <div class="border-l-4 flex flex-1 flex-col">
                <div class="ml-[100px] mb-[10px] flex text-center items-center">
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
                </div>
                <div>
                    <button class="ml-[100px] mb-[20px] btn bg-blue-500 border-none">Thêm mới</button>
                </div>
                <table class="table text-center w-full">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Sale Price</th>
                            <th></th>
                        </tr>
                    </thead>
                ${data.map((book, i) => (
                    `<tbody>
                        <tr> 
                            <th>${i+1}</th>
                            <th>${book.name}</th>
                            <th>${book.categoryId.name}</th>
                            <th>${formatMoney(book.price)}</th>
                            <th>${book.salePrice} %</th>
                            <th>
                                <button class="btn btn-success" data-id="${book._id}">Chỉnh sửa</button>                            
                                <button class="btn bg-red-600 border-none" data-id="${book._id}">xóa</button>
                            </th>
                        </tr>
                    </tbody>`
                )).join('')
                    }
                </table>
            </div> 
        </div>`
    },
    afterRender: () => {
        Sidebar.afterRender();

        const selectCategory = document.querySelector('#categoryId')
        selectCategory.addEventListener('change', async () => {
            router.navigate(`/admin/book/${ selectCategory.value }`);
        })

        const addBtn = document.querySelector('.btn.bg-blue-500')
        addBtn.addEventListener('click', async () => {
            router.navigate('/book/add');
        })

        const updateBtn = document.querySelectorAll('.btn.btn-success')
        updateBtn.forEach(btn => {
            btn.addEventListener('click', async () => {
                const btnId = btn.dataset.id;
                router.navigate(`/book/edit/${ btnId }`);
            })
        });

        const delBtns = document.querySelectorAll('.btn.bg-red-600')
        delBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const btnId = btn.dataset.id;
                await deleteProduct(btnId);
                await reRender('#content', ListProductAdmin);
            })
        });
    }
}