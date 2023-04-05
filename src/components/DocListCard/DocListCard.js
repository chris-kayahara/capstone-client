import viewIcon from '../../assets/icons/preview.svg'
import editIcon from '../../assets/icons/edit.svg'
import shareIcon from '../../assets/icons/share.svg'
import deleteIcon from '../../assets/icons/delete.svg'

import './DocListCard.scss'

export default function DocListCard(props) {
    const {
        title,
        date,
        description,
        listImage1,
        listImage2,
        listImage3
    } = props.document;

    return (
        <article className="doc-list-card">
            <h2 className="doc-list-card__title">{title}</h2>
            <p className="doc-list-card__date">{date}</p>
            <p className="doc-list-card__description">{description}</p>
            <div className="doc-list-card__image-container">
                <img className="doc-list-card__image" src={listImage1} alt="preview"/>
                <img className="doc-list-card__image" src={listImage2} alt="preview"/>
                <img className="doc-list-card__image" src={listImage3} alt="preview"/>
            </div>
            <div className="doc-list-card__button-container">
                <div className="doc-list-card__button">
                    <img className="doc-list-card__icon" src={viewIcon} alt="view icon"/>
                </div>
                <div className="doc-list-card__button">
                    <img className="doc-list-card__icon" src={editIcon} alt="edit icon"/>
                </div>
                <div className="doc-list-card__button">
                    <img className="doc-list-card__icon" src={shareIcon} alt="share icon"/>
                </div>
                <div className="doc-list-card__button">
                    <img className="doc-list-card__icon" src={deleteIcon} alt="delete icon"/>
                </div>
            </div>
        </article>
    )
}