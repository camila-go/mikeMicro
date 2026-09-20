import { Link } from 'react-router-dom'
import { screens } from '../data/screens'
import type { Section } from '../data/screens'

const sections: Section[] = ['Onboarding', 'Goals', 'App']

/* Not a designed screen. A directory so the 16 routes in the prototype are
   reachable without clicking all the way through the flow. */
export default function Index() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-2xl font-bold text-slate-300">Mike</h1>
      <p className="mt-1 text-sm text-slate-200">
        Education customized to take you further. Prototype built from the
        Figma "Mobile experience" section.
      </p>

      {sections.map((section) => (
        <section key={section} className="mt-10">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-slate-200">
            {section}
          </h2>
          <ul className="mt-3 divide-y divide-grey-200 rounded-lg border border-grey-200 bg-white">
            {screens
              .filter((screen) => screen.section === section)
              .map((screen) => (
                <li key={screen.path}>
                  <Link
                    to={screen.path}
                    className="flex items-baseline justify-between gap-4 px-4 py-3 hover:bg-grey-100"
                  >
                    <span className="text-sm font-medium text-app-link">
                      {screen.name}
                    </span>
                    <span className="text-xs text-slate-200">
                      {screen.frames.length} frame
                      {screen.frames.length === 1 ? '' : 's'}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </main>
  )
}
