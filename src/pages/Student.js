export  const Student = {
    render: async () => {
        const response = await fetch('https://6291d1e49d159855f0809b0f.mockapi.io/student');
        console.log('response',response);
        const students = await response.json();
        console.log('students', students);

        return `<div class="flex justify-around items-center flex-wrap">
            ${
                students.map((student) => (
                    `<div class="w-[500px] flex text-center flex-col my-[20px]">
                        <div>ID: ${student.id}</div>
                        <div>Name: ${student.name}</div>
                        <div>Email: ${student.email}</div>
                        <div>SDT: ${student.sdt}</div>
                    </div>`
                )).join('')
            }
        </div>`
    },
};