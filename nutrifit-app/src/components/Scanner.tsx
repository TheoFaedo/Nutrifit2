import { useEffect, useRef } from "react";
import { drawPhotoSquare } from "../helpers/canvasHelper";
import { CustomBrowserCodeReader } from "./dialog/BarcodeScannerDialog";

export type ScannerProps = {
  onCapture?: (barcode: string) => void;
  readerRef: React.MutableRefObject<CustomBrowserCodeReader | null>;
  cameraId: string | undefined;
};

export function Scanner({ onCapture, readerRef, cameraId }: ScannerProps) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const reader = readerRef.current;

  useEffect(() => {
    if(reader){

      let videoConstraints: MediaTrackConstraints;
      if (!cameraId) {
        videoConstraints = { facingMode: 'environment' };
      } else {
        videoConstraints = { deviceId: { exact: cameraId } };
      }

      videoConstraints = { ...videoConstraints, 
        width: { ideal: 1280 },
        height: { ideal: 720 }, 
        facingMode: 'environment',
      };

      const constraints: MediaStreamConstraints = { video: videoConstraints };

      reader.decodeFromConstraints(constraints, 'video', (result, error) => {
        if (result) {
          onCapture?.(result.getText());
        }
      });

      if(canvasRef && canvasRef.current){
        const context = canvasRef.current.getContext('2d');
        if(context){
          console.log("Drawing photo square");
          drawPhotoSquare(context, canvasRef.current);
        }
      }

      return () => {
        if (reader) {
          reader.reset();
        }
      };
    }
  }, [reader, cameraId, onCapture]);

  return (
    <>
      <video className="" id="video" style={{
        width: "100%"
      }}></video>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
        <canvas id="canvas" width="600" height="600" style={{zIndex: "10", width:"80%"}} ref={canvasRef}></canvas>
      </div>
    </>
  );
}

export default Scanner;
