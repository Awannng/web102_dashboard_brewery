import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Cards from "../components/Cards";
import Charts from "../components/Charts";

const ListingPage = () => {
  const [brews, setBrews] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");

  // counts of different kinds of brewery
  const brewpubCount = brews.filter(
    (brew) => brew.brewery_type === "brewpub"
  ).length;
  const mircoCount = brews.filter(
    (brew) => brew.brewery_type === "micro"
  ).length;
  const largeCount = brews.filter(
    (brew) => brew.brewery_type === "large"
  ).length;

  //3 urls based on category, the random list or based on states
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
      <div className="cards">
        <Cards count={brewpubCount} title="Brewpub Counts" />
        <Cards count={mircoCount} title="Mirco Counts" />
        <Cards count={largeCount} title="Large Counts" />
      </div>

      {/* The container for both lists and charts */}
      <div className="all-container">
        {/* the list */}
        <div className="list">
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
              <h2>State</h2>
              <h2>Type</h2>
              <h2>Website</h2>
              <h2>Details</h2>
            </div>
            {brews &&
              brews.map((brew, index) => {
                return (
                  <div key={index} className="brew-info">
                    <div>
                      <p>{brew.name}</p>
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
                          <img src="/src/assets/beer.png" alt="beer icon" />
                        </a>
                      ) : (
                        <p>N/A</p>
                      )}
                    </div>

                    {/* Extra information about the brewery */}
                    <div>
                      <p>
                        <Link to={`/details/${brew.id}`}>
                          <img src="src/assets/link.png" alt="link icon" />
                        </Link>
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* charts */}
        <div className="charts">
          <Charts />
        </div>
      </div>
    </>
  );
};

export default ListingPage;
