import React from "react";
import { useSelector } from "react-redux";
import Card from "../commons/Card";
import { useDispatch } from "react-redux";



const Grid = () => {
  const content = useSelector((state) => state.content);
  const watched = useSelector((state) => state.watched);
  const favorites = useSelector((state) => state.favorites);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
