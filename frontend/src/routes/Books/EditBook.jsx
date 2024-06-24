import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NoImageSelected from "../../assets/no-image-selected.jpg";

function EditBook() {
  const navigate = useNavigate();
  const urlSlug = useParams();
  const baseURL = `http://localhost:8000/api/books/${urlSlug.slug}`;

  const [bookId, setBookId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [stars, setStars] = useState(0);
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [image, setImage] = useState(NoImageSelected);

  const fetchData = async () => {
    try {
      const response = await fetch(baseURL);

      if (!response.ok) {
        throw new Error("Failed to fetch data.");
      }

      const data = await response.json();
      setBookId(data._id);
      setTitle(data.title);
      setSlug(data.slug);
      setStars(data.stars);
      setDescription(data.description);
      setCategories(data.category);
      setThumbnail(data.thumbnail);
    } catch (error) {
      console.log("Error occured while fetching data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateBook = async (e) => {
    e.preventDefault(); // prevent refreshing page on submit
    console.table([title, slug]);

    const formData = new FormData();
    formData.append("bookId", bookId);
    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("stars", stars);
    formData.append("description", description);
    formData.append("category", categories);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await fetch("http://localhost:8000/api/books", {
        method: "PUT",
        body: formData,
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

  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
      setThumbnail(e.target.files[0]);
    }
  };

  const handleCategoryChange = (e) => {
    setCategories(e.target.value.split(",").map((category) => category.trim()));
  };

  const removeBook = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8000/api/books/" + bookId,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/books");
        console.log("Book Deleted Successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Edit Book</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nemo, quia.
      </p>

      <button onClick={removeBook} className="delete">
        Delete Book
      </button>

      {submitted ? (
        <p>Data Submitted Successfully!</p>
      ) : (
        <form className="bookdetails" onSubmit={updateBook}>
          <div className="col-1">
            <label>Upload Thumbnail</label>

            {image ? (
              <img src={`${image}`} alt="preview-image" />
            ) : (
              <img
                src={`http://localhost:8000/uploads/${thumbnail}`}
                alt="preview-image"
              />
            )}
            <input
              onChange={onImageChange}
              type="file"
              accept="image/gif, image/jpeg, image/png"
            />
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
            <input className="add-book" type="submit" value="+ Add Book" />
          </div>
        </form>
      )}
    </div>
  );
}

export default EditBook;
