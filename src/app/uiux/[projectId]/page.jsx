import UIUX from "../../../components/UIUX";

export function generateStaticParams() {
  const projects = [
    "cw4a",
    "negros-delights",
    "oracle-ui-ux-redesign",
    "laco-innovation-hub",
    "smartcart",
    "maestro-solutions",
    "busybee",
    "choros-io-redesign",
    "y-commerce"
  ];
  return projects.map((slug) => ({
    projectId: slug,
  }));
}

export default function UIUXProjectPage() {
  return <UIUX />;
}
