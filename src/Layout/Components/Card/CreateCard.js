import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../../utils/api/index";
import CreateEditForm from "../CreateEditForm";
import NavBar from "../NavBar";

function CreateCard() {
    const history = useNavigate();
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        // abort controller to prevent memory leaks
        const abortController = new AbortController();
        // async function to load deck
        async function loadDeck() {
            // try catch to load deck
            try {
                // assigning deckInfo to readDeck function
                const deckInfo = await readDeck(deckId, abortController.signal);
                // setting deck to deckInfo
                setDeck(deckInfo);
            } catch (error) {
                // if error is abort error, console log aborted
                if (error.name === "AbortError") {
                    console.info("aborted");
                    // else throw error to console
                } else {
                    throw error;
                }
            }
        }
        // calling loadDeck function
        loadDeck();
        // return abort controller to prevent memory leaks
        return () => abortController.abort();
        // deckId is dependency array to prevent infinite loop
    }, [deckId]);

    //Creates a new card
    async function handleSubmit(card) {
        // try catch to create card
        try {
            // assigning cardInfo to createCard function
            // createCard function takes in deckId and card and calls showCardSuccessToast function after card is created successfully
            await createCard(deckId, card);
            history(`/decks/${deckId}`);
        } catch (err) {
            throw err;
        }
    }

    // if cancel button is clicked, redirect to deck page
    function handleCancel() {
        history(`/decks/${deckId}`);
    }

    const [card, setCard] = useState({
        "front": "",
        "back": "",
        "deckId": deckId,
    })

    return (
        <div>
            <NavBar path={window.location.href} deck={deck} />
            <h1>{deck.name}: Add Card</h1>
            <CreateEditForm formType="card" handleSubmit={handleSubmit} handleCancel={handleCancel} object={card} setObject={setCard} />
        </div>
    );
}

export default CreateCard;