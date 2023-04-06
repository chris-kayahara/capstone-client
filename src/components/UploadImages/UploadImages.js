import { useState } from 'react'
import {Route, Link, Routes, useNavigate} from 'react-router-dom';
import axios from 'axios';
// import EXIF from "exif-js";
import exifr from 'exifr' // => exifr/dist/full.umd.cjs
const { v4: uuid } = require('uuid');

const userId = "2922c286-16cd-4d43-ab98-c79f698aeab0";
const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function UploadImages() {
   
    const navigate = useNavigate();

    const [files, setFiles] = useState([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    // Function to get file extension as a string
    function getFileExtension(filename) {
        var re = /\.[0-9a-z]+$/i; //eslint-disable-line
        var extension = (filename).match(re)[0];
        return extension;
    }

    // Handle cancel
	const goBack = (event) => {
		navigate(-1);
        event.preventDefault();
	}

    const handleOnSubmit = async event => {
        event.preventDefault()

        const imageFormData = new FormData();
        imageFormData.append("images", files);

        const documentResult = await axios.post(`${API_BASE_URL}/document`, {
            userId: userId,
            title: title,
            description: description,
        })

        if (files) {
            Array.prototype.forEach.call(files, async (file) => {              

                const photoData = await exifr.parse(file, true);
                const photoGpsData = await exifr.gps(file, true);

                // console.log(photoData);

                const documentId = uuid();
                const imageId = uuid();
                const fileExtension = getFileExtension(file.name);
                
                const photoDataRequest = {
                    document_id: documentId,
                    image_url: API_BASE_URL + "/image/" + imageId + fileExtension,
                    image_order: 1,
                    image_title: "",
                    image_description: "",
                    image_lat: photoGpsData.latitude,
                    image_long: photoGpsData.longitude,
                    image_date: photoData.CreateDate.valueOf(),
                }

                console.log(photoDataRequest);

            //     EXIF.getData(file, function() {
            //     var exifData = EXIF.pretty(this);
            //     if (exifData) {
            //       console.log(exifData);
            //       console.log(EXIF.getTag(this, "Orientation"));
            //     } else {
            //       console.log("No EXIF data found in image '" + files.name + "'.");
            //     }
            //   });
             });
          }
        // const imageResult = await axios.post(`${API_BASE_URL}/image`, {

        // })

    }

    return (
        <div className="upload-images">
            <h1>Getting started</h1>
            <form className="upload-images__form" onSubmit={handleOnSubmit}>
                <label className="upload-images__label">Title</label>
                <input 
                    name='title'
                    id='title'
                    className="upload-images__input" 
                    type='text' 
                    onChange={e => setTitle(e.target.value)}
                    placeholder='Please enter a title'>
                </input>
                <label className="upload-images__label">Description</label>
                <textarea 
                    name='description'
                    id='description'
                    className="upload-images__textarea" 
                    type='text' 
                    onChange={e => setDescription(e.target.value)}
                    placeholder='Please enter a description'>
                </textarea>
                <input 
                    className="upload-images__file-input" 
                    type='file' 
                    multiple
                    onChange={e => setFiles(e.target.files)} 
                    accept="image/*"></input>
                <button 
                    type="submit" 
                    className="upload-images__button"
                    >Create Project
                </button>
                <button 
                    className="upload-images__cancel-button" 
                    onClick={goBack}
                    >Cancel
                </button>
            </form>

        </div>
    )
}