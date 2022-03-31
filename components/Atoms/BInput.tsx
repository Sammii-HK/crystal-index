
const BInput: React.FC<InputProps> = (props) => {
  return (
    <input 
      id={props.id}
      className='input'
      type="text" 
      placeholder={props.placeholder} 
      required={props.required}
      value={props.value}
      onChange={event => props.onChange(event.target.value)}
    />
  )
}

export default BInput

type InputProps = {
  id: string,
  placeholder: string,
  required?: boolean | false,
  value: string,
  onChange: (newValue: string) => void
}

