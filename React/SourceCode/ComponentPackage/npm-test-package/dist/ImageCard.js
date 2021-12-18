import React from "react";
import "./ImageCard.css";
export const ImageCard = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: "img-card"
  }, /*#__PURE__*/React.createElement("img", {
    className: "img",
    src: props.imageSrc
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, props.title), /*#__PURE__*/React.createElement("div", {
    className: "card-text"
  }, props.text)));
};
export default ImageCard;