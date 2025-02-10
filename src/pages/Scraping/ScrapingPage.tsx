import { useParams } from "react-router-dom";
import DropFileInput from "../../components/DropFile/DropFile";
import { ChangeEvent, useEffect, useState } from "react";
import { parseTSVFromFile, validateObjects } from "../../utils/tsvHelper";
import { useScraping } from "../../hooks/useScraping";
import { IScrapingProgress } from "../../types/scrapingProgress";
import PlayIcon from "../../components/Icons/PlayIcon";
import StopIcon from "../../components/Icons/StopIcon";
import { IconName } from "../../types/iconProps";
import Icon from "../../components/Icon";
import PauseIcon from "../../components/Icons/PauseIcon";
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

type Stat = {
  label: string;
  value: number;
};

const ScrapingPanel: React.FC<{
  store_id?: string;
  progress: IScrapingProgress;
}> = ({ store_id, progress }) => {
  const initialStats: Stat[] = [
    {
      label: "Productos restantes",
      value: 0,
    },
    {
      label: "Productos extraídos",
      value: 0,
    },
    {
      label: "Créditos usados",
      value: 0,
    },
  ];
  const [stats, setStats] = useState<Stat[]>(initialStats);
  const [status, setStatus] = useState<string>("");
  const { runTasks, pauseScraping } = useScraping();

  const formatAndSetStats = async (progress: IScrapingProgress) => {
    const currentStats: Stat[] = [
      {
        label: "Productos restantes",
        value: progress.productsToScrape - progress.scrapedProductsCount,
      },
      {
        label: "Productos extraídos",
        value: progress.scrapedProductsCount,
      },
      {
        label: "Créditos usados",
        value: progress.usedCredits,
      },
    ];

    setStats(currentStats);
  };

  const run = async () => {
    if (store_id) {
      await runTasks(store_id);
    }
  };

  const pause = async () => {
    pauseScraping();
  };

  useEffect(() => {
    formatAndSetStats(progress);
    setStatus(progress.status);
  }, []);

  return (
    <div className="scraping-container w-full gap-2">
      <section className="stats">
        {stats.map((stat) => (
          <span>
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </span>
        ))}
      </section>
      <form className="flex gap-2 justify-center">
        <button
          onClick={run}
          className="bg-[#2E7D32] hover:bg-[#255F28] action-button"
        >
          <PlayIcon size={20} color="#FFFFFF" />
          <p>Iniciar</p>
        </button>
        <button
          onClick={pause}
          disabled={status == "stopped"}
          className="bg-[#D32F2F] hover:bg-[#B71C1C] action-button"
        >
          <StopIcon size={20} color="#FFFFFF" />
          <p>Detener</p>
        </button>
      </form>
    </div>
  );
};

const statusEnum: Record<string, any> = {
  paused: { label: "Pausado", icon: PauseIcon },
  running: { label: "Extrayendo productos" },
};

const Status: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div className="flex gap-2 items-center">
      {status == "running" ? (
        <PlayIcon size={20} color="#FFFFFF" />
      ) : (
        <PauseIcon size={20} color="#FFFFFF" />
      )}
      <p className="text-xl">{statusEnum[status]}</p>
    </div>
  );
};

const ScrapingPage: React.FC = () => {
  const [progress, setProgress] = useState<{
    queueInfo: any;
    scrapingProgress: IScrapingProgress;
  } | null>();

  const { alias, store_id } = useParams();
  const { initializeScraping, getScrapingProgress } = useScraping();

  useEffect(() => {
    const init = async () => {
      const scrapingProgress = await getScrapingProgress();
      console.log(scrapingProgress);
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

  return progress ? (
    <div className="basicContainer gap-5">
      <span className="titlePageContainer">
        <h2>{alias}</h2>
        <Status status={progress.scrapingProgress.status} />
      </span>
      <div className="flex flex-col gap-5 w-full px-8">
        <div className="w-full flex justify-between gap-5">
          <ScrapingPanel
            progress={progress?.scrapingProgress}
            store_id={store_id}
          />
          <DropFileInput
            className="shadow-zinc-900 shadow-md"
            onChange={handleFileInput}
          />
        </div>
        <OmitedProductsPanel />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ScrapingPage;
