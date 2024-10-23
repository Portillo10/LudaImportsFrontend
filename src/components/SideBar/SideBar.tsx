import SideBarElement from "./SideBarElement";
import StoreIcon from "../../assets/icons/Store.svg";
import ActiveStoreIcon from "../../assets/icons/ActiveStore.svg";
import ActivePublihserIcon from "../../assets/icons/ActivePublisher.svg";
import PublihserIcon from "../../assets/icons/Publisher.svg";

import "./styles.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

type SiedeBarElementProps = {
  href: string;
  text: string;
  icon: string;
  activeIcon: string;
};

const SideBar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { handleLogout } = useAuth();

  const elements: SiedeBarElementProps[] = [
    {
      activeIcon: ActivePublihserIcon,
      icon: PublihserIcon,
      href: "/publisher",
      text: "Publicador",
    },
    {
      activeIcon: ActiveStoreIcon,
      icon: StoreIcon,
      href: "/stores",
      text: "Tiendas",
    },
  ];

  useEffect(() => {
    const currentUrl = window.location.href;

    elements.forEach((element, i) => {
      if (currentUrl.includes(element.href)) {
        setActiveIndex(i);
      }
    });
  }, []);

  return (
    <aside className="h-full border-r border-black w-72 flex flex-col justify-between py-3">
      <ul className="w-full h-full flex flex-col items-center ">
        {elements.map((element, i) => (
          <SideBarElement
            activeIcon={element.activeIcon}
            icon={element.icon}
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
          <img src="" alt="" width={36} />
          <p className="font-semibold text-lg">Cerrar sesión</p>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;
