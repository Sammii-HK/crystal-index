import { BTag } from "../Atoms";

const BTags: React.FC<InputProps> = (props) => {
	return (
		<div className="tags">
			{props.options?.map((option) => (
				<BTag
					label={option}
					key={option}
					selected={props.value?.includes(option)}
					onToggle={() => {
            if (props.value?.includes(option)) {
              props.onChange?.((props.value || []).filter(selected => selected != option))
            } else {
              props.onChange?.([...props.value || [], option])
            }
          }}
				/>
			))}
		</div>
	);
};

export default BTags;

type InputProps = {
	options: string[] | undefined;
	value: string[] | undefined;
	onChange?: (newSelected: string[]) => void;
};
