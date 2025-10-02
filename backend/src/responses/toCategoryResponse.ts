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

    if (Array.isArray(categoryOrCategories)) {
        return categoryOrCategories.map((c) => toCategoryResponse(c))
    }

    const category = categoryOrCategories
    const id = (category as any).id ?? String((category as any)._id ?? "")
    const date = category.date ? new Date(category.date).toISOString() : undefined;

    return {
        id,
        title: category.title,
        description: category.description,
        note: category.note,
        type: category.type,
        icon: category.icon,
        color: category.color,
        date,
        isDeleted: !!(category as any).isDeleted,
        isDefault: !!(category as any).isDefault,
    }

}



