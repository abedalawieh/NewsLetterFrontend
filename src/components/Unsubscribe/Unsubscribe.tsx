import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { Card } from '../Card';
import { Button } from '../Button';
import { RadioGroup } from '../RadioGroup';
import './Unsubscribe.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:17860/api';

export const Unsubscribe = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const email = searchParams.get('email');
    const [reason, setReason] = useState('');
    const [customReason, setCustomReason] = useState('');
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!email) {
            navigate('/');
        }
    }, [email, navigate]);

    const handleUnsubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        const finalReason = reason === 'Other' ? (customReason || '').trim() : reason;
        if (!finalReason) {
            setError('Please specify a reason when choosing "Other".');
            setIsSubmitting(false);
            return;
        }

        try {
            const commentValue = (comment || '').trim();
            if (!commentValue) {
                setError('Please provide additional comments.');
                setIsSubmitting(false);
                return;
            }

            await axios.post(`${API_BASE_URL}/subscribers/unsubscribe`, {
                email,
                reason: finalReason,
                comment: commentValue
            });
            setSubmitted(true);
        } catch (err: any) {
            console.error('Unsubscribe Error:', err);

            setError('Something went wrong. Please try again later.');

        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="unsubscribe-page">
                <div className="unsubscribe-container">
                    <Card title="Unsubscribed Successfully">
                        <div className="unsubscribe-success">
                            <div className="unsubscribe-success-icon">👋</div>
                            <h3>We're sorry to see you go.</h3>
                            <p>You have been removed from our mailing list.</p>
                            <Button variant="outline" onClick={() => navigate('/')}>
                                Return to Home
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="unsubscribe-page">
            <div className="unsubscribe-container">
                <Card title="Unsubscribe">
                    <p className="unsubscribe-intro">
                        We're sorry to see you go, <strong>{email}</strong>.
                        Please let us know why you're leaving so we can improve.
                    </p>

                    <form onSubmit={handleUnsubscribe} className="unsubscribe-form">
                        <RadioGroup
                            label="Reason for unsubscribing"
                            name="reason"
                            options={[
                                { value: "Content not relevant", label: "Content not relevant" },
                                { value: "Too many emails", label: "Too many emails" },
                                { value: "No longer interested", label: "No longer interested" },
                                { value: "Other", label: "Other" }
                            ]}
                            error={error || undefined}
                            onChange={(value) => setReason(value)}
                            selectedValue={reason}
                        />

                        {reason === 'Other' && (
                            <div className="unsubscribe-other">
                                <label>Please specify:</label>
                                <input
                                    type="text"
                                    className="unsubscribe-input"
                                    value={customReason}
                                    onChange={(e) => setCustomReason(e.target.value)}
                                    required
                                    placeholder="Tell us more..."
                                />
                            </div>
                        )}

                        <div className="unsubscribe-comment">
                            <label htmlFor="unsubscribe-comment">Additional comments (required)</label>
                            <textarea
                                id="unsubscribe-comment"
                                className="unsubscribe-input unsubscribe-textarea"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Please tell us more so we can improve..."
                                rows={3}
                                maxLength={500}
                                required
                            />
                            <span className="unsubscribe-char-count">{comment.length}/500</span>
                        </div>

                        <div className="unsubscribe-actions">
                            <Button type="submit" disabled={isSubmitting || !reason || (reason === 'Other' && !customReason.trim()) || !comment.trim()}>
                                {isSubmitting ? 'Processing...' : 'Unsubscribe'}
                            </Button>
                            <Link to="/">
                                <Button type="button" variant="outline">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};
