import { useState, useEffect, useRef } from 'react'
import axios from 'axios'

const Imageupload = () => {
    const [file, setFile] = useState(null);
    const [images, setImages] = useState([]);
    const [uploadStatus, setUploadStatus] = useState(""); 
    const fileInputRef = useRef(null);

    useEffect(() => {
        axios.get("https://server-fcy2.onrender.com/images")
            .then((res) => {
                setImages(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

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
        setUploadStatus("Uploading...");
        axios.post("https://server-fcy2.onrender.com/upload", { file })
            .then((res) => {
                if (res.data && res.data.url) {
                    setImages(prev => [res.data.url, ...prev]);
                    setUploadStatus("Upload successful!");
                } else {
                    setUploadStatus("Upload failed!");
                }
                axios.get("https://server-fcy2.onrender.com/images")
                    .then((res) => setImages(res.data));
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = null;
                }
                setTimeout(() => setUploadStatus(""), 2000); 
            })
            .catch((err) => {
                console.log(err);
                setUploadStatus("Upload failed!");
                setTimeout(() => setUploadStatus(""), 2000);
            })
    }

    return (
        <>
            <section style={{ maxWidth: '600px', margin: '40px auto', padding: '24px', background: '#f9f9f9', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>Upload File</h1>
                <form 
    onSubmit={handleSubmit} 
    style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', marginBottom: '32px' }}
>
    <input
    type="file"
    accept="image/*,video/*,audio/*,application/pdf"
    onChange={handleFileChange}
    ref={fileInputRef}
    style={{ padding: '8px', borderRadius: '6px', border: '1px solid #ccc', width: '80%' }}
/>
    <button 
        type="submit" 
        style={{ padding: '10px 24px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
    >
        Upload
    </button>
</form>
{uploadStatus && (
    <div style={{ textAlign: 'center', marginBottom: '16px', color: '#007bff', fontWeight: 'bold' }}>
        {uploadStatus}
    </div>
)}
<h2 style={{ textAlign: 'center', margin: '32px 0 16px', color: '#444' }}>Uploaded Files</h2>
<div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', minHeight: '100px' }}>
    {images.length === 0 ? (
        <p style={{ color: '#888', fontStyle: 'italic' }}>No files uploaded yet.</p>
    ) : (
        images.map((url, idx) => {
    if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return <img key={idx} src={url} width="200" height="200" alt="" style={{ borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }} />;
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
        return <video key={idx} src={url} width="200" height="200" controls style={{ borderRadius: '8px', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }} />;
    } else if (url.match(/\.(mp3|wav|aac)$/i)) {
        return <audio key={idx} src={url} controls style={{ width: '200', margin: '10px' }} />;
    } else if (url.match(/\.pdf$/i)) {
        return <a key={idx} href={url} target="_blank" rel="noopener noreferrer" style={{ width: '200', margin: '10px', display: 'block', color: '#007bff', fontWeight: 'bold' }}>View PDF</a>;
    } else {
        return <a key={idx} href={url} target="_blank" rel="noopener noreferrer">{url}</a>;
    }
})
    )}
</div>
            </section>
        </>
    )
}

export default Imageupload