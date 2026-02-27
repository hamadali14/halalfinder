'use client';
import { useState } from 'react';

export default function AnsokanPage() {
  const [skickad, setSkickad] = useState(false);
  const [form, setForm] = useState({
    restaurangNamn: '',
    stad: '',
    adress: '',
    telefon: '',
    hemsida: '',
    halalStatus: '',
    kontaktNamn: '',
    kontaktEmail: '',
    meddelande: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Ansökan om listning: ${form.restaurangNamn}`);
    const body = encodeURIComponent(
      `Restaurangnamn: ${form.restaurangNamn}\n` +
      `Stad: ${form.stad}\n` +
      `Adress: ${form.adress}\n` +
      `Telefon: ${form.telefon}\n` +
      `Hemsida: ${form.hemsida}\n` +
      `Halalstatus: ${form.halalStatus}\n\n` +
      `Kontaktperson: ${form.kontaktNamn}\n` +
      `E-post: ${form.kontaktEmail}\n\n` +
      `Meddelande:\n${form.meddelande}`
    );
    window.location.href = `mailto:hello@halalfinder.com?subject=${subject}&body=${body}`;
    setSkickad(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass border border-green-600/20 text-green-700 dark:text-green-400 text-xs font-medium mb-4">
          📋 Ansökan
        </div>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-[var(--text-primary)] mb-3">
          Ansök om listning
        </h1>
        <p className="text-[var(--text-secondary)] leading-relaxed">
          Är du ägare till en halalrestaurang och vill synas på HalalFinder? Fyll i formuläret nedan så granskar vi din ansökan och återkommer inom några dagar.
        </p>
      </div>

      {skickad ? (
        <div className="glass rounded-2xl p-10 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="font-display font-semibold text-2xl text-[var(--text-primary)] mb-2">Tack för din ansökan!</h2>
          <p className="text-[var(--text-secondary)]">
            Vi har tagit emot din förfrågan och återkommer inom 2–3 vardagar.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-display font-semibold text-xl text-[var(--text-primary)]">Restauranginformation</h2>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Restaurangnamn *</label>
              <input required name="restaurangNamn" value={form.restaurangNamn} onChange={handleChange}
                placeholder="t.ex. Istanbul Grill"
                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors" />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Stad *</label>
                <input required name="stad" value={form.stad} onChange={handleChange}
                  placeholder="t.ex. Malmö"
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Adress *</label>
                <input required name="adress" value={form.adress} onChange={handleChange}
                  placeholder="t.ex. Storgatan 1"
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Telefon</label>
                <input name="telefon" value={form.telefon} onChange={handleChange}
                  placeholder="t.ex. 040-123 456"
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Hemsida</label>
                <input name="hemsida" value={form.hemsida} onChange={handleChange}
                  placeholder="t.ex. https://minrestaurang.se"
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Halalstatus *</label>
              <select required name="halalStatus" value={form.halalStatus} onChange={handleChange}
                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] outline-none focus:border-green-500 transition-colors">
                <option value="">Välj status...</option>
                <option value="certified">Halalcertifierat (med certifikat)</option>
                <option value="claimed">Halal (eget påstående)</option>
                <option value="pork_free">Fläskfritt</option>
                <option value="alcohol_free">Alkoholfritt</option>
              </select>
            </div>
          </div>

          <div className="glass rounded-2xl p-6 space-y-5">
            <h2 className="font-display font-semibold text-xl text-[var(--text-primary)]">Dina kontaktuppgifter</h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Namn *</label>
                <input required name="kontaktNamn" value={form.kontaktNamn} onChange={handleChange}
                  placeholder="Ditt namn"
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">E-post *</label>
                <input required type="email" name="kontaktEmail" value={form.kontaktEmail} onChange={handleChange}
                  placeholder="din@email.se"
                  className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">Övrigt (valfritt)</label>
              <textarea name="meddelande" value={form.meddelande} onChange={handleChange} rows={4}
                placeholder="Berätta gärna mer om din restaurang, öppettider, kök, faciliteter som bönerum m.m."
                className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-green-500 transition-colors resize-none" />
            </div>
          </div>

          <button type="submit"
            className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-medium transition-all duration-200 text-sm"
            style={{boxShadow:'0 4px 16px rgba(45,122,79,0.35)'}}>
            Skicka ansökan
          </button>

          <p className="text-xs text-center text-[var(--text-muted)]">
            Din ansökan skickas via e-post. Vi granskar och återkommer inom 2–3 vardagar.
          </p>
        </form>
      )}
    </div>
  );
}