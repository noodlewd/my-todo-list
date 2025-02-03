import React from "react";

const TodoItem = ({ data, index, handleWorkDelete, handleComplete }) => {
  return (
    <div className="work-form">
      <span className="work-title">{data.title}</span>
      <br />
      <span className="work-content">{data.content}</span>
      <br />
      <button className="work-delete-btn" onClick={() => handleWorkDelete(index)}>
        삭제하기
      </button>
      <button className="work-complete-btn" onClick={() => handleComplete(index)}>
        완료
      </button>
    </div>
  );
};

export default TodoItem;
