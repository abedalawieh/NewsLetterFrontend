import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { SubscribePage } from './pages/SubscribePage';
import { NewsletterList } from './pages/NewsletterList';
import { NewsletterDetail } from './pages/NewsletterDetail';
import { UnsubscribePage } from './pages/UnsubscribePage';
import { Unsubscribe } from './components/Unsubscribe/Unsubscribe';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/subscribe" element={<SubscribePage />} />
        <Route path="/newsletters" element={<NewsletterList />} />
        <Route path="/newsletters/:id" element={<NewsletterDetail />} />
        <Route path="/unsubscribe-email" element={<UnsubscribePage />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
