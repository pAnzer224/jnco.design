import WebDev from "../../../components/WebDev";

export function generateStaticParams() {
  const projects = [
    "trekko-rentals",
    "dr-jas-pet-care",
    "your-event-cover",
    "good-plumbing",
    "manorvale",
    "mould-damp",
    "we-fit"
  ];
  return projects.map((slug) => ({
    projectId: slug,
  }));
}

export default function WebDevProjectPage() {
  return <WebDev />;
}
