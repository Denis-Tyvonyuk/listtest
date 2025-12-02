import { useEffect, useState, useRef } from "react";
import { useListStore } from "../store";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const List = () => {
  const data = useListStore((state) => state.list);
  const deleteItems = useListStore((state) => state.deleteItems);
  const addItems = useListStore((state) => state.addItemsToList);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const navigate = useNavigate();

  const { ref, inView } = useInView({});

  const pageRef = useRef(1);

  const handleLeftClick = (id: number) => {
    navigate(`/item/${id}`);
  };

  const handleRightClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    if (inView) {
      addItems(pageRef.current);
      pageRef.current += 1;
    }
  }, [inView]);

  return (
    <div className="flex justify-center items-center flex-col">
      <button
        className={`w-6 h-6 bg-amber-500 rounded-2xl  top-[5%] left-[80%] ${
          selectedIds.length ? "sticky" : "hidden"
        }`}
        onClick={() => {
          deleteItems(selectedIds);
          setSelectedIds([]);
        }}
      >
        X
      </button>

      {data.map((brewery: any) => (
        <div
          className={`flex justify-center items-center gap-20 flex-row w-[350px] h-[150px] border-2 ${
            selectedIds.includes(brewery.id)
              ? "bg-blue-200 border-blue-500"
              : ""
          }`}
          key={brewery.id}
          onContextMenu={(e) => handleRightClick(e, brewery.id)}
          onClick={() => handleLeftClick(brewery.id)}
        >
          <div>{brewery.name}</div>
          <div>{brewery.id}</div>
        </div>
      ))}

      <div ref={ref}>-------------------</div>
    </div>
  );
};

export default List;
