import './style.scss'
import energyIcon from '../../assets/images/energy.svg'
import chickenIcon from '../../assets/images/chicken.svg'
import appleIcon from '../../assets/images/apple.svg'
import burgerIcon from '../../assets/images/burger.svg'

const icons = {
    energy: energyIcon,
    chicken: chickenIcon,
    apple: appleIcon,
    burger: burgerIcon
}

function KeyData({ type, number, title, icon }) {
    return (
        <article className={`data-keydata__card data-keydata__${type}`}>
            <div className="data-keydata__card--picto">
            <img src={icons[icon]} alt={icon} />
            </div>
            <div className="data-keydata__card--data">
                <h3 className="data-keydata__card--number">{number}</h3>
                <p className="data-keydata__card--title">{title}</p>
            </div>
        </article>
    )

}

export default KeyData