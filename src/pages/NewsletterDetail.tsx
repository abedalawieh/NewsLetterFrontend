import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import axios from 'axios';
import './NewsletterDetail.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:17860/api';

interface Newsletter {
    id: string;
    title: string;
    content: string;
    targetInterests: string;
    templateName?: string;
    isDraft: boolean;
    sentAt: string | null;
    createdAt: string;
}

export const NewsletterDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [newsletter, setNewsletter] = useState<Newsletter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNewsletter = async () => {
            try {
                const res = await axios.get<Newsletter>(`${API_BASE}/newsletters/${id}`);
                setNewsletter(res.data);
            } catch (err: any) {
                console.error('Newsletter Detail Error:', err);

                setError('Failed to load newsletter details');

            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchNewsletter();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="newsletter-detail-page">
                <div className="newsletter-detail-container">
                    <p className="loading-text">Loading newsletter details...</p>
                </div>
            </div>
        );
    }

    if (error || !newsletter) {
        return (
            <div className="newsletter-detail-page">
                <div className="newsletter-detail-container">
                    <Card title="Error">
                        <p className="error-text">{error || 'Newsletter not found.'}</p>
                        <Button variant="primary" onClick={() => navigate('/newsletters')}>
                            Back to Newsletters
                        </Button>
                    </Card>
                </div>
            </div>
        );
    }

    const interests = newsletter.targetInterests?.split(',').filter(Boolean) || [];

    return (
        <div className="newsletter-detail-page">
            <div className="newsletter-detail-container">
                <header className="newsletter-detail-header">
                    <Link to="/newsletters" className="back-link">
                        ← Back to Newsletters
                    </Link>
                    <h1 className="newsletter-title">{newsletter.title}</h1>
                    <div className="newsletter-meta-row">
                        <span className={`newsletter-status ${newsletter.isDraft ? 'draft' : 'sent'}`}>
                            {newsletter.isDraft ? 'Draft' : 'Published'}
                        </span>
                        <span className="newsletter-date">
                            {newsletter.sentAt
                                ? `Sent on ${new Date(newsletter.sentAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}`
                                : `Created on ${new Date(newsletter.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric',
                                })}`}
                        </span>
                    </div>
                </header>

                {interests.length > 0 && (
                    <section className="newsletter-interests">
                        <h3>Topics</h3>
                        <div className="interest-tags">
                            {interests.map((interest) => (
                                <span key={interest} className="interest-tag">
                                    {interest.trim()}
                                </span>
                            ))}
                        </div>
                    </section>
                )}

                <Card className="newsletter-content-card">
                    <div className="newsletter-content" dangerouslySetInnerHTML={{ __html: newsletter.content }} />
                </Card>

                <footer className="newsletter-detail-footer">
                    <Link to="/newsletters">
                        <Button variant="outline" size="medium">
                            ← Back to List
                        </Button>
                    </Link>
                    <Link to="/subscribe">
                        <Button variant="primary" size="medium">
                            Subscribe to Our Newsletter
                        </Button>
                    </Link>
                </footer>
            </div>
        </div>
    );
};

export default NewsletterDetail;
