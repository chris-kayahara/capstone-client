import { Link } from 'react-router-dom'

import createIcon from '../../assets/icons/add.svg'
import sortIcon from '../../assets/icons/sort.svg'

import './ListToolBar.scss'

export default function ListToolBar() {
    return (
        <div className="list-tool-bar">
            <Link className="list-tool-bar__create-button">
                <img className="list-tool-bar__create-icon" src={createIcon}/>
                <p className="list-tool-bar__create-text">CREATE</p>
            </Link>
            <div className="list-tool-bar__sort-container">
                <img className="list-tool-bar__sort-icon" src={sortIcon}/>
            </div>
        </div>
    )
}