export const load = async ({ fetch }) => {
    const fetchDailySteps = async () => {
        const response = await fetch("https://mongofitness-api.onrender.com/api/v1/steps/", { credentials: "include" });
        if (!response.ok) {
            throw new Error(response);
        }
        const data = await response.json();
        return data;
    }
    return {
        streamed: {
            dailySteps: fetchDailySteps()
        }
    }
}
