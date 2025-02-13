import { CidadaoData } from "@/types/cidadao";
import React from "react";

const Dependente = ( {dependente }: { dependente: CidadaoData } ) => {
  return (
    <div>
        <h3>{dependente.nome}</h3>
    </div>
  );
};

export default Dependente;
