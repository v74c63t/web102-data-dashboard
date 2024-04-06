import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'
import './BreweryDetail.css'

const BreweryDetail = () => {
  let params = useParams()
  const [brewery, setBrewery] = useState(null)

  useEffect(() => {
    const getBreweryDetail = async () => {
      axios.get(`https://api.openbrewerydb.org/v1/breweries/${params.id}`)
      .then((res) => {
        if(!res.message) {
          setBrewery(res.data)
        }
      })
    }

    getBreweryDetail().catch(console.error)
  }, [params.id])

  return (
    <div>
      { brewery !== null ?
        (
          <div className="page">
            <div className="brewery-detail">
              <div>Name: {brewery.name}</div>
              <div>Brewery Type: {brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}</div>
              <div>{`${brewery.address_1!== null ? "Street: " + brewery.address_1: ""}${brewery.address_2 !== null ? ", " + brewery.address_2 : ""}${brewery.address_3 !== null ? ", " + brewery.address_3 : ""}`}</div>
              <div>City: {brewery.city}</div>
              <div>State: {brewery.state_province}</div>
              <div>Country: {brewery.country}</div>
              <div>{`${brewery.phone!== null ? "Phone: " + brewery.phone: ""}`}</div>
              <div>{brewery.website_url!== null ? (<a href={brewery.website_url}>Website: {brewery.website_url}</a>): ""}</div>
              <div>Location: <a href={`https://maps.google.com/?q=${brewery.latitude},${brewery.longitude}`}>Google Maps</a></div>
            </div>
          </div>
        )
      : ""}
    </div>
  )
}

export default BreweryDetail;