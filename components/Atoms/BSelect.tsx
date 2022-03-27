import { Location } from '@prisma/client';
import { setDefaultResultOrder } from 'dns/promises';

const BSelect: React.FC<InputProps> = (props) => {
  return (
    <div className="select">
      <select 
        defaultValue={props.selected ? props.selected : props.placeholder}
        onChange={event => props.onChange(event.target.value)} 
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

// function makeAdder(howMuch: number) {
//   return function(toWhat: number) {
//     return toWhat + howMuch
//   }
// }

// const makeAdder = (howMuch: number) => {
//   const secretIncorrectAdditionalNumber = 42;
//   return (toWhat: number) => ( toWhat + howMuch + secretIncorrectAdditionalNumber)
// };

// const addOne = makeAdder(1);

// const five = addOne(4);

// console.log("🐡🐠🐬 five", five);


// const makeSecuredCounter = (intialValue: number) => {
//   let count = intialValue;

//   return {
//     log: () => console.log(count),
//     increase: () => {count += 10},
//     decrease: () => {count -= 10}
//   }
// }

// const counter = makeSecuredCounter(42);

// counter.log();
// counter.increase()
// counter.log();

export default BSelect

type InputProps = {
  options: string[] | undefined
  placeholder: string
  onChange: (newValue: string) => void
  selected: any | undefined
}

