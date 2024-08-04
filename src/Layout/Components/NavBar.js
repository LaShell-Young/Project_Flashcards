import React from "react";
import { Link } from "react-router-dom";

function NavBar({ path, deck }) {
    const getCurrentPage = () => {
        let page = "";
        if (path.endsWith("/decks/new"))
            page = "Create Deck";
        else if (path.endsWith("study"))
            page = "Study";
        else if (path.endsWith("edit") && !path.includes("cards"))
            page = "Edit";
        else if (path.endsWith("edit") && path.includes("cards")) {
            const cardId = path.split("/cards/")[1];
            page = `Edit Card ${cardId}`;
        } else if (path.endsWith("/cards/new"))
            page = "Add Card";

        return page;
    }

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        <span className="oi oi-home"></span> Home
                    </Link>
                </li>
                {
                    deck &&
                    <li className="breadcrumb-item">
                        <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                    </li>
                }
                <li className="breadcrumb-item active" aria-current="page">
                    {getCurrentPage()}
                </li>
            </ol>
        </nav>
    )
}

export default NavBar;