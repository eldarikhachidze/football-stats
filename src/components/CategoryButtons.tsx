import React, {useEffect, useRef, useState} from "react";
import {getCategoriesFieldsService} from "../services/api.ts";
import {Tabs, TabsList, TabsTrigger} from "./ui/tabs.tsx";

interface Props {
    onCategoryClick: (category: string) => void;
}

const CategoryButtons: React.FC<Props> = ({onCategoryClick}) => {
    const hasSetDefaultCategory = useRef(false);

    const [categories, setCategories] = useState<string[]>([]);
    const [activeCategory, setActiveCategory] = useState("");
    const [loader, setLoader] = useState(false);

    const handleClick = (category: string) => {
        setActiveCategory(category);
        onCategoryClick(category);
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoader(true);
                const data = await getCategoriesFieldsService();
                setCategories(data);
                if (!hasSetDefaultCategory.current) {
                    const defaultCategory = data.includes("Fouls") ? "Fouls" : data[0];
                    setActiveCategory(defaultCategory);
                    onCategoryClick(defaultCategory);
                    hasSetDefaultCategory.current = true;
                }

            } catch (error) {
                console.error("❌ Error fetching categories:", error);
            } finally {
                setLoader(false);
            }
        };

        fetchCategories();
    }, [onCategoryClick]);

    if (loader) return (<p>Loading...</p>)

    return (
        <Tabs value={activeCategory} onValueChange={handleClick} className="w-full">
            <TabsList
                className="flex overflow-x-auto no-scrollbar space-x-1 w-full h-9 bg-slate-100 p-0.5 rounded-md"
            >
                {categories.map((category) => (
                    <TabsTrigger
                        key={category}
                        value={category}
                        className="min-w-[80px] text-xs font-medium whitespace-nowrap
                data-[state=active]:bg-white
                data-[state=active]:text-slate-900
                data-[state=active]:shadow-sm"
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default CategoryButtons;
