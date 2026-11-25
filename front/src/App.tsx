import { useState } from 'react'
import './App.css'

type Screen = 'welcome' | 'dashboard' | 'lists' | 'library'
type Destination = 'lists' | 'library'
type IptvList = { id: number; name: string }

function DestinationIcon({ destination }: { destination: Destination }) {
  if (destination === 'lists') {
    return (
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="5" y="6" width="22" height="6" rx="2" />
        <rect x="5" y="15" width="22" height="6" rx="2" />
        <path d="M5 25h13" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M6 8.5A2.5 2.5 0 0 1 8.5 6H14l3 3h6.5A2.5 2.5 0 0 1 26 11.5v12a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 6 23.5v-15Z" />
      <path d="M6.5 13h19" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 10h12m-5-5 5 5-5 5" />
    </svg>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [lists, setLists] = useState<IptvList[]>([
    { id: 1, name: 'Lista 01' },
    { id: 2, name: 'Lista 02' },
    { id: 3, name: 'Lista 03' },
    { id: 4, name: 'Lista 04' },
  ])
  const [showLoginNotice, setShowLoginNotice] = useState(false)

  const addList = () => {
    setLists((currentLists) => {
      const nextId = currentLists.length + 1
      return [
        ...currentLists,
        { id: nextId, name: `Lista ${String(nextId).padStart(2, '0')}` },
      ]
    })
  }

  const openDestination = (destination: Destination) => {
    setScreen(destination)
  }

  return (
    <div className="app-shell">
      {screen !== 'welcome' && (
        <header className="site-header">
          <button
            className="brand"
            type="button"
            onClick={() => setScreen('dashboard')}
            aria-label="Ir al panel principal"
          >
            <span className="brand-mark" aria-hidden="true">
              IP
            </span>
            <span className="brand-name">IPTV EASY</span>
          </button>
          <div className="header-actions">
            {screen !== 'dashboard' && (
              <button
                className="text-button"
                type="button"
                onClick={() => setScreen('dashboard')}
              >
                Panel principal
              </button>
            )}
            <button
              className="login-button"
              type="button"
              onClick={() => setShowLoginNotice(true)}
            >
              LOGIN
            </button>
          </div>
        </header>
      )}

      {screen === 'welcome' && (
        <main className="welcome-screen">
          <div className="welcome-card">
            <span className="welcome-mark" aria-hidden="true">
              IP
            </span>
            <p className="eyebrow">IPTV EASY</p>
            <h1>BIENVENIDO</h1>
            <p className="welcome-copy">
              Todo tu entretenimiento, en un solo lugar.
            </p>
            <button
              className="primary-button"
              type="button"
              onClick={() => setScreen('dashboard')}
            >
              Entrar en la app
              <ArrowIcon />
            </button>
          </div>
          <p className="welcome-caption">Tu espacio multimedia empieza aquí</p>
        </main>
      )}

      {screen === 'dashboard' && (
        <main className="page-content dashboard-page">
          <div className="page-heading">
            <p className="eyebrow">TU ESPACIO MULTIMEDIA</p>
            <h1>¿Qué quieres explorar?</h1>
            <p className="page-description">
              Accede a tus listas y organiza tu biblioteca.
            </p>
          </div>
          <div className="destination-grid">
            <button
              className="destination-card"
              type="button"
              onClick={() => openDestination('lists')}
            >
              <span className="destination-icon">
                <DestinationIcon destination="lists" />
              </span>
              <span className="destination-text">
                <span className="destination-title">Listas IPTV</span>
                <span className="destination-description">
                  Consulta y organiza tus listas
                </span>
              </span>
              <span className="destination-arrow">
                <ArrowIcon />
              </span>
            </button>
            <button
              className="destination-card"
              type="button"
              onClick={() => openDestination('library')}
            >
              <span className="destination-icon">
                <DestinationIcon destination="library" />
              </span>
              <span className="destination-text">
                <span className="destination-title">Biblioteca</span>
                <span className="destination-description">
                  Tu colección multimedia
                </span>
              </span>
              <span className="destination-arrow">
                <ArrowIcon />
              </span>
            </button>
          </div>
          <p className="dashboard-note">
            <span className="status-dot" aria-hidden="true" />
            Un punto de partida para todo tu contenido
          </p>
        </main>
      )}

      {screen === 'lists' && (
        <main className="page-content">
          <div className="page-heading">
            <p className="eyebrow">TU CONTENIDO</p>
            <h1>Listas IPTV</h1>
            <p className="page-description">
              Gestiona desde aquí tus listas IPTV.
            </p>
          </div>
          <section className="list-panel" aria-labelledby="list-panel-title">
            <div className="list-panel-header">
              <div>
                <h2 id="list-panel-title">Mis listas</h2>
                <p>
                  {lists.length} {lists.length === 1 ? 'lista' : 'listas'}
                </p>
              </div>
              <button
                className="add-list-button"
                type="button"
                onClick={addList}
              >
                <span aria-hidden="true">+</span>
                Añadir lista
              </button>
            </div>
            <ul className="list-items">
              {lists.map((list, index) => (
                <li className="list-item" key={list.id}>
                  <span className="list-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="list-name">{list.name}</span>
                  <span className="list-state">Sin configurar</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      )}

      {screen === 'library' && (
        <main className="page-content">
          <div className="page-heading">
            <p className="eyebrow">TU CONTENIDO</p>
            <h1>Biblioteca</h1>
            <p className="page-description">
              Tu colección multimedia tendrá aquí su espacio.
            </p>
          </div>
          <section className="empty-library" aria-labelledby="library-title">
            <span className="empty-library-icon">
              <DestinationIcon destination="library" />
            </span>
            <h2 id="library-title">Tu biblioteca está preparada</h2>
            <p>
              La conexión con tus contenidos estará disponible en una próxima
              etapa.
            </p>
          </section>
        </main>
      )}

      {screen !== 'welcome' && (
        <footer className="site-footer">
          <span>IPTV EASY</span>
          <span>Tu espacio multimedia</span>
        </footer>
      )}

      {showLoginNotice && (
        <aside className="login-notice" role="status">
          <span>El inicio de sesión estará disponible próximamente.</span>
          <button
            type="button"
            aria-label="Cerrar aviso"
            onClick={() => setShowLoginNotice(false)}
          >
            ×
          </button>
        </aside>
      )}
    </div>
  )
}

export default App
