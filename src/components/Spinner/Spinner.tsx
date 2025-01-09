import "./styles.css";

type SpinnerProps = {
  size?: number;
  className?: string;
};

const Spinner: React.FC<SpinnerProps> = ({ size = 50, className = "" }) => (
  <div
    style={{ width: size, height: size }}
    className={`spinner ${className}`}
  />
);

export default Spinner;
