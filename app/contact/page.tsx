export const metadata = {
  title: "Contact — Dockitt",
  description: "Get in touch with the Dockitt team.",
};

export default function ContactPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "16px" }}>
        Contact
      </h1>
      <p style={{ fontSize: "17px", color: "#555", lineHeight: "1.7", marginBottom: "24px" }}>
        Have a question, found a bug, or want to suggest a new tool? We'd love to hear from you.
      </p>
      <p style={{ fontSize: "17px", color: "#555", lineHeight: "1.7" }}>
        Email us at{" "}
        <a href="mailto:hello@dockitt.com" style={{ color: "#2563eb" }}>
          hello@dockitt.com
        </a>
      </p>
    </main>
  );
}