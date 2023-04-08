import { Link } from 'react-router-dom'

import createIcon from '../../assets/icons/add.svg'
import sortIcon from '../../assets/icons/sort.svg'

import './ListToolBar.scss'

export default function ListToolBar() {

    function handleOnClick() {

    }

    return (
        <div className="list-tool-bar">
            <Link to='/gallery' className="list-tool-bar__create-button">
                <img className="list-tool-bar__create-icon" src={createIcon} alt="create-icon"/>
                <p className="list-tool-bar__create-text">CREATE</p>
            </Link>
            <div className="list-tool-bar__sort-container">
                <img className="list-tool-bar__sort-icon" src={sortIcon} alt="sort-icon"/>
            </div>
        </div>
    )
}