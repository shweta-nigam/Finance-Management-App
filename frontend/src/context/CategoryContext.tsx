import { useCategoryApi } from "@/hooks/useCategoryApi";
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
  addCategory: (category: Omit<Category, "id">) => Promise<Category>;
  clearCategories: () => void;
};

const CategoryContext = createContext<CategoryContextType | null>(null);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { response, getAllCategories, createCategory } = useCategoryApi();

  useEffect(() => {
    (async () => {
      const data = await getAllCategories("/api/v1/category/");
      if (data) setCategories(data);
    })();
  }, []);

  useEffect(() => {
    if (response && Array.isArray(response)) {
      setCategories(response);
    }
  }, [response]);

  const addCategory = async (
    newCategory: Omit<Category, "id">
  ): Promise<Category> => {
    const saved = await createCategory("/api/v1/category/", newCategory);
    if (!saved) throw new Error("Failed to create category");
    setCategories((prev) => [saved, ...prev]);
    console.log("Category created:", saved);
    return saved;
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
