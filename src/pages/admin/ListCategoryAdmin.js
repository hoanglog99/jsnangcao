import { Sidebar } from "../../components/Sidebar"
import { deleteCategory, getCategories } from '../../api/category';
import { reRender } from '../../helpers/reRender';
import { router } from '../../helpers/router';

export const ListCategoryAdmin = {
    render: async () => {
        const responseCategory = await getCategories()
        const categories = responseCategory.data;

        return `
        <div class="flex border">
            <div class="w-[300px] h-[500px]">${Sidebar.render()}</div>
            <div class="border-l-4 flex flex-1 flex-col">
                <div>
                    <button class="ml-[100px] my-[20px] btn bg-blue-500 border-none">Thêm mới</button>
                </div>
                <table class="table text-center w-full">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th></th>
                        </tr>
                    </thead>
                ${categories.map((category, i) => (
                    `<tbody>
                        <tr> 
                            <th>${i+1}</th>
                            <th>${category.name}</th>
                            <th>
                                <button class="btn btn-success" data-id="${category._id}">Chỉnh sửa</button>                            
                                <button class="btn bg-red-600 border-none" data-id="${category._id}">xóa</button>
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

        const addBtn = document.querySelector('.btn.bg-blue-500')
        addBtn.addEventListener('click', async () => {
            router.navigate('/category/add');
        })

        const updateBtn = document.querySelectorAll('.btn.btn-success')
        updateBtn.forEach(btn => {
            btn.addEventListener('click', async () => {
                const btnId = btn.dataset.id;
                router.navigate(`/category/edit/${ btnId }`);
            })
        });

        const delBtns = document.querySelectorAll('.btn.bg-red-600')
        delBtns.forEach(btn => {
            btn.addEventListener('click', async () => {
                const btnId = btn.dataset.id;
                await deleteCategory(btnId);
                await reRender('#content', ListCategoryAdmin);
            })
        });
    }
}