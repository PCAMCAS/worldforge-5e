import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <section className="rounded-3xl border border-red-400/20 bg-red-500/5 p-8">
      <h2 className="text-3xl font-bold text-white">404 - Página no encontrada</h2>
      <p className="mt-3 text-slate-300">
        La ruta a la que has intentado acceder no existe en la aplicación.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 transition hover:bg-cyan-400/20"
      >
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage