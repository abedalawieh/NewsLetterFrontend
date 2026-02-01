import axios from "axios";
import type { Lookup } from "@/types";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "https://localhost:17860/api";

const publicClient = axios.create({ baseURL: API_BASE, timeout: 10000 });

export const metadataService = {
    async getAllLookups(): Promise<Lookup[]> {
        const categories = ["SubscriberType", "CommunicationMethod", "Interest"];
        const results = await Promise.all(
            categories.map((cat) =>
                publicClient.get<{ id: string; value: string; label: string; sortOrder: number; isActive: boolean }[]>(
                    `/metadata/items/${encodeURIComponent(cat)}`
                )
            )
        );
        const lookups: Lookup[] = [];
        categories.forEach((category, i) => {
            (results[i].data || []).forEach((item) => {
                if (item.isActive) {
                    lookups.push({
                        id: item.id,
                        category,
                        value: item.value,
                        label: item.label,
                        sortOrder: item.sortOrder,
                        isActive: item.isActive,
                    });
                }
            });
        });
        return lookups;
    },

    async getLookupsByCategory(category: string): Promise<Lookup[]> {
        const response = await publicClient.get<{ id: string; value: string; label: string; sortOrder: number; isActive: boolean }[]>(
            `/metadata/items/${encodeURIComponent(category)}`
        );
        return (response.data || []).map((item) => ({
            id: item.id,
            category,
            value: item.value,
            label: item.label,
            sortOrder: item.sortOrder,
            isActive: item.isActive,
        }));
    },

};

export default metadataService;
