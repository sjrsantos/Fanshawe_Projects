import React, { useRef, useState } from "react";
import { categories, statuses } from "../../includes/variables";
import "./style.scss";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/postSlice";

export default function Form() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [promote, setPromote] = useState(false);
  const [status, setStatus] = useState("");
  const [picture, setPicture] = useState("");
  const [errorMessages, setErrorMessages] = useState([]); // ["The title must be at least 5 characters long", "The content is required", "The category is required", "The status is required"
  const [showSuccessMessage, setShowSuccessMessage] = useState(false); // ["The title must be at least 5 characters long", "The content is required", "The category is required", "The status is required"

  const dispatch = useDispatch();
  const inputFile = useRef();

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Hide the success message
    setShowSuccessMessage(false);

    // Validate the data
    const validate = [];
    if (title.length < 5) {
      validate.push("The title must be at least 5 characters long");
    }
    if (content === "") {
      validate.push("The content is required");
    }
    if (category === "") {
      validate.push("The category is required");
    }
    if (status === "") {
      validate.push("The status is required");
    }
    if (picture === "") {
      validate.push("The picture is required");
    }

    setErrorMessages(validate);

    if (validate.length === 0) {
      // Valid data

      const data = { title, content, category, promote, status, picture };
      dispatch(addPost(data));

      // Display success message
      setShowSuccessMessage(true);

      // Clear the form
      setTitle("");
      setContent("");
      setCategory("");
      setPromote(true);
      setStatus("");
      setPicture("");
      inputFile.current.value = "";
    }
  };

  const handlePictureSelection = (event) => {
    const files = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(files);
    fileReader.onload = (eventLoad) => {
      setPicture(eventLoad.target.result);
    };
  };

  return (
    <form className="form-component" onSubmit={handleFormSubmit}>
      {/* Conditionally display the success message */}
      {showSuccessMessage && (
        <div className="success-message">
          <h3>Success</h3>
          <p>The post has been added</p>
        </div>
      )}

      {/* Conditionally display the error message */}
      {errorMessages.length > 0 && (
        <div className="form-validate">
          <h3>Errors</h3>
          <ul>
            {errorMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Title Field */}
      <div>
        <label>
          Title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            maxLength={20}
            placeholder="Enter a title"
          />
        </label>
      </div>
      {/* Content Field */}
      <div>
        <label>
          Content
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            maxLength={100}
            placeholder="Enter some content"
          />
        </label>
      </div>
      {/* Category Field */}
      <div>
        <label>
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value={""}>- Select -</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* Promote Field */}
      <div className="promote-field">
        <label>
          Promote
          <input
            type="checkbox"
            checked={promote}
            onChange={(event) => setPromote(event.target.checked)}
          />
        </label>
      </div>

      {/* Status Field (Draft, Publish, Archive) */}
      <div className="status-field">
        Status:
        {statuses.map((item) => (
          <label key={item.id}>
            <input
              type="radio"
              value={item.id}
              checked={status === item.id}
              onChange={(event) => setStatus(event.target.value)}
            />
            {item.text}
          </label>
        ))}
      </div>

      {/* Picture Field */}

      <fieldset>
        <legend>Picture Preview</legend>
        <label>
          Select an image:
          <input
            type="file"
            name="myImage"
            accept="image/*"
            onChange={handlePictureSelection}
            ref={inputFile}
          />
        </label>
        <div>
          {/* Conditionally display the image */}
          {picture !== "" && <img src={picture} alt="Preview" width="400" />}
        </div>
      </fieldset>

      {/* Submit Button */}
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
