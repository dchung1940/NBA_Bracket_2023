import "./Navbar.css";
import {Link, useMatch, useResolvedPath} from "react-router-dom";


function Navbar(){

    return (
        <div>
            <ul className = "navbar">
                <CustomLink to = "/">About</CustomLink> 
                <CustomLink to = "/bracket">Bracket</CustomLink>
                <CustomLink to = "/stat">Statistics</CustomLink>
            </ul>
            
        </div>
    )
}

function CustomLink(props){
// Gives actual absolute path
    const resolvedpath = useResolvedPath(props.to)
    // Checks if the current path matches the URL
    const isActive = useMatch({path:resolvedpath.pathname,end:true})
return(
    <li className = {isActive? "active" : ""}>
        <Link to = {props.to}>
            {props.children}
        </Link>
    </li>
    )

}

export default Navbar;