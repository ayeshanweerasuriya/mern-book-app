import { useState } from "react";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function CreateBook() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const createBook = async (e) => {
    e.preventDefault(); // prevent refreshing page on submit
    console.table([title, slug]);

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title,
          slug: slug,
          stars: stars,
          description: description,
          category: categories,
        }),
      });

      if (response.ok) {
        setTitle("");
        setSlug("");
        setSubmitted(true);
      } else {
        console.log("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStarsChange = (e) => {
    const value = e.target.value;
    if (/^[0-5]?$/.test(value)) {
      // Only update state if the value is between 0 and 5
      setStars(value);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  return (
    <div>
      <h1>Create Book</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, quia.
      </p>

      {submitted ? (
        <p>Data Submitted Successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={createBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>
            <img src={NoImageSelected} alt="preview-image" />
            <input type="file" accept="image/gif, image/jpeg, image/png" />
          </div>
          <div className="col-2">
            <div>
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
            <div>
              <label>Stars</label>
              <input
                type="number"
                value={stars}
                onChange={handleStarsChange}
                min="0"
                max="5"
              />
            </div>
            <div>
              <label>Description</label>
              <textarea
                rows={4}
                cols={50}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>
            <div>
              <label>Categories (comma-seperated)</label>
              <input
                type="text"
                value={categories}
                onChange={handleCategoryChange}
              />
            </div>
            <input type="submit" value="+ Add Book" />
          </div>
        </form>
      )}
    </div>
  );
}

export default CreateBook;
