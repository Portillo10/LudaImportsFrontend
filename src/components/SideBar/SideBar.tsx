import SideBarElement from "./SideBarElement";

import OffIcon from "../../assets/icons/off_icon.svg";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

import "./styles.css";
import { IconName } from "../../types/iconProps";

type SiedeBarElementProps = {
  href: string;
  text: string;
  icon: IconName;
};

const elements: SiedeBarElementProps[] = [
  {
    icon: "publisher",
    href: "/publisher",
    text: "Publicador",
  },
  {
    icon: "store",
    href: "/stores",
    text: "Tiendas",
  },
  {
    icon: "calculateprice",
    href: "/calc-price",
    text: "Calcular precios",
  },
  {
    icon: "updateprice",
    href: "/update-prices",
    text: "Actualizar precios",
  },
  {
    icon: "users",
    href: "/users",
    text: "Usuarios",
  },
];

const SideBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { handleLogout } = useAuth();

  useEffect(() => {
    const currentUrl = window.location.href;

    elements.forEach((element, i) => {
      if (currentUrl.includes(element.href)) {
        setActiveIndex(i);
      }
    });
  }, []);

  return (
    <aside className="h-full border-r border-black w-72 flex flex-col justify-between py-3 max-w-72">
      <ul className="w-full h-full flex flex-col items-center ">
        {elements.map((element, i) => (
          <SideBarElement
            iconName={element.icon}
            text={element.text}
            href={element.href}
            active={activeIndex == i}
            onClick={() => setActiveIndex(i)}
            key={i}
          />
        ))}
      </ul>
      <ul>
        <li className="sideBarElement" onClick={() => handleLogout()}>
          <img src={OffIcon} alt="" width={36} />
          <p className="font-semibold text-lg">Cerrar sesión</p>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
