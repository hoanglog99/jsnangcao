import { createCategory, getCategory, updateCategory } from "../../api/category.js";
import { router } from "../../helpers/router.js";
import { Sidebar } from "../../components/Sidebar.js";

export const CategoryAdd = {
    render: async (id) => {
        let category = {
            name: '', 
        };
        if (id) {
            const responseCategory = await getCategory(id)
            category = responseCategory.data
        }
        return `
        <div class="flex border">
            <div class="w-[300px] h-[500px] border-r-4">${Sidebar.render()}</div>
            <div class="flex flex-col justify-center flex-1">
                <h1 class="text-center text-[48px] font-bold">${id ? 'CHỈNH SỬA' : 'TẠO MỚI'} CATEGORY</h1>
                <form class="flex flex-col justify-around items-center">
                    <div class="flex flex-col text-center">
                        <label>Name</label>
                        <input class='input input-bordered w-[300px] max-w-xs text-center' id='name' value="${category.name}"/>
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

            const submitData = { name };
            if (id) {
                await updateCategory(id, submitData)
            } else {
                await createCategory(submitData)
            }
            router.navigate('/admin/category');
        });
    }
};