import React, { useState } from "react";

function CreateForm({ formType, handleSubmit, handleCancel, object = {} }) {
    const [objectInfo, setObjectInfo] = useState(object);
    const updateForm = (event) => {
        const { name, value } = event.target;
        setObjectInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
    };
    const submit = (event) => {
        event.preventDefault();
        handleSubmit(objectInfo);
    };

    const isDeckForm = () => {
        return formType === "deck";
    }

    console.log(objectInfo)
    return (
        <form onSubmit={submit}>
            <div className="form-group">
                {isDeckForm() ?
                    <>
                        <label htmlFor="name">Name</label>
                        <input
                            className="form-control"
                            type="text"
                            id="name"
                            name="name"
                            placeholder={!object?.name ? "Deck name" : object.name}
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
                            placeholder={!object?.front ? "Front side of card" : object.front}
                            value={objectInfo?.front || ""}
                            onChange={updateForm}
                            required
                        ></textarea>
                    </>
                }
            </div>
            <div className="form-group">
                {isDeckForm() ?
                    <>
                        <label htmlFor="description">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            id="description"
                            placeholder={!object?.description ? "Brief description of the deck" : object.description}
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
                            placeholder={!object?.back ? "Back side of card" : object.back}
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