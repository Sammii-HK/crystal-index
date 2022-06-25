import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BImage } from '../Atoms';
import React from "react";
import { FaTimes } from "react-icons/fa";

// http://react-responsive-carousel.js.org/
{/* <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}></Carousel> */}

const BCarousel: React.FC<CarouselProps> = (props) => {
  const { imageIds } = props

  const imageElements = imageIds?.map(id => (
    <div key={id}>
      {props.onRemoveImage &&
        <button
          onClick={() => props.onRemoveImage?.(id)}
          className="button is-outlined is-pulled-right bring-to-front is-clear">
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
  else return (
    <Carousel showArrows={false} showStatus={false} showThumbs={false}>
      {imageElements}
    </Carousel>
  )
}

export default BCarousel

type CarouselProps = {
  imageIds: number[] | undefined
  onRemoveImage?: (removedImageId: number) => void
}
