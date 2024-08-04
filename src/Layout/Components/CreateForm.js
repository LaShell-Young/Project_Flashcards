import React, { useState } from "react";

function CreateForm({ formType, handleSubmit, handleCancel }) {
    const [objectInfo, setObjectInfo] = useState({});
    const updateForm = (event) => {
        const { name, value } = event.target;
        setObjectInfo({ ...objectInfo, [name]: value });
    };
    const submit = (event) => {
        event.preventDefault();
        handleSubmit(objectInfo);
    };

    const isDeckForm = () => {
        return formType === "deck";
    }

    return (
        <form onSubmit={submit}>
            <div className="form-group">
                {isDeckForm ?
                    <>
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Deck Name"
                            value={objectInfo?.name || ""}
                            onChange={updateForm}
                            required
                        ></input>
                    </>
                    :
                    <>
                        <label htmlFor="front">Front</label>
                        <textarea
                            className="form-control"
                            type="text"
                            id="front"
                            name="front"
                            placeholder="Front side of card"
                            value={objectInfo?.front || ""}
                            onChange={updateForm}
                            required
                        ></textarea>
                    </>
                }
            </div>
            <div className="form-group">
                {isDeckForm ?
                    <>
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            id="description"
                            placeholder="Brief description of the deck"
                            value={objectInfo?.description || ""}
                            onChange={updateForm}
                            required
                        ></textarea>
                    </> :
                    <>
                        <label htmlFor="back">Back</label>
                        <textarea
                            className="form-control"
                            name="back"
                            id="back"
                            placeholder="Back side of card"
                            value={objectInfo?.back || ""}
                            onChange={updateForm}
                            required
                        ></textarea>
                    </>
                }
                <button className="btn btn-secondary my-2" onClick={handleCancel}>
                    Cancel
                </button>
                <button type="submit" className="btn btn-primary my-2">
                    Submit
                </button>
            </div>
        </form>
    );
}

export default CreateForm;