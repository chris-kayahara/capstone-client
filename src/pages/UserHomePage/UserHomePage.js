import { useState, useEffect } from "react"
import axios from "axios"

import DocListCard from "../../components/DocListCard/DocListCard"
import Header from "../../components/Header/Header"
import ListToolBar from "../../components/ListToolBar/ListToolBar"

import './UserHomePage.scss'

const userId = "2922c286-16cd-4d43-ab98-c79f698aeab0";

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function UserHomePage() {
    
    const [user, setUser] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [sortBy, setSortBy] = useState("updated_at");
    const [orderBy, setOrderBy] = useState("dec");
    const [sortBusy, setSortBusy] = useState(false);

    // Function: Get documents and photos by user
    const fetchDocuments = async () => {
        try {
            setSortBusy(true)
            const documentData = await axios.get(`${API_BASE_URL}/document/user/${userId}?sort_by=${sortBy}&order_by=${orderBy}`);
            const photoData = await axios.get(`${API_BASE_URL}/image/user/${userId}`);

            // Add first three photos of each document to new document object properties: image1 image2 image3
            documentData.data.forEach((document)=> {
                photoData.data.forEach((photo) => {
                    if (photo.document_id === document.id) {
                        if (photo.image_order === 1) {
                            document.listImage1 = photo.image_url
                        }
                    }
                    if (photo.document_id === document.id) {
                        if (photo.image_order === 2) {
                            document.listImage2 = photo.image_url
                        }
                    }
                    if (photo.document_id === document.id) {
                        if (photo.image_order === 3) {
                            document.listImage3 = photo.image_url
                        }
                    }
                })
            })
            setDocuments(documentData.data);
            setSortBusy(false);
        } catch (error) {
            console.log(error);
            setSortBusy(false);
        }
    }

    const handleSort = (sort_by) => {
        if (!sortBusy) {
            if (orderBy === "desc") {
                setOrderBy("asc");
            }  else {
                setOrderBy("desc");
            }
            setSortBy(sort_by);
        }
    }

    // Create useEffect to run at load
    useEffect(() => {
        fetchDocuments();
    }, [])

    return (
        <div className="user-home-page">
            <div className="user-home-page__container">
                <div className="user-home-page__content">
                    <ListToolBar handleSort={handleSort}/>
                    {documents.map((document) => {
                        return (<DocListCard document={document} key={document.id}/>)
                    })}
                </div>
            </div>
        </div>
    )
}