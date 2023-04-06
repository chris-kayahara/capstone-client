import { useState, useEffect } from "react"
import axios from "axios"

import DocListCard from "../../components/DocListCard/DocListCard"
import Header from "../../components/Header/Header"
import ListToolBar from "../../components/ListToolBar/ListToolBar"

import './UserHomePage.scss'

// const userId = "2922c286-16cd-4d43-ab98-c79f698aeab0";

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

export default function UserHomePage({ setIsUserLoggedIn }) {
    const [iat, setIat] = useState();
    
    const [user, setUser] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [sortBy, setSortBy] = useState("updated_at");
    const [orderBy, setOrderBy] = useState("dec");
    const [sortBusy, setSortBusy] = useState(false);


    const logOut = () => {
        sessionStorage.removeItem("token");
        setIsUserLoggedIn(false);
    };

    // load user's profile
    const token = sessionStorage.getItem("token");

    if (!token) {
        // redirect to login!?
        logOut();
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
        // fetchDocuments();
        axios.get(`${API_BASE_URL}/image/user/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }})
            .then((response) => {
                setDocuments(response.data.images)
                const { iat } = response.data.decoded;
                setIat(iat);
                })
            .catch(error => {
                console.log(error)
            })
    }, [token]);

    if (!iat) {
        return <span>Loading user's profile...</span>;
    }

    const documentData = documents.reduce(function (r, a) {
        r[a.document_updated_at] = r[a.document_updated_at] || [];
        r[a.document_updated_at].push(a);
        return r;
    }, Object.create(null));

    const renderedDocuments = []
      
    for (const [key, value] of Object.entries(documentData)) {
        renderedDocuments.push(value);
    }

    return (
        <div className="user-home-page">
            <div className="user-home-page__container">
                <div className="user-home-page__content">
                    <ListToolBar handleSort={handleSort}/>
                    {renderedDocuments.map((document, i) => { // Each document is an array of image objects
                        return (<DocListCard document={document} key={i}/>)
                    })}
                </div>
            </div>
        </div>
    )
}