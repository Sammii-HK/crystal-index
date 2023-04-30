import { CrystalInfo } from "@prisma/client"
import { useCallback, useEffect, useState } from "react"
import { BField, BInput } from "../Atoms"
import { FaPlus } from "react-icons/fa"
import axios from "axios"
import { CrystalInfoResponse } from "../../pages/api/crystalInfo/create"

type CrystalInfoFormProps = {
  defaultName?: string,
  onCreateCrystalInfo: (info: CrystalInfo) => void
  crystalInfo?: Omit<CrystalInfo, 'id'>
}

export const NewCrystalInfoForm: React.FC<CrystalInfoFormProps> = (props) => {
  const [name, setName] = useState("");
  useEffect(() => {
    if (props.defaultName) setName(props.defaultName);
  }, [name, props.defaultName])

  const createNewCrystalInfo = useCallback(async () => {
    const res = await axios.post<CrystalInfoResponse>(
      '/api/crystalInfo/create',
      {name}
    );

    const crystalInfo = res.data.crystalInfo;

    if (crystalInfo) {
      props.onCreateCrystalInfo(crystalInfo)
    } else {
      // handle error
    }
  }, [name])

  return (
    <div className="mt-4">
       <BField label="New Crystal Info Name">
          <BInput 
            id="name"
            placeholder="Crystal Info Name"
            required
            value={name || ""}
            onChange={(newValue: any) => {
              setName(newValue)
            }}
            icon={FaPlus}
            iconSize="small"
            iconAlign="right"
            iconOnClick={createNewCrystalInfo}
            onEnterKey={createNewCrystalInfo}
          />
        </BField>
    </div>
  )
}
