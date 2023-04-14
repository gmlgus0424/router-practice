const MyButton = ({ text, type, onClick }) => {
  const btnType = ["positive", "negative"].includes(type) ? type : "default"; //배열 안에 없으면 클래스를 디폴트로 변경
  return (
    <button
      className={["MyButton", `MyButton_${btnType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
//classname은 css 속성이고 onClick은 버튼을 눌렀을때 실행되는
export default MyButton;
