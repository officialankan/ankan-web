import { json } from '@sveltejs/kit';

export async function GET({ url }) {
    const threshold = url.searchParams.get('threshold');
    const response = await fetch(
        `https://mongofitness-api.onrender.com/api/v1/steps/streak/?threshold=${threshold}`
    );
    if (!response.ok) {
        throw new Error(response);
    }
    const data = await response.json();
    return json(data);
}
