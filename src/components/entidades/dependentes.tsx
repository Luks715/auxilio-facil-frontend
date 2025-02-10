import { CidadaoData } from "@/types/cidadao";
import React from "react";

const Dependente = ( cidadao: CidadaoData ) => {
  return (
    <div>
        <h3>{cidadao.nome}</h3>
    </div>
  );
};

export default Dependente;
