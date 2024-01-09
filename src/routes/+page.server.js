import { PUBLIC_API_URL } from "$env/static/public";

export async function load({ fetch }) {
    const fetchDailySteps = async () => {
        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        let ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);

        const endpoint = "/api/v1/steps/range/?start=" + ninetyDaysAgo.toISOString().split("T")[0] + "&end=" + tomorrow.toISOString().split("T")[0];
        const url = PUBLIC_API_URL + endpoint;
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(response);
        }
        const data = await response.json();
        return data;
    }

    const fetchActivityTypes = async () => {
        let today = new Date();
        let tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        let ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(today.getDate() - 90);

        const endpoint = "/api/v1/activities/type/range/?start=" + ninetyDaysAgo.toISOString().split("T")[0] + "&end=" + tomorrow.toISOString().split("T")[0];
        const url = PUBLIC_API_URL + endpoint;
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
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) {
            throw new Error(response);
        }
        const data = await response.json();
        return data;
    }
            
    return {
        streamed: {
            barChartData: Promise.all([fetchDailySteps(), fetchActivityTypes()]),
            longestStreak: fetchLongestStreak(),
        }
    }
}
