import { useEffect } from "react";

import OffIcon from "../../assets/icons/off_icon.svg";
import SideBarElement from "./SideBarElement";
import { useAuth } from "../../hooks/useAuth";
import { IconName } from "../../types/iconProps";
import { useSideBarStore } from "../../store/MenuStore";
import "./styles.css";

type SideBarElementProps = {
  href: string;
  text: string;
  icon: IconName;
  allowRoles: ("admin" | "seller")[];
};

type SideBarProps = {
  role: "seller" | "admin";
};

const adminOptions: SideBarElementProps[] = [
  {
    icon: "updateprice",
    href: "/update-prices",
    text: "Actualizar precios",
    allowRoles: ["admin"],
  },
  {
    icon: "users",
    href: "/users",
    text: "Usuarios",
    allowRoles: ["admin"],
  },
  {
    icon: "scraping",
    href: "/scraping",
    text: "Scraping",
    allowRoles: ["admin"],
  },
];
const sellerOptions: SideBarElementProps[] = [
  {
    icon: "publisher",
    href: "/publisher",
    text: "Publicador",
    allowRoles: ["admin", "seller"],
  },
  {
    icon: "store",
    href: "/stores",
    text: "Mis tiendas",
    allowRoles: ["admin", "seller"],
  },
  {
    icon: "calculateprice",
    href: "/calc-price",
    text: "Calcular precios",
    allowRoles: ["admin", "seller"],
  },
];

const SideBar: React.FC<SideBarProps> = ({ role }) => {
  const { handleLogout } = useAuth();

  const { currentIndexPage, setCurrentIndexPage } = useSideBarStore();

  const elements = [...sellerOptions, ...adminOptions];

  useEffect(() => {
    const currentUrl = window.location.href;
    elements.forEach((element, i) => {
      if (currentUrl.includes(element.href)) {
        setCurrentIndexPage(i);
      }
    });
  }, []);

  return (
    <aside className="h-full border-r border-black w-72 flex-col justify-between py-3 max-w-72 hidden sm:flex ">
      <ul className="w-full h-full flex flex-col items-center ">
        {elements
          .filter((element) => element.allowRoles.includes(role))
          .map((element, i) => (
            <SideBarElement
              iconName={element.icon}
              text={element.text}
              href={element.href}
              active={currentIndexPage == i}
              onClick={() => setCurrentIndexPage(i)}
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
