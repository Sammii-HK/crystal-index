import classNames from "classnames";

const BTag: React.FC<InputProps> = (props) => {
	return (
		<span
			className={
        classNames(
          "tag", 
          "is-clickable", 
          "is-clear", 
          "has-text-weight-bold", 
          "is-light", 
        {[`is-${props.label.toLowerCase()}`]: props.selected}
      )}
			onClick={props.onToggle}
		>
			{props.label}
		</span>
	);
};

export default BTag;

type InputProps = {
	label: string;
	selected?: boolean;
	onToggle?: () => void;
};
