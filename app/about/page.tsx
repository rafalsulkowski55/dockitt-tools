import Link from "next/link";

export const metadata = {
  title: "About Dockitt — Free Online PDF Tools",
  description: "Dockitt is a free online PDF toolbox. No signup, no watermarks, no ads. Built for people who just need to get things done.",
};

export default function AboutPage() {
  return (
    <main style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 24px" }}>

      <div style={{ marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#2563eb", marginBottom: "12px" }}>
          About
        </p>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.02em", marginBottom: "20px", borderLeft: "3px solid #2563eb", paddingLeft: "16px" }}>
          About Dockitt
        </h1>
        <p style={{ fontSize: "17px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
          Dockitt is a free online PDF toolbox. It started from a simple frustration: every PDF tool online seemed designed to slow you down. Slow loading, ads everywhere, mandatory sign-ups, watermarks on your files unless you paid, and paywalls appearing halfway through your task. The tools existed, but using them felt like a punishment.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
            Why Dockitt exists
          </h2>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
            Compressing a PDF, merging two documents, or converting a file to Word are tasks that take seconds when the tool is right. They should not require an account, a download, or a credit card. Dockitt was built to be that right tool. Open it, upload your file, download the result, close the tab. That is the entire experience.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
            What Dockitt does
          </h2>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.75, marginBottom: "16px" }}>
            Dockitt currently has 20 free PDF tools covering the most common tasks people need:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px", marginBottom: "16px" }}>
            {[
              "Compress PDF", "Merge PDF", "Split PDF", "Rotate PDF",
              "Protect PDF", "Unlock PDF", "Watermark PDF", "Sign PDF",
              "Crop PDF", "Repair PDF", "OCR PDF", "Delete PDF Pages",
              "Extract PDF Pages", "Reorder PDF Pages", "PDF to Word",
              "Word to PDF", "PDF to JPG", "PDF to PNG", "JPG to PDF", "PNG to PDF",
            ].map((tool) => (
              <div key={tool} style={{ background: "#f8faff", border: "1px solid #bfdbfe", borderRadius: "8px", padding: "8px 12px", fontSize: "13px", color: "#1d4ed8", fontWeight: 500 }}>
                {tool}
              </div>
            ))}
          </div>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
            Most tools run entirely in your browser. Your file never leaves your device. For tools that require server processing such as compression, OCR, and PDF to Word conversion, files are sent over an encrypted connection and deleted immediately after the result is returned to you.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
            How Dockitt is different
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              { title: "No signup required", desc: "Every tool works without an account. You do not need to register, verify an email, or remember a password to compress a PDF." },
              { title: "No watermarks", desc: "Your files come back clean. Dockitt does not stamp its name on your documents." },
              { title: "No ads", desc: "Dockitt products are ad-free. No banners, no pop-ups, no sponsored results." },
              { title: "No artificial limits on free use", desc: "The free plan gives you one conversion per day per tool. That covers most casual use cases. Paid plans are available for heavier use." },
              { title: "Privacy by design", desc: "Browser-based tools never touch a server. Server-side tools delete your files immediately after processing. Dockitt does not store, read, or share your documents." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", padding: "16px 18px" }}>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "#111", margin: "0 0 4px" }}>{item.title}</p>
                <p style={{ fontSize: "14px", color: "#4b5563", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
            Who built Dockitt
          </h2>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
            Dockitt was built by a small team that got tired of the same frustrations everyone faces with online PDF tools. It is an independent project, not backed by a large company. That means decisions about what to build and how to build it come from actual user needs rather than investor requirements. The goal is to keep it simple, fast, and genuinely useful.
          </p>
        </section>

        <section>
          <h2 style={{ fontSize: "20px", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
            What is coming next
          </h2>
          <p style={{ fontSize: "16px", color: "#4b5563", lineHeight: 1.75, margin: 0 }}>
            More tools, better performance, and improvements based on feedback. If there is a PDF task you need that Dockitt does not handle yet, that feedback directly shapes what gets built. The current 20 tools cover the most common cases well, but there is more to add.
          </p>
        </section>

        <section style={{ background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: "12px", padding: "24px 28px" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1d4ed8", marginBottom: "10px" }}>
            Get in touch
          </h2>
          <p style={{ fontSize: "15px", color: "#1e40af", lineHeight: 1.7, marginBottom: "16px" }}>
            If something does not work as expected, if you have a feature request, or if you just want to say something, reach out directly. Feedback from real users is the most useful thing for improving Dockitt.
          </p>
          <a href="mailto:hello@dockitt.com" style={{ display: "inline-block", background: "#2563eb", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            hello@dockitt.com
          </a>
        </section>

        <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: "24px" }}>
          <p style={{ fontSize: "15px", color: "#6b7280", lineHeight: 1.7, margin: "0 0 16px" }}>
            Ready to try it?
          </p>
          <Link href="/categories" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#2563eb", color: "#fff", padding: "11px 22px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
            See all 20 free tools
          </Link>
        </div>

      </div>
    </main>
  );
}