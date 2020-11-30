import React, { useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function FileUpload({onSubmit}) {
    const [file, setFile] = useState(''); // storing the uploaded file
    const [data, getFile] = useState({ name: "", path: "" }); // storing the received file from backend
    const el = useRef(); // accesing input element
    const handleChange = (e) => {
        const file = e.target.files[0]; // accesing file
        console.log(file);
        setFile(file); // storing file
    }
    const uploadFile = () => {
        const formData = new FormData();        
        formData.append('file', file); // appending file
        axios.post('/api/schedule/fileupload', formData, {}).then(res => {
            console.log(res.data.path);
            getFile({ name: res.data.name,
                     path: res.data.path
                   });
            onSubmit();
        }).catch(err => console.log(err))}
    return (
        <div>
            <div className="file-upload">
                <input type="file" ref={el} onChange={handleChange} />                
                <Button onClick={uploadFile} className="upbutton">                   
                Upload
                </Button>
            </div>
        </div>
    );
}
export default FileUpload;