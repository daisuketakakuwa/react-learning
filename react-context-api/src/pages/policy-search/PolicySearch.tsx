import { useContext, useEffect } from "react";
import { updateAppState } from "src/context/actionCreator";
import { Context } from "src/context/ContextProvider";
import { fetchPolicies } from "src/utils/dataFetchers";
import { TdStyled, ThStyled } from "./PolicySearch.styles";

const PolicySearch = () => {
  const { state, dispatch } = useContext(Context);
  const { policies, selectedPolicies } = state;

  useEffect(() => {
    fetchPolicies(dispatch);
  }, []);

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>, policyNo: string) => {
    let newOne = selectedPolicies;
    if (e.target.checked) {
      newOne.push(policies.find((p) => p.policyNo === policyNo) as Policy);
    } else {
      newOne = selectedPolicies.filter((p) => p.policyNo !== policyNo);
    }
    updateAppState(dispatch, "selectedPolicies", newOne);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>契約照会画面</h1>
      <p style={{ fontSize: "18px", marginLeft: "20px", textDecoration: "underline" }}>選択済み: {selectedPolicies.length}件</p>
      <table style={{ borderCollapse: "collapse", marginLeft: "20px" }}>
        <thead>
          <tr>
            <ThStyled />
            <ThStyled>証券番号</ThStyled>
            <ThStyled>契約者名</ThStyled>
            <ThStyled>性別</ThStyled>
          </tr>
        </thead>
        <tbody>
          {policies.map((p: Policy) => (
            <tr key={p.policyNo}>
              <TdStyled>
                <input type="checkbox" style={{ height: "20px", width: "20px" }} checked={selectedPolicies.some((sp) => sp.policyNo === p.policyNo)} onChange={(e) => handleCheck(e, p.policyNo)} />
              </TdStyled>
              <TdStyled>{p.policyNo}</TdStyled>
              <TdStyled>{p.holderName}</TdStyled>
              <TdStyled>{p.gender}</TdStyled>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PolicySearch;
