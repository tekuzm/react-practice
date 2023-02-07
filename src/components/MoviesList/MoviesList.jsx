// ========== styles ==========

import { List, Item } from './MoviesList.styled';

// ========== components ==========

import Button from 'components/Button/Button';

const MoviesList = ({ moviesInfo, deleteMovie }) => (
  <List>
    {moviesInfo.map(({ id, title, date, votes }) => (
      <Item key={id}>
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{votes}</p>
        <Button text="Delete" clickHandler={() => deleteMovie(id)} />
      </Item>
    ))}
  </List>
);

export default MoviesList;
