const BField: React.FC<InputProps> = (props) => {
  return (
    <div className="field"> 
    {props.label && <label className="label">{props.label}</label>}
    <div className="control">
      {props.children}
    </div>
    </div>
  )
}

export default BField

type InputProps = {
  label?: string,
}

