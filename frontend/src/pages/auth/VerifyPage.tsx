import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function VerifyPage() {
  const { verifyUser, loading } = useAuth();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  );
  const [toastShown, setToastShown] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Extract token once
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      if (!toastShown) {
        toast.error("Invalid verification link.");
        setToastShown(true);
      }
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        // Call backend endpoint
        await verifyUser(`/api/v1/verify/${token}`);
        setStatus("success");
        if (!toastShown) {
          toast.success("Email verified successfully!");
          setToastShown(true);
        }
        // Redirect to login page after short delay
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        console.error("Verification error:", err);
        setStatus("failed");
        if (!toastShown) {
          toast.error("Verification failed. Please try again.");
          setToastShown(true);
        }
      }
    };

    verify();
  }, [token, verifyUser, navigate, toastShown]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      {loading || status === "verifying" ? (
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p>Verifying your account...</p>
        </div>
      ) : status === "success" ? (
        <div className="text-green-600">
          <h2 className="text-2xl font-semibold mb-2">
            Email Verified Successfully!
          </h2>
          <p>Redirecting to login page...</p>
        </div>
      ) : (
        <div className="text-red-600">
          <h2 className="text-2xl font-semibold mb-2">Verification Failed!</h2>
          <p>
            The verification link might have expired or is invalid. Please
            register again.
          </p>
        </div>
      )}
    </div>
  );
}
