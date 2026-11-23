import { useMemo, useState } from "react";

const initialItems = [
  {
    id: 1,
    title: "Navy blue backpack",
    category: "Bags",
    type: "Lost",
    location: "Central Library, 2nd floor",
    date: "Today, 10:30 AM",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    initials: "AK",
    color: "lavender",
  },
  {
    id: 2,
    title: "Wireless headphones",
    category: "Electronics",
    type: "Found",
    location: "Student Union, near the café",
    date: "Today, 9:15 AM",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    initials: "JM",
    color: "peach",
  },
  {
    id: 3,
    title: "Set of brass keys",
    category: "Accessories",
    type: "Found",
    location: "West parking lot",
    date: "Yesterday, 4:45 PM",
    image:
      "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=900&q=85",
    initials: "RL",
    color: "mint",
  },
  {
    id: 4,
    title: "Green water bottle",
    category: "Accessories",
    type: "Lost",
    location: "Athletics Center",
    date: "Yesterday, 1:20 PM",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85",
    initials: "TS",
    color: "blue",
  },
  {
    id: 5,
    title: "Brown leather wallet",
    category: "Accessories",
    type: "Found",
    location: "North Hall, Room 204",
    date: "Mon, 11:05 AM",
    image:
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85",
    initials: "MN",
    color: "yellow",
  },
  {
    id: 6,
    title: "Sketchbook & pencils",
    category: "Other",
    type: "Lost",
    location: "Arts Building, studio B",
    date: "Mon, 8:40 AM",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=900&q=85",
    initials: "CW",
    color: "pink",
  },
];

const categories = ["All items", "Electronics", "Bags", "Accessories", "Other"];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="10.8" cy="10.8" r="6.8" />
      <path d="m16 16 4.5 4.5" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.2 2" />
    </svg>
  );
}

function App() {
  const [items, setItems] = useState(initialItems);
  const [category, setCategory] = useState("All items");
  const [status, setStatus] = useState("All");
  const [query, setQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        category === "All items" || item.category === category;
      const matchesStatus = status === "All" || item.type === status;
      const matchesQuery =
        !normalizedQuery ||
        `${item.title} ${item.category} ${item.location}`
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesCategory && matchesStatus && matchesQuery;
    });
  }, [category, items, query, status]);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get("title").toString().trim();
    const newItem = {
      id: Date.now(),
      title,
      category: formData.get("category").toString(),
      type: formData.get("type").toString(),
      location: formData.get("location").toString().trim(),
      date: "Just now",
      image:
        "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=900&q=85",
      initials: "YOU",
      color: "lavender",
    };
    setItems((currentItems) => [newItem, ...currentItems]);
    setCategory("All items");
    setStatus("All");
    setQuery("");
    setIsFormOpen(false);
    setSubmitted(true);
    window.setTimeout(() => setSubmitted(false), 3500);
    event.currentTarget.reset();
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Findly home">
          <span className="brand-mark">f</span>
          <span>findly</span>
          <span className="brand-dot">.</span>
        </a>
        <nav className="main-nav" aria-label="Main navigation">
          <a className="nav-active" href="#browse">Browse items</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <button className="button button-dark top-report" onClick={() => setIsFormOpen(true)}>
          <span className="plus">+</span> Report an item
        </button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-line" /> YOUR COMMUNITY LOST &amp; FOUND</div>
            <h1>Lost something?<br />Let’s <span>find it.</span></h1>
            <p className="hero-description">
              A little help goes a long way. Find what you’ve lost, or help
              something find its way home.
            </p>
            <div className="hero-actions">
              <a className="button button-dark" href="#browse">
                Browse items <span className="arrow">↗</span>
              </a>
              <button className="button button-light" onClick={() => setIsFormOpen(true)}>
                <span className="plus">+</span> Post an item
              </button>
            </div>
            <div className="community-note">
              <div className="avatar-stack" aria-hidden="true">
                <span className="mini-avatar avatar-one">J</span>
                <span className="mini-avatar avatar-two">A</span>
                <span className="mini-avatar avatar-three">M</span>
                <span className="mini-avatar avatar-four">S</span>
              </div>
              <span><strong>1,200+</strong> neighbors helping each other</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Illustration of community members reconnecting lost belongings">
            <div className="art-sun" />
            <div className="art-blob" />
            <div className="art-spark spark-one">✳</div>
            <div className="art-spark spark-two">✳</div>
            <div className="art-person person-left">
              <div className="person-hair" />
              <div className="person-head" />
              <div className="person-body"><span className="person-arm" /></div>
              <div className="person-leg leg-one" /><div className="person-leg leg-two" />
            </div>
            <div className="art-person person-right">
              <div className="person-hair" />
              <div className="person-head" />
              <div className="person-body"><span className="person-arm" /></div>
              <div className="person-leg leg-one" /><div className="person-leg leg-two" />
            </div>
            <div className="art-bag"><span className="bag-handle" /><span className="bag-pocket" /></div>
            <div className="floating-note"><span className="note-check">✓</span><span><strong>Back together!</strong><small>One happy reunion</small></span></div>
            <div className="art-ground" />
            <div className="art-caption">GOOD THINGS FIND THEIR WAY HOME <span>♡</span></div>
          </div>
        </section>

        <section className="browse-section" id="browse">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> THE COMMUNITY BOARD</div>
              <h2>Recently spotted</h2>
            </div>
            <button className="text-link" onClick={() => { setCategory("All items"); setStatus("All"); setQuery(""); }}>
              View all items <span>↗</span>
            </button>
          </div>

          <div className="filter-toolbar">
            <div className="category-list" role="group" aria-label="Filter by category">
              {categories.map((itemCategory) => (
                <button
                  className={`category-chip ${category === itemCategory ? "selected" : ""}`}
                  key={itemCategory}
                  onClick={() => setCategory(itemCategory)}
                  aria-pressed={category === itemCategory}
                >
                  {itemCategory}
                </button>
              ))}
            </div>
            <div className="browse-controls">
              <label className="search-box">
                <SearchIcon />
                <input
                  type="search"
                  placeholder="Search items..."
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  aria-label="Search items by name, category, or location"
                />
                <kbd>⌘ K</kbd>
              </label>
              <div className="status-switch" role="group" aria-label="Filter by item status">
                {["All", "Lost", "Found"].map((itemStatus) => (
                  <button
                    className={status === itemStatus ? "active" : ""}
                    key={itemStatus}
                    onClick={() => setStatus(itemStatus)}
                    aria-pressed={status === itemStatus}
                  >
                    {itemStatus}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredItems.length > 0 ? (
            <div className="item-grid">
              {filteredItems.map((item) => (
                <article className="item-card" key={item.id}>
                  <button className="card-image-button" onClick={() => setSelectedItem(item)} aria-label={`View ${item.title}`}>
                    <img className="item-image" src={item.image} alt="" />
                    <span className={`item-status ${item.type.toLowerCase()}`}>
                      <span className="status-dot" /> {item.type}
                    </span>
                    <span className="image-arrow">↗</span>
                  </button>
                  <div className="item-content">
                    <div className="item-title-row">
                      <h3>{item.title}</h3>
                      <span className="item-category">{item.category}</span>
                    </div>
                    <div className="item-meta"><PinIcon /><span>{item.location}</span></div>
                    <div className="item-footer">
                      <div className="item-meta"><ClockIcon /><span>{item.date}</span></div>
                      <span className={`reporter-avatar ${item.color}`}>{item.initials}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span className="empty-icon">⌕</span>
              <h3>No items found just yet</h3>
              <p>Try a different search or category — or post the first one.</p>
              <button className="button button-dark" onClick={() => setIsFormOpen(true)}>Report an item</button>
            </div>
          )}
          <div className="board-footer">
            <span>Showing <strong>{filteredItems.length}</strong> of <strong>{items.length}</strong> items</span>
            <button className="text-link" onClick={() => setIsFormOpen(true)}>Can’t find it? Post an item <span>↗</span></button>
          </div>
        </section>

        <section className="how-section" id="how-it-works">
          <div className="how-intro">
            <div className="eyebrow"><span className="eyebrow-line" /> SIMPLE AS THAT</div>
            <h2>Good things happen<br />when we <span>look out.</span></h2>
          </div>
          <div className="steps">
            <div className="step"><span className="step-number">01</span><div><h3>Post what you found</h3><p>A quick photo and a few details are all it takes to help someone recognize their item.</p></div></div>
            <div className="step"><span className="step-number">02</span><div><h3>Find your match</h3><p>Browse recent posts or search by item, category, or where it was last seen.</p></div></div>
            <div className="step"><span className="step-number">03</span><div><h3>Make the connection</h3><p>Reach out to the person who posted and arrange a happy reunion.</p></div></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark">f</span><span>findly</span><span className="brand-dot">.</span></a>
        <span>Made for neighbors, by neighbors. <span className="footer-heart">♥</span></span>
        <span className="footer-year">A little kindness goes a long way.</span>
      </footer>

      {submitted && <div className="toast" role="status"><span>✓</span> Your item is on the board. Here’s to a happy reunion!</div>}

      {isFormOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsFormOpen(false); }}>
          <section className="modal" role="dialog" aria-modal="true" aria-labelledby="report-title">
            <button className="modal-close" onClick={() => setIsFormOpen(false)} aria-label="Close form">×</button>
            <div className="eyebrow"><span className="eyebrow-line" /> HELP IT FIND ITS WAY</div>
            <h2 id="report-title">Post an item</h2>
            <p className="modal-intro">A few details can make someone’s day.</p>
            <form onSubmit={handleSubmit}>
              <label className="field-label">I <select name="type" defaultValue="Lost"><option>Lost</option><option>Found</option></select> something</label>
              <label className="field-label">What is it?<input name="title" placeholder="e.g. Blue umbrella" required maxLength="60" /></label>
              <div className="form-row">
                <label className="field-label">Category<select name="category" defaultValue="Accessories"><option>Electronics</option><option>Bags</option><option>Accessories</option><option>Other</option></select></label>
                <label className="field-label">Where?<input name="location" placeholder="Location" required maxLength="80" /></label>
              </div>
              <button className="button button-dark submit-button" type="submit">Add to the board <span className="arrow">↗</span></button>
              <p className="privacy-note">Please don’t include personal contact information in your post.</p>
            </form>
          </section>
        </div>
      )}

      {selectedItem && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedItem(null); }}>
          <section className="modal item-modal" role="dialog" aria-modal="true" aria-labelledby="item-detail-title">
            <button className="modal-close" onClick={() => setSelectedItem(null)} aria-label="Close details">×</button>
            <img className="detail-image" src={selectedItem.image} alt="" />
            <span className={`item-status detail-status ${selectedItem.type.toLowerCase()}`}><span className="status-dot" /> {selectedItem.type}</span>
            <div className="eyebrow"><span className="eyebrow-line" /> {selectedItem.category.toUpperCase()}</div>
            <h2 id="item-detail-title">{selectedItem.title}</h2>
            <div className="detail-meta"><PinIcon /> {selectedItem.location}</div>
            <div className="detail-meta"><ClockIcon /> {selectedItem.date}</div>
            <button className="button button-dark submit-button" onClick={() => setSelectedItem(null)}>I think this is mine <span className="arrow">↗</span></button>
            <p className="privacy-note">Please connect in person through your community’s usual channels.</p>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
