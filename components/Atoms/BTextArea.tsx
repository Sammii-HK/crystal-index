
const BInput: React.FC<InputProps> = (props) => {
  return (
    <textarea 
    id={props.id}
    className='textarea'
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

