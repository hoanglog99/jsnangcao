import { news } from "../news-data"

export const News = {
    render: () =>
    `<div class="flex justify-around items-center">
        ${news.map((tin) => (
            `<div>
                ${tin.content}
            </div>`
        ))
    }</div>`
}