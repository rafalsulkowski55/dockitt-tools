import Link from "next/link";

type BreadcrumbsProps = {
  toolName: string;
};

export default function Breadcrumbs({ toolName }: BreadcrumbsProps) {
  return (
    <nav style={{ marginBottom: "24px" }}>
      <ol style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        listStyle: "none",
        margin: 0,
        padding: 0,
        fontSize: "14px",
        color: "#666",
      }}>
        <li>
          <Link href="/" style={{ color: "#666", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li style={{ color: "#ccc" }}>›</li>
        <li style={{ color: "#333" }}>{toolName}</li>
      </ol>
    </nav>
  );
}