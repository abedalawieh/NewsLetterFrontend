import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import axios from 'axios';
import metadataService from '../services/metadataService';
import './NewsletterList.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://localhost:17860/api';
const ITEMS_PER_PAGE = 6;

interface Newsletter {
  id: string;
  title: string;
  targetInterests: string;
  isDraft: boolean;
  sentAt: string | null;
  createdAt: string;
}

type SortOption = 'newest' | 'oldest' | 'title';

export const NewsletterList: React.FC = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [availableInterests, setAvailableInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const fetchNewsletters = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Newsletter[]>(`${API_BASE}/newsletters`);
      const allNewsletters = res.data || [];

      // Filter out drafts if we only want published ones, but be flexible with property casing
      const published = allNewsletters.filter((n: any) => {
        const isDraftFlag = n.isDraft !== undefined ? n.isDraft : n.IsDraft;
        return isDraftFlag === false;
      });

      setNewsletters(published);
    } catch (err: any) {
      console.error('Newsletter Fetch Error:', err);
      setError('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewsletters();
  }, []);

  useEffect(() => {
    const fetchInterests = async () => {
      try {
        const items = await metadataService.getLookupsByCategory('Interest');
        const sorted = items
          .filter((i) => i.isActive)
          .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
          .map((i) => i.value);
        setAvailableInterests(sorted);
      } catch (err) {
        console.error('Failed to load interests for filters', err);
      }
    };
    fetchInterests();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedInterests, sortBy]);

  const filteredNewsletters = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    const hasSearch = normalizedSearch.length > 0;
    const hasInterests = selectedInterests.length > 0;

    const filtered = newsletters.filter((n) => {
      const titleMatch = n.title?.toLowerCase().includes(normalizedSearch);
      const interests = (n.targetInterests || '')
        .split(',')
        .map((i) => i.trim())
        .filter(Boolean);
      const interestsMatch = selectedInterests.every((interest) =>
        interests.some((i) => i.toLowerCase() === interest.toLowerCase())
      );

      if (hasSearch && !titleMatch && !interests.join(',').toLowerCase().includes(normalizedSearch)) {
        return false;
      }
      if (hasInterests && !interestsMatch) {
        return false;
      }
      return true;
    });

    const sorted = filtered.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      const dateA = new Date(a.sentAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.sentAt || b.createdAt || 0).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return sorted;
  }, [newsletters, searchTerm, selectedInterests, sortBy]);

  const totalItems = filteredNewsletters.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const currentPageSafe = Math.min(currentPage, totalPages);
  const startIndex = (currentPageSafe - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredNewsletters.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
    <div className="newsletter-list-page">
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
            {(availableInterests.length > 0 ? availableInterests : ['Houses', 'Apartments', 'Rental', 'LandSourcing', 'SharedOwnership']).map((interest) => {
              const isActive = selectedInterests.includes(interest);
              return (
                <button
                  type="button"
                  key={interest}
                  className={`interest-chip ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedInterests((prev) =>
                      prev.includes(interest)
                        ? prev.filter((item) => item !== interest)
                        : [...prev, interest]
                    );
                  }}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </section>
        {!loading && totalItems > 0 && (
          <p className="results-info">
            Showing {paginatedItems.length} of {totalItems} newsletters
          </p>
        )}
      </header>

      <main className="newsletter-list-main">
        {loading && <p className="loading-text">Loading newsletters...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && paginatedItems.length === 0 && (
          <Card title="No newsletters yet">
            <p className="empty-text">No newsletters match those filters yet.</p>
          </Card>
        )}

        {!loading && !error && paginatedItems.length > 0 && (
          <>
            <div className="newsletter-grid">
              {paginatedItems.map((n) => (
                <article key={n.id} className="newsletter-card">
                  <Card title={n.title}>
                    <p className="newsletter-meta">
                      {n.sentAt
                        ? `Published ${new Date(n.sentAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}`
                        : 'Coming soon'}
                    </p>
                    <p className="newsletter-interests">
                      {n.targetInterests
                        ? n.targetInterests.split(',').slice(0, 3).join(', ') + (n.targetInterests.split(',').length > 3 ? '...' : '')
                        : 'General'}
                    </p>
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
    </div>
  );
};

export default NewsletterList;
