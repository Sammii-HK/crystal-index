import { useCallback } from "react";
import BFile from "../Atoms/BFile";
import BCarousel from "./BCarousel";

const BImageFileUploader: React.FC<BImageFileUploaderProps> = (props) => {
  const { imageIds } = props
  
  const addImage = useCallback(async (id) => {
    props.onChange?.([...imageIds || [], id])
  }, [imageIds]);

  return (
    <div>      
      {(imageIds !== undefined) &&
        <div className="mb-6">
          <BCarousel 
            imageIds={imageIds} 
            onRemoveImage={props.onRemoveImage}
            view="form"
          />
        </div>
      }
      <BFile onChange={addImage}/>
    </div>
  )
}

export default BImageFileUploader;

type BImageFileUploaderProps = {
  imageIds: number[] | undefined
  onChange: (newImageIds: number[]) => void
  onRemoveImage: (removedImageId: number) => void
}
