import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import About from "./routes/About/About";
import Book from "./routes/Books/Book";
import SingleBook from "./routes/Books/SingleBook";
import CreateBook from "./routes/Books/CreateBook";
import EditBook from "./routes/Books/EditBook";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Book />} />
          <Route path="/books/:slug" element={<SingleBook />} />
          <Route path="/createbook" element={<CreateBook />} />
          <Route path="/editbook/:slug" element={<EditBook />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
