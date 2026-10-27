export function Navbar({ user }) {
  return (
    <nav className="navbar">
      <a className="brand" href="/books">Libra<span>X</span></a>
      <div className="nav-links">
        {user?.role === 'admin' ? (
          <>
            <a href="/admin">Admin</a>
            <a href="/books">Books</a>
          </>
        ) : (
          <>
            <a href="/books">Books</a>
            <a href="/user">Dashboard</a>
            <a href="/history">Borrow history</a>
            <a href="/feedback">Feedback</a>
          </>
        )}
        {user && <span className="nav-user">{user.name}</span>}
        <a className="button button-small" href="/" onClick={() => window.localStorage.removeItem('currentUser')}>Log out</a>
      </div>
    </nav>
  )
}

export function SiteLayout({ user, children }) {
  return (
    <>
      <Navbar user={user} />
      {children}
      <footer className="footer">
        <strong>LibraX</strong>
        <span>Smart Online Library Management System</span>
        <span>© 2026 LibraX. All rights reserved.</span>
      </footer>
    </>
  )
}

export function Hero({ title, description }) {
  return (
    <header className="hero">
      <div className="content-width">
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </header>
  )
}

export function BookGrid({ books, onBorrow, onReserve, admin = false, onDelete }) {
  if (books.length === 0) {
    return <div className="empty-state"><h2>No books found</h2><p>Try another search or add a book to the library.</p></div>
  }

  return (
    <div className="book-grid">
      {books.map((book) => (
        <article className="book-card" key={book.id}>
          <div className="book-cover" aria-hidden="true">{book.cover || '📚'}</div>
          <div className="book-card-content">
            <h3>{book.title}</h3>
            <p className="muted">By {book.author}</p>
            <dl className="book-details">
              <div><dt>Category</dt><dd>{book.category}</dd></div>
              <div><dt>ISBN</dt><dd>{book.isbn}</dd></div>
              <div><dt>Total copies</dt><dd>{book.quantity}</dd></div>
              <div><dt>Available</dt><dd>{book.available}</dd></div>
            </dl>
            <p className={`availability ${Number(book.available) > 0 ? '' : 'unavailable'}`}>
              {Number(book.available) > 0 ? `${book.available} copies available` : 'Currently unavailable'}
            </p>
            {admin ? (
              <button className="button button-danger" type="button" onClick={() => onDelete(book)}>Delete book</button>
            ) : (
              <div className="button-row">
                <button className="button" type="button" disabled={Number(book.available) <= 0} onClick={() => onBorrow(book)}>
                  {Number(book.available) > 0 ? 'Borrow' : 'Unavailable'}
                </button>
                <button className="button button-secondary" type="button" onClick={() => onReserve(book)}>Reserve</button>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}

export function StatCard({ label, value, icon }) {
  return <div className="stat-card"><span className="stat-icon">{icon}</span><span className="stat-label">{label}</span><strong>{value}</strong></div>
}

export function Message({ children, type = 'error' }) {
  return children ? <p className={`message ${type}`} role="status">{children}</p> : null
}

export function ProtectedPage({ user, admin = false }) {
  const denied = !user || (admin && user.role !== 'admin')
  if (!denied) return null
  return (
    <main className="auth-card access-denied">
      <div className="auth-logo">📚</div>
      <h1>Sign in required</h1>
      <p>{admin ? 'Please sign in with the library administrator account to manage the catalog.' : 'Please sign in to view this page.'}</p>
      <a className="button" href="/">Go to login</a>
    </main>
  )
}
