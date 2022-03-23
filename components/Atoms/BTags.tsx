const BTags: React.FC<InputProps> = (props) => {
  return (
    <div className="tags">
      {props.children}
    </div>
  )
}

export default BTags

type InputProps = {
}

