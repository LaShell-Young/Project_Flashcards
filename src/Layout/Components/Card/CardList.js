import React from "react";
import CardDetails from "./CardDetails";

function CardList({ deck, deleteHandler }) {
    let rows = deck.cards?.map((card) =>
        CardDetails({ ...card, deleteHandler })
    );

    return (
        <div>
            {
                rows?.length === 0 ?
                    <h3>There are no cards!</h3> :
                    <>
                        <h2 className="mt-4">Cards</h2>
                        <div className="container">
                            <div className="row">
                                {rows}
                            </div>
                        </div>
                    </>
            }
        </div>
    );
}

export default CardList;