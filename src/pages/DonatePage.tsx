import DonationForm from "@/components/DonationForm";
import DonationPosterSection from "@/components/DonationPosterSection";

const DonatePage = () => {
  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8">
      <DonationPosterSection showDonateButton={false} />
      <DonationForm />
    </div>
  );
};

export default DonatePage;
