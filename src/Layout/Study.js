import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { readDeck } from "../utils/api/index";
import NavBar from "./Components/NavBar";

function Study() {
    const { deckId } = useParams();
    const [deck, setDeck] = useState({});
    const [cards, setCards] = useState([]);
    const [cardNumber, setCardNumber] = useState(1);
    const [front, isFront] = useState(true);
    const history = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController();
            const response = await readDeck(deckId, abortController.signal);
            setDeck(response);
            setCards(response.cards);
            return () => {
                abortController.abort();
            };
        }
        fetchData();
    }, []);

    //Function handles the next button and at the end will check if user wants to go back home
    function nextCard(index, total) {
        console.log(index);
        if (index < total) {
            setCardNumber(cardNumber + 1);
            isFront(true);
        } else {
            if (
                window.confirm(
                    `Restart cards? Click 'cancel' to return to the home page`
                )
            ) {
                setCardNumber(1);
                isFront(true);
            } else {
                history("/");
            }
        }
    }

    //Flip card function
    function flipCard() {
        if (front) {
            isFront(false);
        } else {
            isFront(true);
        }
    }

    function showNextButton(cards, index) {
        if (front) {
            return null;
        } else {
            return (
                <button
                    onClick={() => nextCard(index + 1, cards.length)}
                    className="btn btn-primary mx-1"
                >
                    Next
                </button>
            );
        }
    }

    //Template for when there are necessary amount of cards to display
    function enoughCards() {
        return (
            <div className="card">
                {cards.map((card, index) => {
                    if (index === cardNumber - 1) {
                        return (
                            <div className="card-body" key={card.id}>
                                <div className="card-title">
                                    {`Card ${index + 1} of ${cards.length}`}
                                </div>
                                <div className="card-text">
                                    {front ? card.front : card.back}
                                </div>
                                <button onClick={flipCard} className="btn btn-secondary mx-1">
                                    Flip
                                </button>
                                {showNextButton(cards, index)}
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    //Template for when there aren't enough cards
    function notEnoughCards() {
        return (
            <div>
                <h2>Not enough cards.</h2>
                <p>
                    You need at least 3 cards to study. There are {cards.length} cards in
                    this deck.
                </p>
                <Link
                    to={`/decks/${deck.id}/cards/new`}
                    className="btn btn-primary mx-1"
                >
                    Add Cards
                </Link>
            </div>
        );
    }

    //Main template that handles if there are enough cards or not to show
    return (
        <div>
            <NavBar path={window.location.href} deck={deck} />
            <div>
                <h2>{`${deck.name}: Study`}</h2>
                <div>
                    {/* This checks for the amount of cards there are and will go to the correct funtion to either or not display flashcards */}
                    {cards.length === 0
                        ? notEnoughCards()
                        : cards.length > 2
                            ? enoughCards()
                            : notEnoughCards()}
                </div>
            </div>
        </div>
    );
}

export default Study;