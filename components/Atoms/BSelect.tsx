const BSelect: React.FC<InputProps> = (props) => {
  return (
    <div className="select">
      <select 
        value={props.selected ? props.selected : props.placeholder}
        onChange={event => props.onChange(event.target.value)}
        disabled={props.disabled}
        >
        <option key="placeholder" disabled>{props.placeholder}</option>
        {/* round brackets return a series of statements */}
        {/* no curly brackets (aka round brackets) just return a value */}
        {props.options?.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  )
}

export default BSelect

type InputProps = {
  options: string[] | undefined
  placeholder: string
  onChange: (newValue: string) => void
  selected: any | undefined
  disabled?: boolean 
}

