import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation";

export const PasswordResetSuccess = () =>{
    const router = useRouter();

 return(
    <>
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border p-8">
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-brand-primary-stroke-strong rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-white" />
              </div>
    
              <div className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900">
                  Password reset completed
                </h2>
                <p className="text-sm text-gray-600">
                  Your password has been successfully updated. You can now log in
                  with your new password.
                </p>
              </div>
    
              <div className="space-y-3 pt-2">
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full bg-brand-primary-stroke-strong hover:bg-brand-primary-stroke-strong/70 text-white py-2.5 rounded-md font-medium transition-colors"
                >
                  Login
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  variant="outline"
                  className="w-full border-gray-stroke-strong text-gray-stroke-strong/70  py-2.5 rounded-md font-medium transition-colors"
                >
                  Exit
                </Button>
              </div>
            </div>
          </div>
    </>
 )
}