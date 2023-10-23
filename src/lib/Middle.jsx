import React, { useState } from "react";
import "./middle.css";
// import papaya from "../assets/papaya_leaf.jpeg";
import ContentLoader from "react-content-loader";
import axios from 'axios';
const Middle = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [data,setdata] = useState('')
  const [active,setActive] = useState('')
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);

    // You can add code here to display the selected image in the UI if needed.
  };

  const handleUpload = async (e) => {
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      // const response = await fetch("http://127.0.0.1:5000/plantidentification", {
      //   method: "POST",
      //   mode:'cors', 
      //   body: formData,
      // });

      // if (response.ok) {
      //   console.log(response)
      //   alert("Image uploaded successfully.");
      //   // You can add further handling for a successful response from the backend.
      // } else {
      //   alert("Image upload failed.");
      //   // Handle errors if needed.
      // }


      e.preventDefault();
             
        setActive(current=>!current)
        try {
            await axios.post("http://127.0.0.1:5000/plantidentification", formData, {
                headers:{
                    'Content-Type': 'image/jpeg'
                }
            }).then(res => {
                console.log(res.data)
            })
        } catch(e) {
            console.log(e)
        }

        try {
            await axios.get("http://127.0.0.1:5000/plantidentification").then(
                res=>{
                    console.log(res.data)
                    setdata(res.data)
                }
            )
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle network or other errors.
    }
   
  };

  return (
    <div className="middle">
      <h1>Let's Begin</h1>
      <h2 className="middle-desc">
        Embark on a life changing journey towards a healthier, happier you.
        <p> Your ayurvedic wellness is just a few clicks way! </p>
      </h2>
      <button className="image">
        <label htmlFor="file">Insert an Image</label>
      </button>
      <input
        type="file"
        id="file"
        className="input-image"
        accept="image/*" // Allow only image files
        onChange={handleImageChange} // Handle image selection
      />
      <button onClick={handleUpload}>Upload</button>

      {!selectedImage ? (
        <div>
          <ContentLoader
            width={1300}
            height={350}
            viewBox="0 0 1200 300"
            backgroundColor="#f5f5f5"
            foregroundColor="#dbdbdb"
          >
            <rect x="0" y="0" rx="3" ry="3" width="350" height="40" />{" "}
            {/* head */}
            <rect x="0" y="60" rx="16" ry="16" width="300" height="300" />{" "}
            {/* image */}
            <rect x="530" y="91" rx="3" ry="3" width="578" height="15" />
            <rect x="530" y="113" rx="3" ry="3" width="502" height="15" />
            <rect x="530" y="139" rx="3" ry="3" width="578" height="15" />
            <rect x="530" y="162" rx="3" ry="3" width="502" height="15" />
            <rect x="530" y="189" rx="3" ry="3" width="578" height="15" />
            <rect x="530" y="216" rx="3" ry="3" width="558" height="15" />
            <rect x="530" y="243" rx="3" ry="3" width="523" height="15" />
            <rect x="530" y="270" rx="3" ry="3" width="340" height="15" />
          </ContentLoader>
        </div>
      ) : (
        <div className="Lower">
          <h1> Miracle Herbs</h1>
          <div className="img">
            {selectedImage && (
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  className="img-leaf"
                  alt="Selected"
                  width={500}
                />
              </div>
            )}
            <h2 className="leaf-desc">
              {data}
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default Middle;
