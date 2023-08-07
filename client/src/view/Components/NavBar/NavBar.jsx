import { Link } from 'react-router-dom';
import style from './NavBar.module.css'
import SearchBar from "../../SearchBar/SearchBar";

const NavBar = () =>{
return <div className = {style.mainContainer}>
    
    <Link to="/home">HOME</Link>
    <SearchBar></SearchBar>
    <Link to="/create">FORM</Link>

</div>

}

export default NavBar;