import React, { useRef, useCallback, useState, useEffect } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const initalData = {
  photo: "",
  croppedPhoto: "",
  photoError: "",
  croppedPhotoError: "",
};
const initialCrop = {
  unit: "px",
  x: 130,
  y: 50,
  width: 400,
  height: 500,
};
interface initialProps {
  onImageSelected: (
    imageData: string,
    cropImage: string,
    caption: string,
  ) => void;
  cropRequired?: boolean;
  captionRequired?: boolean;
  clearData?: boolean;
  clearImageResetHandler: () => void;
}
const ImageUploadSimple: React.FC<initialProps> = React.memo(
  (props: initialProps) => {
    const { cropRequired, clearData, clearImageResetHandler } = props;
    const [uploadData, setUploadData] = useState(initalData);
    const inputRefSign = useRef() as React.MutableRefObject<HTMLInputElement>;
    const [crop, setCrop] = useState<any>();
    const [croppedImageUrl, setcroppedImageUrl] = useState<any>("");
    const [caption, setCaption] = useState("");
    const imgRef = useRef<any>(null);
    useEffect(() => {
      if (cropRequired) {
        setCrop(initialCrop);
      }
    }, [cropRequired]);
    useEffect(() => {
      props.onImageSelected(uploadData.photo, croppedImageUrl, caption);
      // eslint-disable-next-line
    }, [caption, croppedImageUrl, uploadData.photo]);

    useEffect(() => {
      if (clearData) {
        setUploadData(initalData);
        setCrop(initialCrop);
        setcroppedImageUrl("");
        setCaption("");
        inputRefSign.current.value = "";
        imgRef.current = null;
        clearImageResetHandler();
      }
    }, [clearData, clearImageResetHandler]);

    const checkValidation = (
      filedata: any,
      name: string,
      errorName: string,
      ref: React.MutableRefObject<HTMLInputElement>,
    ) => {
      if (
        filedata.type !== "image/jpeg" &&
        filedata.type !== "image/jpg" &&
        filedata.type !== "image/png"
      ) {
        setUploadData((prevState) => ({
          ...prevState,
          [errorName]: "Select Valid Image file",
          [name]: "",
        }));
        ref.current.value = "";
        return false;
      }

      const fileSize =
        parseFloat(filedata.size.toString()) / parseFloat("1024");
      if (fileSize > 200) {
        setUploadData((prevState) => ({
          ...prevState,
          [errorName]: "File Size cannot be greater than 200KB",
          [name]: "",
        }));
        ref.current.value = "";
        return false;
      }

      return true;
    };

    const uploadChangedHandler = useCallback(
      (
        e: React.ChangeEvent<HTMLInputElement>,
        name: string,
        errorName: string,
        ref: React.MutableRefObject<HTMLInputElement>,
      ) => {
        let files = e.target.files;
        if (!files || !files[0]) return;

        const filedata = files[0];
        if (checkValidation(filedata, name, errorName, ref)) {
          let reader = new FileReader();
          reader.readAsDataURL(filedata);

          reader.onload = (e: any) => {
            setUploadData((prevState) => ({
              ...prevState,
              [name]: e.target.result,
              [errorName]: "",
            }));
          };
        }
      },
      [],
    );

    const onLoad = useCallback((img) => {
      imgRef.current = img;
    }, []);

    const onCropComplete = (crop: any) => {
      makeClientCrop(crop);
    };

    const makeClientCrop = async (crop: any) => {
      if (uploadData.photo && crop.width && crop.height) {
        const croppedImageUrl = await getCroppedImg(imgRef.current, crop);

        setcroppedImageUrl(croppedImageUrl);
      }
    };

    const getCroppedImg = (image: any, crop: any) => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx: any = canvas.getContext("2d");

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height,
      );
      return new Promise((resolve, reject) => {
        // As Base64 string
        const base64Image = canvas.toDataURL("image/jpeg");
        resolve(base64Image);
      });
    };
    // eslint-disable-next-line
    return (
      <div>
        <div>
          <input
            type="file"
            accept="image/*"
            ref={inputRefSign}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              uploadChangedHandler(e, "photo", "photoError", inputRefSign);
            }}
          />
          <br />
          <span style={{ color: "red", fontWeight: "bold" }}>
            {uploadData.photoError}
          </span>
        </div>
        <div>
          {props.cropRequired ? (
            <React.Fragment>
              <div className="row">
                <div className="col-sm">
                  {uploadData.photo && uploadData.photo !== "" && (
                    <div
                      style={{
                        border: "1px",
                        borderStyle: "solid",
                        margin: "10px",
                      }}>
                      <div
                        style={{
                          padding: "10px 5px 10px 5px",
                          width: "100%",
                          backgroundColor: "#ebebeb",
                        }}>
                        Uploaded Image
                      </div>
                      <div style={{ padding: "10px" }}>
                        <ReactCrop
                          src={uploadData.photo}
                          crop={crop}
                          onImageLoaded={onLoad}
                          onChange={(newCrop) => {
                            setCrop(newCrop);
                          }}
                          onComplete={onCropComplete}
                          minWidth={400}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </React.Fragment>
          ) : (
            <div className="row">
              <div className="col-sm">
                {uploadData.photo && uploadData.photo !== "" && (
                  <div
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      margin: "10px",
                    }}>
                    <div
                      style={{
                        padding: "10px 5px 10px 5px",
                        width: "100%",
                        backgroundColor: "#ebebeb",
                      }}>
                      <b>Uploaded Image:</b>
                    </div>
                    <div style={{ padding: "10px" }}>
                      <img
                        src={uploadData.photo}
                        width="100%"
                        alt="NewsPhoto"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        {uploadData.photo && uploadData.photo !== "" && props.captionRequired && (
          <div className="row">
            <div className="col-sm" style={{ padding: "10px" }}>
              <input
                type="text"
                name="caption"
                placeholder="Enter image Caption"
                className="form-control"
                value={caption}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCaption(e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  },
);

export default ImageUploadSimple;
