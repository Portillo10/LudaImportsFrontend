type LargeRowProps = {
  children: any;
  index: number;
};

const LargeRow: React.FC<LargeRowProps> = ({ children, index }) => {
  return (
    <ul
      className={`font-light text-base py-4 h-14 flex items-center bg-[#414249] px-2 ${index != 0 ? "border-t border-[#2c2d31]" : ""}`}
    >
      {children}
    </ul>
  );
};

export default LargeRow;
