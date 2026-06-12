import { notFound } from "next/navigation";
import { getAllTextTools, getTextTool } from "@/data/text-tools/tools";
import type { TextTool } from "@/data/text-tools/tools";
import Link from "next/link";
import MarkdownToHtmlTool from "../components/MarkdownToHtmlTool";
import HtmlToMarkdownTool from "../components/HtmlToMarkdownTool";
import CsvToJsonTool from "../components/CsvToJsonTool";
import JsonToCsvTool from "../components/JsonToCsvTool";
import XmlToJsonTool from "../components/XmlToJsonTool";
import JsonToXmlTool from "../components/JsonToXmlTool";
import CsvToXmlTool from "../components/CsvToXmlTool";
import XmlToCsvTool from "../components/XmlToCsvTool";
import YamlToJsonTool from "../components/YamlToJsonTool";
import JsonToYamlTool from "../components/JsonToYamlTool";
import JsonFormatterTool from "../components/JsonFormatterTool";
import CsvViewerTool from "../components/CsvViewerTool";
import WordCounterTool from "../components/WordCounterTool";
import TextCaseConverterTool from "../components/TextCaseConverterTool";
import RemoveDuplicateLinesTool from "../components/RemoveDuplicateLinesTool";
import SortLinesTool from "../components/SortLinesTool";
import LoremIpsumGeneratorTool from "../components/LoremIpsumGeneratorTool";
import DiffCheckerTool from "../components/DiffCheckerTool";

function TextToolRouter({ tool }: { tool: TextTool }) {
  switch (tool.slug) {
    case "markdown-to-html":       return <MarkdownToHtmlTool       tool={tool} />;
    case "html-to-markdown":       return <HtmlToMarkdownTool       tool={tool} />;
    case "csv-to-json":            return <CsvToJsonTool            tool={tool} />;
    case "json-to-csv":            return <JsonToCsvTool            tool={tool} />;
    case "xml-to-json":            return <XmlToJsonTool            tool={tool} />;
    case "json-to-xml":            return <JsonToXmlTool            tool={tool} />;
    case "csv-to-xml":             return <CsvToXmlTool             tool={tool} />;
    case "xml-to-csv":             return <XmlToCsvTool             tool={tool} />;
    case "yaml-to-json":           return <YamlToJsonTool           tool={tool} />;
    case "json-to-yaml":           return <JsonToYamlTool           tool={tool} />;
    case "json-formatter":         return <JsonFormatterTool         tool={tool} />;
    case "csv-viewer":             return <CsvViewerTool             tool={tool} />;
    case "word-counter":           return <WordCounterTool           tool={tool} />;
    case "text-case-converter":    return <TextCaseConverterTool    tool={tool} />;
    case "remove-duplicate-lines": return <RemoveDuplicateLinesTool tool={tool} />;
    case "sort-lines":             return <SortLinesTool             tool={tool} />;
    case "lorem-ipsum-generator":  return <LoremIpsumGeneratorTool  tool={tool} />;
    case "diff-checker":           return <DiffCheckerTool           tool={tool} />;
    default:                       return null;
  }
}

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const t = getTextTool(slug);
  if (!t) return {};
  return { title: `${t.title} | Dockitt`, description: t.description };
}

export async function generateStaticParams() {
  return getAllTextTools().map((t) => ({ slug: t.slug }));
}

export default async function TextToolSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = getTextTool(slug);
  const all = getAllTextTools();
  if (!tool) notFound();

  const bullets = [
    { color: "#16a34a", text: "Runs entirely in your browser — no data leaves your device" },
    { color: "#2563eb", text: "No account, no signup, completely free" },
    { color: "#ca8a04", text: "Instant results — no waiting for server processing" },
    { color: "#6b7280", text: "Works offline once the page is loaded" },
  ];

  return (
    <main style={{ background: "#ffffff" }}>

      {/* HERO */}
      <section style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "60px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "38% 62%", gap: "48px", alignItems: "start" }} className="hero-grid">

            {/* Left */}
            <div style={{ alignSelf: "start" }}>
              <nav style={{ marginBottom: "16px" }}>
                <ol style={{ display: "flex", alignItems: "center", gap: "8px", listStyle: "none", margin: 0, padding: 0, fontSize: "13px", color: "#9ca3af" }}>
                  <li><Link href="/" style={{ color: "#2563eb", textDecoration: "none" }}>Home</Link></li>
                  <li style={{ color: "#d1d5db" }}>›</li>
                  <li><Link href="/text-tools" style={{ color: "#9ca3af", textDecoration: "none" }}>Text & Data</Link></li>
                  <li style={{ color: "#d1d5db" }}>›</li>
                  <li style={{ color: "#111" }}>{tool.name}</li>
                </ol>
              </nav>

              <h1 style={{ fontSize: "clamp(22px, 3.5vw, 34px)", fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: "12px", marginTop: 0 }}>
                {tool.title}
              </h1>
              <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>
                {tool.description}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "22px" }}>
                {bullets.map((b) => (
                  <div key={b.text} style={{ display: "flex", alignItems: "flex-start", gap: "10px", fontSize: "14px", color: "#374151" }}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, marginTop: "1px" }}>
                      <circle cx="10" cy="10" r="9" stroke={b.color} strokeWidth="1.5" fill="none" />
                      <path d="M6 10l3 3 5-5" stroke={b.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {b.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Right tool */}
            <div style={{ alignSelf: "start", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden" }}>
              {/* Tool switcher */}
              <div style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb", background: "#f9fafb" }}>
                <p style={{ fontSize: "11px", fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 8px" }}>
                  Text & Data tools
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {all.map((item) => (
                    <Link key={item.slug} href={`/text-tools/${item.slug}`}
                      style={{ padding: "5px 10px", borderRadius: "7px", fontSize: "11px", fontWeight: 500, textDecoration: "none", background: item.slug === slug ? "#2563eb" : "#fff", color: item.slug === slug ? "#fff" : "#374151", border: "1px solid", borderColor: item.slug === slug ? "#2563eb" : "#e5e7eb" }}>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Privacy banner */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", background: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "10px 16px", fontSize: "13px", color: "#14532d" }}>
                <span style={{ flexShrink: 0 }}>✅</span>
                <span><strong>Runs entirely in your browser.</strong> Your text never leaves your device — no server, complete privacy.</span>
              </div>

              <div style={{ padding: "24px" }}>
                <TextToolRouter tool={tool} />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ background: "#f9fafb" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>

            {tool.longDescription && (
              <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
                <p style={{ fontSize: "15px", color: "#444", lineHeight: "1.8", margin: 0 }}>{tool.longDescription}</p>
              </section>
            )}

            <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ marginTop: 0, fontSize: "20px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>How to use</h2>
              <ol style={{ paddingLeft: "20px", margin: 0 }}>
                {tool.howTo.map((step) => (
                  <li key={step} style={{ marginBottom: "10px", color: "#444", fontSize: "14px", lineHeight: 1.6 }}>{step}</li>
                ))}
              </ol>
            </section>

            <section style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "16px", padding: "24px" }}>
              <h2 style={{ marginTop: 0, fontSize: "20px", borderLeft: "3px solid #2563eb", paddingLeft: "12px" }}>FAQ</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {tool.faqs.map((faq) => (
                  <div key={faq.question}>
                    <h3 style={{ margin: "0 0 8px 0", fontSize: "15px", fontWeight: 600, color: "#111" }}>{faq.question}</h3>
                    <p style={{ margin: 0, color: "#444", fontSize: "14px", lineHeight: 1.6 }}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </section>

    </main>
  );
}
