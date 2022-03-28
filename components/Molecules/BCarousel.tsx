import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BImage } from '../Atoms';

// http://react-responsive-carousel.js.org/
{/* <Carousel showArrows={true} onChange={onChange} onClickItem={onClickItem} onClickThumb={onClickThumb}></Carousel> */}

const BCarousel: React.FC<CarouselProps> = (props) => {
  return (
    <Carousel>
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
