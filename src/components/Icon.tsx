import { IconName } from "../types/iconProps";
import CalcPriceIcon from "./Icons/CalcPriceIcon";
import PublisherIcon from "./Icons/PublisherIcon";
import ScrapingIcon from "./Icons/ScrapingIcon";
import StoreIcon from "./Icons/StoreIcon";
import UpdatePriceIcon from "./Icons/UpdatePriceIcon";
import UsersIcon from "./Icons/UserIcon";

type IconProps = {
  size: number;
  iconName: IconName;
  color?: string;
};

const Icon: React.FC<IconProps> = ({ color = "#6e7277", size, iconName }) => {
  switch (iconName) {
    case "publisher":
      return <PublisherIcon {...{ size, color }} />;
    case "store":
      return <StoreIcon {...{ size, color }} />;
    case "users":
      return <UsersIcon {...{ size, color }} />;
    case "calculateprice":
      return <CalcPriceIcon {...{ size, color }} />;
    case "updateprice":
      return <UpdatePriceIcon {...{ size, color }} />;
    case "scraping":
      return <ScrapingIcon {...{ size, color }} />;
    default:
      return <></>;
  }
};

export default Icon;
