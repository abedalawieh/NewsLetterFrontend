import React from 'react';
import { Card } from '@components/Card';
import { useMetadata } from '@hooks/useMetadata';
import './MetadataManagement.css';

export const MetadataManagement: React.FC = () => {
    const { lookups } = useMetadata();

    const categories = ['SubscriberType', 'CommunicationMethod', 'Interest'];

    return (
        <div className="metadata-management">
            <Card title="⚙️ Manage Options" subtitle="System lookups are seeded and managed by label and status only">
                <div className="lookups-list">
                    <h3>Current Options</h3>
                    {categories.map(cat => (
                        <div key={cat} className="category-group">
                            <h4>{cat}</h4>
                            <div className="tags">
                                {lookups.filter(l => l.category === cat).map(l => (
                                    <span key={l.id} className="tag">
                                        {l.label} ({l.value})
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
