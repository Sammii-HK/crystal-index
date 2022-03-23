
const BSelect: React.FC<InputProps> = (props) => {
  return (
    <div className="select">
      <select>
        <option>{props.placeholder}</option>
        {props.options?.map(option => {
          <option>{option}</option>
        })}
      </select>
    </div>
  )
}

export default BSelect

type InputProps = {
  options: string[] | undefined
  placeholder: string
}

