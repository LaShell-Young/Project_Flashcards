import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./Home";
import CreateDeck from "./Components/Deck/CreateDeck";
import DeckDetails from "./Components/Deck/DeckDetails";
import EditDeck from "./Components/Deck/EditDeck";
import CreateCard from "./Components/Card/CreateCard";
import EditCard from "./Components/Card/EditCard";
import Study from "./Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<DeckDetails />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<CreateCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
