export const metadata = {
  title: "About — Dockitt",
  description: "Dockitt is a free online PDF toolbox built for people who just want things to work — fast, simple, and without unnecessary nonsense.",
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>
        About Dockitt
      </h1>
      <p style={{ fontSize: "17px", color: "#555", lineHeight: "1.7", marginBottom: "48px" }}>
        Dockitt is a free online PDF toolbox built for people who just want things to work — fast, simple, and without unnecessary nonsense. If you've ever tried using other PDF tools, you already know the problem: slow loading times, annoying ads everywhere, forced sign-ups, and watermarks on your files unless you pay. That's exactly what we wanted to fix.
      </p>

      {[
        {
          title: "A Simple PDF Tool That Actually Works",
          content: "Dockitt lets you work with PDF files online without friction. No accounts, no subscriptions, no hidden limits. You can compress PDF files quickly, convert PDFs to other formats, and process documents directly in your browser. Everything is designed to be as straightforward as possible — upload your file, get your result, and move on.",
        },
        {
          title: "No Sign-Up, No Watermarks, No Limits",
          content: "We believe basic tools should stay basic. That's why Dockitt doesn't require registration, doesn't add watermarks to your files, doesn't lock features behind paywalls, and doesn't limit how often you can use it. You don't need an account just to compress a PDF. That idea is broken — and we're not doing it.",
        },
        {
          title: "Fast Online PDF Tools",
          content: "Speed matters. Most online PDF tools feel heavy and outdated. Dockitt is built to be lightweight and fast. Depending on the tool, your files are processed directly in your browser (for speed and privacy) or on our servers when needed for more advanced tasks. Either way, the goal is the same: get your result as quickly as possible.",
        },
        {
          title: "Built for Real Use",
          content: "Dockitt isn't trying to be everything. It focuses on doing a few things well: clean interface with no distractions, straightforward tools that don't require tutorials, and reliable performance without unnecessary features. This is a toolbox you can open, use in seconds, and close without frustration.",
        },
        {
          title: "Free PDF Tools Online — No Catch",
          content: "Dockitt is completely free to use. No subscriptions. No \"free trial\" traps. No sudden paywalls halfway through your task. We built it because these tools should be accessible to everyone — not locked behind annoying restrictions.",
        },
        {
          title: "Got Feedback?",
          content: "If something doesn't work the way you expect, or you have an idea for a new feature — say it directly.",
        },
      ].map((section) => (
        <section key={section.title} style={{ marginBottom: "40px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 700, marginBottom: "12px" }}>
            {section.title}
          </h2>
          <p style={{ fontSize: "17px", color: "#555", lineHeight: "1.7" }}>
            {section.content}
          </p>
        </section>
      ))}

      <p style={{ fontSize: "17px", color: "#555", lineHeight: "1.7", marginTop: "-16px" }}>
        Email:{" "}
        <a href="mailto:hello@dockitt.com" style={{ color: "#2563eb" }}>
          hello@dockitt.com
        </a>
      </p>

      <p style={{ fontSize: "17px", color: "#555", lineHeight: "1.7", marginTop: "24px", fontStyle: "italic" }}>
        Dockitt is here to make working with PDFs online simple again.
      </p>
    </main>
  );
}