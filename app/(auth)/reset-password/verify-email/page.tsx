import EmailVerificationCard from "../component/email-verification-form";

export default function EmailVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <EmailVerificationCard />
      </div>
    </div>
  );
}
