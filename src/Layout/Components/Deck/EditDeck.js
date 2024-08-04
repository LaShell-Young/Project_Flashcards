import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../../../utils/api/index";
import CreateForm from "../CreateForm";
import NavBar from "../NavBar";

function EditDeck() {
    const [deck, setDeck] = useState({});
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
            <CreateForm
                formType={"deck"}
                handleSubmit={handleSubmit}
                handleCancel={handleCancel}
                object={deck}
            />
        </div>
    );
}

export default EditDeck;