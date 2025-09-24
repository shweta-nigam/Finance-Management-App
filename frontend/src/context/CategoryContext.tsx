import { useCategoryAPi } from "@/hooks/useCategoryApi";
import type { Category } from "@/types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type CategoryContextType = {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => Promise<void>;
  clearCategories: () => void;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { response, getAllCategories, createCategory } = useCategoryAPi();

  useEffect(() => {
    getAllCategories("/api/v1/category/");
  }, []);

  useEffect(() => {
    if (response && Array.isArray(response)) {
      setCategories(response);
    }
  }, [response]);

  const addCategory = async (newCategory: Omit<Category, "id">) => {
    try {
      const saved = await createCategory("/api/v1/category/", newCategory);
      if (saved) {
        setCategories((prev) => [saved, ...prev]);
      } // takes the previous categories array (prev), adds the new one (saved) at the beginning, and returns the updated array.
    } catch (err) {
      console.error("Failed to add category:", err);
    }
  };

  const clearCategories = () => setCategories([]);

  return (
    <CategoryContext.Provider
      value={{ categories, addCategory, clearCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
}

export default function useCategory() {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
}
