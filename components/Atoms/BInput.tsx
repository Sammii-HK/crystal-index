import { FormEventHandler } from "react"
import type { LucideIcon as IconType } from "lucide-react"

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
        if (event.code === "Enter") props.onEnterKey?.(event)}
      }
      />
      {props.icon && (props.iconOnClick ?
        <button type="button" aria-label={props.iconLabel || "Search"} className={`icon is-${props.iconSize} is-${props.iconAlign} is-clickable`} onClick={props.iconOnClick} style={{border:0,background:"transparent",minWidth:44,minHeight:44}}>
          <props.icon size={16} aria-hidden />
        </button> : <span className={`icon is-${props.iconSize} is-${props.iconAlign}`} aria-hidden><props.icon size={16} /></span>
      )}
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
  iconLabel?: string,
  iconSize?: string,
  iconAlign?: string,
  iconOnClick?: FormEventHandler,
  onEnterKey?: FormEventHandler,
}

