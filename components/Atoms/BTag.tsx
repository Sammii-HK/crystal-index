
const BTag: React.FC<InputProps> = (props) => {
  return (
    <span className="tag">{props.label}</span>
  )
}

export default BTag

type InputProps = {
  label: string,
}

