import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../../utils/api/index";
import NavBar from "../NavBar";
import CreateEditForm from "../CreateEditForm";

function EditCard() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({
        "name": "",
        "description": "",
    })
    const [card, setCard] = useState({
        "front": "",
        "back": "",
        "deckId": deckId,
    })
    const history = useNavigate();

    const name = deck.name ? deck.name : "Deck";

    useEffect(() => {
        const abortController = new AbortController();

        async function loadDeck() {
            try {
                const deckInfo = await readDeck(deckId, abortController.signal);
                setDeck(deckInfo);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.info("aborted");
                } else {
                    throw error;
                }
            }
        }

        async function loadCard() {
            try {
                const cardInfo = await readCard(cardId, abortController.signal);
                setCard(cardInfo);
            } catch (error) {
                if (error.name === "AbortError") {
                    console.info("aborted");
                } else {
                    throw error;
                }
            }
        }

        loadDeck();
        loadCard();

        return () => abortController.abort();
    }, [deckId, cardId]);

    async function handleSubmit(card) {
        try {
            await updateCard(card);
            history(`/decks/${deckId}`);
        } catch (err) {
            throw err;
        }
    }

    function handleCancel() {
        history(`/decks/${deckId}`);
    }
    return (
        <div>
            <NavBar path={window.location.href} deck={deck} />
            <h1>{name}: Add Card</h1>
            <CreateEditForm formType="card" object={card} setObject={setCard} handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
}

export default EditCard;