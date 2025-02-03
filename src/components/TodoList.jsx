import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ text, handleWorkDelete, handleComplete }) => {
  return (
    <div className="work-box">
      {text.map((data, index) => (
        <TodoItem
          key={index}
          data={data}
          index={index}
          handleWorkDelete={handleWorkDelete}
          handleComplete={handleComplete}
        />
      ))}
    </div>
  );
};

export default TodoList;
