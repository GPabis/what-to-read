import React from "react";
import BestsellerType from "./BestsellerType/BestsellerType";

const bestsellerTypes = (props) => (
  <>
    {props.bestsellerTypesArr.map((type) => (
      <BestsellerType
        key={type.bestsellerTypesEncodedName}
        bestsellerTypeName={type.bestsellerTypesName}
      />
    ))}
  </>
);

export default bestsellerTypes;
