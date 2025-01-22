import { NavLink } from "react-router-dom"

function PageNav() {
    return (
        <nav>
            <ul>
                {/* <li><Link to="/">Home</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/product">Product</Link></li> */}
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/pricing">Pricing</NavLink></li>
                <li><NavLink to="/product">Product</NavLink></li>
            </ul>
        </nav>
    )
}

export default PageNav
