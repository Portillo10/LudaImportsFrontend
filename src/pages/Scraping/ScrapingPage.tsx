import { useParams } from "react-router-dom";
import DropFileInput from "../../components/DropFile/DropFile";
import { ChangeEvent, useEffect, useState } from "react";
import { parseTSVFromFile, validateObjects } from "../../utils/tsvHelper";
import { useScraping } from "../../hooks/useScraping";
import { IScrapingProgress } from "../../types/scrapingProgress";

const ScrapingPage: React.FC = () => {
  const [progress, setProgress] = useState<{
    queueInfo: any;
    scrapingProgress: IScrapingProgress;
  } | null>();

  const { alias } = useParams();
  const { initializeScraping, getScrapingProgress } = useScraping();

  useEffect(() => {
    const init = async () => {
      const scrapingProgress = await getScrapingProgress();
      if (scrapingProgress) {
        setProgress(progress);
      }
    };
    init();
  }, []);

  const handleFileInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.item(0);
    if (selectedFile) {
      const parsedCsv = await parseTSVFromFile(selectedFile);
      const { valid, errors } = validateObjects(parsedCsv);

      if (valid) {
        await initializeScraping({
          url_object_list: parsedCsv,
          store_id: "",
        });
      } else {
        console.log("archivo inválido");
        for (const error of errors) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div className="basicContainer">
      <span className="titlePageContainer">
        <h2>{alias}</h2>
      </span>
      <div className="w-full flex justify-center">
        {progress?.scrapingProgress.status != "running" ? (
          <DropFileInput onChange={handleFileInput}></DropFileInput>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ScrapingPage;
