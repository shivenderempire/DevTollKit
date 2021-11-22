import React from "react";
import ImageUploader from "react-images-upload";
import { Row, Col } from "react-bootstrap";

interface ImageProps {
  onChanged: (pictureData: any) => void;
  imgExtension?: [];
  maxFileSize?: Number;
  singleImage?: boolean;
  buttonText?: string;
  withPreview?: boolean;
  headerText?: string;
}
const ImageUpload = React.memo((props: ImageProps) => {
  const onDrop = (picture: any, pictureDataURLs: any) => {
    props.onChanged({ picturedetails: picture, picturedata: pictureDataURLs });
  };
  return (
    <Row>
      <Col>
        <ImageUploader
          withIcon={true}
          buttonText={props.buttonText ? props.buttonText : "Choose images"}
          onChange={onDrop}
          imgExtension={
            props.imgExtension ? props.imgExtension : [".jpg", ".jpeg", ".png"]
          }
          maxFileSize={500000}
          singleImage={props.singleImage ? props.singleImage : true}
          withPreview={props.withPreview ? props.withPreview : true}
        />
      </Col>
    </Row>
  );
});

export default ImageUpload;
