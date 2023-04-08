import { useState, useEffect, useRef } from 'react'
import {Route, Link, Routes, useNavigate} from 'react-router-dom';
import exifr from 'exifr' // => exifr/dist/full.umd.cjs
import axios from 'axios';

import Map from '../../components/Map/Map';

import './CreatePage.scss'
import ImageItem from '../../components/ImageItem/ImageItem';
const { v4: uuid } = require('uuid');

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function CreatePage() {
    const navigate = useNavigate();

    // load user's profile
    const token = sessionStorage.getItem("token");
    const formRef = useRef()
    
    const [images, setImages] = useState([]);
    const [document, setDocument] = useState(0);


    const imageFileList = []

    const [testImageFiles, setTestImageFiles] = useState();

    const [imageFilesUpload, setImageFilesUpload] = useState();
    const [imageSelectConfirm, setImageSelectConfirm] = useState(false);

    const selectImages = (event) => {
        const imageFiles = event.target.files;
        setTestImageFiles(event.target.files)
        const imagesToUpload = [];

        Array.prototype.forEach.call(imageFiles, async (image, i) => {              
            const imageData = await exifr.parse(image, true);
            const imageGpsData = await exifr.gps(image, true);
            const fileExtension = image.name.split('.').pop();
            const id = uuid();

            const newImageFileToUpload = new File([image], `${id}.${fileExtension}`);
            imageFileList.push(newImageFileToUpload);

            const imageObj = {
                image_id: id,
                image_order: i,
                image_title: "",
                image_description: "",
                image_lat: imageGpsData.latitude,
                image_long: imageGpsData.longitude,
                image_date: imageData.CreateDate.valueOf(),
                image_url: URL.createObjectURL(image),
                image_extension: fileExtension
            }

            imagesToUpload.push(imageObj);
        });
        setImageFilesUpload(imageFileList);
        setImages(imagesToUpload);
        console.log(imageFiles);
    };

    const handleOnImageSelect = (event) => {
        setImageSelectConfirm(true);
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const documentId = uuid();

        const formData = new FormData(formRef.current);
        const data = Object.fromEntries(formData);

        const imagesFormData = images;

        for (let i = 0; i < imagesFormData.length; i++) {
            for (const key in data) {
                if (key.includes(`imageTitle${i}`)) {
                    imagesFormData[i].image_title = data[key];
                }
                if (key.includes(`imageDescription${i}`)) {
                    imagesFormData[i].image_description = data[key];
                }
            }
        }

        const documentData = {
            document_id: documentId,
            document_title: data.documentTitle,
            document_description: data.documentDescription,
            document_images: imagesFormData
        }

        const imageFormData = new FormData();

        imageFormData.append("imageData", JSON.stringify(imagesFormData))
        imageFormData.append("documentId", documentId)
        
        for (const single_file of imageFilesUpload) {
            imageFormData.append('images', single_file)
        }

        for (const pair of imageFormData.entries()) {
            console.log(`${pair[0]}, ${pair[1]}`);
          }

        axios.post(`${API_BASE_URL}/document`, documentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }})
            .then((response) => {
                return axios.post(`${API_BASE_URL}/image`, imageFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            })
        .then((response)=>{
            navigate("/");
            event.target.reset();
        })
        .catch(error => console.log(error));
    }

    //Show preloader when no video is downloaded yet
    if (images.length === 0) {
        return (
            <form  action='/images' >
                <div>
                    <p>Get started by selecting some photos to upload</p>
                    <input
                    className="create-page__file-input"
                    name="uploadedImages"
                    type='file'
                    multiple
                    onChange={selectImages}
                    accept="image/*"></input>
                </div>
                <button onClick={handleOnImageSelect}>Confirm</button>
                <Link to='/'><button>Cancel</button></Link>
            </form>
        )
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit} ref={formRef}>
                <input placeholder="Enter a title for this project" name="documentTitle" id="documentTitle"></input>
                <textarea placeholder="Enter a description for this project" name="documentDescription" id="documentDescription"></textarea>
                <Map images={images}/>

                <ImageItem images={images}/>
                <button type="submit">Save</button>
                <button>Cancel</button>
            </form>
        </div>
    )
}