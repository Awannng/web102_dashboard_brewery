import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";

const DetailsPage = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState([]);

  // Fetch the data of a specific brewery based on id
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.openbrewerydb.org/v1/breweries/${id}`
      );
      const data = await response.json();
      setBrewery(data);
    };
    fetchData();
  }, [id]);

  return (
    <>
      {/* Back to the main page */}
      <Link to="/" className="back-link">
        <img src="/src/assets/back.png" alt="back icon" width="40px" />
      </Link>

      {/* The additional infos */}
      <div className="details-container">
        <h1>{brewery.name}</h1>

        <div className="details-grid">
          <div className="detail-item">
            <h3>Type</h3>
            <p>{brewery.brewery_type}</p>
          </div>

          <div className="detail-item">
            <h3>Address</h3>
            <p>
              {brewery.street && (
                <>
                  {brewery.street}
                  <br />
                </>
              )}
              {brewery.city}, {brewery.state} {brewery.postal_code}
              {brewery.country && <>, {brewery.country}</>}
            </p>
          </div>

          <div className="detail-item">
            <h3>Phone</h3>
            <p>{brewery.phone || "N/A"}</p>
          </div>

          <div className="detail-item">
            <h3>Website</h3>
            {brewery.website_url ? (
              <a href={brewery.website_url} target="_blank">
                Visit Website
              </a>
            ) : (
              <p>N/A</p>
            )}
          </div>

          {brewery.latitude && brewery.longitude && (
            <div className="detail-item">
              <h3>Map Location</h3>
              <a
                href={`https://www.google.com/maps?q=${brewery.latitude},${brewery.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
