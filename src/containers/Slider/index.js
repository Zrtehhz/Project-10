import React, { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Assurez-vous que les données sont disponibles avant de les utiliser.
  const byDateDesc = data?.focus
    ? data.focus.sort((evtA, evtB) => new Date(evtA.date) < new Date(evtB.date) ? -1 : 1)
    : []; // Utilisez un tableau vide comme valeur par défaut.


  // Cette fonction passe au prochain slide après un délai.
  const nextCard = () => {
    setTimeout(
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      10000
    );
  };

  // J'utilise useEffect pour déclencher le changement de slide.
  useEffect(() => {
    nextCard();
  }, [index]); // La dépendance 'index' assure que le useEffect est relancé à chaque changement d'index.
  // UseEffect est le hook qui gère les effets de bord dans les composants fonctionnels.

  return (
    
    <div className="SlideCardList">
{byDateDesc && byDateDesc.map((event, idx) => (
        // Pour chaque événement, je crée un slide avec une clé unique basée sur l'id de l'événement.
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
          {byDateDesc.map((event, radioIdx) => (
            // Je crée un bouton radio pour chaque slide. La clé est unique grâce à l'id de l'événement.
            <input
              key={`radio-${event.id}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)} // Le changement du bouton radio modifie l'index du slide affiché.
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
