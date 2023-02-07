const MoviesList = ({ moviesInfo }) => (
  <ul>
    {moviesInfo.map(({ id, title, date, votes }) => (
      <li key={id}>
        <h3>{title}</h3>
        <p>{date}</p>
        <p>{votes}</p>
      </li>
    ))}
  </ul>
);

export default MoviesList;
