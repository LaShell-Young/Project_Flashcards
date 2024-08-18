import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../../../utils/api/index";
import CreateEditForm from "../CreateEditForm";
import NavBar from "../NavBar";

function CreateDeck() {
    const history = useNavigate();
    function handleSubmit(deck) {
        const abortController = new AbortController();

        async function callCreateDeck() {
            try {
                const deckInfo = await createDeck(deck, abortController.signal);
                history(`/decks/${deckInfo.id}`);
            } catch (err) {
                if (err.name === "AbortError") {
                    console.info("aborted - create deck.");
                } else {
                    throw err;
                }
            }
        }
        callCreateDeck();
        return () => {
            abortController.abort();
        };
    }
    function handleCancel() {
        history("/");
    }

    const [deck, setdeck] = useState({
        "name": "",
        "description": "",
    })

    return (
        <div>
            <NavBar path={window.location.href} />
            <h1>Create Deck</h1>
            <CreateEditForm formType="deck" object={deck} setObject={setdeck} handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
}

export default CreateDeck;