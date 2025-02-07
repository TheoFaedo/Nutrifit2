import Scanner from "../Scanner";
import { useState, useRef, useEffect, useCallback } from "react";
import Button from "../Button";
import { getInformationFromBarCode } from "../../services/api-service";
import CameraSwitchButton from "../CameraSwitchButton";
import LeftArrowButton from "../LeftArrowButton";
import { useTranslation } from "react-i18next";
import { BrowserMultiFormatReader, HTMLVisualMediaElement, MultiFormatReader, Result } from "@zxing/library";

type BarcodeScannerDialogProps = {
  quitDialog: Function;
};

const BarcodeScannerDialog = ({ quitDialog }: BarcodeScannerDialogProps) => {
  const { t } = useTranslation("translation", {
    keyPrefix: "BarcodeScanDialog",
  });

  const scannerRef = useRef<CustomBrowserCodeReader | null>(null); // reference to the scanner element in the DOM

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [inCameraChoosing, setInCameraChoosing] = useState(true);
  const [result, setResult] = useState<any | null>(null);

  const scannedBarcodes = useRef<string[]>([]);

  useEffect(() => {
    scannerRef.current = new BrowserMultiFormatReader();

    return () => {
      if (scannerRef && scannerRef.current) {
        scannerRef.current.reset();
      }
    };
  }, []);

  return (
    <div className="dialog z-40 font-inter flex flex-col h-full transition-transform duration-1000 ease-in-out">
      <div className="h-12 gradient-bg flex items-center relative">
        <div className="font-inter font-semibold text-lg pt-1 absolute ml-auto mr-auto top-[20%] left-0 right-0 bottom-0 w-fit">
          {t("DialogTitle")}
        </div>
        <LeftArrowButton quitDialog={() => quitDialog(null)} />
      </div>
      <div className="flex flex-col justify-center flex-grow relative">
        {inCameraChoosing ? (
          cameraError ? (
            <>
              <p className="text-2xl font-inter m-8 text-white font-medium">
                {`Error: ${cameraError}`}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl font-inter m-8 text-white font-medium">
                {t("CameraOpeningAdvert")}
              </p>
              <div className="ml-4 mr-4">
                <Button
                  onClick={() => {
                    setScanning(true);
                    setInCameraChoosing(false);
                  }}
                  name={t("StartReadingButton")}
                />
              </div>
            </>
          )
        ) : (
          <>
            <div style={{ position: "relative", overflow: "hidden" }}>
              {/*<CameraSwitchButton
                action={(e: any) => {
                  e.preventDefault();
                  if (cameraId)
                    setCameraId(
                      next(
                        cameras.map((cam) => cam.deviceId),
                        cameraId
                      )
                    );
                }}
              />*/}
              {scanning ? (
                <Scanner
                  readerRef={scannerRef}
                  cameraId={undefined}
                  onCapture={(_scanned: string) => {
                    if (scannedBarcodes.current.includes(_scanned)) return;

                    getInformationFromBarCode(_scanned).then((res) => {
                      if (res && res.status !== 0) {
                        const product = res.product;

                        const name = product.abbreviated_product_name_fr
                          ? product.abbreviated_product_name_fr
                          : product.product_name_fr
                          ? product.product_name_fr
                          : product.product_name
                          ? product.product_name
                          : "Name not found";

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
                      } else {
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
                <span className="title">{t("ProductFoundMessage")}</span>
              </div>
              <span className="text-white font-inter font-medium text-xl mb-1 mx-1">
                {result ? result.name : ""}
              </span>
              <div className="mx-4 mb-4">
                <Button
                  onClick={() => {
                    setScanning(false);
                    quitDialog(result);
                  }}
                  name={t("ConfirmProductButton")}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/**
 * Custom browser code reader that crops the image before decoding it.
 * This is done to avoid useless other elements in the image and to improve the decoding speed and quality.
 */
export class CustomBrowserCodeReader extends BrowserMultiFormatReader {
  public override decode(element: HTMLVisualMediaElement): Result {
    const binaryBitmap = this.createBinaryBitmap(element);

    // Keep 60% horizontal and 40% vertical of the image to avoid useless elements
    const width = binaryBitmap.getWidth();
    const height = binaryBitmap.getHeight();

    const left = Math.floor(width * 0.2);
    const top = Math.floor(height * 0.3);
    const right = Math.floor(width * 0.8);
    const bottom = Math.floor(height * 0.7);

    const newBinaryBitmap = binaryBitmap.crop(left, top, right - left, bottom - top);

    return this.decodeBitmap(newBinaryBitmap);
  }
}

export default BarcodeScannerDialog;
