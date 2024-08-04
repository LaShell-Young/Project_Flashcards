import React, { useState, useEffect, useCallback } from "react";
import {
    Link,
    useParams,
    useNavigate,
} from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../../utils/api";
import classNames from "../../../utils/class-names";
import NavBar from "../NavBar";
import CardList from "../Card/CardList";

function DeckDetails() {
    const [deck, setDeck] = useState({});
    const { deckId } = useParams();
    const { name, description } = deck;

    const history = useNavigate();

    const getDeckDetails = useCallback(async () => {
        try {
            const deckData = await readDeck(deckId);
            setDeck(deckData);
        } catch (error) {
            setDeck({ name: "Not Found" });
        }
    }, [deckId]);

    useEffect(() => {
        getDeckDetails();
    }, [deckId, getDeckDetails]);

    async function handleDeleteDeck() {
        if (window.confirm("Delete this deck?\n\nYou will not be able to recover it.")) {
            await deleteDeck(deckId);
            history("/");
        }
    }

    async function handleDeleteCard(cardId) {
        if (window.confirm("Delete this Card?\n\nYou will not be able to recover it.")) {
            await deleteCard(cardId);
            getDeckDetails();
        }
    }

    return (
        <>
            <NavBar path={window.location.href} deck={deck} />
            {Object.keys(deck).length === 1 ?
                <h3>{deck.name}</h3> :
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
                    <CardList deck={deck} deleteHandler={handleDeleteCard} />
                </div>
            }
        </>
    )
}

export default DeckDetails;