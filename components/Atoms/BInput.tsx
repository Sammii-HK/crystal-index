import { FormEventHandler } from "react"
import { IconType } from "react-icons/lib"

const BInput: React.FC<InputProps> = (props) => {
  return (
    <p className={`control has-icons-${props.iconAlign}`}>
      <input 
      id={props.id}
      className='input'
      type="text" 
      placeholder={props.placeholder} 
      required={props.required}
      value={props.value}
      onChange={event => props.onChange(event.target.value)}
      onKeyDown={event => {
        if (event.code === "Enter") props.onEnterKey}
      }
      />
      {props.icon &&
        <span className={`icon is-${props.iconSize} is-${props.iconAlign} is-clickable`} onClick={props.iconOnClick}>
          <props.icon />
        </span>
      }
    </p>
  )
}

export default BInput

type InputProps = {
  id: string,
  placeholder: string,
  required?: boolean | false,
  value: string,
  onChange: (newValue: string) => void
  icon?: IconType,
  iconSize?: string,
  iconAlign?: string,
  iconOnClick?: FormEventHandler,
  onEnterKey?: FormEventHandler,
}

