"use client";

import { useEffect, useState } from "react";
import { getRecipeById } from "@/app/lib/api";
import type { Recipe } from "@/app/lib/api";

export default function RecipeContent({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await getRecipeById(id);
        if (!data) {
          setError("Recipe not found.");
        } else {
          setRecipe(data);
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong loading this recipe."
        );
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!recipe) return null;

  const ingredients = recipe.ingredients.split(",").map((item) => item.trim());
  const steps = recipe.steps.split(",").map((step) => step.trim());

  return (
    <main>
      <h1>{recipe.title}</h1>
      <h3>
        Cuisine: {recipe.cuisine} | Prep Time: {recipe.prep_time} min/s
      </h3>

      <h2>Ingredients</h2>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h3>Steps</h3>
      <ol>
        {steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </main>
  );
}
