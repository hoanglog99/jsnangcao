import Navigo from "navigo";
import { Header } from "./components/Header.js";
import { Footer } from "./components/Footer.js";
import { Home } from "./pages/home.js";
import { Abouts } from "./pages/abouts.js";
import { News } from "./pages/News.js";
import { Student } from "./pages/Student.js";

const router = new Navigo('/', { linksSelector: 'a' })

const render = async (content) => {
    document.querySelector('#header').innerHTML = Header.render();
    document.querySelector('#content').innerHTML = await content;
    document.querySelector('#footer').innerHTML = Footer.render();
}

router.on({
    '/': () => render(Home.render()),
    '/about': () => render(Abouts.render()),
    '/news': () => render(News.render()),
    '/student': () => render(Student.render())
})

router.resolve();