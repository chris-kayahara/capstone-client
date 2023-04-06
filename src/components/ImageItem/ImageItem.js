import placeholderImage from '../../assets/images/default-image.png'

import './ImageItem.scss'

export default function ImageItem(props) {

    const onImageError = (e) => {
        e.target.src = placeholderImage
    }

    return (
        <article className="image-item">
            <img 
                className="image-item__image" 
                src={props.imagePreview}
                onError={onImageError}
                />
            <div className="image-item__text-container">
                <input
                    name="image-title[]"
                    id="image-title"
                    className="image-item__title"
                    placeholder="Add Title"></input>
                <textarea
                    name="image-description[]"
                    id="image-description"
                    className="image-item__description"
                    placeholder="Add Description"></textarea>
            </div>
        </article>
    )
}