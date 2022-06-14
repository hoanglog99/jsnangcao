import { router } from "../helpers/router";

export const Sidebar = {
    render: () =>
        `
            <div class="flex flex-col justify-center">
                <div class="flex h-[50px] text-center justify-center items-center text-[20px] font-bold">
                    QUẢN TRỊ
                </div>
                <hr>
                <div class="flex h-[50px] text-center justify-center items-center hover">
                    <button id="book">Book</button>
                </div>
                <div class="flex h-[50px] text-center justify-center items-center hover">
                    <button id="category">Category</button>
                </div>
            </div>
        `,
    afterRender: () => {
        const bookBtn = document.querySelector('#book')
        bookBtn.addEventListener('click', async () => {
            router.navigate('/admin/book');
        })

        const categoryBtn = document.querySelector('#category')
        categoryBtn.addEventListener('click', async () => {
            router.navigate('/admin/category');
        })
    }

}