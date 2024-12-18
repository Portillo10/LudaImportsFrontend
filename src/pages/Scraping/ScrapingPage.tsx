import { useParams } from "react-router-dom";

const ScrapingPage: React.FC = () => {
  const { alias } = useParams();

  return (
    <div className="basicContainer">
      <span className="titlePageContainer">{alias}</span>
    </div>
  );
};

export default ScrapingPage;
