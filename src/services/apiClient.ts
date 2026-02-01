import axios, { AxiosError } from "axios";
import type { ApiError } from "@/types";

const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "https://localhost:17860/api";

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
        const customError: ApiError = {
            message:
                error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred",
            statusCode: error.response?.status,
            errors: (error.response?.data as any)?.errors,
        };
        return Promise.reject(customError);
    },
);

export default apiClient;
