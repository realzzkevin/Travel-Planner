import React, {useState} from "react";

export default function TravellerFrom ({ traveller: initalTraveller, notify}){
    const [traveller, setTraveller] = useState(initalTraveller);
    const isAdd = initalTraveller.id === 0;

    const handleChange = (event) => {
        const clone = { ...traveller};
        clone[event.target.name] = event.target.value;
        setTraveller(clone);
    }
    const handleSubmit = (event) => {
        event.preventDefault()

        const url = `http://localhost:3001/traveller`
        const method = isAdd ? "POST" : "PUT"
        const expectedStatus = isAdd ? 201 : 204

        const init = {
            method,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(traveller)
        }

        fetch(url, init)
            .then(response => {
                if (response.status === expectedStatus) {
                    if (isAdd) {
                        return response.json()
                    } else {
                        return traveller
                    }
                }
                return Promise.reject(`Didn't receive expected status: ${expectedStatus}`)
            })
            .then(result => notify({
                action: isAdd ? "add" : "edit",
                traveller: result
            }))
            .catch(error => notify({ error: error }))
    }

    return(
        <div id="form-container" className="container">
            <h1>{isAdd ? "Add": "Edit"}traveller</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='travellerName'>Name</label>
                    <input type='text' id='travellerName' name='travellerName' className='form-control' value={traveller.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='travelerEmail'>Email</label>
                    <input type='text' id='travellerEmail' name='travellerEmail' className='form-control' value={traveller.email} onChange={handleChange} />
                </div>
                <div>
                    <button className='btn btn-primary' type='submit'>Save</button>
                    <button className='btn btn-secondary' onClick={() => notify({ action: "cancel" })}>Cancel</button>
                </div>
            </form>


        </div>
    )
}