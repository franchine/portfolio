import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import "../css/Gallery.css";

export const Gallery = ({ galleryImgs }) => {
  const [slideNumber, setSlideNumber] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (index) => {
    setSlideNumber(index);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const prevSlide = () => {
    slideNumber === 0
      ? setSlideNumber(galleryImgs.length - 1)
      : setSlideNumber(slideNumber - 1);
  };

  const nextSlide = () => {
    slideNumber + 1 === galleryImgs.length
      ? setSlideNumber(0)
      : setSlideNumber(slideNumber + 1);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown, true);
  });

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleCloseModal();
    }

    if (e.key === "ArrowLeft") {
      prevSlide();
    }

    if (e.key === "ArrowRight") {
      nextSlide();
    }
  };

  return (
    <div>
      {openModal && (
        <div className="slideWrap" onKeyDown={handleKeyDown}>
          <FontAwesomeIcon
            icon={faCircleXmark}
            className="btnClose"
            onClick={handleCloseModal}
          />

          <FontAwesomeIcon
            icon={faCircleChevronLeft}
            className="btnPrev"
            onClick={prevSlide}
          />
          <FontAwesomeIcon
            icon={faCircleChevronRight}
            className="btnNext"
            onClick={nextSlide}
          />
          <div className="fullScreenImage">
            <img src={galleryImgs[slideNumber].img} alt="" />
          </div>
        </div>
      )}
      <br />
      <br />
      <div className="galleryWrap">
        {galleryImgs &&
          galleryImgs.map((slide, index) => {
            return (
              <div
                className="single"
                key={index}
                onClick={() => handleOpenModal(index)}
              >
                <img src={slide.img} alt="" />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Gallery;