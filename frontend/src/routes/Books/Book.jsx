import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Book() {
  const baseUrl = "http://localhost:8000/api/books";
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseUrl;
        url += `?category=${selectedCategory}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch data.");
        }

        const jasonData = await response.json();
        setData(jasonData);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError("Error fetching data, please try again");
      }
    };
    fetchData();
  }, [selectedCategory]);

  return (
    <div>
      <h1>Book</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid,
        assumenda.
      </p>

      <h1>Api Fetching</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="filters">
        <label>Categories</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="romance">Romance</option>
          <option value="science">Science</option>
          <option value="crime">Crime</option>
          <option value="food">Food</option>
          <option value="adventure">Adventure</option>
          <option value="thriller">Thriller</option>
          <option value="other">Other</option>
        </select>
      </div>

      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="books">
          {data.map((item) => (
            <li key={item._id}>
              <Link to={`/books/${item.slug}`}>
                <img
                  src={`http://localhost:8000/uploads/${item.thumbnail}`}
                  alt={item.title}
                />
                <h3>{item.title}</h3>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Book;
