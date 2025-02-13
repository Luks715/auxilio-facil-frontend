import { AuxilioData } from "@/types/auxilio";
import React from "react";

// Componente que recebe os dados de um auxílio individual como props
const AuxiliosInscritos = ({ auxilio }: { auxilio: AuxilioData }) => {
  return (
    <div>
      <h3>{auxilio.nome}</h3>
      <p>{auxilio.valor_minimo}</p>
    </div>
  );
};

export default AuxiliosInscritos;
