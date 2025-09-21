import { useCategoryAPi, type Category } from "@/hooks/useCategoryApi";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type CategoryContextType = {
    category: Category[]
    addCategory : (category: Category) => void
    clearCategory: () => void
}

const CategoryContext = createContext<CategoryContextType | null>(null) 

export function CategoryProvider({children}:{children : ReactNode}){
    const [category, setCategory] = useState<Category[]>([])
    const {response, getAllCategories, createCategory} = useCategoryAPi()

    useEffect(()=> {
        getAllCategories("/api/v1/categories")
    },[])

    useEffect(()=>{
        if(response && Array.isArray(response)){
            setCategory(response)
        }
    },[response])

    const addCategory = async (newCategory: Omit<Category, "id">) => {
       try {
        const saved =  await createCategory("api/v1/category/",newCategory)
         setCategory((prev)=> [saved, ...prev])
       } catch (err) {
        console.error("Failed to add category:", err);
       }
    }

    const clearCategory = () => {
        setCategory([])
    }

    return(
        <CategoryContext.Provider value={{category, addCategory, clearCategory}}>
          {children}
        </CategoryContext.Provider>
    )
}

export default function useCategory(){
    const context = useContext(CategoryContext)
    if(!context){
        throw new Error("useCategory must be used within an CategoryProvider");
  }
  return context;
}