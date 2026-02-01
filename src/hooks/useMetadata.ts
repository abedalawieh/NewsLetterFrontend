import { useState, useEffect } from 'react';
import { Lookup } from '@/types';
import { metadataService } from '@/services/metadataService';

export const useMetadata = () => {
    const [lookups, setLookups] = useState<Lookup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchLookups = async () => {
        setIsLoading(true);
        try {
            const data = await metadataService.getAllLookups();
            setLookups(data);
            setError(null);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch metadata');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const load = async () => {
            setIsLoading(true);
            try {
                const data = await metadataService.getAllLookups();
                setLookups(data);
                setError(null);
            } catch (err: any) {
                console.error("Failed to load metadata:", err);
                setError(err.message || 'Failed to fetch metadata');
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, []);

    const getByCategory = (category: string) => {
        return lookups
            .filter((l) => l.category === category && l.isActive)
            .sort((a, b) => a.sortOrder - b.sortOrder)
            .map((l) => ({ value: l.value, label: l.label }));
    };

    return {
        lookups,
        isLoading,
        error,
        getByCategory,
        fetchLookups,
    };
};

