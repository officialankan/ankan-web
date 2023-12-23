export async function load({ fetch }) {
    const fetchDailySteps = async () => {
        const response = await fetch("https://mongofitness-backend.delightfulsmoke-547405ed.swedencentral.azurecontainerapps.io/api/v1/steps", { credentials: "include" });
        if (!response.ok) {
            throw new Error(response);
        }
        const data = await response.json();
        return data;
    }
    const fetchLongestStreak = async () => {
        const threshold = 10000;
        const url = `https://mongofitness-backend.delightfulsmoke-547405ed.swedencentral.azurecontainerapps.io/api/v1/steps/streak/?threshold=${threshold}`; 
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(response);
        }
        const data = await response.json();
        return data;
    }
            
    return {
        streamed: {
            dailySteps: fetchDailySteps(),
            longestStreak: fetchLongestStreak(),
        }
    }
}
