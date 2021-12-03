import React, { useState } from 'react';
import axios from "axios"
import DateTimePicker from 'react-datetime-picker';

const FileUploadPage = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [dateToShow, SetDateToShow] = useState(new Date());


    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
    };

    const handleSubmission = () => {
        const formData = new FormData();

        formData.append('File', selectedFile);
        formData.append('DateTime', dateToShow);

        axios.post('http://localhost:5000/uploadFile', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((response) => {
            console.log("yay")
        }).catch((error) => {
            console.log(error)
        });

        // fetch(
        //     'http://localhost:5000/uploadFile',
        //     {
        //         method: 'POST',
        //         body: formData,
        //         headers: {
        //             "Content-Type": "multipart/form-data"
        //         }
        //     }
        // )
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log('Success:', result);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
    };


    return (
        <div>
            <DateTimePicker
                onChange={SetDateToShow}
                value={dateToShow}
            />
            <input type="file" name="file" onChange={changeHandler} />
            {isFilePicked ? (
                <div>
                    <p>Filename: {selectedFile?.name}</p>
                    <p>Filetype: {selectedFile?.type}</p>
                    <p>Size in bytes: {selectedFile?.size}</p>
                    <p>
                        lastModifiedDate:{' '}
                        {selectedFile?.lastModifiedDate.toLocaleDateString()}
                    </p>
                </div>
            ) : (
                <p>Select a file to show details</p>
            )}
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )
}

export default FileUploadPage