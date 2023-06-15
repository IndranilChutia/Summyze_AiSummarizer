import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Import key from env file
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',

    // Create Base Query
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            // Put key in .env file, so that it's not acessible to others or seen in github
            headers.set('X-RapidAPI-Key', rapidApiKey);
            headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        // Make the endpoint methods
        getSummary: builder.query({
            // URL might contain special chars sometimes which might case errors
            // Wrap the url in encodeURIComponent()
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
        })
    })
});

// Export the hook
export const {useLazyGetSummaryQuery} = articleApi;