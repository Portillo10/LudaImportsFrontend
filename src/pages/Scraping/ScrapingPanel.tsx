import { useEffect, useState } from "react";
import PlayIcon from "../../components/Icons/PlayIcon";
import StopIcon from "../../components/Icons/StopIcon";
import { IScrapingProgress } from "../../types/scrapingProgress";
import { useScraping } from "../../hooks/useScraping";

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
  const { runTasks, pauseScraping } = useScraping();

  const formatAndSetStats = async (progress: IScrapingProgress) => {
    const currentStats: Stat[] = [
      {
        label: "Productos restantes",
        value: progress.total - progress.scrapedProductsCount,
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
  }, []);

  return (
    <div className="scraping-container w-full gap-2">
      <section className="stats">
        {stats.map((stat, i) => (
          <span key={i}>
            <h3>{stat.label}</h3>
            <p>{stat.value}</p>
          </span>
        ))}
      </section>
      <div className="flex gap-2 justify-center">
        <button
          disabled={progress.status == "running"}
          onClick={run}
          className={`bg-[#2E7D32] ${progress.status == "running" ? "" : "hover:bg-[#255F28]"} action-button`}
        >
          <PlayIcon size={20} color="#FFFFFF" />
          <p>Iniciar</p>
        </button>
        <button
          onClick={pause}
          disabled={progress.status == "stopped"}
          className={`bg-[#D32F2F] ${progress.status == "stopped" ? "" : "hover:bg-[#B71C1C]"} action-button`}
        >
          <StopIcon size={20} color="#FFFFFF" />
          <p>Detener</p>
        </button>
      </div>
    </div>
  );
};

export default ScrapingPanel;
