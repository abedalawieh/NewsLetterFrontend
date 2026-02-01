import { NewsletterForm } from "./components/NewsletterForm/NewsletterForm";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-top">
          <h1>Newsletter Hub</h1>
        </div>
        <p>Premium Subscriber Management</p>
      </header>

      <main
        style={{
          width: "100%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
        }}
      >
        {}
        <section className="panel section-fade-in">
          <NewsletterForm />
        </section>

        {}
      </main>
    </div>
  );
}

export default App;
