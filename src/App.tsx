import { NavLink, Route, Routes } from 'react-router'
import NotificationToast from './components/NotificationToast'
import { NotificationProvider } from './context/NotificationContext'
import HomePage from './pages/HomePage'
import LocationsPage from './pages/LocationsPage'
import LocationDetailPage from './pages/LocationDetailPage'
import NewLocationPage from './pages/NewLocationPage'
import NpcsPage from './pages/NpcsPage'
import EventsPage from './pages/EventsPage'
import GeneratorsPage from './pages/GeneratorsPage'
import NotFoundPage from './pages/NotFoundPage'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition',
    isActive
      ? 'border border-cyan-400/30 bg-cyan-400/15 text-cyan-300'
      : 'border border-transparent text-slate-300 hover:bg-white/5 hover:text-white',
  ].join(' ')

function App() {
  return (
    <NotificationProvider>
      <div className="min-h-screen bg-transparent text-slate-100">
        <NotificationToast />

        <header className="border-b border-white/10 bg-slate-950/40 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
                WorldForge 5e
              </p>
              <h1 className="mt-1 text-2xl font-bold text-white">
                Gestor de mundos para DnD 5e
              </h1>
            </div>

            <nav className="flex flex-wrap gap-2">
              <NavLink to="/" end className={navLinkClass}>
                Inicio
              </NavLink>
              <NavLink to="/locations" className={navLinkClass}>
                Localizaciones
              </NavLink>
              <NavLink to="/npcs" className={navLinkClass}>
                NPCs
              </NavLink>
              <NavLink to="/events" className={navLinkClass}>
                Eventos
              </NavLink>
              <NavLink to="/generators" className={navLinkClass}>
                Generadores
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-6 py-10">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/new" element={<NewLocationPage />} />
            <Route path="/locations/:id" element={<LocationDetailPage />} />
            <Route path="/npcs" element={<NpcsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/generators" element={<GeneratorsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </NotificationProvider>
  )
}

export default App