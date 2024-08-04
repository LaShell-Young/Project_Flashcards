import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./Components/Deck/CreateDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<p>Shows all of the information about a specified deck with options to edit or add cards to the deck, navigate to the study screen, or delete the deck</p>} >
            <Route path="/decks/:deckId/study" element={<p>Here you see cards for deckId</p>} />
            <Route path="/decks/:deckId/edit" element={<p>Allows the user to modify information on an existing deck</p>} />
            <Route path="/decks/:deckId/cards/new" element={<p>Allows the user to add a new card to an existing deck</p>} />
            <Route path="/decks/:deckId/cards/:cardId/edit" element={<p>Allows the user to modify information on an existing card</p>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
