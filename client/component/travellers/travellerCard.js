import React from "react";

export default function TravellerCard({ traveller, notify }) {
    function handleDelete() {
        fetch(`http://localhost:3001/travellers/${traveller.id}`, { method: "DELETE" })
            .then(() => notify({ action: 'delete', traveller: traveller }))
            .catch(error => notify({ action: "delete", error: error }))
    }
    return (
        <tr key={traveller.id}>
            <td>{traveller.id}</td>
            <td>{traveller.name}</td>
            <td>{traveller.email}</td>
            <td>
                <button className="" onClick={handleDelete}>
                    delete
                </button>
                <button
                    onClick={() => notify({ action: "edit-form", traveller: traveller })}
                >
                    edit
                </button>
            </td>
        </tr>
    );
}
