import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BImage } from '../Atoms';
import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames";



// http://react-responsive-carousel.js.org/
{/* <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}></Carousel> */}

const BCarousel: React.FC<CarouselProps> = (props) => {
  const { imageIds } = props
  const [modalState, setModalState] = useState<{state: boolean, crystalImageId?: number}>({state: false})

  const imageElements = imageIds?.map(id => (
    <div key={id}>
      {imageIds.length > 1 &&
        <button
          onClick={() => setModalState({
            state: !modalState.state,
            crystalImageId: id,
          })}
          className="button is-outlined is-pulled-right bring-to-front is-clear"
        >
            <span className="icon is-small">
              <FaTimes />
            </span>
        </button>
      }
      <BImage imageId={id} />
    </div>
  ));
  
  if (imageIds && imageIds.length === 1)
    return <>
      {imageElements}
    </>
  else return <>
      <Carousel showArrows={false} showStatus={false} showThumbs={false}>
        {imageElements}
      </Carousel>
      <div 
        id="carousel-modal" 
        className={classNames("modal", { "is-active": modalState.state})}
      >
        <div className="modal-background"></div>

        <div className="modal-content">
          <div className="box">
            <p>Are you sure you want to delete this image?</p>
          </div>
        </div>

        <footer className="modal-card-foot">
          <button 
            className="button is-danger"
            onClick={() => props.onRemoveImage?.(modalState.crystalImageId!)}
          >
              Delete Image
          </button>
          <button 
            className="button"
            onClick={() => setModalState({state: !modalState.state})}
          >
            Cancel
          </button>
        </footer>
      </div>
    </>
}

export default BCarousel

type CarouselProps = {
  imageIds: number[] | undefined
  onRemoveImage?: (removedImageId: number) => void
}
