export const metadata = {
  title: "Terms of Use — Dockitt",
  description: "Terms of use for Dockitt PDF tools.",
};

export default function TermsPage() {
  return (
    <main style={{ maxWidth: "780px", margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "32px", fontWeight: 700, marginBottom: "8px" }}>
        Terms of Use
      </h1>
      <p style={{ fontSize: "15px", color: "#999", marginBottom: "48px" }}>
        Last Updated: March 2026
      </p>

      {[
        {
          title: "1. Introduction",
          content: `These Terms of Use ("Terms") govern your access to and use of Dockitt ("we", "us", or "our") and all associated services, including our website and online PDF tools (collectively, the "Service"). By accessing or using the Service, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must discontinue use of the Service immediately.`,
        },
        {
          title: "2. Description of Service",
          content: `Dockitt provides a suite of free online tools that allow users to process and work with PDF files, including but not limited to compression, conversion, and document optimization. The Service is made available for both personal and commercial use, subject to compliance with these Terms.`,
        },
        {
          title: "3. Permitted Use",
          content: `You are granted a limited, non-exclusive, non-transferable right to use the Service in accordance with these Terms. You may use Dockitt for lawful purposes, including both personal and business-related activities.`,
        },
        {
          title: "4. Prohibited Use",
          content: `You agree not to use the Service to upload, process, or distribute any content that is illegal or unlawful; to process content that infringes upon the rights of others; to engage in activities that may harm or disrupt the Service or other users; or to attempt unauthorized access to systems or data associated with the Service. Any misuse of the Service may result in restricted access or legal action where applicable.`,
        },
        {
          title: "5. User Responsibility for Files",
          content: `You retain full responsibility for any files you upload or process using the Service. You confirm that you have the necessary rights and permissions to use and process the files. You are solely responsible for the content, legality, and accuracy of your files. Dockitt does not claim ownership of any uploaded content. Files are processed temporarily and are automatically deleted from our servers immediately after processing.`,
        },
        {
          title: "6. Intellectual Property",
          content: `All rights, title, and interest in and to the Service, including its design, functionality, and underlying technology, remain the exclusive property of Dockitt or its licensors. These Terms do not grant you any ownership rights in the Service.`,
        },
        {
          title: "7. Disclaimer of Warranties",
          content: `The Service is provided on an "as is" and "as available" basis. To the fullest extent permitted by law, Dockitt makes no representations or warranties of any kind, including the accuracy or availability of the Service, its suitability for any particular purpose, or the absence of errors or security vulnerabilities. Your use of the Service is at your own risk.`,
        },
        {
          title: "8. Limitation of Liability",
          content: `To the maximum extent permitted by applicable law, Dockitt shall not be liable for any direct, indirect, incidental, consequential, or special damages arising out of your use of or inability to use the Service, loss or damage to files or data, or any errors or interruptions in the Service.`,
        },
        {
          title: "9. Availability and Changes to the Service",
          content: `We reserve the right to modify, suspend, or discontinue any part of the Service at any time, without prior notice. We do not guarantee continuous or uninterrupted access to the Service.`,
        },
        {
          title: "10. Changes to These Terms",
          content: `We may update or revise these Terms at any time. Any changes will become effective upon posting the updated version with a revised "Last Updated" date. Continued use of the Service after such changes constitutes your acceptance of the updated Terms.`,
        },
        {
          title: "11. Termination",
          content: `We reserve the right to restrict or terminate access to the Service at our sole discretion, particularly in cases of misuse or violation of these Terms.`,
        },
        {
          title: "12. Governing Law",
          content: `These Terms shall be governed and interpreted in accordance with applicable laws, without regard to conflict of law principles.`,
        },
        {
          title: "13. Contact Information",
          content: `If you have any questions regarding these Terms, you may contact us at: hello@dockitt.com`,
        },
        {
          title: "14. Final Provisions",
          content: `If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.`,
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