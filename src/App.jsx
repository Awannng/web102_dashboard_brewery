import React, { useState, useEffect } from "react";
import "./App.css";
import Cards from "../components/Cards";

function App() {
  const [brews, setBrews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  // counts of different kinds of brewery
  const brewpubCount = brews.filter((brew) => brew.brewery_type === "brewpub");
  const mircoCount = brews.filter((brew) => brew.brewery_type === "micro");
  const largeCount = brews.filter((brew) => brew.brewery_type === "large");

  //2 urls based on category, the random list or based on states
  let url = "";
  if (category && type) {
    url = `/api/v1/breweries?by_state=${searchInput}&by_type=${type}`;
  } else if (category && type == "") {
    url = `/api/v1/breweries?by_state=${searchInput}`;
  } else {
    url = "/api/v1/breweries";
  }

  // Fetching the data from open source api, https://www.openbrewerydb.org/documentation#list-breweries
  useEffect(() => {
    const fetchBrews = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setBrews(data);
    };
    fetchBrews();
  }, [category, type]);

  //only search by state
  const searchByState = () => {
    setCategory(searchInput);
  };

  return (
    <>
      <div className="title">
        <img src="src/assets/beer-mug.png" alt="beer mug" />
        <h1>Brewery</h1>
      </div>
      <div className="cards">
        <Cards count={brewpubCount} title="Brewpub Counts" />
        <Cards count={mircoCount} title="Mirco Counts" />
        <Cards count={largeCount} title="Large Counts" />
      </div>

      {/* Search-filter based on requirements*/}
      <div className="search">
        {/* search input box */}
        <input
          type="search"
          value={searchInput}
          placeholder="Search base on state..."
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {/* select based on the types of brewery*/}
        <select
          name={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          <option value="">None</option>
          <option value="brewpub">Brewpub</option>
          <option value="micro">Micro</option>
          <option value="large">Large</option>
        </select>

        <button onClick={searchByState}>Search</button>
      </div>

      <div className="datas">
        <div className="data-titles">
          <h2>Name</h2>
          <h2>Street</h2>
          <h2>State</h2>
          <h2>Type</h2>
          <h2>Website</h2>
        </div>
        {brews &&
          brews.map((brew, index) => {
            return (
              <div key={index} className="brew-info">
                <div>
                  <p>{brew.name}</p>
                </div>

                {/* If street is not null, display the street ot N/A when is null */}
                <div>
                  {brew.street !== null ? <p>{brew.street}</p> : <p>N/A</p>}
                </div>

                <div>
                  <p>{brew.state}</p>
                </div>

                <div>
                  <p>{brew.brewery_type}</p>
                </div>

                {/* If url is not null, display the the link ot N/A when is null */}
                <div>
                  {brew.website_url !== null ? (
                    <a href={brew.website_url} target="_blank">
                      <img src="src/assets/beer.png" alt="a beer icon" />
                    </a>
                  ) : (
                    <p>N/A</p>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default App;
