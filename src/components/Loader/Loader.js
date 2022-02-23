import { Circles } from 'react-loader-spinner';

function Loader() {
  return (
    <div className="Loader">
      <Circles
        ariaLabel="loading-indicator"
        color="#303f9f"
        height={80}
        width={80}
      />
    </div>
  );
}

export default Loader;
