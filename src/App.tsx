import { NewsletterForm } from './components/NewsletterForm/NewsletterForm';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <h1>Newsletter Hub</h1>
        </div>
        <p>Premium Subscriber Management</p>
      </header>

      <main style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        {/* User Panel - Always visible */}
        <section className="panel section-fade-in">
          <NewsletterForm />
        </section>

        {/* Admin login removed as per request */}

      </main>
    </div>
  );
}

export default App;
