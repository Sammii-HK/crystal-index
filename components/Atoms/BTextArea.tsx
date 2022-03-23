
const BInput: React.FC<InputProps> = (props) => {
  return (
    <textarea 
    id={props.id}
    className='textarea'
    placeholder={props.placeholder} 
    required={props.required} 
    value={props.value}
    onChange={(event) => props.onChange(event.target.value)}
    />
  )
}

export default BInput

type InputProps = {
  id: string,
  placeholder: string,
  required: boolean,
  value: string,
  onChange: (newValue: string) => void
}

