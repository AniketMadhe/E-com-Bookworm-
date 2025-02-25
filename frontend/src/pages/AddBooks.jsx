import { React, useState } from "react";
import axios from "axios";
import BASE_URL from "../configUrl";

function AddBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    console.log("in handlssubmit");
    e.preventDefault();
    try {
      await axios.post(
        `${BASE_URL}/api/addBook`,
        {
          title,
          author,
          price,
          description,
          imageUrl,
        },
        {
          withCredentials: true,
        }
      );
      setTitle("");
      setAuthor("");
      setPrice("");
      setDescription("");
      setImageUrl("");
      alert("Book added");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-400  items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full h-full justify-center items-center"
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          required
        />
        <label htmlFor="author">Author</label>
        <input
          id="author"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
          required
        />
        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          placeholder=" Price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          required
        />
        <label htmlFor="description">Description</label>
        <input
          id="description"
          type="text"
          placeholder=" description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        />
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="text"
          placeholder="Image url"
          value={imageUrl}
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddBooks;
