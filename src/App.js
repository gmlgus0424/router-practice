import "./App.css";
import { useReducer } from "react";
import { BrowserRouter, Routes, Route, useRef } from "react-router-dom";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";

//컴포넌트
import MyButton from "./components/MyButton";
import MyHeader from "./components/MyHeader";

//reduce 함수

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newItem = {
        ...action.data,
      };
      newState = [newItem, ...state];
      break;
    }
    case "REMOVE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    case "EDIT": {
      newState = state.map((it) =>
        it.id === action.data.id ? { ...action.data } : it
      );
      break;
    }
    default:
      return state;
  }
  return newState;
};
function App() {
  //상태관리

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);
  //create
  const onCreate = (date, content, emotion) => {
    dispatch({
      type: "create",
      data: {
        id: dataId.current,
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
    dataId.current += 1;
  };
  //remove
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };
  //Edit
  const onEdit = (tagetId, date, content, emotion) => {
    dispatch({
      type: "EDIT",
      data: {
        id: "targetId",
        date: new Date(date).getTime(),
        content,
        emotion,
      },
    });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader
          headText={"APP"}
          leftChild={
            <MyButton text={"왼쪽버튼"} onClick={() => alert("왼쪽클릭")} />
          }
          rightChild={
            <MyButton text={"오른쪽버튼"} onClick={() => alert("오른쪽클릭")} />
          }
        />

        <h2>App.js</h2>
        {/*공통버튼*/}
        <MyButton
          text={"버튼 "}
          onClick={() => alert("버튼 클릭")}
          type={"positive"}
        />

        <MyButton
          text={"버튼 "}
          onClick={() => alert("버튼 클릭")}
          type={"negative"}
        />
        <MyButton text={"버튼 "} onClick={() => alert("버튼 클릭")} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new" element={<New />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/diary/:id" element={<Diary />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
