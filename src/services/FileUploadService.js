import axios from "axios";
import http from "../http-common";

const API_BASE_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:8080';

function upload(file, onUploadProgress) {
  let formData = new FormData();

  formData.append("file", file);

  return axios.post(`${API_BASE_URL}/images`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress,
  });
};

function getFiles() {
  return axios.get(`${API_BASE_URL}/images`);
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService; 