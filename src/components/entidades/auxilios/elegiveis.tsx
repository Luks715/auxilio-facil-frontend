import { AuxilioData } from "@/types/auxilio";
import React from "react";

const AuxiliosElegiveis = ( { auxilio }: { auxilio: AuxilioData } ) => {
  return (
    <div>
        <h3>{auxilio.nome}</h3>
    </div>
  );
};

export default AuxiliosElegiveis;
