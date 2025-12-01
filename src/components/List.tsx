import { useEffect, useState } from "react";
import { useListStore } from "../store";

const List = () => {
  const data = useListStore((state) => state.list);
  const fetchData = useListStore((state) => state.fetchItemsToList);
  const deleteItems = useListStore((state) => state.deleteItems);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleRightClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex justify-center items-center flex-col">
      <button
        className={`w-6 h-6 bg-amber-500 rounded-2xl  ${
          selectedIds[0] ? "" : "hidden"
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
        >
          <div>{brewery.name}</div>
        </div>
      ))}
    </div>
  );
};

export default List;
