const Button = ({ text, clickHandler }) => (
  <button type="button" onClick={clickHandler}>
    {text}
  </button>
);

export default Button;
