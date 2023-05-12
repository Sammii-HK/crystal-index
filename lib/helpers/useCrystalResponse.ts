import { Crystal } from "@prisma/client";
import { AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { CrystalResponse } from "../types/crystal";

export function useCrystalResponse() {
  const [crystalResponse, setCrystalResponse] = useState<CrystalResponse>();

  const onCrystalResponse = useCallback((res: AxiosResponse<{crystal?: Crystal, error: string}>) => {
    setCrystalResponse({status: res.status, resultName: res.data.crystal!.name});
    setTimeout(() => setCrystalResponse(undefined), 5000);
  }, [])

  return {
    crystalResponse,
    onCrystalResponse
  }
}