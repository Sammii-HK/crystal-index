import Image from 'next/image'

const BImage: React.FC<InputProps> = (props) => {
  return (
    <figure className="image is-square">
      <img src={'/api/image/' + props.imageId} />
      <Image
      src={'/api/image/' + props.imageId}
      alt="picture of a crystal" // TODO: send alt info to component
      width={500}
      height={500}
      />
    </figure>
  )
}

export default BImage

type InputProps = {
  imageId: number,
}

