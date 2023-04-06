import { useState, useEffect } from 'react'
import {Route, Link, Routes, useNavigate} from 'react-router-dom';
import exifr from 'exifr' // => exifr/dist/full.umd.cjs
import axios from 'axios';

import Header from '../../components/Header/Header'
import UploadImages from '../../components/UploadImages/UploadImages';
import Map from '../../components/Map/Map';

import './CreatePage.scss'
import ImageItem from '../../components/ImageItem/ImageItem';
const { v4: uuid } = require('uuid');

export default function CreatePage() {

    const [document, setDocument] = useState(null);
    const [images, setImages] = useState([]);
    const [imageSelectConfirm, setImageSelectConfirm] = useState(false);

    const selectImages = (event) => {
        const userImages = event.target.files;
        const imagesToUpload = [];

        Array.prototype.forEach.call(userImages, async (image, i) => {              
            const imageData = await exifr.parse(image, true);
            const imageGpsData = await exifr.gps(image, true);

            const imageObj = {
                image_order: i,
                image_title: "",
                image_description: "",
                image_lat: imageGpsData.latitude,
                image_long: imageGpsData.longitude,
                image_date: imageData.CreateDate.valueOf(),
                image_preview: URL.createObjectURL(image)
            }

            imagesToUpload.push(imageObj);
        });
        setImages(imagesToUpload);
        console.log(imagesToUpload);
    };

    const handleOnImageSelect = (event) => {
        setImageSelectConfirm(true);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();

        const documentData = {
            title: event.target.title.value,
            description: event.target.description.value
        }

        const imageData = [];

        

        console.log(documentData);
    }

    //Show preloader when no video is downloaded yet
    if (images.length === 0) {
        return (
            <div>
                <div>
                    <p>Get started by selecting some photos to upload</p>
                    <input
                    className="create-page__file-input"
                    type='file'
                    multiple
                    onChange={selectImages}
                    accept="image/*"></input>
                </div>
                <button onClick={handleOnImageSelect}>Confirm</button>
                <Link to='/'><button>Cancel</button></Link>
            </div>
        )
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <input placeholder="Enter a title for this project" name="title" id="title"></input>
                <textarea placeholder="Enter a description for this project" name="description" id="description"></textarea>
                <Map images={images}/>
                {images.map((image, i) => {
                    return <ImageItem imagePreview={image.image_preview} alt={"image-" + i} key={i} />
                })}
                <button type="submit">Save</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}