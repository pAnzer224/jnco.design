import Booking from "../../components/Booking";

export const metadata = {
  title: "Book a Project | Juneco Mirande",
  description: "Ready to build something? Answer a few questions to get started with your design or development project.",
  alternates: { canonical: "https://juneco-mirande.web.app/booking" }
};

export default function BookingPage() {
  return <Booking />;
}
