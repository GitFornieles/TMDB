import React from "react";
import { useSelector } from "react-redux";
import Card from "../commons/Card";
import { useDispatch } from "react-redux";



const Grid = () => {
  const content = useSelector((state) => state.content);

  return (
    <div className="contentClase">
      {content.data.map((elemento) => {
        return (
          <Card
            key={elemento.id}
            resource={elemento}
            type={content.type}
          />
        );
      })}
    </div>
  );
};

export default Grid;
