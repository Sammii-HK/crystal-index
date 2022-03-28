import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BImage } from '../Atoms';

// http://react-responsive-carousel.js.org/
{/* <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}></Carousel> */}

const BCarousel: React.FC<CarouselProps> = (props) => {
  if (props.imageIds && props.imageIds.length === 1) return (
    <BImage imageId={props.imageIds[0]} />
  )
  else return (
    <Carousel showArrows={true}>
      {props.imageIds?.map(id => (
        <div key={id}>
          <BImage imageId={id} />
        </div>
      ))}
    </Carousel>
  )
}

export default BCarousel

type CarouselProps = {
  imageIds: number[] | undefined
}
