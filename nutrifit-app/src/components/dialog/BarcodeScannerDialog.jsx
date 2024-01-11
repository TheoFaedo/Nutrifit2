import Quagga from "@ericblade/quagga2";
import Scanner from "./../Scanner";
import { useState, useRef, useEffect, useCallback } from "react";
import Button from "../Button";
import { enqueueBarCodeRequest } from "../../services/api-service";
import CameraSwitchButton from "../CameraSwitchButton";
import LeftArrowButton from "../LeftArrowButton";
import { drawPhotoSquare } from "../../helpers/canvasHelper";

const BarcodeScannerDialog = ({ quitDialog }) => {
  const [scanning, setScanning] = useState(false); // toggleable state for "should render scanner"
  const [cameras, setCameras] = useState([]); // array of available cameras, as returned by Quagga.CameraAccess.enumerateVideoDevices()
  const [cameraId, setCameraId] = useState(null); // id of the active camera device
  const [cameraError, setCameraError] = useState(null); // error message from failing to access the camera
  const [result, setResult] = useState(null); // list of scanned results
  const scannerRef = useRef(null); // reference to the scanner element in the DOM

  const [inCameraChoosing, setInCameraChoosing] = useState(true);

  // at start, we need to get a list of the available cameras.  We can do that with Quagga.CameraAccess.enumerateVideoDevices.
  // HOWEVER, Android will not allow enumeration to occur unless the user has granted camera permissions to the app/page.
  // AS WELL, Android will not ask for permission until you actually try to USE the camera, just enumerating the devices is not enough to trigger the permission prompt.
  // THEREFORE, if we're going to be running in Android, we need to first call Quagga.CameraAccess.request() to trigger the permission prompt.
  // AND THEN, we need to call Quagga.CameraAccess.release() to release the camera so that it can be used by the scanner.
  // AND FINALLY, we can call Quagga.CameraAccess.enumerateVideoDevices() to get the list of cameras.

  // Normally, I would place this in an application level "initialization" event, but for this demo, I'm just going to put it in a useEffect() hook in the App component.

  /**
   * Chooses the next camera ID in the array.
   *
   * @param {string[]} cameraIds - The array of camera IDs.
   * @param {string} currentId - The current camera ID.
   * @return {string} The next camera ID.
   */
  const next = useCallback((cameraIds, currentId) => {
    if (!currentId) {
      return cameraIds.length > 1 ? cameraIds[1] : cameraIds[0];
    }
    const currentIndex = cameraIds.findIndex((id) => id === currentId);
    const nextIndex = (currentIndex + 1) % cameraIds.length;

    return cameraIds[nextIndex];
  }, []);

  useEffect(() => {
    const enableCamera = async () => {
      await Quagga.CameraAccess.request(null, {});
    };
    const disableCamera = async () => {
      await Quagga.CameraAccess.release();
    };
    const enumerateCameras = async () => {
      const cameras = await Quagga.CameraAccess.enumerateVideoDevices();
      console.log("Cameras Detected: ", cameras);
      return cameras;
    };
    enableCamera()
      .then(disableCamera)
      .then(enumerateCameras)
      .then((cameras) => setCameras(cameras))
      .catch((err) => setCameraError(err));

    return () => disableCamera();
  }, []);

  return (
    <div className="dialog z-40 font-inter flex flex-col h-full transition-transform duration-1000 ease-in-out">
      <div className="h-12 gradient-bg flex items-center relative">
          <div className="font-inter font-semibold text-lg pt-1 absolute ml-auto mr-auto top-[20%] left-0 right-0 bottom-0 w-fit">{"Scan barcode"}</div>
          <LeftArrowButton quitDialog={() => quitDialog(null)}/>
      </div>
      <div className="flex flex-col justify-center flex-grow relative">
      {inCameraChoosing ? (
        cameraError ?
        (
        <>
          <p className="text-2xl font-inter m-8 text-white font-medium">
            {`Error: ${cameraError}`}
          </p>
        </>
        )
        :
        (
        <>
          <p className="text-2xl font-inter m-8 text-white font-medium">
            The application will open the camera
          </p>
          <div className="ml-4 mr-4">
            <Button
              onClick={() => {
                setScanning(true);
                setInCameraChoosing(false);
              }}
              name="Start reading"
            />
          </div>
        </>
        )
        
      ) : (
        <>
          <CameraSwitchButton
            action={(e) => {
              e.preventDefault();
              setCameraId(
                next(
                  cameras.map((cam) => cam.deviceId),
                  cameraId
                )
              );
            }}
          />
          <div ref={scannerRef} style={{ position: "relative" }}>
            {/* <video style={{ width: window.innerWidth, height: 480, border: '3px solid orange' }}/> */}
            <canvas
              className="drawingBuffer"
              style={{
                position: "absolute",
                top: "0px",
                // left: '0px',
                height: "100%",
                width: "100%",
              }}

            />
            {scanning ? (
              <Scanner
                scannerRef={scannerRef}
                cameraId={cameraId}
                onScannerReady={() => {
                  const context = Quagga.canvas.ctx.overlay;
                  const canvas = Quagga.canvas.dom.overlay;

                  drawPhotoSquare(context, canvas);
                }}
                onDetected={(_scanned) => {
                  enqueueBarCodeRequest(_scanned).then((res) => {
                    if (res.status === 1) {
                      const product = res.product;

                      const name = product.abbreviated_product_name_fr
                        ? product.abbreviated_product_name_fr : product.product_name_fr
                        ? product.product_name_fr : product.product_name
                        ? product.product_name : "Name not found";

                      const _result = {
                        name: name,
                        "energy-kcal_100g":
                          product.nutriments["energy-kcal_100g"],
                        carbohydrates_100g: product.nutriments[
                          "carbohydrates_100g"
                        ]
                          ? product.nutriments["carbohydrates_100g"]
                          : 0,
                        fat_100g: product.nutriments["fat_100g"]
                          ? product.nutriments["fat_100g"]
                          : 0,
                        proteins_100g: product.nutriments["proteins_100g"]
                          ? product.nutriments["proteins_100g"]
                          : 0,
                      };

                      setResult(_result);
                    }
                  });
                }}
              />
            ) : null}
          </div>
          <div
            className={
              "z-50 absolute right-2 left-2 rounded-xl bg-stone-700 transform transition-all duration-500 ease-in-out " +
              (result ? "bottom-8" : "-bottom-full")
            }
          >
            <div className="w-full text-center m-1">
              <span className="title">Product Found</span>
            </div>
            <span className="text-white font-inter font-medium text-xl mb-1 mx-1">
              {result ? result.name : ""}
            </span>
            <div className="mx-4 mb-4">
              <Button
                className={"button"}
                onClick={() => {
                  setScanning(false);
                  quitDialog(result);
                }}
                name="Confirm"
              />
            </div>
          </div>
        </>
      )}
      </div>
    </div>
  );
};

export default BarcodeScannerDialog;
