import { useEffect, useMemo, useRef, useState } from "react";
import Seo from "../components/seo";
import Navbar from "../components/navbar";
import styles from "../styles/sindicatos.module.css";

const states = [
  { name: "Acre", uf: "AC" },
  { name: "Alagoas", uf: "AL" },
  { name: "Amapá", uf: "AP" },
  { name: "Amazonas", uf: "AM" },
  { name: "Bahia", uf: "BA" },
  { name: "Ceará", uf: "CE" },
  { name: "Distrito Federal", uf: "DF" },
  { name: "Espírito Santo", uf: "ES" },
  { name: "Goiás", uf: "GO" },
  { name: "Maranhão", uf: "MA" },
  { name: "Mato Grosso", uf: "MT" },
  { name: "Mato Grosso do Sul", uf: "MS" },
  { name: "Minas Gerais", uf: "MG" },
  { name: "Pará", uf: "PA" },
  { name: "Paraíba", uf: "PB" },
  { name: "Paraná", uf: "PR" },
  { name: "Pernambuco", uf: "PE" },
  { name: "Piauí", uf: "PI" },
  { name: "Rio de Janeiro", uf: "RJ" },
  { name: "Rio Grande do Norte", uf: "RN" },
  { name: "Rio Grande do Sul", uf: "RS" },
  { name: "Rondônia", uf: "RO" },
  { name: "Roraima", uf: "RR" },
  { name: "Santa Catarina", uf: "SC" },
  { name: "São Paulo", uf: "SP" },
  { name: "Sergipe", uf: "SE" },
  { name: "Tocantins", uf: "TO" },
] as const;

type StateCode = (typeof states)[number]["uf"];

type UnionRecord = {
  name: string;
  description: string;
  city: string;
  uf: StateCode;
  address: string;
  postalCode: string;
  website: string;
};

const recordsPerState = 10;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function isUnionRecord(value: unknown, uf: StateCode): value is UnionRecord {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;
  return (
    typeof record.name === "string"
    && typeof record.description === "string"
    && typeof record.city === "string"
    && record.uf === uf
    && typeof record.address === "string"
    && typeof record.postalCode === "string"
    && typeof record.website === "string"
    && record.website.trim().length > 0
  );
}

export default function Sindicatos() {
  const [selectedUf, setSelectedUf] = useState<StateCode>("SP");
  const [records, setRecords] = useState<UnionRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retry, setRetry] = useState(0);
  const recordsCache = useRef<Partial<Record<StateCode, UnionRecord[]>>>({});
  const selectedState = states.find((state) => state.uf === selectedUf)!;

  useEffect(() => {
    const cachedRecords = recordsCache.current[selectedUf];
    if (cachedRecords) {
      setRecords(cachedRecords);
      setLoading(false);
      setLoadError("");
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setLoadError("");
    setRecords([]);

    async function loadRecords() {
      try {
        const response = await fetch(
          `${basePath}/data/sindicatos/${selectedUf}.json`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          throw new Error(`A consulta retornou o status ${response.status}.`);
        }

        const data: unknown = await response.json();
        if (
          !Array.isArray(data)
          || data.length > recordsPerState
          || !data.every((record) => isUnionRecord(record, selectedUf))
        ) {
          throw new Error(
            "O arquivo de dados não está no formato esperado para este estado.",
          );
        }

        const stateRecords = data;
        recordsCache.current[selectedUf] = stateRecords;
        setRecords(stateRecords);
      } catch (error) {
        if (controller.signal.aborted) return;
        setLoadError(
          error instanceof Error
            ? error.message
            : "Ocorreu um erro inesperado ao carregar os sindicatos.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadRecords();
    return () => controller.abort();
  }, [selectedUf, retry]);

  const visibleRecords = records.slice(0, recordsPerState);

  function changeState(uf: StateCode) {
    setSelectedUf(uf);
  }

  return (
    <>
      <Seo
        title="Sindicatos por estado e convenções | Pagamento Justo"
        description="Encontre sindicatos por estado, categoria ou município, com endereço e site oficial."
        path="/sindicatos/"
      />
      <Navbar />
      <main className={styles.page}>
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Seus direitos, sem complicação</p>
          <h1 className={styles.title}>Sindicatos e convenções</h1>
          <p className={styles.description}>
            Confira os dez primeiros sindicatos de cada estado com site oficial
            cadastrado, incluindo suas áreas de atuação e endereço. São Paulo
            aparece selecionado inicialmente.
          </p>
        </header>

        <section className={styles.region} aria-labelledby="region-title">
          <div>
            <h2 className={styles.regionTitle} id="region-title">
              Sua região
            </h2>
            <p className={styles.regionDescription}>
              A lista mostra sindicatos com sede registrada no estado
              selecionado.
            </p>
          </div>
          <label className={styles.selectLabel} htmlFor="state-select">
            Estado
            <select
              className={styles.select}
              id="state-select"
              value={selectedUf}
              onChange={(event) => changeState(event.target.value as StateCode)}
            >
              {states.map((state) => (
                <option key={state.uf} value={state.uf}>
                  {state.name}
                </option>
              ))}
            </select>
          </label>
        </section>

        <section className={styles.results} aria-labelledby="results-title">
          <div className={styles.resultsHeader}>
            <div>
              <p className={styles.eyebrow}>Cadastro sindical</p>
              <h2 className={styles.resultsTitle} id="results-title">
                Sindicatos em {selectedState.name}
              </h2>
              <p className={styles.resultsDescription}>
                {loading
                  ? "Carregando registros..."
                  : `Exibindo ${visibleRecords.length} sindicatos com site oficial cadastrado`}
              </p>
            </div>
            <span className={styles.stateBadge}>{selectedState.uf}</span>
          </div>

          {loading && (
            <p className={styles.status} role="status">
              Carregando sindicatos de {selectedState.name}...
            </p>
          )}

          {!loading && loadError && (
            <div className={styles.error} role="alert">
              <p>
                Não foi possível carregar os dados deste estado. {loadError}
              </p>
              <button
                className={styles.retryButton}
                type="button"
                onClick={() => {
                  setLoading(true);
                  setRetry((attempt) => attempt + 1);
                }}
              >
                Tentar novamente
              </button>
            </div>
          )}

          {!loading && !loadError && visibleRecords.length === 0 && (
            <p className={styles.emptyState}>
              Não há sindicatos com UF identificada para este estado na base.
            </p>
          )}

          {!loading && !loadError && visibleRecords.length > 0 && (
            <div className={styles.grid} aria-live="polite">
              {visibleRecords.map((record, index) => (
                <article
                  className={styles.card}
                  key={`${record.name}-${record.city}-${index}`}
                >
                  <p className={styles.cardEyebrow}>
                    {record.city} · {record.uf}
                  </p>
                  <h3 className={styles.cardTitle}>{record.name}</h3>
                  <p className={styles.cardDescription}>
                    <strong>Atuação:</strong>{" "}
                    {record.description || "Descrição não informada no cadastro."}
                  </p>
                  {(record.address || record.postalCode) && (
                    <p className={styles.cardAddress}>
                      <strong>Endereço:</strong>{" "}
                      {[record.address, record.postalCode]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                  <a
                    className={styles.link}
                    href={record.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Acessar site oficial{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>

        <aside className={styles.conventions} aria-labelledby="conventions-title">
          <h2 className={styles.regionTitle} id="conventions-title">
            Convenções coletivas
          </h2>
          <p className={styles.regionDescription}>
            A base oficial usada aqui identifica sindicatos, categorias e
            endereços, mas não contém os textos nem os links das convenções
            coletivas. O catálogo de convenções por categoria será conectado
            quando essas fontes forem reunidas.
          </p>
        </aside>

        <p className={styles.source}>
          Dados combinados da lista de sindicatos e sites oficiais com o
          Cadastro Nacional de Entidades Sindicais do Ministério do Trabalho e
          Emprego (base de 14/04/2025). A lista inclui{" "}
          <strong>17.370 entidades com UF identificada</strong>. Esta página
          exibe apenas até dez sindicatos por estado que também tenham site
          oficial cadastrado. Três registros sem UF não são atribuídos a um
          estado.
        </p>
      </main>
    </>
  );
}
