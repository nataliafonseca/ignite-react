export function RepositoryItem(props) {
  return (
    <li>
      <strong>{props.repository?.name ?? 'Default'}</strong>
      <p>{props.repository?.description ?? 'Default'}</p>

      <a href={props.repository?.link ?? 'http://github.com/'}>
        Acessar repositório
      </a>
    </li>
  );
}
