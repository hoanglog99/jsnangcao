import { getProduct } from "../api/product";
import { formatMoney, formatStatus } from "../helpers/format";

export const ProductDetail = {
    render: async (id) => {
        const response = await getProduct(id);
        const { data } = response;

        return (
            `<div>
            <div>
                <div> ID: ${data.id}</div>
                <div> Name: ${data.name}</div>
                <div> description: ${data.des}</div>
                <div> price: ${formatMoney(data.price)}</div>
                <div> status: ${formatStatus(data.status)}</div>
            </div>
        </div>`
        );
    }
}