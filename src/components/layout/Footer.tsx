import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-10 mt-20 border-t border-[var(--glass-border)]">
      <div className="glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-halal-400 to-halal-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xs">H</span>
                </div>
                <span className="font-display font-semibold text-lg text-[var(--text-primary)]">
                  Halal<span className="text-halal-500">Finder</span>
                </span>
              </Link>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Hjälper det muslimska communityt att hitta verifierade halalrestauranger i hela Sverige.
              </p>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Utforska</h4>
              <ul className="space-y-2">
                {[
                  { href: '/explore', label: 'Alla restauranger' },
                  { href: '/cities', label: 'Bläddra efter stad' },
                  { href: '/explore?halalStatus=certified', label: 'Certifierat halal' },
                  { href: '/explore?features=prayer_space', label: 'Böneutrymmen' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[var(--text-muted)] hover:text-halal-500 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Info</h4>
              <ul className="space-y-2">
                {[
                  { href: '/about', label: 'Om HalalFinder' },
                  { href: '/about#disclaimer', label: 'Halalgaranti' },
                  { href: '/ansokan', label: 'Ansök om listning' },
                ].map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[var(--text-muted)] hover:text-halal-500 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Kontakt</h4>
              <p className="text-sm text-[var(--text-muted)]">
                Hittade ett fel eller vill ansöka om listning?
              </p>
              <a
                href="mailto:hello@halalfinder.com"
                className="mt-2 inline-block text-sm text-halal-500 hover:text-halal-600 transition-colors"
              >
                hello@halalfinder.com
              </a>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-[var(--glass-border)] flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-xs text-[var(--text-muted)]">
              © {new Date().getFullYear()} HalalFinder. Gemenskapsdrivet halalregister.
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              Halalstatus är gemenskapsrapporterad. Verifiera alltid innan du äter.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}