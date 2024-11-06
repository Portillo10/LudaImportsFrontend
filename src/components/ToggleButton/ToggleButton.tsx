import "./styles.css";

const ToggleButton: React.FC = () => {
  return (
    <div className="toggle-switch">
      <input type="checkbox" id="toggle" />
      <label htmlFor="toggle" className="switch"></label>
    </div>
  );
};

export default ToggleButton;
