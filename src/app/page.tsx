"use client";

import { Button } from "@/components/ui/button";
import { useCallback, useMemo, useState } from "react";

const initialItems = [
  {
    type: "Fruit",
    name: "Apple",
  },
  {
    type: "Vegetable",
    name: "Broccoli",
  },
  {
    type: "Vegetable",
    name: "Mushroom",
  },
  {
    type: "Fruit",
    name: "Banana",
  },
  {
    type: "Vegetable",
    name: "Tomato",
  },
  {
    type: "Fruit",
    name: "Orange",
  },
  {
    type: "Fruit",
    name: "Mango",
  },
  {
    type: "Fruit",
    name: "Pineapple",
  },
  {
    type: "Vegetable",
    name: "Cucumber",
  },
  {
    type: "Fruit",
    name: "Watermelon",
  },
  {
    type: "Vegetable",
    name: "Carrot",
  },
];

export default function HomePage() {
  const [mainList, setMainList] = useState<typeof initialItems>(initialItems);
  const [tempItems, setTempItems] = useState<typeof initialItems>([]);

  const fruitList = useMemo(
    () => tempItems.filter((item) => item.type === "Fruit"),
    [tempItems]
  );
  const vegetableList = useMemo(
    () => tempItems.filter((item) => item.type === "Vegetable"),
    [tempItems]
  );

  const moveToColumn = useCallback((item: (typeof initialItems)[0]) => {
    setMainList((prev) => prev.filter((i) => i.name !== item.name));
    setTempItems((prev) => [...prev, item]);

    setTimeout(() => {
      setTempItems((prev) => prev.filter((i) => i.name !== item.name));
      setMainList((prev) => [...prev, item]);
    }, 5000);
  }, []);

  const moveBackToMainList = useCallback((item: (typeof initialItems)[0]) => {
    setTempItems((prev) => prev.filter((i) => i.name !== item.name));
    setMainList((prev) => [...prev, item]);
  }, []);

  return (
    <main className="flex flex-col md:flex-row h-screen p-4 gap-4">
      <div className="flex-1 border rounded-lg p-4">
        <h2 className="text-lg font-bold">List</h2>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
          {mainList.map((item) => (
            <Button key={item.name} onClick={() => moveToColumn(item)}>
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 border rounded-lg overflow-x-auto p-4">
        <h2 className="text-lg font-bold">Fruit</h2>
        <div className="flex md:flex-col flex-wrap md:flex-nowrap gap-4">
          {fruitList.map((item) => (
            <Button key={item.name} onClick={() => moveBackToMainList(item)}>
              {item.name}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 border rounded-lg overflow-x-auto p-4">
        <h2 className="text-lg font-bold">Vegetable</h2>
        <div className="flex md:flex-col flex-wrap md:flex-nowrap gap-4">
          {vegetableList.map((item) => (
            <Button key={item.name} onClick={() => moveBackToMainList(item)}>
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </main>
  );
}
