
import React, { useEffect, useState } from "react";
import { QrCode } from "lucide-react";
import { toast } from "react-hot-toast"; // ✅ toast import
import ReusableForm from "../../../components/ui/ReusableForm";
import ReusableButton from "../../../components/ui/ReusableButton";
import { getQr, uploadQr } from "../../../api/admin.api";

// ── QR Preview ────────────────────────────────────────────────────────────────
const QRPreview = ({ src }) => {
  if (!src) return null;
  return (
    <div className="mt-3 flex flex-col items-center gap-2">
      <p className="text-xs text-gray-400">QR Preview</p>
      <div className="border border-gray-600 rounded-xl overflow-hidden w-40 h-40 flex items-center justify-center bg-white">
        <img src={src} alt="QR Code" className="object-contain w-full h-full" />
      </div>
    </div>
  );
};

// ── Main Component ────────────────────────────────────────────────────────────
const UploadPaymentInfo = () => {
  const [qrFile, setQrFile] = useState(null);
  const [qrPreviewSrc, setQrPreviewSrc] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExistingQr();
  }, []);

  const fetchExistingQr = async () => {
    try {
      const res = await getQr();
      if (res?.data?.qrCode?.url) {
        setQrPreviewSrc(res.data.qrCode.url);
      }
    } catch (err) {
      console.error("❌ Fetch failed:", err);
      toast.error("Failed to load existing QR."); // ✅
    }
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed for QR."); // ✅
      return;
    }

    setQrFile(file);
    const localUrl = URL.createObjectURL(file);
    setQrPreviewSrc(localUrl);
  };

  const handleSubmit = async () => {
    if (!qrFile) return;

    const formData = new FormData();
    formData.append("file", qrFile);

    try {
      setLoading(true);
      const res = await uploadQr(formData);

      if (res?.success) {
        toast.success("QR uploaded successfully!"); // ✅
        await fetchExistingQr();
        setQrFile(null);
      } else {
        toast.error("Upload failed. Please try again."); // ✅
      }
    } catch (err) {
      console.error("❌ Upload failed:", err);
      toast.error("Something went wrong. Please try again."); // ✅
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ "--btnColor": "#facc15", "--btnHoverColor": "#eab308" }} className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <ReusableForm
          label="Upload Payment QR Code"
          name="qrFile"
          type="file"
          onChange={handleChange}
          icon={QrCode}
          required
        />

        <QRPreview src={qrPreviewSrc} />

        <ReusableButton
          label="Save QR"
          onClick={handleSubmit}
          loading={loading}
          disabled={!qrFile || loading}
        />
      </div>
    </div>
  );
};

export default UploadPaymentInfo;