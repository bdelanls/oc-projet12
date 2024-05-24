import './style.scss'
import energyIcon from '../../assets/images/energy.svg'
import chickenIcon from '../../assets/images/chicken.svg'
import appleIcon from '../../assets/images/apple.svg'
import burgerIcon from '../../assets/images/burger.svg'

// Mapping icons to their respective names.
const icons = {
    energy: energyIcon,
    chicken: chickenIcon,
    apple: appleIcon,
    burger: burgerIcon
}

/**
 * Component to display key data card for nutritional and energy values.
 * @param {Object} props - Component props.
 * @param {string} props.type - Type of key data, used for CSS styling.
 * @param {string} props.number - The value to be displayed, like calorie count or grams.
 * @param {string} props.title - The title of the data, such as "Calories" or "Proteins".
 * @param {string} props.icon - The icon name to be displayed corresponding to the data type.
 * @returns {JSX.Element} - Rendered component for key data.
 */
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