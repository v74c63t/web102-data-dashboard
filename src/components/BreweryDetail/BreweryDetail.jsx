import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios'

const BreweryDetail = () => {
  let params = useParams()
  const [brewery, setBrewery] = useState(null)

  useEffect(() => {
    const getBreweryDetail = async () => {
      axios.get(`https://api.openbrewerydb.org/v1/breweries/${params.id}`)
      .then((res) => {
        console.log(res)
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
            <div>{brewery.name}</div>
            <div>{brewery.brewery_type.charAt(0).toUpperCase() + brewery.brewery_type.slice(1)}</div>
            <div>{`${brewery.address_1!== null ? brewery.address_1: "N/A"}${brewery.address_2 !== null ? ", " + brewery.address_2 : ""}${brewery.address_3 !== null ? ", " + brewery.address_3 : ""}`}</div>
            <div>{brewery.city}</div>
            <div>{brewery.state_province}</div>
            <div>{brewery.country}</div>
            <div>{`${brewery.phone!== null ? brewery.phone: "N/A"}`}</div>
            <div>{brewery.website_url!== null ? (<a href={brewery.website_url}>{brewery.website_url}</a>): "N/A"}</div>
          </div>
        )
      : ""}
    </div>
  )
}

export default BreweryDetail;