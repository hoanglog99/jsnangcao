import { getStudents, deleteStudent } from "../api/student"
import { reRender } from "../helpers/reRender";

export const Student = {
    render: async () => {
        const response = await getStudents();
        const { data } = response;

        return `<div class="flex justify-around items-center flex-wrap">
            ${data.map((student) => (
            `<div class="w-[500px] flex text-center flex-col my-[20px]">
                        <div>ID: ${student.id}</div>
                        <div>Name: ${student.name}</div>
                        <div>Email: ${student.email}</div>
                        <div>SDT: ${student.sdt}</div>
                        <div>
                            <a href="/students/${student.id}">
                                <button class="btn bg-blue-800 border-none">Chi tiết</button>
                            </a>
                            <button class="btn bg-red-600 border-none" data-id="${student.id}">xóa</button>
                        </div>
                    </div>`
        )).join('')
            }
            </div>`
    },
    afterRender: () => {
        const delBtns = document.querySelectorAll('.btn.bg-red-600')
        delBtns.forEach(btn => {
            btn.addEventListener('click',async () => {
                const btnId = btn.dataset.id;

                await deleteStudent(btnId)
                reRender(Student)
            })
        });
    }
};