import React, { useEffect, useState } from "react";

function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  }

  return ((r << 16) | (g << 8) | b).toString(16);
}

function ColorPicker() {
  const [color, setColor] = useState("");
  const [appliedColor, setAppliedColor] = useState("");

  useEffect(() => {
    let canvasEl = document.getElementById("picker");
    let canvasContext = canvasEl.getContext("2d");

    let image = new Image(350, 350);
    image.onload = () =>
      canvasContext.drawImage(image, 0, 0, image.width, image.height);
    image.src = "../color-picker-2.png";

    canvasEl.onclick = function (mouseEvent) {
      let imgData = canvasContext.getImageData(
        mouseEvent.offsetX,
        mouseEvent.offsetY,
        1,
        1
      );
      let rgba = imgData.data;

      // debugger;

      console.log(rgba);
      // const _rbga = `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
      console.log(rgba);
      console.log(rgbToHex(rgba[0], rgba[1], rgba[2]));
      const hexColor = rgbToHex(rgba[0], rgba[1], rgba[2]);
      setAppliedColor(`#${hexColor}`);
    };
  }, []);

  function handleForm(event) {
    event.preventDefault();
    // setColor(_color);
    // debugger;
    // const _color = event.target.value;
    if (!/^#[a-f0-9]{2}[a-f0-9]{2}[a-f0-9]{2}$/gi.test(color)) {
      alert("Invalid Color Code");
    }

    setAppliedColor(color);

    // setColor(_color);
  }

  return (
    <div className="container" style={{ backgroundColor: appliedColor }}>
      <form onSubmit={handleForm}>
        <input
          type="text"
          name="color"
          placeholder="Enter color (hex value e.g #e3e3e3)"
          value={color}
          onChange={(event) => setColor(event.target.value)}
        />
      </form>
      <canvas
        id="picker"
        className="color-canvas"
        width="350"
        height="350"
      ></canvas>
    </div>
  );
}

export default ColorPicker;
