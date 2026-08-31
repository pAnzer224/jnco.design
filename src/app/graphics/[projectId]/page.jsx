import Graphic from "../../../components/Graphic";

export function generateStaticParams() {
  const projects = [
    "simulated-sanctuary",
    "ti",
    "poster-making",
    "infographic",
    "neue-dept",
    "sailing-pass",
    "shane-bowden"
  ];
  return projects.map((slug) => ({
    projectId: slug,
  }));
}

export default function GraphicProjectPage() {
  return <Graphic />;
}
