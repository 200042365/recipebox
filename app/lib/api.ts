export type Recipe = {
    id: number;
    title: string;
    cuisine: string;
    prep_time: number;
    ingredients: string;
    steps: string;
};


function getSupabaseConfig() {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

    if (!url || !publishableKey) {
        throw new Error(
            "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Set them in .env.local and restart the dev server."
        );
    }

    return {
        url: `${url.replace(/\/$/, "")}/rest/v1/recipes`,
        headers: { apikey: publishableKey },
    };
}

async function fetchRecipes(query: string): Promise<Response> {
    const { url, headers } = getSupabaseConfig();
    const response = await fetch(`${url}?${query}`, { headers });

    if (response.status === 401) {
        throw new Error(
            "Supabase rejected the publishable key (401). Check that the URL and key belong to the same Supabase project."
        );
    }
    if (!response.ok) {
        throw new Error(`Supabase request failed with status ${response.status}.`);
    }

    return response;
}

export async function getAllRecipes(): Promise<Recipe[]> {
    const response = await fetchRecipes("select=*");
    return (await response.json()) as Recipe[];
}

export async function getRecipeById(id: string): Promise<Recipe | null> {
    const response = await fetchRecipes(`select=*&id=eq.${encodeURIComponent(id)}`);
    const rows = (await response.json()) as Recipe[];
    return rows[0] ?? null;
}
