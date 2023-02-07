import Button from 'components/Button/Button';

const MoviesList = ({ moviesInfo, deleteMovie }) => (
  <ul>
    {moviesInfo.map(({ id, title, date, votes }) => (
      <li key={id}>
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{votes}</p>
        <Button text="Delete" clickHandler={() => deleteMovie(id)} />
      </li>
    ))}
  </ul>
);

export default MoviesList;
