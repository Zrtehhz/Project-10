import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Form from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      const sendButton = screen.getByText("Envoyer"); // Utilise getByText ici
      fireEvent.click(sendButton);

      await screen.findByText("En cours"); // Vérifie que le texte passe à "En cours"

      // Utilisez waitFor pour attendre que le bouton affiche à nouveau "Envoyer"
      await waitFor(() => expect(screen.getByText("Envoyer")).toBeInTheDocument());

      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
