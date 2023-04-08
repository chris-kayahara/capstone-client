import placeholderImage from '../../assets/images/default-image.png'

import './ImageItem.scss'

export default function ImageItem(props) {

    const onImageError = (e) => {
        e.target.src = placeholderImage
    }
    const { images } = props;

    return (
        <div>
            {images.map((image, i) => {
                return (
                    <article key={`image${i}`} className="image-item">
                        <img
                            className="image-item__image"
                            src={image.image_url}
                            onError={onImageError}
                            />
                        <div className="image-item__text-container">
                            <input
                                name={`imageTitle${i}`}
                                id="image-title"
                                className="image-item__title"
                                placeholder="Add Title"></input>
                            <textarea
                                name={`imageDescription${i}`}
                                id="image-description"
                                className="image-item__description"
                                placeholder="Add Description"></textarea>
                        </div>
                    </article>
            )})}
        </div>
    )
}