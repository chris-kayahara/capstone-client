import { useState, useEffect, useRef } from 'react'
import {Route, Link, Routes, useNavigate, useParams} from 'react-router-dom';
import exifr from 'exifr' // => exifr/dist/full.umd.cjs
import axios from 'axios';

import Map from '../../components/Map/Map';

import './GalleryPage.scss'
import ImageItem from '../../components/ImageItem/ImageItem';
const { v4: uuid } = require('uuid');

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function GalleryPage() {
    
    let { documentId } = useParams();

    const navigate = useNavigate();

    // load user's profile
    const token = sessionStorage.getItem("token");

    const formRef = useRef()
    
    const [images, setImages] = useState([]);
    const [document, setDocument] = useState(0);

    const [imageFilesUpload, setImageFilesUpload] = useState();
    const [imageSelectConfirm, setImageSelectConfirm] = useState(false);
    const imageFileList = []

    // Fetch document details to display 
    useEffect(() => {
        if (!documentId) {
            return;
        }
        axios.get(API_BASE_URL + "/document/" + documentId)
            .then(response => {
                setDocument(response.data);
            })
            .then(response => {
                return axios.get(API_BASE_URL + "/image/document/" + documentId)
            })
            .then(response => {
                setImages(response.data);
            })
            .catch(error => 
                console.log(error))
            }, [documentId])

    const selectImages = (event) => {
        const imageFiles = event.target.files;
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
    };

    const handleOnImageSelect = (event) => {
        setImageSelectConfirm(true);
    }

    function handleInputChange(event) {

    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (!documentId) {
            documentId = uuid();
        }

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

        axios.post(`${API_BASE_URL}/document`, documentData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }})
            .then((response) => {
                axios.post(`${API_BASE_URL}/image`, imageFormData, {
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

    //Show select images when no id is provided
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
                <input 
                    placeholder="Enter a title for this project" 
                    name="documentTitle" 
                    id="documentTitle"
                    value={document.title}
                    onChange={handleInputChange}></input>
                <textarea 
                    placeholder="Enter a description for this project" name="documentDescription" 
                    id="documentDescription"
                    value={document.description}
                    onChange={handleInputChange}></textarea>
                <Map images={images}/>
                <ImageItem images={images}/>
                <button type="submit">Save</button>
                <Link to='/'><button>Cancel</button></Link>
            </form>
        </div>
    )
}