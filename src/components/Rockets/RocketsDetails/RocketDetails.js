import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./RocketDetails.module.css";
import Spinner from "../../../UI/Spinner";
const RocketDetails = () => {
  const [rocketDetails, setRocketDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDetails, setHasDetails] = useState(true);
  const { rocketsId } = useParams();
  const [img, setImg] = useState("");

  const fetchRockets = useCallback(async () => {
    const response = await fetch("https://api.spacexdata.com/v4/rockets");

    const data = await response.json();
    const loadedData = [];
    for (const rocket in data) {
      loadedData.push({
        wikipedia: data[rocket].wikipedia,
        id: data[rocket].id,
        first_flight: data[rocket].first_flight,
        mass1: data[rocket].mass.kg,
        mass2: data[rocket].mass.lb,
        number: data[rocket].engines.number,
      });
    }
    const filterLoadedData = loadedData.find((item) => item.id === rocketsId);
    if(filterLoadedData){
      setRocketDetails(filterLoadedData);
    }else{
      setHasDetails(false)
    }
  }, [rocketsId]);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      fetchRockets();
      setIsLoading(false);
    }, 500);
  }, [fetchRockets]);

  const fetchImage = useCallback(async () => {
    const response = await fetch("https://api.spacexdata.com/v4/rockets");
    const data = await response.json();
    const imgUrl = [];
    for (const img in data) {
      imgUrl.push({
        url: data[img].flickr_images,
        id: data[img].id,
      });
    }

    const filterImg = imgUrl.find((item) => item.id === rocketsId);
    if(filterImg){
      setImg(filterImg);
    }else{
      setHasDetails(false)
    }
    
  }, [rocketsId]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  return (
    <div className={styles.wrapper}>
      {isLoading && <Spinner />}
     {!isLoading && <div>
      {hasDetails && (
        <div>
          <h2>Details about rocket</h2>

          <p>First flight: {rocketDetails.first_flight}</p>

          <p>Total mass in kg: {rocketDetails.mass1}</p>

          <p>Total mass in lb: {rocketDetails.mass2}</p>

          <p>Number of Engines: {rocketDetails.number}</p>

          <p>
            <a href={rocketDetails.wikipedia}  target='_blank'  without rel="noreferrer" className={styles.link}>
              More on wikipedia
            </a>
          </p>

          <img className={styles.img} src={img.url} alt="rockets" />
        </div>
      )}</div>}
      {!hasDetails && <h2>No details about this rocket</h2>}
    </div>
  );
};

export default RocketDetails;
