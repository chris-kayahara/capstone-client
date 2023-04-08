import { useState, useEffect, useRef } from 'react'
import {Route, Link, Routes, useNavigate, useParams} from 'react-router-dom';
import exifr from 'exifr' // => exifr/dist/full.umd.cjs
import axios from 'axios';

import Map from '../../components/Map/Map';

import './ViewPage.scss'
import ViewImageItem from '../../components/ViewImageItem/ViewImageItem';

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function ViewPage() {
    
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

    function handleInputChange(event) {

    }

    //Show select images when no id is provided
    if (images.length === 0) {
        return (
            <div>
                Loading Page
            </div>
        )
    }

    return (
        <div>
            <form ref={formRef}>
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
                <ViewImageItem images={images}/>
            </form>
        </div>
    )
}