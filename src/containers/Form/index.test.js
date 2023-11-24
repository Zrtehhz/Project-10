import { fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const mockSuccessAction = jest.fn(); // simuler une fonction d'action de réussite

      const { findByText } = render(<Form onSuccess={mockSuccessAction} />);
      fireEvent.click(screen.getByTestId('button-test-id'));
      
      // Attendre que le bouton affiche "En cours"
      await findByText("En cours");
      
      // Ajouter un délai pour simuler l'action asynchrone
      await new Promise(resolve => setTimeout(resolve, 1000));
  
      // Attendre que le texte du bouton revienne à "Envoyer" après la fin de l'action asynchrone
      await findByText("Envoyer");
      
// S'assurer que la fonction d'action de réussite a été appelée
      expect(mockSuccessAction).toHaveBeenCalled();
    });
  });
});