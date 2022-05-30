import { Nav } from "./Nav"

export const Header = {
    render: (name = 'PH18507') => 
    `<div>
        <div>${Nav.render()}</div>
    </div>`
}

