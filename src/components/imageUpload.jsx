import React, { useState, useEffect } from "react";

const CircularImageUploader = ({ onImageUrlChange }) => {
  const [imageUrl, setImageUrl] = useState(null);

const handleImageChange = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    const image = new Image();
    image.src = reader.result;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas size based on image aspect ratio
      canvas.width = image.width;
      canvas.height = image.height;

      ctx.beginPath();
      ctx.arc(
        canvas.width / 2,
        canvas.height / 2,
        Math.min(canvas.width, canvas.height) / 2,
        0,
        Math.PI * 2
      );
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // Convert the canvas content to data URL
      const croppedImageUrl = canvas.toDataURL("image/png");

      // Set the cropped image URL and notify the parent component
      setImageUrl(croppedImageUrl);
      onImageUrlChange(croppedImageUrl);
    };
  };

  if (file) {
    reader.readAsDataURL(file);
  }
};


  const handleDownload = () => {
    if (imageUrl) {
      const img = document.createElement("img");
      img.src = imageUrl;
      img.crossOrigin = "anonymous";

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Set canvas size based on image aspect ratio
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.beginPath();
        ctx.arc(
          canvas.width / 2,
          canvas.height / 2,
          Math.min(canvas.width, canvas.height) / 2,
          0,
          Math.PI * 2
        );
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "cropped_image.png";
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      };
    }
  };

  // Log the imageUrl whenever it changes
  useEffect(() => {
    console.log("Image URL:", imageUrl);
  }, [imageUrl]);

//   console.log(imageUrl);
  sessionStorage.setItem('ImageURL', imageUrl);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      {imageUrl && (
        <div>
          <img
            src={imageUrl}
            alt="Selected"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  );
};

export default CircularImageUploader;
