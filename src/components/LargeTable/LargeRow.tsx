type LargeRowProps = {
  children: any;
  index: number;
  className?: string;
  onClick?: () => void;
};

const LargeRow: React.FC<LargeRowProps> = ({
  children,
  index,
  className = "",
  onClick = () => {},
}) => {
  return (
    <ul
      onClick={onClick}
      className={`font-light text-sm flex items-center justify-between bg-[#414249] px-2 relative ${index != 0 ? "border-t border-[#2c2d31]" : ""} ${className}`}
    >
      {children}
    </ul>
  );
};

export default LargeRow;
