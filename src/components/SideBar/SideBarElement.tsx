import { MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  icon: string;
  activeIcon: string;
  text: string;
  href: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
};

const SideBarElement: React.FC<Props> = ({
  icon,
  text,
  href,
  activeIcon,
  active,
  onClick,
}) => {
  return (
    <NavLink
      to={href}
      className={`sideBarElement ${active && "active"}`}
      onClick={onClick}
    >
      <img src={active ? activeIcon : icon} alt="" width={36} />
      <p className="font-semibold text-lg">{text}</p>
    </NavLink>
  );
};

export default SideBarElement;
