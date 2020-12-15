import Loader from 'react-loader-spinner';

export default function LoaderSpinner() {
  return (
    <Loader type="Oval" color="#00BFFF" height={80} width={80} timeout={3000} />
  );
}
