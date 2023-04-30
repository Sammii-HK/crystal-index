import { FormEvent, useCallback, useState } from "react";
import { RestrictedReactFC } from "../../lib/hooks";
import axios from "axios";
import { CrystalInfoResponse } from "../api/crystalInfo/create";

const CreateCrystalInfo: RestrictedReactFC<{}> = (props) => {
	const [name, setName] = useState("");
	const [createdCrystalInfo, setCreatedCrystalInfo] = useState<
		CrystalInfoResponse["crystalInfo"] | undefined
	>();

	const onSubmit = useCallback(async (event: FormEvent) => {
		event.preventDefault();

		const res = await axios.post<CrystalInfoResponse>(
			"/api/crystalInfo/create",
			{ name: name }
		);

    setCreatedCrystalInfo(await res.data.crystalInfo);
	}, [name]);

	return (
		<div>
      <form onSubmit={onSubmit}>
			<input
				type="text"
				value={name}
				onChange={(event) => setName(event.target.value)}
				placeholder="Crystal info name"
			/>
			<input type="submit" value="Create"/>
      </form><br/>
			Resolved bio:<br/>
			<div style={{whiteSpace: "pre-wrap", maxWidth: "30rem"}}>{JSON.stringify(createdCrystalInfo)}</div>
		</div>
	);
};

CreateCrystalInfo.requireAuth = true;

export default CreateCrystalInfo;
