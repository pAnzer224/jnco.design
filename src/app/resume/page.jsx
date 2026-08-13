import Resume from "../../components/Resume";

export const metadata = {
  title: "Resume | Juneco Mirande",
  description: "View Juneco Mirande's resume.",
  alternates: { canonical: "https://juneco-mirande.web.app/resume" }
};

export default function ResumePage() {
  return <Resume />;
}
