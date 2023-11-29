import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Assurez-vous que les données sont disponibles avant de les utiliser.
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date)) // Utilise une copie de data.focus pour trier sans modifier l'original
    : []; // Utilise un tableau vide comme valeur par défaut.

  // Cette fonction passe au prochain slide après un délai.
  const nextCard = () => setTimeout(() => {
    setIndex(prevIndex => (prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0));
  }, 10000);

  // Utilise useEffect pour déclencher le changement de slide.
  useEffect(() => {
    const timeoutId = nextCard(); // La dépendance 'index' assure que le useEffect est relancé à chaque changement d'index.
    // La fonction de nettoyage pour annuler le setTimeout.
    return () => clearTimeout(timeoutId);
  }, [index, byDateDesc.length]); // Ajoutez `byDateDesc.length` pour que useEffect réagisse si le nombre d'éléments change.

  return (
    <div className="SlideCardList">
      {byDateDesc && byDateDesc.map((event, idx) => (
        <div key={event.id} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
        {
  byDateDesc.map((event) => (
    <input
      key={`radio-${event.id}`}
      type="radio"
      name="radio-button"
      checked={index === byDateDesc.indexOf(event)}
      onChange={() => setIndex(byDateDesc.indexOf(event))} // Le changement du bouton radio modifie l'index du slide affiché.
      readOnly
    />
  ))
}
        </div>
      </div>
    </div>
  );
};

export default Slider;