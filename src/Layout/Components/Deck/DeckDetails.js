import React, { useState, useEffect, useCallback } from "react";
import {
    Link,
    useParams,
    useHistory,
    useNavigate,
    useMatch,
} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../../utils/api";
import classNames from "../../../utils/class-names";
// import CardList from "../Cards/CardList";
import NavBar from "../NavBar";
import NotFound from "../../NotFound";

function DeckDetails() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const { name, description } = deck;

    const history = useNavigate();

    useEffect(() => {
        setDeck([]);
        // setup for pending api calls to be cancelled
        const abortController = new AbortController();
        async function loadDeckData() {
            const deckId = window.location.href.split("/decks/")[1];
            try {
                let _decks = await readDeck(deckId, abortController.signal);
                setDeck(_decks);
            } catch (error) {
                if (error.name === "AbortError") {
                    // Ignore `AbortError`
                    console.log(`Aborted! Get deck ${deckId} details.`);
                } else {
                    // throw error;
                    console.log(error)
                }
            }
        }
        loadDeckData();

        return () => abortController.abort(); // Cancels any pending request or response
    }, [])

    async function handleDeleteDeck() {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            await deleteDeck(deckId);
            history("/");
        }
    }

    return (
        <>
            <NavBar path={window.location.href} deck={deck} />
            {Object.keys(deck).length === 0 ?
                <NotFound /> :
                <div>
                    <h3 className={classNames({ "animated-bg animated-bg-text": !name })}>
                        {name}
                    </h3>
                    <p className={classNames({ "animated-bg animated-bg-text": !name })}>
                        {description}
                    </p>
                    <div className="deck-card-buttons">
                        <div>
                            <Link
                                className={classNames({
                                    btn: true,
                                    "btn-secondary": true,
                                    disabled: !name,
                                })}
                                to={`/decks/${deckId}/edit`}
                            >
                                <span className="oi oi-pencil"></span> Edit
                            </Link>
                            <Link
                                className={classNames({
                                    btn: true,
                                    "btn-primary": true,
                                    disabled: !name,
                                })}
                                to={`/decks/${deckId}/study`}
                            >
                                <span className="oi oi-book"></span> Study
                            </Link>
                            <Link
                                className={classNames({
                                    btn: true,
                                    "btn-primary": true,
                                    disabled: !name,
                                })}
                                to={`/decks/${deckId}/cards/new`}
                            >
                                <span className="oi oi-plus"></span> Add Cards
                            </Link>
                        </div>
                        <button
                            className="btn btn-danger delete-deck"
                            onClick={handleDeleteDeck}
                            disabled={!name}
                        >
                            <span className="oi oi-trash"></span>
                        </button>
                    </div>

                    {/* <CardList deck={deckInfo} deleteHandler={deleteHandler} /> */}
                </div>
            }
        </>
    )
}

export default DeckDetails;