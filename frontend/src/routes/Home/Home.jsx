import React from "react";

function Home() {
  return (
    <div>
      <h1>Welcome to Book Management App</h1>
      <h2>Manage Your Books with Ease</h2>
      <p>
        Welcome to the Book Management App! This application allows you to
        effortlessly manage your book collection. Whether you want to keep track
        of your favorite books, add new ones, update details, or delete books
        you no longer need, this app has you covered.
      </p>

      <h2>Key Features:</h2>
      <ul>
        <li>
          <strong>Add New Books:</strong> Easily add new books to your
          collection with all the necessary details including title, author,
          genre, and description.
        </li>
        <li>
          <strong>Update Book Details:</strong> Keep your book information
          up-to-date by editing the details of existing books.
        </li>
        <li>
          <strong>Delete Books:</strong> Remove books from your collection that
          you no longer want to keep.
        </li>
        <li>
          <strong>View Book Collection:</strong> Browse through your entire book
          collection on a single screen, with an intuitive and user-friendly
          interface.
        </li>
      </ul>
      <p>Start managing your books efficiently today!</p>

      <h2>How to Get Started:</h2>
      <ul>
        <li>
          <strong>Add a Book:</strong> Click on the 'Add Book' button and fill
          in the book details to add a new book to your collection.
        </li>
        <li>
          <strong>Update a Book:</strong> Click on the 'Edit' button next to any
          book in your collection to update its details.
        </li>
        <li>
          <strong>Delete a Book:</strong> Click on the 'Delete' button next to
          any book you wish to remove from your collection.
        </li>
      </ul>
    </div>
  );
}

export default Home;
