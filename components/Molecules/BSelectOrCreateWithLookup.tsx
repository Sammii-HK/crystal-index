import { useCallback, useEffect, useMemo, useState } from "react";
import { BInput } from "../Atoms";
import { FaCheck } from "react-icons/fa";

type BSelectOrCreateWithLookupProps<Item, CreateOption> = {
	id: string;
	placeholder: string;
	existingItems: Item[];
	selectedId: string | number | undefined | null;
	uniqueId: (item: Item) => string | number;
	display: (item: Item) => string;
	onCreate: (input: CreateOption) => Promise<void>;
	onSelect: (item: Item) => void;
	gatherCreateOptions: (lookUp: string) => Promise<CreateOption[]>;
	displayOption: (option: CreateOption) => string;
};

export function BSelectOrCreateWithLookup<Item, CreateOption>(
	props: BSelectOrCreateWithLookupProps<Item, CreateOption>
) {
	const [searchText, setSearchText] = useState("");

	const onTextChange = useCallback((newText) => {
		setSearchText(newText);
    setCreateOptions([]);
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

	const onCreateClicked = useCallback((input: CreateOption) => {
		setCreating(true);
		props.onCreate(input).then(() => {
			setCreating(false);
      setFocused(false);
      setCreateOptions([]);
		});
	}, []);

	const [focused, setFocused] = useState(false);

	const [createOptions, setCreateOptions] = useState<
		CreateOption[] | "loading"
	>([]);

	const startLookup = useCallback(
		(lookUp: string) => {
			setCreateOptions("loading");
			props
				.gatherCreateOptions(lookUp)
				.then((options) => setCreateOptions(options));
		},
		[props.gatherCreateOptions]
	);

	return creating ? (
		<p>Creating {searchText}...</p>
	) : createOptions === "loading" ? (
		<p>Looking up {searchText}</p>
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
			{searchText && searchTextDiffersFromSelected && createOptions.length === 0 && (
				<p className="p-2" onClick={() => startLookup(searchText)}>
					Look up: {searchText}
				</p>
			)}
			{createOptions.map((option) => (
				<p
					key={props.displayOption(option)}
					className="p-2"
					onClick={(e) => {
						onCreateClicked(option);
					}}
				>
					Create: {props.displayOption(option)}
				</p>
			))}
		</div>
	);
}
