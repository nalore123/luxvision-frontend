export default function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "LUX Vision",
    image: "https://luxvision.hr/images/luka-portrait.jpg",
    description:
      "Profesionalna fotografija i videografija za vjenčanja, evente i kreativne projekte na otoku Krku.",
    url: "https://luxvision.hr",
    telephone: "+385915226932",
    email: "lkosic.photo@gmail.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Krk",
      addressRegion: "Primorsko-goranska županija",
      addressCountry: "HR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.0247,
      longitude: 14.5772,
    },
    areaServed: [
      { "@type": "City", name: "Krk" },
      { "@type": "AdministrativeArea", name: "Primorsko-goranska županija" },
      { "@type": "Country", name: "Hrvatska" },
    ],
    sameAs: ["https://www.instagram.com/lukakosic.ph/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}