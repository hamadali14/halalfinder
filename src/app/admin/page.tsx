import Link from 'next/link';

const SHEET_URL = 'https://docs.google.com/spreadsheets/d/1SQ3iO-xbDOw1xSYYa6NEtWt8xrBciMtnQhDSA6Xp8UU/edit';

export default function AdminPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-green-600/20 text-green-700 dark:text-green-400 text-xs font-medium mb-4">
          ⚙️ Kontrollpanel
        </div>
        <h1 className="font-display font-bold text-4xl text-[var(--text-primary)] mb-2">Adminpanel</h1>
        <p className="text-[var(--text-secondary)]">
          Hantera HalalFinders innehåll direkt via Google Kalkylark — ingen kod behövs.
        </p>
      </div>

      {/* Open Sheet — big prominent link */}
      <a href={SHEET_URL} target="_blank" rel="noopener noreferrer"
        className="glass-card rounded-2xl p-7 group cursor-pointer block mb-6">
        <div className="flex items-center gap-4">
          <div className="text-4xl">📊</div>
          <div className="flex-1">
            <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">
              Öppna kalkylarket
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Redigera restauranger, städer, inställningar och filter direkt i Google Kalkylark.
            </p>
          </div>
          <svg className="w-5 h-5 text-[var(--text-muted)] group-hover:text-green-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
      </a>

      <Link href="/admin/data-health" className="glass-card rounded-2xl p-6 group cursor-pointer block mb-8">
        <div className="flex items-center gap-4">
          <div className="text-3xl">🩺</div>
          <div className="flex-1">
            <h2 className="font-display font-semibold text-xl text-[var(--text-primary)] group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors mb-1">
              Datahälsa
            </h2>
            <p className="text-sm text-[var(--text-muted)]">Diagnostik — saknade fält, inaktiva listningar m.m.</p>
          </div>
          <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-green-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      {/* Instructions */}
      <div className="glass rounded-2xl p-6 mb-6">
        <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-5">Så lägger du till en restaurang</h2>
        <div className="space-y-4">
          {[
            { s:'1', t:'Öppna kalkylarket', d:'Klicka på "Öppna kalkylarket" ovan. Bokmärk det för snabb åtkomst.' },
            { s:'2', t:'Gå till fliken "restaurants"', d:'Varje rad är en restaurang.' },
            { s:'3', t:'Lägg till en ny rad längst ned', d:'Fyll i: id, name, slug, city, address, coverImageUrl, halalStatus och isActive (TRUE).' },
            { s:'4', t:'Sätt en unik slug', d:'Exempel: "min-restaurang-malmo". Använd bara gemener, siffror och bindestreck.' },
            { s:'5', t:'Lägg till bildens URL', d:'Ladda upp bilden till Imgur eller Google Drive och klistra in den direkta bildlänken.' },
            { s:'6', t:'Vänta några sekunder', d:'Sidan hämtar data direkt från kalkylarket. Ladda om sidan för att se ändringarna.' },
          ].map((item) => (
            <div key={item.s} className="flex items-start gap-4">
              <div className="w-7 h-7 rounded-full bg-green-600/15 border border-green-600/25 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-green-700 dark:text-green-400">{item.s}</span>
              </div>
              <div>
                <h3 className="font-medium text-[var(--text-primary)] text-sm">{item.t}</h3>
                <p className="text-sm text-[var(--text-muted)] mt-0.5">{item.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Schema */}
      <div className="glass rounded-2xl p-6">
        <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-4">Kalkylarkets kolumner</h2>
        <div className="space-y-4 text-sm">
          {[
            { tab:'restaurants', cols:['id','name','slug','city','address','lat','lng','phone','website','coverImageUrl','galleryImageUrls','cuisines','halalStatus','certificationBody','priceLevel','rating','reviewCount','openingHours','features','isFeatured','isActive','lastUpdated'] },
            { tab:'cities', cols:['city','country','isPopular'] },
            { tab:'site_settings', cols:['heroTitle','heroSubtitle','brandName','featuredSectionTitle'] },
            { tab:'filters_config', cols:['key','label','type','options','enabled','sortOrder'] },
          ].map((table) => (
            <div key={table.tab}>
              <h3 className="font-mono font-semibold text-green-700 dark:text-green-400 mb-2">Flik: {table.tab}</h3>
              <div className="flex flex-wrap gap-1.5">
                {table.cols.map((col) => (
                  <span key={col} className="px-2 py-0.5 rounded bg-[var(--glass-bg)] border border-[var(--glass-border)] text-[var(--text-muted)] font-mono text-xs">{col}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 pt-5 border-t border-[var(--glass-border)]">
          <h3 className="font-semibold text-sm text-[var(--text-primary)] mb-2">Viktiga värden</h3>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-[var(--text-muted)]">
            <div><strong className="text-[var(--text-secondary)]">halalStatus:</strong> certified · claimed · pork_free · alcohol_free · unknown</div>
            <div><strong className="text-[var(--text-secondary)]">features:</strong> prayer_space · wudu · family_seating · delivery · takeaway · wheelchair · vegetarian · vegan</div>
            <div><strong className="text-[var(--text-secondary)]">isFeatured / isActive:</strong> TRUE eller FALSE</div>
            <div><strong className="text-[var(--text-secondary)]">priceLevel:</strong> 1–4 &nbsp;|&nbsp; <strong className="text-[var(--text-secondary)]">rating:</strong> 0.0–5.0</div>
          </div>
        </div>
      </div>
    </div>
  );
}