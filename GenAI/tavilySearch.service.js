import { tavily } from "@tavily/core";

export async function tavilySearch(query) {

    const client = tavily(process.env.TAVILY_API_KEY);

    try {

        const response = await client.search(query);

        return response.results;

    } catch (error) {

        console.error("Error performing Tavily search:", error);
        throw new Error("Failed to perform search");

    }
}