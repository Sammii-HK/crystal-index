import { useCallback } from "react";
import BFile from "../Atoms/BFile";
// import BImage from "../Atoms/BImage";
import BCarousel from "./BCarousel";

const BImageFileUploader: React.FC<BImageFileUploaderProps> = (props) => {
  
  const addImage = useCallback(async (id) => {
    props.onChange?.([...props.imageIds || [], id])
  }, [props.imageIds]);

  return (
    <div>      
      {(props.imageIds !== undefined) && <BCarousel imageIds={props.imageIds}/>}
      <BFile onChange={addImage}/>
    </div>
  )
}

export default BImageFileUploader;

type BImageFileUploaderProps = {
  imageIds: number[] | undefined
  onChange: (newImageIds: number[]) => void
}
