'use client'

import React, { useEffect, useState } from "react";
import TravellerCard from './travellerCard';
import TravellerForm from "./travellerForm";

const travellers = () => {

  const [travellers, setTravellers] = useState([])
  const [error, setError] = useState()
  const [showForm, setShowForm] = useState(false)
  const [ScopeTraveller, setScopeTraveller] = useState({})

  useEffect(() => {
    fetchAll();
  }, [])

  const fetchAll = () => {
    fetch("http://localhost:3001/travellers/")
      .then(response => response.json())
      .then(result => setTravellers(result))
      .catch(error => console.log(error))
  }

  const addClick = () => {
    setScopeTraveller({ id: 0 })
    setShowForm(true)
  }

  const notify = ({ action, traveller, error }) => {
    if (error) {
      setError(error)
      setShowForm(false)
      return
    }

    switch (action) {
      case "add":
        setTravellers([...travellers, traveller])
        break
      case "edit":
        settravellers(travellers.map(g => {
          if (g.id === traveller.id) {
            return traveller
          }
          return g
        }))
        break
      case "edit-form":
        setScopetraveller(traveller)
        setShowForm(true)
        return
      case "delete":
        settravellers(travellers.filter(g => g.id !== traveller.id))
        break
      case "cancel":
        setShowForm(false)
        break
      default:
        console.log("Not a vaild action!!")
    }

    setError("")
    setShowForm(false)
  }

  if (showForm) {
    return <TravellerForm traveller={ScopeTraveller} notify={notify} />
  }


  return (
    <div>
      <h2>travellers</h2>
      <div>
        <button type="button" onClick={addClick}>
          Add a traveller
        </button>

      </div>
      {error && <div>{error}</div>}
      <div>
        <table id="travellers-list">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>email</th>
          </tr>
          <tbody>
            {travellers.map(traveller => {
              <TravellerCard key = {traveller.id} traveller = {traveller} notify={notify}/>
            })}
          </tbody>
        </table>
      </div>

    </div>
  )

}

export default travellers