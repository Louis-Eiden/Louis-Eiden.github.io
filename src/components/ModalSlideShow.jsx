import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import "./ModalSlideShow.css";

import * as FA6 from "react-icons/fa6";

// let currentIndex = 0;
let Images = []; // Default value, will be overwritten by the prop

const ModalSlideShow = forwardRef(({ imagesProp }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  Images = imagesProp || Images; // Use the prop if provided, otherwise use the default

  const openModal = () => {
    console.log("open");
    setCurrentIndex(0);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentIndex(0);
  };

  const prevImage = () => {
    currentIndex === Images.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex - 1);
  };

  const nextImage = () => {
    currentIndex === Images.length - 1
      ? setCurrentIndex(0)
      : setCurrentIndex(currentIndex + 1);
  };

  // Expose the openModal function to the parent component using useImperativeHandle
  useImperativeHandle(ref, () => ({
    openModal,
  }));

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isModalOpen]);

  return (
    <div className={`modal${isModalOpen ? " open" : ""}`}>
      <div className="img-overlay" onClick={closeModal}></div>
      <div className="slider-wrap">
        <div className="prev-btn navigation" onClick={prevImage}>
          <FA6.FaAngleLeft />
        </div>
        <div className="images">
          {Images.map((image, index) => (
            <img
              key={index}
              src={process.env.PUBLIC_URL + image} // Use PUBLIC_URL for relative paths
              alt={`TinyHouse Image ${index + 1}`}
              className={currentIndex === index ? "showImage" : ""}
            />
          ))}
        </div>
        <div className="next-btn navigation" onClick={nextImage}>
          <FA6.FaAngleRight />
        </div>
      </div>
    </div>
  );
});

export default ModalSlideShow;
