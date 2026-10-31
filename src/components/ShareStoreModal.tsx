import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Mail, MessageSquare, Share2, ShieldCheck, Heart, ExternalLink, Smartphone } from 'lucide-react';

interface ShareStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareStoreModal: React.FC<ShareStoreModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const url = new URL(window.location.href);
        // Ensure store identifier is maintained
        if (!url.searchParams.has('store') && !url.searchParams.has('family')) {
          url.searchParams.set('store', 'margaret-williams');
        }
        url.hash = '';
        setStoreUrl(url.toString());
      } catch {
        setStoreUrl(window.location.href);
      }

      // Check if native sharing is available (Web Share API)
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        setCanNativeShare(true);
      }
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const defaultShareMessage = `Hi! ❤️ I wanted to share Margaret's memorial store with you. It has some lovely keepsakes selected in her memory that you might like to see. Here's the link: ${storeUrl}`;
  const encodedMessage = encodeURIComponent(defaultShareMessage);
  const encodedUrl = encodeURIComponent(storeUrl);
  const emailSubject = encodeURIComponent("Margaret Williams Memorial Store & Keepsakes");
  const emailBody = encodeURIComponent(
    `Hi,\n\nI wanted to share Margaret's memorial store with you. It has some lovely keepsakes and tributes selected in her memory that you might like to see.\n\nYou can explore the personalized collection here:\n${storeUrl}\n\nWith love,\nThe Williams Family`
  );

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(storeUrl);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = storeUrl;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleCopyMessage = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(defaultShareMessage);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = defaultShareMessage;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    } catch {
      setCopiedMessage(true);
      setTimeout(() => setCopiedMessage(false), 2500);
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: "Margaret Williams Memorial Store",
          text: "Hi! ❤️ I wanted to share Margaret's memorial store with you. It has some lovely keepsakes selected in her memory that you might like to see.",
          url: storeUrl,
        });
      } catch (err) {
        // User cancelled or share failed silently
      }
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1F2320]/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="share-modal-title"
    >
      <div
        className="relative bg-[#FFFFFF] border border-[#E6E1D7] rounded-lg shadow-2xl max-w-lg w-full overflow-hidden text-[#1B1C19] my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#E6E1D7] bg-[#FAF9F5] flex items-start justify-between">
          <div className="space-y-1 pr-6">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#899588] uppercase tracking-wider">
              <Share2 className="w-3.5 h-3.5" />
              <span>Family Memorial Sharing</span>
            </div>
            <h2 id="share-modal-title" className="font-serif text-xl sm:text-2xl font-normal text-[#343835]">
              Share Margaret's Memorial Store
            </h2>
            <p className="text-xs sm:text-sm text-[#566156] leading-relaxed">
              Invite family and loved ones to explore the keepsakes selected in memory of Margaret.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 rounded-full text-[#747874] hover:text-[#1B1C19] hover:bg-[#EBE7DF] transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Recipient Store Summary Card */}
          <div className="flex items-center gap-3.5 p-3 rounded-[6px] bg-[#F8F6F1] border border-[#E6E1D7]">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-[#899588] shrink-0 bg-white">
              <img
                src="./assets/aistudio/Margaret_Williams_Memorial_Photo_35c13dec.png"
                alt="Margaret Williams"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <span className="block font-serif text-sm font-medium text-[#343835] truncate">
                Margaret Williams Memorial Collection
              </span>
              <span className="block text-[11px] text-[#747874] truncate">
                Dedicated Store for the Williams Family & Friends · 1942 – 2026
              </span>
            </div>
          </div>

          {/* Copy Link Field */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#343835] uppercase tracking-wider">
              Personalized Store Link
            </label>
            <div className="flex items-stretch gap-2">
              <div className="relative flex-1 min-w-0">
                <input
                  type="text"
                  readOnly
                  value={storeUrl}
                  onClick={(e) => (e.target as HTMLInputElement).select()}
                  className="w-full px-3 py-2 text-xs bg-[#F8F6F1] border border-[#D5CFBF] rounded-[4px] text-[#343835] focus:outline-none focus:ring-1 focus:ring-[#899588] font-mono select-all truncate"
                />
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-[4px] text-xs font-medium flex items-center gap-1.5 transition cursor-pointer shrink-0 shadow-2xs ${
                  copiedLink
                    ? 'bg-[#899588] text-white'
                    : 'bg-[#343835] text-white hover:bg-[#4A504B]'
                }`}
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
            {copiedLink && (
              <p className="text-[11px] text-[#4A7C59] flex items-center gap-1 font-medium animate-fade-in">
                <Check className="w-3.5 h-3.5" /> Link copied to clipboard. Ready to paste and send!
              </p>
            )}
          </div>

          {/* Quick Sharing Options Grid */}
          <div className="space-y-2.5">
            <span className="block text-xs font-semibold text-[#343835] uppercase tracking-wider">
              Share Directly With Family
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* WhatsApp */}
              <a
                href={`https://api.whatsapp.com/send?text=${encodedMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-[6px] border border-[#E6E1D7] bg-[#FAF9F5] hover:bg-[#25D366]/10 hover:border-[#25D366] transition group text-center"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366] mb-1.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-2.158-.544-1.741-.722-2.883-2.484-2.969-2.598-.087-.116-.708-.941-.708-1.793 0-.853.447-1.272.607-1.445.16-.174.348-.217.464-.217.116 0 .232.001.333.006.106.005.249-.04.389.297.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.353.101.174.45 1.05 1.135 1.66 0 .001.001.001.001.001.714.636 1.317.833 1.505.92.188.087.299.072.41-.058.112-.13.477-.557.604-.748.127-.191.255-.16.425-.097.17.063 1.08.509 1.265.602.185.093.308.139.353.217.045.078.045.452-.099.857z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#343835]">WhatsApp</span>
                <span className="text-[10px] text-[#747874]">Instant message</span>
              </a>

              {/* Text Message (SMS) */}
              <a
                href={`sms:?&body=${encodedMessage}`}
                className="flex flex-col items-center justify-center p-3 rounded-[6px] border border-[#E6E1D7] bg-[#FAF9F5] hover:bg-[#899588]/10 hover:border-[#899588] transition group text-center"
              >
                <div className="w-8 h-8 rounded-full bg-[#899588]/15 flex items-center justify-center text-[#899588] mb-1.5 group-hover:scale-110 transition-transform">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#343835]">Text / SMS</span>
                <span className="text-[10px] text-[#747874]">Mobile message</span>
              </a>

              {/* Email */}
              <a
                href={`mailto:?subject=${emailSubject}&body=${emailBody}`}
                className="flex flex-col items-center justify-center p-3 rounded-[6px] border border-[#E6E1D7] bg-[#FAF9F5] hover:bg-[#A58A6D]/10 hover:border-[#A58A6D] transition group text-center"
              >
                <div className="w-8 h-8 rounded-full bg-[#A58A6D]/15 flex items-center justify-center text-[#A58A6D] mb-1.5 group-hover:scale-110 transition-transform">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-[#343835]">Email</span>
                <span className="text-[10px] text-[#747874]">Prepared note</span>
              </a>

              {/* Facebook */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-[6px] border border-[#E6E1D7] bg-[#FAF9F5] hover:bg-[#1877F2]/10 hover:border-[#1877F2] transition group text-center"
              >
                <div className="w-8 h-8 rounded-full bg-[#1877F2]/15 flex items-center justify-center text-[#1877F2] mb-1.5 group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#343835]">Facebook</span>
                <span className="text-[10px] text-[#747874]">Share to feed</span>
              </a>
            </div>
          </div>

          {/* Native Device Share Option (if supported) */}
          {canNativeShare && (
            <button
              type="button"
              onClick={handleNativeShare}
              className="w-full py-2.5 px-3 rounded-[4px] border border-[#899588] text-[#343835] hover:bg-[#899588] hover:text-white transition text-xs font-medium flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>More Sharing Options on This Device...</span>
            </button>
          )}

          {/* Suggested Message Preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#343835] uppercase tracking-wider">
                Suggested Share Message
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="text-[11px] text-[#899588] hover:text-[#343835] font-medium transition cursor-pointer flex items-center gap-1"
              >
                {copiedMessage ? <Check className="w-3 h-3 text-[#4A7C59]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedMessage ? 'Message Copied!' : 'Copy Message'}</span>
              </button>
            </div>
            <div className="p-3 rounded-[6px] bg-[#FAF9F5] border border-[#E6E1D7] text-xs text-[#566156] leading-relaxed italic">
              “Hi! ❤️ I wanted to share Margaret's memorial store with you. It has some lovely keepsakes selected in her memory that you might like to see. Here's the link: {storeUrl}”
            </div>
          </div>

          {/* Privacy & Reassurance Note */}
          <div className="space-y-1.5 text-[11px] text-[#747874] border-t border-[#E6E1D7] pt-3.5">
            <div className="flex items-center gap-1.5 font-medium text-[#566156]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#899588] shrink-0" />
              <span>Private & Safe Sharing</span>
            </div>
            <p className="leading-relaxed pl-5">
              Family members will open Margaret's designated memorial storefront and can select keepsakes independently. Your shopping basket and personal information remain private.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#FAF9F5] border-t border-[#E6E1D7] flex items-center justify-between">
          <span className="text-[11px] text-[#747874]">
            Curated in honor of Margaret Williams
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-[4px] bg-[#EBE7DF] hover:bg-[#D5CFBF] text-[#343835] text-xs font-medium transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
