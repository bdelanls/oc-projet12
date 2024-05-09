import { Link } from 'react-router-dom'
import './style.scss'

import Yoga from '../../assets/images/picto-1.png'
import Natation from '../../assets/images/picto-2.png'
import Cyclisme from '../../assets/images/picto-3.png'
import Musculation from '../../assets/images/picto-4.png'

function NavAside() {

    return (
        <aside className="aside">
                <nav>
                    <ul className="aside__menu">
                        <li className="aside__menu--item"><Link to={'/#'}>
                            <img src={Yoga} alt="yoga" />
                        </Link></li>
                        <li className="aside__menu--item"><Link to={'/#'}>
                            <img src={Natation} alt="natation" />
                        </Link></li>
                        <li className="aside__menu--item"><Link to={'/#'}>
                            <img src={Cyclisme} alt="cyclisme" />
                        </Link></li>
                        <li className="aside__menu--item"><Link to={'/#'}>
                            <img src={Musculation} alt="musculation" />
                        </Link></li>
                    </ul>
                </nav>
                <div className="aside__sign">Copiryght, SportSee 2020</div>
            </aside>
    )
}

export default NavAside