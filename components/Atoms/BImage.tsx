import Image from 'next/image'

const BImage: React.FC<InputProps> = (props) => {
  return (
    <figure className="image is-square">
      <Image
      src={'/api/image/' + props.imageId}
      alt="picture of a crystal" // TODO: send alt info to component
      width={500}
      height={500}
      quality={100}
      style={{objectFit:"cover"}}
      />
    </figure>
  )
}

export default BImage

type InputProps = {
  imageId: number,
}

