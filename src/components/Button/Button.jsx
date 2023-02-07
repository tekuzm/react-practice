// ========== styles ==========

import { Btn } from './Button.styled';

const Button = ({ text, clickHandler }) => (
  <Btn type="button" onClick={clickHandler}>
    {text}
  </Btn>
);

export default Button;
