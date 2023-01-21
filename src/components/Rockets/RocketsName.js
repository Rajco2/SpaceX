import React from "react";
import { Link } from "react-router-dom";
import styles from './RocketsName.module.css'
const RocketsName = (props) => {
  const deleteRocket = () =>{
    props.handleDelete(props.id)
  }
  const editRocket = () => {
    props.handleUpdate(props.rocket)
  }

 
  return (
    <div className={styles.list}>
      <li>
        <p>Name: {props.name}</p>
        <p>Description:<br/> {props.description}</p>
        <p>Type: {props.type}</p>
        <p>Company: {props.company}</p>
        <p>Height: {props.height}m</p>
  
        <img  className={styles.img} src={props.url} alt="rocket "/>
      </li>
      <button onClick={deleteRocket}>Delete</button>
      <button onClick={editRocket}>Edit</button>
      <Link className={styles.link} to={`/rocketdetails/${props.id}`}>Rocket Details</Link>
    </div>
  );
};

export default RocketsName;