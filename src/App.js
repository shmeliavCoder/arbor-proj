import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';
import FileUpload from './FileUpload/FileUpload';
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [currentImage, setCurrentImage] = useState("https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg")

  useEffect(() => {
    async function fetchFirstImage() {
      try {
        const { data: image } = await axios.get("http://localhost:5000/getImage");
        const fullImageUrl = "https://storage.googleapis.com/eu.artifacts.bamboo-volt-333817.appspot.com/" + image.imagePath
        setCurrentImage(fullImageUrl)
      }
      catch (err) {
        console.log("fetch failed")
      }
    }

    fetchFirstImage();

    
    socket.on(
      "new-image",
      (image) => {
        console.log("new image", image, "work")
        setCurrentImage("https://storage.googleapis.com/eu.artifacts.bamboo-volt-333817.appspot.com/" + image.imagePath)
      }
    );
  }, [])

  return (
    <div className="App">
      <FileUpload />
      <img src={currentImage} />
    </div>
  );
}

export default App;
