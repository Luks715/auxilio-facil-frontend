import { AuxilioData } from "@/types/auxilio";
import React from "react";

const Auxilio = ( auxilio: AuxilioData ) => {
  return (
    <div>
        <h3>{auxilio.nome}</h3>
        <p>{auxilio.descricao}</p>
    </div>
  );
};

export default Auxilio;
