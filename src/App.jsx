import { useEffect } from "react";
import { useState } from "react";
import "./styles/main.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

const App = () => {
  const [text, setText] = useState(() => {
    const localText = localStorage.getItem("text"); // 로컬스토리지의 데이터를 가져옴
    return localText ? JSON.parse(localText) : []; // 데이터가 있으면 저장하고, 없으면 빈 배열로 놔둔다.
  });

  const [moveText, setMoveText] = useState(() => {
    const localText = localStorage.getItem("moveText");
    return localText ? JSON.parse(localText) : [];
  });

  // 로컬스토리지 저장
  useEffect(() => {
    localStorage.setItem("text", JSON.stringify(text));
    localStorage.setItem("moveText", JSON.stringify(moveText));
  }, [text, moveText]);

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
      <TodoForm setText={setText} />
      <h2 className="title-work">Working..🔥🔥🔥</h2>
      <TodoList text={text} handleWorkDelete={handleWorkDelete} handleComplete={handleComplete} />
      <h2 className="title-done">Done..!🎉</h2>
      <div className="done-box">
        {moveText.map((data, index) => (
          <div key={index} className="done-form">
            <span className="done-title">{data.title}</span>
            <br />
            <span className="done-content">{data.content}</span>
            <br />
            <button className="done-delete-btn" onClick={() => handleDoneDelete(index)}>
              삭제하기
            </button>
            <button className="done-cancel-btn" onClick={() => handelCancel(index)}>
              취소
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
