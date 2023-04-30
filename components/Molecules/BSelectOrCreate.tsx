import { useCallback, useEffect, useMemo, useState } from "react";
import { BInput } from "../Atoms";
import { FaCheck } from "react-icons/fa";

type BSelectOrCreateProps<Item> = {
	id: string;
	placeholder: string;
	existingItems: Item[];
	selectedId: string | number | undefined | null;
	uniqueId: (item: Item) => string | number;
	display: (item: Item) => string;
	onCreate: (input: string) => Promise<void>;
	onSelect: (item: Item) => void;
};

export function BSelectOrCreate<I>(props: BSelectOrCreateProps<I>) {
	const [searchText, setSearchText] = useState("");

	const onTextChange = useCallback((newText) => {
		setSearchText(newText);
	}, []);

	const selectedItem = useMemo(
		() =>
			props.existingItems.find(
				(item) => props.uniqueId(item) === props.selectedId
			),
		[props.existingItems, props.selectedId]
	);

	const searchTextDiffersFromSelected = useMemo(
		() => !selectedItem || props.display(selectedItem) !== searchText,
		[searchText, selectedItem]
	);

	useEffect(() => {
		if (selectedItem) {
			setSearchText(props.display(selectedItem));
		}
	}, [selectedItem]);

	const matchingItemsWithName = useMemo(
		() =>
			props.existingItems
				.map((item) => ({
					item,
					name: props.display(item),
					id: props.uniqueId(item),
				}))
				.filter((entry) => entry.name.toLowerCase().includes(searchText.toLowerCase())),
		[props.existingItems, searchText]
	);

	const [creating, setCreating] = useState(false);

	const onCreateClicked = useCallback((input: string) => {
		setCreating(true);
		props.onCreate(input).then(() => {
			setCreating(false);
      setFocused(false);
		});
	}, []);

	const [focused, setFocused] = useState(false);

	return creating ? (
		<p>Creating {searchText}...</p>
	) : (
		<div
			onMouseEnter={() => setFocused(true)}
			onMouseLeave={() => setFocused(false)}
		>
			<BInput
				id={props.id}
				value={searchText}
				onChange={onTextChange}
				placeholder={props.placeholder}
			/>
			{focused &&
				matchingItemsWithName.map((entry) => (
					<p
						key={entry.id}
						className="p-2"
						onClick={(e) => {
							e.preventDefault();
							e.stopPropagation();
							props.onSelect(entry.item);
              setFocused(false);
						}}
					>
						{entry.name}{" "}
						{entry.id === props.selectedId ? <FaCheck /> : undefined}
					</p>
				))}
			{searchText && searchTextDiffersFromSelected && (
				<p className="p-2" onClick={() => onCreateClicked(searchText)}>
					Create: {searchText}
				</p>
			)}
		</div>
	);
}
