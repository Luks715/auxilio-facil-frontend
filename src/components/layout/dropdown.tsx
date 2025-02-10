import React from "react";

const MenuSuspenso = ({ setActiveTab }) => {
  return (
    <nav>
      <ul>
        <li>
          <button onClick={() => setActiveTab("todos")}>Todos os Auxílios</button>
        </li>
        <li>
          <button onClick={() => setActiveTab("inscritos")}>Auxílios Inscritos</button>
        </li>
        <li>
          <button onClick={() => setActiveTab("elegiveis")}>Auxílios Elegíveis</button>
        </li>
      </ul>
    </nav>
  );
};

export default MenuSuspenso;
