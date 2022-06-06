import Navigo from "navigo";
import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { Home } from "./pages/home.js";
import { Abouts } from "./pages/abouts.js";
import { News } from "./pages/News.js";
import { Student } from "./pages/Student.js";
import { StudentDetail } from "./pages/StudentDetail.js";
import { StudentAdd } from "./pages/StudentAdd.js";
import { ProductDetail } from "./pages/ProductDetail.js";
import { Product } from "./pages/Product.js";
import { ProductAdd } from "./pages/ProductAdd.js";

const router = new Navigo('/', { linksSelector: 'a' })

const render = async (content, id) => {
    document.querySelector('#header').innerHTML = Header.render();
    document.querySelector('#content').innerHTML = await content.render(id);
    document.querySelector('#footer').innerHTML = Footer.render();

    if (content.afterRender) {
        content.afterRender();
    }
}

router.on({
    '/': () => render(Home),
    '/about': () => render(Abouts),
    '/news': () => render(News),
    '/students': () => render(Student),
    '/students/add': () => render(StudentAdd),
    '/students/detail/:id': (data) => render(StudentDetail, data.data.id),
    '/products': () => render(Product),
    '/products/add': () => render(ProductAdd),
    '/products/detail/:id': (data) => render(ProductDetail, data.data.id),
})



router.resolve();