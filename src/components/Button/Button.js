export default function Button({ onLoadMore }) {
  return (
    <button type="button" className="button" onClick={onLoadMore}>
      Load more
    </button>
  );
}
