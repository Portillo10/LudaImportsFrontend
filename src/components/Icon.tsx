import { IconName } from "../types/iconProps";
import CalcPriceIcon from "./Icons/CalcPriceIcon";
import ErrorIcon from "./Icons/ErrorIcon";
import ImageIcon from "./Icons/ImageIcon";
import NoCashIcon from "./Icons/NoCashIcon";
import PublisherIcon from "./Icons/PublisherIcon";
import ScrapingIcon from "./Icons/ScrapingIcon";
import StoreIcon from "./Icons/StoreIcon";
import TagErrorIcon from "./Icons/TagErrorIcon";
import TitleIcon from "./Icons/TitleIcon";
import UpdatePriceIcon from "./Icons/UpdatePriceIcon";
import UsersIcon from "./Icons/UserIcon";
import WarningIcon from "./Icons/Warning";

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
    case "no-cash":
      return <NoCashIcon {...{ size, color }} />;
    case "title":
      return <TitleIcon {...{ size, color }} />;
    case "error":
      return <ErrorIcon {...{ size, color }} />;
    case "image":
      return <ImageIcon {...{ size, color }} />;
    case "tag-error":
      return <TagErrorIcon {...{ size, color }} />;
    case "warning":
      return <WarningIcon {...{ size, color }} />;
    default:
      return <></>;
  }
};

export default Icon;
