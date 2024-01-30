import "./App.css";
import { useState } from "react";
import { Capture, Preview } from "@nyris/nyris-react-components";
import NyrisAPI from "@nyris/nyris-api";
function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [canvas, setCanvas] = useState(null);
  const [imageSelection, setImageSelection] = useState(null);

  const find = (image, region) => {
    const nyrisApi = new NyrisAPI({
      xOptions: "", // it is recommended to not provide from frontend
      apiKey: "", // your api key
      baseUrl: "https://api.nyris.io",
      jpegQuality: 0.9,
      maxHeight: 1024,
      maxWidth: 1024,
    });

    let options = {};

    if (region) {
      options = { cropRect: region };
    }

    return nyrisApi.find(options, image).then((res) => {
      console.log({ res });
    });
  };

  return (
    <div>
      <button onClick={() => setShowCamera(true)} onC>
        open camera
      </button>
      {showCamera && (
        <div>
          <Capture
            onCaptureComplete={(image) => {
              setCanvas(image);
              setShowCamera(false);
              find(image);
            }}
          />
        </div>
      )}
      {canvas && (
        <Preview
          image={canvas}
          onSelectionChange={(region) => {
            setImageSelection(region);
            // use debounce and call
            // find(canvas, region);
          }}
          selection={imageSelection || { x1: 0, x2: 1, y1: 0, y2: 1 }}
          regions={[]}
          minWidth={80}
          minHeight={80}
          maxWidth={255}
          maxHeight={255}
          dotColor={"#FBD914"}
          minCropWidth={60}
          minCropHeight={60}
          rounded={false}
        />
      )}
    </div>
  );
}

export default App;
