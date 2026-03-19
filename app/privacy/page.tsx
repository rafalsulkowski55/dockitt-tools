export const metadata = {
  title: "Privacy Policy — Dockitt",
  description: "Privacy policy for Dockitt PDF tools.",
};

export default function PrivacyPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Privacy Policy
      </h1>
      <p style={{ fontSize: "15px", color: "#999", marginBottom: "48px" }}>
        Last Updated: March 2026
      </p>

      {[
        {
          title: "1. Introduction",
          content: `This Privacy Policy describes how Dockitt ("we", "us", or "our") collects, uses, processes, and protects information in connection with your use of our services, including our website and any related applications (collectively, the "Service"). By accessing or using the Service, you acknowledge that you have read and understood this Privacy Policy. If you do not agree with any part of this policy, you should discontinue use of the Service immediately.`,
        },
        {
          title: "2. Scope of Policy",
          content: `This Privacy Policy applies solely to information processed through the Service. It does not apply to third-party services, websites, or applications that may be linked to or integrated with the Service.`,
        },
        {
          title: "3. Files Uploaded by Users",
          content: `When you upload files to Dockitt, files are processed temporarily on our servers strictly for the purpose of providing the requested functionality. Files are automatically and permanently deleted immediately after processing is completed. We do not store, archive, or retain any uploaded files. We do not access, read, analyze, or otherwise inspect the contents of your files beyond what is technically required to perform the requested processing. We do not share, sell, or disclose your files to any third party. Despite these safeguards, you acknowledge that transmitting data over the internet is inherently subject to certain risks, and we cannot guarantee absolute security.`,
        },
        {
          title: "4. Analytics and Usage Data",
          content: `We use third-party analytics services, including Google Analytics, to better understand how users interact with the Service. These services may collect information such as pages visited, time spent on pages, device type and browser information, and general geographic location. All analytics data collected is aggregated and anonymized. We do not collect, process, or store personally identifiable information (PII) through analytics tools.`,
        },
        {
          title: "5. Cookies",
          content: `The Service uses cookies exclusively for analytics purposes. Cookies are small text files stored on your device that help us understand user behavior and improve performance. We do not use cookies for advertising, behavioral tracking across third-party websites, or profiling users for marketing purposes. You may disable cookies through your browser settings; however, doing so may affect certain functionalities of the Service.`,
        },
        {
          title: "6. Data Sharing and Disclosure",
          content: `We do not sell, rent, or trade any user data. We may share limited information only when required to comply with applicable laws or to protect the rights, property, or safety of Dockitt, its users, or others. Any third-party service providers are obligated to handle data in accordance with applicable data protection laws.`,
        },
        {
          title: "7. Data Retention",
          content: `We adhere to a strict data minimization policy. Uploaded files are deleted immediately after processing. Analytics data is retained only in aggregated and anonymized form. We do not maintain databases of user-uploaded content or personal data.`,
        },
        {
          title: "8. Data Security",
          content: `We implement appropriate technical and organizational measures to protect information processed through the Service, including secure server infrastructure, encryption where applicable, and access controls. However, no method of transmission or storage is completely secure. You use the Service at your own risk.`,
        },
        {
          title: "9. International Data Transfers",
          content: `Depending on your location, your data may be processed on servers located in different jurisdictions. By using the Service, you consent to such transfers, provided that appropriate safeguards are in place.`,
        },
        {
          title: "10. User Rights",
          content: `Depending on applicable law, you may have certain rights regarding your data, including the right to access information about data processing, the right to request deletion of any data, and the right to object to or restrict certain processing activities. Given the nature of our Service, many of these rights may be inherently fulfilled by design.`,
        },
        {
          title: "11. Changes to This Privacy Policy",
          content: `We reserve the right to modify or update this Privacy Policy at any time. Any changes will be effective upon posting the updated version with a revised "Last Updated" date. Continued use of the Service after such changes constitutes your acceptance of the updated Privacy Policy.`,
        },
        {
          title: "12. Contact Information",
          content: `If you have any questions, concerns, or requests regarding this Privacy Policy, you may contact us at: hello@dockitt.com`,
        },
        {
          title: "13. Final Provisions",
          content: `This Privacy Policy is intended to provide transparency regarding our data practices. If any provision of this policy is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
        },
      ].map((section) => (
        <section key={section.title} style={{ marginBottom: "36px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: 700, marginBottom: "12px" }}>
            {section.title}
          </h2>
          <p style={{ fontSize: "17px", color: "#555", lineHeight: "1.7" }}>
            {section.content}
          </p>
        </section>
      ))}
    </main>
  );
}