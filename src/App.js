import "./App.css";
import { useState } from "react";
import { Capture, Preview } from "@nyris/nyris-react-components";
function App() {
  const [showCamera, setShowCamera] = useState(false);
  const [canvas, setCanvas] = useState(null);

  return (
    <div>
      <button onClick={() => setShowCamera(true)} onC>
        open camera
      </button>
      {showCamera && (
        <div>
          <Capture
            onCaptureComplete={(s) => {
              console.log({ s });
              setCanvas(s);
              setShowCamera(false);
            }}
          />
        </div>
      )}
      {canvas && (
        <Preview
          image={canvas}
          selection={{ x1: 0, x2: 1, y1: 0, y2: 1 }}
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
