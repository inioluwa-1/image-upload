import { useState } from 'react'
import axios from 'axios'
// import React from 'react'

const Imageupload = () => {
    const [file, setFile] = useState(null);
    const [first, setfirst] = useState("");  

    const handleFileChange = (e) => {
        let Userfile = e.target.files[0];

        let convertedfile = new FileReader();
        convertedfile.readAsDataURL(Userfile);

        convertedfile.onload = () => {
            setFile(convertedfile.result);
        };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(file);
        
        axios.post("https://server-fcy2.onrender.com/upload", {file})
        .then((res) => {
            console.log(res.data);
            setfirst(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
  return (
    <>
        <section>
            <h1>upload image</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">upload</button>
            </form>
            <br />
            <div>
                <img src={first} width="500" height="500" alt=""/>
            </div>
        </section>
    </>
  )
}

export default Imageupload