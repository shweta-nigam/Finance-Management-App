import type { ICategory } from "../models/category.model";

export type CategoryResponse = {
    id: string;
    title: string,
    description: string,
    note?: string,
    type: "Income" | "Expense";
    icon?: string,
    color?: string,
    date?: string;
    isDeleted: boolean,
    isDefault: boolean,
}

export function toCategoryResponse(category: ICategory): CategoryResponse;
export function toCategoryResponse(category: ICategory[]): CategoryResponse[];
export function toCategoryResponse(categoryOrCategories: ICategory | ICategory[]): CategoryResponse | CategoryResponse[] {

      if (!categoryOrCategories) {
    return Array.isArray(categoryOrCategories) ? [] : ({} as CategoryResponse);
  }

    if (Array.isArray(categoryOrCategories)) {
        return categoryOrCategories.map((c) => toCategoryResponse(c))
    }

    const c = categoryOrCategories
 // If it's a Mongoose Document, prefer `id` (string), fallback to `_id`
    const id = (c as any).id ?? (c._id ? String(c._id) : "");
    // safe date conversion 
     const date =
    c.date instanceof Date && !Number.isNaN(c.date.getTime())
      ? c.date.toISOString()
      : undefined;

     return {
    id,
    title: c.title,
    description: c.description ?? "",
    note: c.note ?? undefined,
    type: c.type === "Income" ? "Income" : "Expense", // defensive default
    icon: c.icon ?? undefined,
    color: c.color ?? undefined,
    date,
    isDeleted: Boolean((c as any).isDeleted),
    isDefault: Boolean((c as any).isDefault),
  };
}



