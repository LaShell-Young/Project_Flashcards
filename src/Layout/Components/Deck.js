import React from 'react';
import { Link } from "react-router-dom";
import './Deck.css';

const Deck = ({ id, name, description, cards, handleDeleteDeck }) => {
    return (<div className="card my-1" key={id}>
        <div className="card-body">
            <div className="deck-card-header">
                <h5 className="card-title ">{name}</h5>
                <p className="card-subtitle text-muted">{cards?.length} cards</p>
            </div>
            <p className="card-text">{description}</p>
            <div className="deck-card-buttons">
                <div>
                    <Link to={`/decks/${id}`} className="btn btn-secondary">
                        <span className="oi oi-eye"></span> View
                    </Link>
                    <Link className="btn btn-primary" to={`/decks/${id}/study`}>
                        <span className="oi oi-book"></span> Study
                    </Link>
                </div>
                <button
                    className="btn btn-danger delete-deck"
                    onClick={() => handleDeleteDeck(id)}
                >
                    <span className="oi oi-trash"></span>
                </button>
            </div>
        </div>
    </div>
    );
};

export default Deck;