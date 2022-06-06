export const reRender = async (page) => {
    document.querySelector('#content').innerHTML = await page.render();
    
    if (page.afterRender) page.afterRender()
}