import Link from "next/link";
import { getAllRecipes } from "@/lib/api";

// import {getSupabaseConfig} from "../lib/api";


// const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
// );

export default async function RecipesPage() {
    const recipes = await getAllRecipes();
//     const { data: recipes, error} = await supabase
//     .from("Recipe"
//     .select("id, title")
//     .order("id");

// if (error) {
//     return <p> Couldn't load recipes: {error.message}</p>; 
// }


if (!recipes?.lenght) {
    return <p> No recipes yet. </p>;
}

return (
    <main>
        <h1> ALL RECIPES </h1>
        <ul>
            {recipes.map((recipe) => (
             <li key={recipe.id}>
                <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </li>
            ))}
        </ul>
    </main>
    );
}