import React, { useEffect, useRef, useState } from "react";

const TodoForm = ({ setText }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // input 첫 번째 박스 포커스
  const focusInput = useRef("");

  useEffect(() => {
    if (focusInput.current) focusInput.current.focus();
  }, []);

  // 추가버튼 로직
  const handleSubmit = (e) => {
    e.preventDefault();
    // 조건에 따른 alert 로직
    if (title === "" && content === "") {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    const newText = {
      title: title,
      content: content,
    };
    setText((prevText) => [...prevText, newText]);
    setTitle("");
    setContent("");
    if (focusInput.current) focusInput.current.focus();
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="form-style">
        <label className="label-style">
          제목
          <input
            type="text"
            className="input-style"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            ref={focusInput}
          />
        </label>
        <label className="label-style">
          내용
          <input
            type="text"
            className="input-style"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </label>
        <button type="submit" className="plus-btn">
          추가하기
        </button>
      </form>
      ;
    </>
  );
};

export default TodoForm;
