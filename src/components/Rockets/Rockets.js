import React from "react";
import { useCallback, useEffect, useState } from "react";
import RocketsList from "./RocketsList";
import styles from "./Rockets.module.css";
import Spinner from "../../UI/Spinner";
const Rockets = () => {
  const [rockets, setRockets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [addRocket, setAddRocket] = useState(false);
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [type, setType] = useState("");

  const [height, setHeight] = useState("");

  const nameInputChange = (e) => {
    setName(e.target.value);
  };
  const descriptionInputChange = (e) => {
    setDescription(e.target.value);
  };
  const companyInputChange = (e) => {
    setCompany(e.target.value);
  };
  const typeInputChange = (e) => {
    setType(e.target.value);
  };

  const heightInputChange = (e) => {
    setHeight(e.target.value);
  };
  const imgChangeHandler = (e) => {
    setImg(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (
      name.length === 0 &&
      description.length === 0 &&
      company.length === 0 &&
      type.length === 0
    ) {
      return alert("you must enter data!");
    }
    const items = {
      name,
      description,
      company,
      type,
      url: img,
      height,
      id: Math.random(),
    };
    setRockets([items, ...rockets]);
    setCompany("");
    setDescription("");
    setHeight("");
    setImg("");
    setName("");
    setType("");
    setAddRocket(false);
  };

  const fetchRockets = useCallback(async () => {
    const response = await fetch("https://api.spacexdata.com/v4/rockets");

    const data = await response.json();
    const loadedRockets = [];
    for (const rockets in data) {
      loadedRockets.push({
        name: data[rockets].name,
        description: data[rockets].description,
        company: data[rockets].company,
        type: data[rockets].type,
        active: data[rockets].active,
        height: data[rockets].height.meters,
        id: data[rockets].id,
        url: data[rockets].flickr_images,
      });
    }
    setRockets(loadedRockets);
  }, []);
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchRockets();
      setIsLoading(false);
    }, 500);
  }, [fetchRockets]);

  const handleDelete = (id) => {
    const newList = rockets.filter((rocket) => rocket.id !== id);
    setRockets(newList);
  };
  const handleUpdate = (rocket) => {
    setName(rocket.name);
    setCompany(rocket.company);
    setDescription(rocket.description);
    setType(rocket.type);
    setHeight(rocket.height);
    setItemId(rocket.id);
    setImg(rocket.url);
  };

  const updateRockets = () => {
    const newRocketList = rockets.map((rocket) => {
      if (rocket.id === itemId) {
        return { ...rocket, name, company, description, height, type };
      } else {
        return rocket;
      }
    });
    setRockets(newRocketList);
    setCompany("");
    setDescription("");
    setHeight("");
    setImg("");
    setName("");
    setType("");
    setAddRocket(false)
    setItemId(null);
  };

  const openForm = () => {
    setAddRocket(true);
  };
  console.log(rockets);
  return (
    <React.Fragment>
      <div>
        {addRocket && (
          <form onSubmit={submitHandler} className={styles.form}>
            <label htmlFor="name">Name</label>
            <input name="name" onChange={nameInputChange} value={name} />
            <label htmlFor="description">Description</label>
            <input
              name="description"
              onChange={descriptionInputChange}
              value={description}
            />
            <label htmlFor="company">Company</label>
            <input
              name="company"
              onChange={companyInputChange}
              value={company}
            />
            <label htmlFor="type">Type</label>
            <input name="type" onChange={typeInputChange} value={type} />

            <label htmlFor="height">Height</label>
            <input name="height" onChange={heightInputChange} value={height} />
            <label htmlFor="image">Image:</label>
            <input name="image" value={img} onChange={imgChangeHandler} />
            <button type="button" onClick={updateRockets}>
              Edit
            </button>
            <button>Add</button>
          </form>
        )}
        {isLoading && <Spinner />}

        {!addRocket && (
          <button className={styles.add} onClick={openForm}>
            Add or Edit Rocket
          </button>
        )}
      </div>
      {!isLoading && (
        <RocketsList
          items={rockets}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
        />
      )}
    </React.Fragment>
  );
};

export default Rockets;
