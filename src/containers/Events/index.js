import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  /* modifie le filtrage des évenements, affichant ainsi les card en fonction de la catégories sélectionner. */
  const filteredEvents = (data?.events || [])
    .filter((event) => {
      if (!type || event.type === type) {
        return true;
      }
      return false;
    })
    .slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);

  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));

  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
  // Création d'un tableau basé sur le nombre de pages (pageNumber) et génération d'éléments pour chaque page
  // À l'intérieur de cette expression map :
  // - '_' est un placeholder pour l'élément du tableau. Il n'est pas utilisé ici.
  // - 'n' est l'index de l'élément actuel dans le tableau, commençant à 0 et augmentant de 1 pour chaque élément.
  
  // Ici, vous pouvez retourner un composant ou un élément pour chaque 'n'.
  // Par exemple, si vous générez des boutons de pagination, vous pourriez retourner un bouton pour chaque numéro de page.
  // <Button key={n}>{n+1}</Button>  // Ceci est un exemple hypothétique.
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;