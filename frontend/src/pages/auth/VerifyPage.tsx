import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import useAuth from "@/context/AuthContext";
import { Loader2 } from "lucide-react";

export default function VerifyPage() {
  const { verifyUser, loading, error } = useAuth();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">(
    "verifying"
  );
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) {
      toast.error("Invalid verification link.");
      setStatus("failed");
      return;
    }

    const verify = async () => {
      try {
        await verifyUser(token);
        setStatus("success");
        toast.success("Email verified successfully!");
        setTimeout(() => navigate("/login"), 2000);
      } catch (err) {
        setStatus("failed");
        toast.error("Verification failed. Please try again.");
        console.error("Verification error:", err);
      }
    };

    verify();
  }, [searchParams, verifyUser, navigate]);

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
          <h2 className="text-2xl font-semibold mb-2">
            Verification Failed!
          </h2>
          <p>
            The verification link might have expired or is invalid. Please
            register again.
          </p>
        </div>
      )}
    </div>
  );
}
