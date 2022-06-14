import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { ProductDetail } from "./pages/client/ProductDetail.js";
import { Product } from "./pages/client/Product.js";
import { ProductAdd } from "./pages/admin/ProductAdd.js";
import { Cart } from "./pages/client/Cart.js";
import { router } from "./helpers/router.js";
import { ListProductAdmin } from "./pages/admin/ListProductAdmin.js";
import { ListCategoryAdmin } from "./pages/admin/ListCategoryAdmin.js";
import { CategoryAdd } from "./pages/admin/CategoryAdd.js";


const render = async (content, id) => {
    document.querySelector('#header').innerHTML = Header.render();
    document.querySelector('#content').innerHTML = await content.render(id);
    document.querySelector('#footer').innerHTML = Footer.render();

    if (content.afterRender) {
        content.afterRender(id);
    }
}

router.on({
    '/': () => render(Product),
    '/:id': (data) => render(Product, data.data.id),
    '/detail/:id': (data) => render(ProductDetail, data.data.id),
    '/book/add': () => render(ProductAdd),
    '/book/edit/:id': (data) => render(ProductAdd, data.data.id),
    '/admin/book': () => render(ListProductAdmin),
    '/admin/book/:categoryId': (data) => render(ListProductAdmin, data.data.categoryId),
    '/admin/category': () => render(ListCategoryAdmin),
    '/category/add': () => render(CategoryAdd),
    '/category/edit/:id': (data) => render(CategoryAdd, data.data.id),
    '/cart/detail': ()=> render(Cart)
})



router.resolve();