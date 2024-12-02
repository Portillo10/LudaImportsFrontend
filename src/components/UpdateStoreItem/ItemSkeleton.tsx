import "./styles.css";

const ItemSkeleton: React.FC = () => {
  return (
    <div className="itemContainer">
      <section className="span-1-skeleton"></section>
      <section className="span-2-skeleton">
        <p></p>
        <p></p>
        <p></p>
      </section>
    </div>
  );
};

export default ItemSkeleton;
