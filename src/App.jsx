import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [text, setText] = useState(() => {
    const localText = localStorage.getItem("text");
    return localText ? JSON.parse(localText) : [];
  });

  const [moveText, setMoveText] = useState(() => {
    const localText = localStorage.getItem("moveText");
    return localText ? JSON.parse(localText) : [];
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("text", JSON.stringify(text));
    localStorage.setItem("moveText", JSON.stringify(moveText));
  }, [text, moveText]);

  // 리셋폼
  const resetForm = () => {
    setTitle("");
    setContent("");
  };

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
    setText([...text, newText]);
    resetForm();
  };

  // Working에서의 삭제버튼 로직
  const handleWorkDelete = (idx) => {
    const deleteWorkData = text.filter((item, index) => index !== idx);
    setText(deleteWorkData);
  };

  // Done에서의 삭제버튼 로직
  const handleDoneDelete = (idx) => {
    const deleteDoneData = moveText.filter((item, index) => index !== idx);
    setMoveText(deleteDoneData);
  };

  // 완료버튼 로직
  const handleComplete = (idx) => {
    const moveItem = text.find((item, index) => index === idx);
    const completeText = text.filter((item, index) => index !== idx);
    setText(completeText);
    setMoveText([...moveText, moveItem]);
  };

  // 취소버튼 로직
  const handelCancel = (idx) => {
    const moveItem = moveText.find((item, index) => index === idx);
    const cancelText = moveText.filter((item, index) => index !== idx);
    setMoveText(cancelText);
    setText([...text, moveItem]);
  };

  return (
    <div>
      <h3>My Todo List</h3>
      <form onSubmit={handleSubmit}>
        <label>
          제목
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        <label>
          내용
          <input
            type="text"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
        </label>
        <button type="submit">추가하기</button>
      </form>
      <h2>Working..🔥🔥🔥</h2>
      <div>
        {text.map((data, index) => (
          <div key={index}>
            <span>{data.title}</span>
            <br />
            <span>{data.content}</span>
            <br />
            <button onClick={() => handleWorkDelete(index)}>삭제하기</button>
            <button onClick={() => handleComplete(index)}>완료</button>
          </div>
        ))}
      </div>

      <h2>Done..!🎉</h2>
      <div>
        {moveText.map((data, index) => (
          <div key={index}>
            <span>{data.title}</span>
            <br />
            <span>{data.content}</span>
            <br />
            <button onClick={() => handleDoneDelete(index)}>삭제하기</button>
            <button onClick={() => handelCancel(index)}>취소</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
