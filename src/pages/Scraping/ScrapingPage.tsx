import { useParams } from "react-router-dom";
import { ChangeEvent, useEffect, useState } from "react";

import Icon from "../../components/Icon";
import PlayIcon from "../../components/Icons/PlayIcon";
import Spinner from "../../components/Spinner/Spinner";
import PauseIcon from "../../components/Icons/PauseIcon";
import DropFileInput from "../../components/DropFile/DropFile";

import ScrapingPanel from "./ScrapingPanel";
import { IconName } from "../../types/iconProps";
import { useScraping } from "../../hooks/useScraping";
import { IScrapingProgress } from "../../types/scrapingProgress";
import { parseTSVFromFile, validateObjects } from "../../utils/tsvHelper";

import "./styles.css";

type OmitedProductCardProps = {
  children: any;
  label: string;
  value: number;
};

const OmitedProductCard: React.FC<OmitedProductCardProps> = ({
  children,
  label,
  value,
}) => {
  return (
    <span className="card">
      <div>{children}</div>
      <div>
        <h3>{label}</h3>
        <p>{value}</p>
      </div>
    </span>
  );
};

type CardProps = { icon: IconName; label: string; value: number };

const OmitedProductsPanel: React.FC = () => {
  const cards: CardProps[] = [
    {
      label: "Precio no disponible",
      icon: "no-cash",
      value: 0,
    },
    {
      icon: "image",
      label: "Sin imagenes",
      value: 0,
    },
    {
      icon: "title",
      label: "Título no disponible",
      value: 0,
    },
    {
      icon: "tag-error",
      label: "Sin características",
      value: 0,
    },
    {
      icon: "warning",
      label: "Errores inesperados",
      value: 0,
    },
    {
      icon: "error",
      label: "Omitidos en total",
      value: 0,
    },
  ];

  const [cardsInfo, setCardsInfo] = useState<CardProps[]>([]);

  useEffect(() => {
    setCardsInfo(cards);
  }, []);

  return (
    <div className="scraping-container p-3 gap-4">
      <h2>Productos omitidos</h2>
      <div className="grid">
        {cardsInfo.map((card) => (
          <OmitedProductCard label={card.label} value={card.value}>
            <Icon iconName={card.icon} size={28} color="#FFFFFF"></Icon>
          </OmitedProductCard>
        ))}
      </div>
    </div>
  );
};

const statusEnum: Record<string, any> = {
  paused: { label: "Pausado" },
  running: { label: "Extrayendo productos" },
  stopped: { label: "Pausado" },
};

const Status: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div className="flex gap-2 items-center">
      {status == "running" ? (
        <PlayIcon size={20} color="#FFFFFF" />
      ) : (
        <PauseIcon size={20} color="#FFFFFF" />
      )}
      <p className="text-xl">{statusEnum[status]?.label}</p>
    </div>
  );
};

const ScrapingPage: React.FC = () => {
  const [progress, setProgress] = useState<{
    queueInfo: any;
    scrapingProgress: IScrapingProgress;
  } | null>(null);

  const { store_id } = useParams();
  const { initializeScraping, getScrapingProgress } = useScraping();

  useEffect(() => {
    const init = async () => {
      const scrapingProgress = await getScrapingProgress(store_id);
      if (scrapingProgress) {
        setProgress(scrapingProgress);
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
          store_id,
          url_object_list: parsedCsv,
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
    <div className="basicContainer gap-5 px-6">
      {progress ? (
        <>
          <span className="titlePageContainer fade-in">
            <h2>{progress.scrapingProgress.storeAlias}</h2>

            <Status status={progress.scrapingProgress.status} />
          </span>
          <div className="flex flex-col gap-5 w-full px-8 fade-in">
            <div className="w-full flex justify-between gap-5 ">
              <ScrapingPanel
                progress={progress.scrapingProgress}
                store_id={store_id}
              />
              <DropFileInput
                className="shadow-zinc-900 shadow-md"
                onChange={handleFileInput}
              />
            </div>
            <OmitedProductsPanel />
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center mt-48">
          <Spinner size={46} />
        </div>
      )}
    </div>
  );
};

export default ScrapingPage;
