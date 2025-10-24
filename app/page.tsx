"use client";

import { type ChangeEvent, useMemo, useState } from "react";

type FieldKey =
  | "industry"
  | "targetAudience"
  | "geography"
  | "businessGoals"
  | "metrics"
  | "dataSources"
  | "competitors"
  | "trends"
  | "constraints"
  | "tone"
  | "deliverables";

const defaultValues: Record<FieldKey, string> = {
  industry: "Soluzioni SaaS per la gestione delle risorse umane nelle PMI europee",
  targetAudience:
    "PMI tra 50 e 250 dipendenti con team HR ridotti e forte cultura digitale",
  geography: "Unione Europea, con focus su Italia, Francia e Germania",
  businessGoals:
    "Valutare opportunità di lancio in un nuovo paese e identificare nicchie con maggiore propensione all'acquisto entro 12 mesi",
  metrics:
    "Dimensione del mercato, CAGR, quote di mercato, ARPU, costi medi di acquisizione, lifetime value",
  dataSources:
    "Report industriali, database finanziari (PitchBook, Crunchbase), Camere di Commercio, studi di settore, ricerche accademiche recenti",
  competitors:
    "Personio, Factorial, BambooHR, soluzioni locali rilevanti nei mercati target",
  trends:
    "Impatto dell'intelligenza artificiale nei processi HR, adozione del lavoro ibrido, evoluzione normativa in materia di privacy e gestione dati",
  constraints:
    "Budget di ricerca moderato, necessità di insight azionabili entro 4 settimane, preferenza per fonti dati pubbliche o accessibili",
  tone: "Professionale, sintetico, orientato all'azione, con riepiloghi visivi dove utile",
  deliverables:
    "Executive summary, analisi SWOT, mappa competitiva, stima dimensionamento mercato (TAM/SAM/SOM), roadmap con delle quick win"
};

const fieldLabels: Record<FieldKey, string> = {
  industry: "Settore / Prodotto",
  targetAudience: "Target di riferimento",
  geography: "Mercato geografico",
  businessGoals: "Obiettivi di business",
  metrics: "Metriche da prioritizzare",
  dataSources: "Fonti dati preferite",
  competitors: "Competitor e benchmark noti",
  trends: "Trend e dinamiche emergenti da monitorare",
  constraints: "Vincoli o requisiti specifici",
  tone: "Tono e stile della risposta",
  deliverables: "Output desiderati"
};

const helperCopy: Partial<Record<FieldKey, string>> = {
  industry:
    "Qual è il settore, la proposta di valore o il prodotto che vuoi analizzare?",
  targetAudience:
    "Chi sono i clienti ideali? Pensa a dimensione aziendale, ruolo decisionale, esigenze.",
  geography:
    "Specifica aree geografiche, paesi o città su cui concentrare l'analisi.",
  businessGoals:
    "Qual è l'obiettivo dell'analisi? Espansione, lancio di prodotto, validazione di mercato?",
  metrics:
    "Indica KPI e metriche irrinunciabili per valutare il mercato.",
  dataSources:
    "Hai fonti preferite o limitazioni (pubbliche vs private, lingue, ecc.)?",
  competitors:
    "Elenca competitor diretti o indiretti da includere come benchmark.",
  trends:
    "Temi emergenti, innovazioni tecnologiche o regolamentari da monitorare.",
  constraints:
    "Budget, scadenze, disponibilità di dati o altri vincoli importanti.",
  tone:
    "Definisci l'approccio comunicativo: specialistico, strategico, orientato ai dati.",
  deliverables:
    "Quali output finali sono necessari? Report, raccomandazioni, framework."
};

export default function Page() {
  const [values, setValues] =
    useState<Record<FieldKey, string>>(defaultValues);
  const [copied, setCopied] = useState(false);

  const prompt = useMemo(() => {
    const sections = [
      `Sei un consulente senior specializzato in analisi di mercato B2B con rigorosa metodologia da boutique di strategic advisory.` +
        ` Devi produrre un'analisi completa e strutturata, pronta per guidare decisioni di go-to-market.`,
      `Contesto di riferimento:\n- Settore: ${values.industry}\n- Target primario: ${values.targetAudience}\n- Geografie da coprire: ${values.geography}`,
      `Obiettivi chiave:\n${bulletize(values.businessGoals)}`,
      `Metriche e indicatori prioritari:\n${bulletize(values.metrics)}`,
      `Fonti dati da privilegiare:\n${bulletize(values.dataSources)}`,
      `Competitor e benchmark da includere:\n${bulletize(values.competitors)}`,
      `Trend emergenti o dinamiche critiche:\n${bulletize(values.trends)}`,
      `Vincoli operativi o di ricerca:\n${bulletize(values.constraints)}`,
      `Output richiesti:\n${bulletize(values.deliverables)}`
    ];

    return (
      sections.join("\n\n") +
      `\n\nIstruzioni di lavoro:\n` +
      `1. Struttura l'analisi in sezioni chiare (Executive Summary, Dati macro, Segmentazione, Competitor, Trend, Rischi, Opportunità, Raccomandazioni).\n` +
      `2. Evidenzia lacune informative e suggerisci come colmarle.\n` +
      `3. Quantifica dimensioni e dinamiche dove possibile, citando le fonti e l'anno.\n` +
      `4. Includi insight azionabili, quick win e roadmap di 90 giorni.\n` +
      `5. Arricchisci la sezione raccomandazioni con tabelle o bullet point strutturati.\n` +
      `6. Concludi con domande di follow-up mirate per approfondimenti futuri.\n\n` +
      `Tono richiesto: ${values.tone}.\n` +
      `Lingua della risposta: italiano (con termini tecnici in inglese quando consolidati nel settore).`
    );
  }, [values]);

  const handleChange =
    (key: FieldKey) => (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValues((prev) => ({
        ...prev,
        [key]: event.target.value
      }));
      setCopied(false);
    };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = prompt;
      textarea.style.position = "fixed";
      textarea.style.top = "0";
      textarea.style.left = "0";
      textarea.style.width = "1px";
      textarea.style.height = "1px";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  return (
    <div className="page-wrapper">
      <main>
        <header className="hero">
          <div>
            <span className="badge">Prompt designer</span>
            <h1>Prompt completo per analisi di mercato</h1>
            <p>
              Personalizza i parametri principali del tuo progetto e genera un
              prompt dettagliato pronto per guidare un&apos;analisi di mercato
              end-to-end.
            </p>
          </div>
          <button className="copy" onClick={handleCopy}>
            {copied ? "Copiato!" : "Copia prompt"}
          </button>
        </header>

        <section className="content">
          <div className="form">
            {(
              Object.keys(fieldLabels) as Array<FieldKey>
            ).map((key: FieldKey) => (
              <label key={key} className="field">
                <div className="field-heading">
                  <span>{fieldLabels[key]}</span>
                  {helperCopy[key] && (
                    <small>{helperCopy[key]}</small>
                  )}
                </div>
                <textarea
                  value={values[key]}
                  onChange={handleChange(key)}
                  rows={
                    values[key].length > 120
                      ? 4
                      : values[key].length > 60
                      ? 3
                      : 2
                  }
                />
              </label>
            ))}
          </div>
          <div className="prompt-preview">
            <div className="prompt-heading">
              <h2>Anteprima prompt</h2>
              <button className="copy secondary" onClick={handleCopy}>
                {copied ? "Copiato!" : "Copia"}
              </button>
            </div>
            <pre>
              <code>{prompt}</code>
            </pre>
          </div>
        </section>
      </main>
      <footer>
        <span>
          Suggerimento: prova a combinare questo prompt con strumenti di
          analisi dati per ottenere insight quantitativi accurati.
        </span>
      </footer>
      <style jsx>{`
        .page-wrapper {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          padding: 48px min(7vw, 92px);
        }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .hero {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 24px;
          padding: 32px;
          background: #ffffffcc;
          backdrop-filter: blur(10px);
          border: 1px solid #e4e7ec;
          border-radius: 24px;
          box-shadow: 0 30px 80px -40px rgba(15, 23, 42, 0.25);
        }

        .badge {
          display: inline-block;
          margin-bottom: 12px;
          padding: 6px 14px;
          border-radius: 999px;
          background: linear-gradient(135deg, #1d4ed8, #60a5fa);
          color: #fff;
          font-size: 13px;
          letter-spacing: 0.02em;
          font-weight: 600;
        }

        h1 {
          font-size: clamp(32px, 2.8vw, 44px);
          line-height: 1.1;
          font-weight: 700;
          margin-bottom: 16px;
        }

        p {
          color: #475467;
          font-size: 17px;
          max-width: 620px;
        }

        .copy {
          align-self: flex-start;
          padding: 12px 20px;
          border-radius: 14px;
          background: #1d4ed8;
          color: #fff;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 12px 30px -12px rgba(37, 99, 235, 0.5);
        }

        .copy.secondary {
          background: #f4f4f5;
          color: #1d1f2c;
          box-shadow: none;
          border: 1px solid #e4e7ec;
        }

        .copy:hover {
          transform: translateY(-1px);
        }

        .content {
          display: grid;
          gap: 24px;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          align-items: start;
        }

        .form {
          display: grid;
          gap: 16px;
        }

        .field {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 18px;
          background: #fff;
          border-radius: 20px;
          border: 1px solid #ebeef3;
          box-shadow: 0 20px 50px -38px rgba(15, 23, 42, 0.35);
        }

        .field-heading {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          align-items: baseline;
        }

        .field span {
          font-weight: 600;
          color: #1d2939;
        }

        .field small {
          color: #667085;
          font-size: 12px;
        }

        textarea {
          width: 100%;
          resize: vertical;
          min-height: 80px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid #d0d5dd;
          font-size: 14px;
          line-height: 1.5;
          color: #101828;
          background: #f8fafc;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
          background: #fff;
        }

        .prompt-preview {
          position: sticky;
          top: 40px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          background: #0f172a;
          color: #e2e8f0;
          border-radius: 24px;
          padding: 28px;
          box-shadow: 0 30px 70px -48px rgba(10, 20, 45, 0.8);
        }

        .prompt-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }

        .prompt-heading h2 {
          font-size: 20px;
          font-weight: 600;
          color: #f8fafc;
        }

        pre {
          margin: 0;
          max-height: 60vh;
          overflow: auto;
          background: rgba(15, 23, 42, 0.6);
          padding: 18px;
          border-radius: 16px;
          border: 1px solid rgba(148, 163, 184, 0.2);
          line-height: 1.55;
        }

        code {
          font-family: "JetBrains Mono", "Fira Code", "SFMono-Regular",
            Menlo, Monaco, Consolas, "Liberation Mono", "Courier New",
            monospace;
          white-space: pre-wrap;
          font-size: 13px;
        }

        footer {
          margin-top: 48px;
          padding: 24px;
          border-top: 1px solid #e2e8f0;
          color: #475467;
          font-size: 14px;
          text-align: center;
        }

        @media (max-width: 1080px) {
          .content {
            grid-template-columns: 1fr;
          }

          .prompt-preview {
            position: static;
          }
        }

        @media (max-width: 720px) {
          .page-wrapper {
            padding: 24px 18px 36px;
          }

          .hero {
            flex-direction: column;
          }

          .copy {
            width: 100%;
            justify-content: center;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}

function bulletize(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) {
    return "- (informazione non fornita)";
  }

  const segments = trimmed
    .split(/\n|;/)
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (segments.length === 0) {
    return "- (informazione non fornita)";
  }

  return segments.map((segment) => `- ${segment}`).join("\n");
}
