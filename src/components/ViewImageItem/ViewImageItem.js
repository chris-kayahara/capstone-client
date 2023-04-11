import placeholderImage from '../../assets/images/default-image.png'

import '../ImageItem/ImageItem.scss'

export default function ViewImageItem(props) {

    const onImageError = (e) => {
        e.target.src = placeholderImage
    }
    const { images } = props;

    function handInputChange() {
        
    }

    return (
        <>
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
                                placeholder="Add Title"
                                value={images[i].image_title}
                                onChange={handInputChange}></input>
                            <textarea
                                name={`imageDescription${i}`}
                                id="image-description"
                                className="image-item__description"
                                placeholder="Add Description"
                                value={images[i].image_description}
                                onChange={handInputChange}></textarea>
                        </div>
                    </article>
            )})}
        </>
    )
}