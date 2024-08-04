import React from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
import CreateForm from "./CreateForm";
import NavBar from "./NavBar";

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

    return (
        <div>
            <NavBar path={window.location.href} />
            <h1>Create Deck</h1>
            <CreateForm formType={"deck"} handleSubmit={handleSubmit} handleCancel={handleCancel} />
        </div>
    );
}

export default CreateDeck;