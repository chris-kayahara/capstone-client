import viewIcon from '../../assets/icons/preview.svg'
import editIcon from '../../assets/icons/edit.svg'
import shareIcon from '../../assets/icons/share.svg'
import deleteIcon from '../../assets/icons/delete.svg'

import './DocListCard.scss'

export default function DocListCard(props) {

    const title = props.document[0].document_title;
    const date = props.document[0].document_updated_at.substring(0, 10).replaceAll("-", "/");
    const description = props.document[0].document_description;
    const listImage1 = props.document[0].image_url;
    const listImage2 = props.document[1].image_url;
    const listImage3 = props.document[2].image_url;

    return (
        <article className="doc-list-card">
            <div className="doc-list-card__content-container">
                <h2 className="doc-list-card__title">{title}</h2>
                <p className="doc-list-card__date">Created: {date}</p>
                <p className="doc-list-card__description">{description}</p>
                <div className="doc-list-card__image-container">
                    <img className="doc-list-card__image" src={listImage1} alt="preview"/>
                    <img className="doc-list-card__image" src={listImage2} alt="preview"/>
                    <img className="doc-list-card__image" src={listImage3} alt="preview"/>
                </div>
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