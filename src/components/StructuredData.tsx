export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LUX Vision",
    image: "https://luxvision.hr/images/luka-portrait.jpg",
    description:
      "Profesionalna fotografija i videografija za vjenčanja, evente i kreativne projekte.",
    url: "https://luxvision.hr",
    telephone: "+385915226932",
    email: "lukaksc@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Krk",
      addressCountry: "HR",
    },
    sameAs: ["https://www.instagram.com/lukakosic.ph/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}