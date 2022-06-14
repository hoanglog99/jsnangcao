export const reRender = async (elementRender, page, id) => {
    document.querySelector(elementRender).innerHTML = await page.render(id);
    
    if (page.afterRender) page.afterRender()
}