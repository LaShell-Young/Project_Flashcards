import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../../utils/api/index";
import NavBar from "../NavBar";
import CreateEditForm from "../CreateEditForm";

function EditDeck() {
    const [deck, setDeck] = useState({
        "name": "",
        "description": "",
        "cards": []
    });
    const { deckId } = useParams();
    const history = useNavigate();

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

        loadDeck();

        return () => abortController.abort();
    }, [deckId]);

    console.log(deck)

    function handleSubmit(deck) {
        const abortController = new AbortController();
        async function editDeck() {
            try {
                const deckInfo = await updateDeck(deck, abortController.signal);
                history(`/decks/${deckInfo.id}`);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.info("aborted");
                } else {
                    throw err;
                }
            }
        }
        editDeck();

        return () => {
            abortController.abort();
        };
    }

    function handleCancel() {
        history(`/decks/${deckId}`);
    }

    return (
        <div>
            <NavBar path={window.location.href} deck={deck} />
            <h1>Edit Deck</h1>
            <CreateEditForm formType="deck" object={deck} setObject={setDeck} handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
}

export default EditDeck;