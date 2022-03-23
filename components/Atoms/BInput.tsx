
const BInput: React.FC<InputProps> = (props) => {
  return (
    <input 
    id={props.id}
    className="input" 
    type="text" 
    placeholder={props.placeholder} 
    required={props.required} 
    />
  )
}

export default BInput

type InputProps = {
  id: string,
  placeholder: string,
  required: boolean,
}

