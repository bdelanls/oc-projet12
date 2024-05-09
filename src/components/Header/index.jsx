import { Link } from 'react-router-dom'
import './style.scss'

import Logo from '../../assets/images/sportSee.png'

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={Logo} alt="SportSee" />
            <nav>
                <ul className="header__menu">
                    <li className="header__menu--item"><Link to={'/#'}>Accueil</Link></li>
                    <li className="header__menu--item"><Link to={'/#'}>Profil</Link></li>
                    <li className="header__menu--item"><Link to={'/#'}>Réglage</Link></li>
                    <li className="header__menu--item"><Link to={'/#'}>Communauté</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header