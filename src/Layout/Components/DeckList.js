import React from 'react';
import Deck from './Deck';

const DeckList = ({ decks, handleDeleteDeck }) => {
    return (
        <div>
            {decks.map(deck => (
                <Deck
                    key={deck.id}
                    handleDeleteDeck={handleDeleteDeck}
                    id={deck.id}
                    name={deck.name}
                    description={deck.description}
                    cards={deck.cards}
                />
            ))}
        </div>
    );
};
// decks: [
// {
//     "id": 1,
//     "name": "...",
//     "description": "..."
//   }
// ]

export default DeckList;