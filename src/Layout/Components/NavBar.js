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

    const pageName = getCurrentPage();

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                        <span className="oi oi-home"></span> Home
                    </Link>
                </li>
                {
                    // deck &&
                    // Object.keys(deck).length !== 0 &&
                    deck && Object.keys(deck).length !== 0 &&
                    <li className="breadcrumb-item">
                        {pageName === "" ?
                            `${deck.name}` :
                            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                        }
                    </li>
                }
                {
                    pageName !== "" &&
                    <li className="breadcrumb-item active" aria-current="page">
                        {pageName}
                    </li>
                }
            </ol>
        </nav>
    )
}

export default NavBar;