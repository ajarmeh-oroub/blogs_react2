import React, { useState, useEffect } from "react";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data from API based on the search term
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredData([]); // Clear data if search term is empty
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/search?search=${searchTerm}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFilteredData(data); // Assuming the response is an array of objects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="position-relative">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control w-100"
        style={{
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "5px",
        }}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
  
      {/* Dropdown for search results */}
      {searchTerm && (
        <div
          className="position-absolute top-100 start-0 w-100 bg-white rounded shadow-sm"
          style={{
            maxHeight: "300px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {loading ? (
            <p className="text-center p-3">Loading...</p>
          ) : (
            filteredData.length > 0 &&
            filteredData.map((item) => (
              <a
                key={item.id}
                href={`/blog/${item.id}`}
                className="text-decoration-none"
              >
                <div
                  className="d-flex align-items-center px-3 py-2 border-bottom"
                  style={{
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-fluid rounded"
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <p style={{ margin: "0" }}>{item.title}</p>
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#888",
                      }}
                    >
                      {item.article.slice(0, 50)}...
                    </span>
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      )}
    </div>
  );
  
  
  
  
};

export default SearchBar;
