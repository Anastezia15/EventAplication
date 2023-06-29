import { useEffect, useRef, useState } from "react";
import { addNewCategory, deleteCategory, getAllCategories } from "../api";

const ViewCategories = () => {
  const addCategoryRef = useRef<any>(null);
  const deleteCategoryRef = useRef<any>(null);
  const [categories, setCategories] = useState<any>(null);
  const [categoryAdded, setCategoryAdded] = useState<any>(0);

  const addCategoryHandler = async (event: any) => {
    event.preventDefault();
    await addNewCategory(addCategoryRef.current.value);
    setCategoryAdded((prev: any) => prev + 1);
  };

  const deleteCategoryHandler = async (event: any) => {
    event.preventDefault();
    await deleteCategory(deleteCategoryRef.current.value);
    setCategoryAdded((prev: any) => prev + 1);
  };

  useEffect(() => {
    (async () => {
      const data = await getAllCategories();
      console.log(data);
      setCategories(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const data = await getAllCategories();
      setCategories(data);
    })();
  }, [categoryAdded]);

  return (
    <div className="pt-4">
      <div className="flex flex-col gap-4 items-start">
        <form className="flex  gap-4" onSubmit={addCategoryHandler}>
          <input
            type="text"
            className="p-2 rounded bg-blue-100 w-[200px]"
            placeholder="Add new category"
            ref={addCategoryRef}
          />
          <button type="submit" className="bg-blue-600 text-white p-1 w-40 rounded-sm">
            Add category
          </button>
        </form>
        <form className="flex  gap-4" onSubmit={deleteCategoryHandler}>
          <input
            type="text"
            className="p-2 rounded bg-blue-100 w-[200px]"
            placeholder="Delete category by id"
            ref={deleteCategoryRef}
          />
          <button type="submit" className="bg-red-800 text-white p-1 w-40 rounded-sm">
            Delete category
          </button>
        </form>
        <div>
          <h3>All categories:</h3>
          {categories &&
            categories.map((category: any) => <li key={category.id}>{category.name}</li>)}
        </div>
      </div>
    </div>
  );
};

export default ViewCategories;
