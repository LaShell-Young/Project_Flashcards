import React from "react";
import { Link } from "react-router-dom";
import "./CardDetails.css";

function CardDetails({ id, front, back, deckId, deleteHandler }) {

    return (
        <div className="col-12 col-md-6" key={id}> {/* Responsive columns */}
            <div className="card my-1 position-relative">
                <div className="card-body d-flex justify-content-between align-items-center">
                    <div className="card-content d-flex">
                        <p className="card-text mx-2 mb-0">{front}</p>
                        <p className="card-text mx-2 mb-0">{back}</p>
                    </div>
                    <div className="card-buttons">
                        <Link
                            className="btn btn-secondary"
                            to={`/decks/${deckId}/cards/${id}/edit`}
                        >
                            <span className="oi oi-pencil"></span> Edit
                        </Link>
                        <button
                            className="btn btn-danger delete-deck"
                            onClick={() => deleteHandler(id)}
                        >
                            <span className="oi oi-trash"></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// {
//     "id": 1,
//     "front": "Differentiate between Real DOM and Virtual DOM.",
//     "back": "Virtual DOM updates are faster but do not directly update the HTML",
//     "deckId": 1
//   }

export default CardDetails;