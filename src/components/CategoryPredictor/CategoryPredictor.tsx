import { useState } from "react";
import Spinner from "../Spinner/Spinner";
import SendIcon from "../../assets/icons/SendIcon.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICategoryOption } from "../../types/apiResponses";
import SuggestedCategories from "./SuggestedCategories";
import { useMLApi } from "../../hooks/useMLApi";

type Inputs = {
  q: string;
};

const CategoryPredictor: React.FC = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { predictCategory } = useMLApi();
  const [loading, setLoading] = useState<boolean>();
  const [suggestedCategories, setSuggestedCategories] = useState<
    ICategoryOption[]
  >([]);

  const predict = async (q: string) => {
    setLoading(true);
    try {
      setSuggestedCategories([]);
      const categories = await predictCategory(undefined, q, 5);
      setSuggestedCategories(categories);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    predict(data.q);
  };

  return (
    <div className="flex flex-col gap-5">
      <form
        className="flex gap-2 items-center"
        action=""
        onSubmit={handleSubmit(onSubmit)}
      >
        <span className="inputBox min-w-96">
          <input
            type="text"
            className="input"
            placeholder="Título o palabras clave"
            {...register("q", { required: true })}
          />
        </span>
        <button
          disabled={loading}
          className={`${loading ? "bg-[#3B6541]" : "bg-[#4A7F50]"} rounded-md px-2 py-2 hover:bg-[#3B6541] size-[34px] min-w-[34px]`}
        >
          {loading ? (
            <Spinner size={16} />
          ) : (
            <img src={SendIcon} alt="" width={18} height={18} />
          )}
        </button>
      </form>

      <SuggestedCategories categories={suggestedCategories} />
    </div>
  );
};

export default CategoryPredictor;
