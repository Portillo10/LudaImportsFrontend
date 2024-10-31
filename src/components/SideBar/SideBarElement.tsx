import { MouseEventHandler } from "react";
import { NavLink } from "react-router-dom";
import { IconName } from "../../types/iconProps";
import Icon from "../Icon";

type Props = {
  text: string;
  href: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLAnchorElement> | undefined;
  iconName: IconName;
};

const SideBarElement: React.FC<Props> = ({
  text,
  href,
  active,
  onClick,
  iconName,
}) => {
  return (
    <NavLink
      to={href}
      className={`sideBarElement ${active && "active"}`}
      onClick={onClick}
    >
      <Icon
        iconName={iconName}
        size={34}
        color={active ? "#1fcc7e" : undefined}
      />
      <p className="font-semibold text-base">{text}</p>
    </NavLink>
  );
};

export default SideBarElement;
