import React, { useEffect, useState } from 'react';
import DeckList from './Components/Deck/DeckList';
import { listDecks, deleteDeck } from "../utils/api/index";
import { Link } from "react-router-dom";


const Home = () => {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        setDecks([]);
        // setup for pending api calls to be cancelled
        const abortController = new AbortController();
        async function loadDeckData() {
            try {
                let _decks = await listDecks(abortController.signal);
                setDecks(_decks);
            } catch (error) {
                if (error.name === "AbortError") {
                    // Ignore `AbortError`
                    console.log("Aborted! Call to get decks.");
                } else {
                    throw error;
                }
            }
        }
        loadDeckData();

        return () => abortController.abort(); // Cancels any pending request or response
    }, [])

    async function handleDeleteDeck(id) {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            await deleteDeck(id);
            // remove deleted deck
            setDecks(() => decks.filter((deck) => deck.id !== id));
        }
    }

    return (
        <>
            <Link
                to="/decks/new"
                className="btn btn-secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="32" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                </svg>
                Create Deck
            </Link>
            <DeckList decks={decks} handleDeleteDeck={handleDeleteDeck} />
        </>
    );
};

export default Home;