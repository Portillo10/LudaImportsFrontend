import "./styles.css";

type SpinnerProps = {
  size?: number;
};

const Spinner: React.FC<SpinnerProps> = ({ size = 50 }) => (
  <div style={{ width: size, height: size }} className="spinner" />
);

export default Spinner;
