import { PUBLIC_API_URL } from "$env/static/public";

export async function load({ fetch }) {
    const fetchDailySteps = async () => {
        const url = PUBLIC_API_URL + "/api/v1/steps";
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(response);
        }
        const data = await response.json();
        return data;
    }
    const fetchLongestStreak = async () => {
        const threshold = 10000;
        const url = PUBLIC_API_URL + "/api/v1/steps/streak/?threshold=" + threshold;
        console.log(url);
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
