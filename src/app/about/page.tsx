export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-halal-500/30 text-halal-500 text-xs font-medium mb-4">
          About Us
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-4">
          About HalalFinder
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
          HalalFinder is a community-powered halal restaurant directory, helping Muslims and halal-conscious diners discover great restaurants across the UK.
        </p>
      </div>

      <div className="space-y-6">
        <div className="glass rounded-2xl p-6">
          <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-3">Our Mission</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">
            We believe finding halal food shouldn't be difficult. HalalFinder makes it easy to discover restaurants that cater to halal dietary requirements — whether you need full halal certification, pork-free menus, or alcohol-free environments.
          </p>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-3">What We Show</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
            Our listings include key information to help you make informed dining decisions:
          </p>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            {[
              'Halal certification status (certified, claimed, pork-free, alcohol-free)',
              'Amenities like prayer spaces, wudu facilities, and family seating',
              'Opening hours, location, and contact details',
              'Cuisine types and price range',
              'Delivery and takeaway availability',
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="text-halal-500 mt-0.5 shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div id="disclaimer" className="glass rounded-2xl p-6 border border-amber-500/30">
          <div className="flex items-start gap-3">
            <span className="text-2xl shrink-0">⚠️</span>
            <div>
              <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-3">Halal Disclaimer</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                <strong>Important:</strong> HalalFinder is a community-sourced directory. We do not independently verify the halal status of every restaurant listed on our platform.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-3">
                Halal status is categorised as follows:
              </p>
              <div className="space-y-2">
                {[
                  { label: 'Halal Certified', desc: 'The restaurant holds a valid certificate from a recognised halal certification body (e.g. HFA, HMC, AHFC).' },
                  { label: 'Halal Claimed', desc: 'The restaurant claims to serve halal food but may not hold official certification.' },
                  { label: 'Pork-Free', desc: 'The restaurant does not serve pork products, but may not be fully halal certified.' },
                  { label: 'Alcohol-Free', desc: 'The restaurant does not serve alcohol.' },
                ].map((item) => (
                  <div key={item.label} className="pl-4 border-l-2 border-halal-500/30">
                    <strong className="text-[var(--text-primary)] text-sm">{item.label}:</strong>
                    <span className="text-[var(--text-muted)] text-sm ml-1">{item.desc}</span>
                  </div>
                ))}
              </div>
              <p className="text-[var(--text-secondary)] leading-relaxed mt-3">
                We strongly recommend verifying a restaurant's halal status directly before dining, particularly for those following stricter halal standards.
              </p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-3">Contribute</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
            HalalFinder is powered by community contributions. If you know a halal restaurant that isn't listed, or spot incorrect information, please get in touch.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/admin"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-halal-500 hover:bg-halal-600 text-white font-medium text-sm transition-all"
            >
              Add a Restaurant
            </a>
            <a
              href="mailto:hello@halalfinder.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-pill border border-[var(--glass-border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
