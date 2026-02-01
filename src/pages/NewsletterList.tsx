import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import axios from 'axios';
import metadataService from '../services/metadataService';
import type { Lookup } from '@/types';
import { SiteLayout } from "../components/SiteLayout/SiteLayout";
import './NewsletterList.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:17860/api';
const ITEMS_PER_PAGE = 6;

interface Newsletter {
  id: string;
  title: string;
  targetInterests: string;
  targetInterestLabels?: string[];
  isDraft: boolean;
  sentAt: string | null;
  createdAt: string;
}

interface PagedResult<T> {
  items?: T[];
  totalItems?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  Items?: T[];
  TotalItems?: number;
  CurrentPage?: number;
  PageSize?: number;
  TotalPages?: number;
}

type SortOption = 'newest' | 'oldest' | 'title';

export const NewsletterList: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [interestOptions, setInterestOptions] = useState<Lookup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const res = await axios.get<PagedResult<Newsletter>>(`${API_BASE}/newsletters`, {
        params: {
          pageNumber: currentPage,
          pageSize: ITEMS_PER_PAGE,
          searchTerm: searchTerm.trim() || undefined,
          interests: selectedInterests.join(','),
          sortBy
        }
      });
      const payload = res.data || {};
      const items = payload.items ?? payload.Items ?? [];
      const total = payload.totalItems ?? payload.TotalItems ?? items.length;
      setNewsletters(items);
      setTotalItems(total);
    } catch (err: any) {
      console.error('Newsletter Fetch Error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, [currentPage, searchTerm, selectedInterests, sortBy]);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const items = await metadataService.getLookupsByCategory('Interest');
        const sorted = items
          .filter((i) => i.isActive)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setInterestOptions(sorted);
      } catch (err) {
        console.error('Failed to load interests for filters', err);
      }
    };
    fetchInterests();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedInterests, sortBy]);

  const interestLabelMap = useMemo(() => {
    const map: Record<string, string> = {};
    interestOptions.forEach((item) => {
      map[item.value] = item.label;
    });
    return map;
  }, [interestOptions]);

  const formatLabel = (value: string) => {
    if (!value) return '';
    return value
      .replace(/_/g, ' ')
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const getInterestLabels = (newsletter: Newsletter) => {
    if (newsletter.targetInterestLabels && newsletter.targetInterestLabels.length > 0) {
      return newsletter.targetInterestLabels;
    }
    return (newsletter.targetInterests || '')
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean)
      .map((value) => interestLabelMap[value] || formatLabel(value));
  };

  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const currentPageSafe = Math.min(currentPage, totalPages);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const page = currentPageSafe;

    if (page > 2) {
      pages.push(
        <button
          key={1}
          className="pagination-btn"
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      if (page > 3) {
        pages.push(<span key="dots-start" className="pagination-dots">...</span>);
      }
    }

    for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 1); i++) {
      pages.push(
        <button
          key={i}
          className={`pagination-btn ${i === page ? 'active' : ''}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages - 1) {
      if (page < totalPages - 2) {
        pages.push(<span key="dots-end" className="pagination-dots">...</span>);
      }
      pages.push(
        <button
          key={totalPages}
          className="pagination-btn"
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return (
      <nav className="pagination" aria-label="Newsletter pagination">
        <button
          className="pagination-btn pagination-nav"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <div className="pagination-pages">{pages}</div>
        <button
          className="pagination-btn pagination-nav"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </nav>
    );
  };

  return (
    <SiteLayout className="newsletter-list-page">
      <header className="newsletter-list-header">
        <Link to="/" className="back-link">Back</Link>
        <div className="headline">
          <p className="eyebrow">Dispatch Archive</p>
          <h1>Our Newsletters</h1>
          <p className="lede">Browse updates curated by interest and catch up in seconds.</p>
        </div>
        <div className="header-actions">
          <Link to="/subscribe">
            <Button variant="primary" size="medium">
              Subscribe Now
            </Button>
          </Link>
        </div>
        <section className="filters-panel" aria-label="Newsletter filters">
          <div className="filters-row">
            <div className="filters-field">
              <label htmlFor="newsletter-search">Search</label>
              <input
                id="newsletter-search"
                type="search"
                placeholder="Search titles or topics"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            <div className="filters-field">
              <label htmlFor="newsletter-sort">Sort</label>
              <select
                id="newsletter-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value as SortOption)}
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="title">Title A-Z</option>
              </select>
            </div>
            <div className="filters-field filters-actions">
              <button
                type="button"
                className="filters-clear"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedInterests([]);
                  setSortBy('newest');
                }}
              >
                Clear filters
              </button>
            </div>
          </div>
          <div className="filters-interests">
            {(interestOptions.length > 0
              ? interestOptions
              : [
                  { value: 'Houses', label: 'Houses' },
                  { value: 'Apartments', label: 'Apartments' },
                  { value: 'Rental', label: 'Rental' },
                  { value: 'LandSourcing', label: 'Land Sourcing' },
                  { value: 'SharedOwnership', label: 'Shared Ownership' }
                ]
            ).map((interest) => {
              const isActive = selectedInterests.includes(interest.value);
              return (
                <button
                  type="button"
                  key={interest.value}
                  className={`interest-chip ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedInterests((prev) =>
                      prev.includes(interest.value)
                        ? prev.filter((item) => item !== interest.value)
                        : [...prev, interest.value]
                    );
                  }}
                >
                  {interest.label}
                </button>
              );
            })}
          </div>
        </section>
        {!loading && totalItems > 0 && (
          <p className="results-info">
            Showing {newsletters.length} of {totalItems} newsletters
          </p>
        )}
      </header>

      <main className="newsletter-list-main">
        {loading && <p className="loading-text">Loading newsletters...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && newsletters.length === 0 && (
          <Card title="No newsletters yet">
            <p className="empty-text">No newsletters match those filters yet.</p>
          </Card>
        )}

        {!loading && !error && newsletters.length > 0 && (
          <>
            <div className="newsletter-grid">
              {newsletters.map((n) => (
                <article key={n.id} className="newsletter-card">
                  <Card
                    title={n.title || 'Newsletter'}
                    subtitle={n.sentAt
                      ? `Published ${new Date(n.sentAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}`
                      : 'Coming soon'}
                  >
                    <div className="newsletter-subject-block">
                      <span className="subject-label">Subject</span>
                      <p className="subject-text">{n.title || 'Untitled Newsletter'}</p>
                    </div>
                    <div className="newsletter-topics">
                      {(getInterestLabels(n).length > 0 ? getInterestLabels(n) : ['General'])
                        .slice(0, 4)
                        .map((label) => (
                          <span key={`${n.id}-${label}`} className="topic-badge">
                            {label}
                          </span>
                        ))}
                    </div>
                    <Link to={`/newsletters/${n.id}`} className="newsletter-link">
                      <Button variant="outline" size="small" fullWidth>
                        Read More
                      </Button>
                    </Link>
                  </Card>
                </article>
              ))}
            </div>

            {renderPagination()}
          </>
        )}
      </main>
    </SiteLayout>
  );
};

export default NewsletterList;
