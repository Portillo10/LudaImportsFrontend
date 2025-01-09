import "./styles.css";

type LoadingBarProps = {
  total: number;
  progress: number;
  label: string;
};

const LoadingBar: React.FC<LoadingBarProps> = ({ total, progress, label }) => {
  return (
    <div className="loading-bar-container">
      <span className="w-full flex justify-between">
        <p className="">{label}</p>
        <p>
          {/* {total > 0 ? Math.round((progress / total) * 100 * 100) / 100 : "100"} */}
          {progress}/{total}
        </p>
      </span>
      <div className="loading-bar">
        <div
          style={{
            width: `${total > 0 ? (progress / total) * 100 : "100"}%`,
            transition: "0.3s ease",
          }}
          className={`bg-[#FF9104] h-full rounded-l-md`}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
