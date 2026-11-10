import { Suspense } from "react";
import RecipeContent from "./recipecontent";

export default function RecipePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<p>Loading recipe...</p>}>
      {params.then(({ id }) => (
        <RecipeContent id={id} />
      ))}
    </Suspense>
  );
}
