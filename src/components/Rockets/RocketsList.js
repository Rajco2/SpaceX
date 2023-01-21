import React from "react";

import RocketsName from "./RocketsName";

const RocketsList = (props) => {
  const rockets = props.items.map((rockets) => (
    <RocketsName
      rocket={rockets}
      key={rockets.id}
      id={rockets.id}
      name={rockets.name}
      description={rockets.description}
      company={rockets.company}
      type={rockets.type}
      height={rockets.height}
      handleDelete={props.handleDelete}
      handleUpdate={props.handleUpdate}
      url={rockets.url}
    
    />
  ));
  return <ul>{rockets} </ul>;
};

export default RocketsList;