import React, { useRef, useState } from "react";
import styled from "styled-components";

const AddMovie = ({ addMovieHandler }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const titleRef = useRef();
  const contentRef = useRef();
  const releaseDateRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();

    const newMovie = {
      id: Date.now(),
      title: titleRef.current.value,
      content: contentRef.current.value,
      releaseDate: releaseDateRef.current.value,
    };

    addMovieHandler(newMovie);
    setTitle("");
    setContent("");
    setReleaseDate("");
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      case "releaseDate":
        setReleaseDate(e.target.value);
        break;
      default:
        break;
    }
  };

  return (
    <AddMovieForm onSubmit={submitHandler}>
      <FormChildBox>
        <h4>Title</h4>
        <input
          type='text'
          ref={titleRef}
          onChange={changeHandler}
          name='title'
          value={title}
        />
      </FormChildBox>
      <FormChildBox>
        <h4>Content</h4>
        <textarea
          name='content'
          id=''
          cols='30'
          rows='10'
          ref={contentRef}
          onChange={changeHandler}
          value={content}
        ></textarea>
      </FormChildBox>
      <FormChildBox>
        <h4>Release Date</h4>
        <input
          type='text'
          ref={releaseDateRef}
          onChange={changeHandler}
          name='releaseDate'
          value={releaseDate}
        />
      </FormChildBox>
      <button>Add Movie</button>
    </AddMovieForm>
  );
};

export default AddMovie;

const AddMovieForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50%;
  padding: 2em 0;
  border-radius: 2em;
  background-color: #fff;
  margin-bottom: 1em;

  button {
    border-style: none;
    background-color: #250d49;
    color: #fff;
    padding: 0.8em 2em;
    border-radius: 1.5em;
    cursor: pointer;
  }
`;

const FormChildBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 1em 2em;

  input {
    border: 1px solid #ccc;
    border-radius: 2em;
    height: 1.5em;
    outline: none;
    padding-left: 1em;
  }

  h4 {
    padding: 0;
    margin: 0;
    margin-bottom: 0.5em;
  }

  textarea {
    border: 1px solid #ccc;
    border-radius: 1em;
    outline: none;
    padding: 1em;
  }
`;
