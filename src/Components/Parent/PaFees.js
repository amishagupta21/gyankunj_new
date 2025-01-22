import React, { useEffect } from "react";
import BackButton from "../../SharedComponents/BackButton";
import FeeDetails from "../Principal/Finance/Fees/FeeDetails";

const PaFees = () => {

  useEffect(() => {}, []);

  return (
    <>
      <BackButton />
      <FeeDetails isParentView={true} />
    </>
  );
};

export default PaFees;
