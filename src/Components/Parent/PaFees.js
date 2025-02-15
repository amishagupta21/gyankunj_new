import React, { useEffect } from "react";
import BackButton from "../../SharedComponents/BackButton";
import FeeDetails from "../Principal/Finance/Fees/FeeDetails";
import AdmissionFeesView from "../Principal/Finance/Report/AdmissionFeesView";

const PaFees = () => {

  useEffect(() => {}, []);

  return (
    <>
      <BackButton />
      <AdmissionFeesView />
      <FeeDetails isParentView={true} />
    </>
  );
};

export default PaFees;
