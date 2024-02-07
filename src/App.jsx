import React, { useState } from "react";
import CircularImageUploader from "./components/imageUpload";

export default function App() {
  const [qrColor, setQrColor] = useState("#ff009e"); // State to hold the QR code color

  const [qrType, setQrType] = useState("rounded");

  const handleQrType = (e) => {
    setQrType(e.target.value);
  };

  const handleColorChange = (e) => {
    setQrColor(e.target.value); // Update the QR code color when the user selects a new color
  };
  // console.log(imageUrl);
  const ImageURL = sessionStorage.getItem("ImageURL");
  console.log("Suno na mai hu yaha pr ", ImageURL);
  function generateQRCode() {
    var inputText = document.getElementById("inputText").value;
    var url = inputText;

    var element = document.getElementById("qrcode");
    element.innerHTML = "";

    const qrcode = new QRCodeStyling({
      width: 300,
      height: 300,
      type: "png", // Set the output type to PNG
      data: url,
      // image:ImageURL,
      dotsOptions: {
        color: qrColor,
        type: qrType,
      },
      backgroundOptions: {
        color: "#ffffff",
      },
      imageOptions: {
        crossOrigin: "anonymous",
        imageSize: 0.4,
        margin: 0,
      },
      qrOptions: {
        errorCorrectionLevel: "H",
      },
    });

    qrcode.append(element);
}


function downloadQR() {
  var qrCodeElement = document.getElementById("qrcode");

  // Create a temporary canvas element
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  // Set canvas dimensions to match the QR code element
  canvas.width = qrCodeElement.offsetWidth;
  canvas.height = qrCodeElement.offsetHeight;

  // Convert the QR code SVG to a PNG image
  var svgString = new XMLSerializer().serializeToString(qrCodeElement.firstChild);
  var img = new Image();
  img.onload = function() {
      // Draw the image onto the canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert canvas to PNG image data
      var pngData = canvas.toDataURL("image/png");

      // Create download link
      var downloadLink = document.createElement("a");
      downloadLink.href = pngData;
      downloadLink.download = "image.png";

      // Trigger download
      downloadLink.click();
  };
  img.src = "data:image/svg+xml;base64," + btoa(svgString);
}


  // generateQRCode();

  return (
    // <h1 className="text-3xl font-bold underline">
    //   Hello world!
    // </h1>

    <>
      {/* <div>
      <h1>Upload Circular Image</h1>
      <CircularImageUploader />
    </div> */}

      <div className="bg-slate-900 text-white min-h-screen pb-10">
        <div className="text-center md:text-6xl text-5xl pt-20">
          QR Generator
        </div>


        <div className="flex justify-center ">
        <input
          type="color"
          value={qrColor}
          onChange={handleColorChange}
          className="mt-4 mr-2 rounded "
        />
        <select
          value={qrType}
          onChange={handleQrType}
          className="mt-4 text-black rounded "
        >
          <option value="square">Square</option>
          <option value="rounded">Rounded</option>
          <option value="dots">Dots</option>
          <option value="classy">Classy</option>
          <option value="classy-rounded">Classy Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
                  </div>
        
        <div className="flex justify-center pt-10">
          <div className="bg-[#FF5C5C] h-[50px] w-[180px] rounded-[10px] m-1 md:w-[250px] md:h-[70px] text-center">
            <div class="flex items-center justify-center h-full">
              <p class="text-center text-xl md:text-2xl">Home</p>
            </div>
          </div>
          <div className="bg-[#FF5C5C] h-[50px] w-[180px] rounded-[10px] m-1 md:w-[250px] md:h-[70px] text-center">
            <div class="flex items-center justify-center h-full">
              <p class="text-center text-xl md:text-2xl">Explore</p>
            </div>
          </div>
        </div>

        <div className="md:flex md:flex-row items-end justify-center pt-1 mx-20 hidden">
          {/* function to generate the qr code  */}
          <div
            className="bg-[#FF5C5C] h-[50px] w-[180px] rounded-[10px] mx-2 md:w-[300px] md:h-[70px] text-center "
            onClick={generateQRCode}
            id="generateButton"
          >
            <div className="flex items-center justify-center h-full">
              <p className="text-center text-xl md:text-2xl">Generate</p>
            </div>
          </div>{" "}
          {/* this block will redirect the user to another page to create their own qr by selecting the image as well  */}
          <div className="bg-[#FF5C5C] h-[67px] w-[368px] rounded-[10px] md:w-[865px] md:h-[120px] text-center">
            <div class="flex items-center justify-center h-full">
              <p class="text-center text-xl md:text-3xl">
                Create on your own !
              </p>
            </div>
          </div>
          {/* block function to download the generated qr code  */}
          <div className="bg-[#FF5C5C] h-[50px] w-[180px] rounded-[10px] mx-2 md:w-[300px] md:h-[70px] text-center">
            <div
              class="flex items-center justify-center h-full"
              onClick={downloadQR}
            >
              <p class="text-center text-xl md:text-2xl">Download</p>
            </div>
          </div>{" "}
        </div>
        {/* ends here  */}

        <div className="flex flex-row items-end justify-center pt-1 md:hidden">
          <div className="bg-[#FF5C5C] h-[67px] w-[368px] rounded-[10px] md:w-[865px] md:h-[120px] text-center">
            <div class="flex items-center justify-center h-full">
              <p class="text-center text-xl md:text-3xl">
                Create on your own !
              </p>
            </div>
          </div>
        </div>

        {/* starts here  */}

        <div className="flex flex-col items-center justify center m-2 md:flex-row md:mx-20">
        <div className="bg-white md:w-full w-[368px] h-[320px] m-1 rounded-lg text-center ">
            <div className="flex items-center justify-center h-full">
              <textarea
                className="text-black h-full w-full p-2 rounded-lg focus:outline-none overflow:hidden resize-none "
                name="inputText"
                id="inputText"
                placeholder="Enter the text here"
              ></textarea>{" "}
            </div>
          </div>

          <div
            className="md:hidden"
            onClick={generateQRCode}
            id="generateButton"
          >
            <div className="bg-[#FF5C5C] h-[67px] w-[368px] rounded-[10px] md:w-[865px] md:h-[120px] text-center">
              <div class="flex items-center justify-center h-full">
                <p class="text-center text-xl md:text-3xl">Generate</p>
              </div>
            </div>
          </div>

          
          <div className="bg-white md:w-full w-[368px] h-[320px] m-1 rounded-lg text-center">
            <div class="flex items-center justify-center h-full">
              <div
                class="d-flex align-items-center flex-column m-2"
                id="qrcode"
              ></div>
              {/* <p class="text-center text-xl md:text-2xl text-black">
                Yaha par qr code dikhega
              </p> */}
            </div>
          </div>

          <div className="flex flex-row items-end justify-center pt-1 md:hidden">
          <div className="bg-[#FF5C5C] h-[67px] w-[368px] rounded-[10px] md:w-[865px] md:h-[120px] text-center">
            <div
              class="flex items-center justify-center h-full"
              onClick={downloadQR}
            >
              <p class="text-center text-xl md:text-3xl">Download</p>
            </div>
          </div>
        </div>


        </div>

        {/* ends here  */}

      </div>
    </>
  );
}
