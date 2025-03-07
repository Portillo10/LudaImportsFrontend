const Menu: React.FC<{
  store_id: string;
  classname?: string;
  options: { label: string; click: (store_id: string) => void }[];
}> = ({ store_id, classname = "", options }) => {
  return (
    <ul
      className={`${classname} z-50 absolute -right-36 w-44 bg-[#3a3b40] flex flex-col py-1 text-sm`}
    >
      {options.map((option) => (
        <li
          onClick={() => option.click(store_id)}
          className="py-1 px-3 hover:bg-[#5d5f66] cursor-pointer"
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
