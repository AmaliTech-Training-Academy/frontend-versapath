import { ResetPasswordForm } from "./component/reset-password-form"

export default function ResetPasswordPage() {
  return (
    <>
        {/* <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/images/auth-background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        
      }}
    >
      <ResetPasswordForm />
    </div> */}
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <ResetPasswordForm />
    </div>
    </>
  )
}
