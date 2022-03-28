const BImage: React.FC<InputProps> = (props) => {
  return (
    <figure className="image is-square">
      <img src={'/api/image/' + props.imageId} />
    </figure>
  )
}

export default BImage

type InputProps = {
  imageId: number,
}

