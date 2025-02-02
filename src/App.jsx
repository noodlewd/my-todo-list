import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./styles/main.css";

const App = () => {
  const [text, setText] = useState(() => {
    const localText = localStorage.getItem("text"); // 로컬스토리지의 데이터를 가져옴
    return localText ? JSON.parse(localText) : []; // 데이터가 있으면 저장하고, 없으면 빈 배열로 놔둔다.
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

  // input 첫 번째 박스 포커스
  const focusInput = useRef("");

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

    if (focusInput.current) {
      focusInput.current.focus();
    }
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
      <h2 className="title-main">My Todo List</h2>
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
      <h2 className="title-work">Working..🔥🔥🔥</h2>
      <div className="work-box">
        {text.map((data, index) => (
          <div key={index} className="work-form">
            <span className="work-title">제목{data.title}</span>
            <br />
            <span className="work-content">내용{data.content}</span>
            <br />
            <button className="work-delete-btn" onClick={() => handleWorkDelete(index)}>
              삭제하기
            </button>
            <button className="work-complete-btn" onClick={() => handleComplete(index)}>
              완료
            </button>
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
