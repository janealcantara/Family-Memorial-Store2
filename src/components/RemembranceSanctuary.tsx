import React, { useState } from 'react';
import { Flame, Heart, Send, Sparkles, Feather, Flower2 } from 'lucide-react';
import { MemoryEntry } from '../types';
import { INITIAL_MEMORIES } from '../data/tributes';

export const RemembranceSanctuary: React.FC = () => {
  const [memories, setMemories] = useState<MemoryEntry[]>(INITIAL_MEMORIES);
  const [candlesCount, setCandlesCount] = useState<number>(86);
  const [userHasLitCandle, setUserHasLitCandle] = useState<boolean>(false);

  // New Memory Form State
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [selectedBotanical, setSelectedBotanical] = useState('White Rose');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const botanicals = ['White Rose', 'Olive Sprig', 'Wild Lavender', 'Forget-Me-Not', 'Lily of the Valley'];

  const handleLightCandle = () => {
    if (!userHasLitCandle) {
      setCandlesCount((prev) => prev + 1);
      setUserHasLitCandle(true);
    }
  };

  const handlePostMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry: MemoryEntry = {
      id: `mem-${Date.now()}`,
      authorName: name.trim(),
      relationship: relationship.trim() || 'Cherished Friend',
      date: 'Just now',
      message: message.trim(),
      botanicalBadge: selectedBotanical,
      candleLit: true,
    };

    setMemories([newEntry, ...memories]);
    setName('');
    setRelationship('');
    setMessage('');
    setIsSubmitted(true);
    if (!userHasLitCandle) {
      setCandlesCount((prev) => prev + 1);
      setUserHasLitCandle(true);
    }

    setTimeout(() => {
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-12 sm:py-16 bg-[#F8F6F1]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Sanctuary Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] font-semibold text-[#899588]">
            <Sparkles className="w-3.5 h-3.5 text-[#A58A6D]" />
            <span>Remembrance Sanctuary & Guestbook</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#343835] font-normal tracking-tight">
            Candle Vigil & Reflections
          </h2>
          <p className="text-sm sm:text-[15px] text-[#444844] leading-relaxed">
            Light a quiet candle in tribute to Margaret Williams, or leave a lasting memory for Arthur and the family to cherish in the days and years ahead.
          </p>
        </div>

        {/* Interactive Candle Vigil Altar */}
        <div className="bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-6 sm:p-10 shadow-memorial text-center relative overflow-hidden">
          {/* Subtle Ambient Radial Glow */}
          <div
            className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
              userHasLitCandle
                ? 'bg-[radial-gradient(ellipse_at_center,_rgba(253,221,188,0.35)_0%,_rgba(248,246,241,0)_70%)] opacity-100'
                : 'bg-[radial-gradient(ellipse_at_center,_rgba(253,221,188,0.15)_0%,_rgba(248,246,241,0)_70%)] opacity-60'
            }`}
          />

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            {/* The Visual Candle Element */}
            <div className="flex flex-col items-center justify-center">
              {/* Flame and Glow */}
              <div className="relative flex flex-col items-center">
                <div
                  className={`w-5 h-8 rounded-full transition-all duration-700 ${
                    userHasLitCandle
                      ? 'bg-gradient-to-t from-[#A58A6D] via-[#FDC37F] to-[#FFFFFF] animate-pulse shadow-[0_0_25px_#FDC37F]'
                      : 'bg-gradient-to-t from-[#A58A6D] to-[#FDD1A0] opacity-80 shadow-[0_0_12px_#FDD1A0]'
                  }`}
                  style={{ borderRadius: '50% 50% 35% 35% / 60% 60% 40% 40%' }}
                />
                {/* Candle Wick */}
                <div className="w-[2px] h-2 bg-[#343835]" />
                {/* Candle Body */}
                <div className="w-16 h-28 bg-gradient-to-b from-[#F5F3EE] via-[#EAE8E3] to-[#E4E2DD] border border-[#D8D1C5] rounded-[2px] shadow-sm relative overflow-hidden flex flex-col justify-end p-2">
                  <div className="text-[8px] text-[#A58A6D] font-serif uppercase tracking-widest text-center opacity-70">
                    MW · 2026
                  </div>
                </div>
                {/* Stone Base */}
                <div className="w-24 h-3 bg-[#343835] rounded-[2px] shadow-xs" />
              </div>

              {/* Flame Counter */}
              <div className="mt-5 space-y-1">
                <div className="font-serif text-2xl sm:text-3xl font-normal text-[#343835]">
                  {candlesCount} Candles Illuminated
                </div>
                <p className="text-xs text-[#899588] tracking-wide">
                  Lighting the path in Margaret&apos;s everlasting memory
                </p>
              </div>
            </div>

            {/* Light Candle Button */}
            <div>
              {userHasLitCandle ? (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#F0EEE9] border border-[#899588] rounded-[4px] text-xs font-semibold text-[#343835]">
                  <Flame className="w-4 h-4 text-[#A58A6D] fill-[#A58A6D]" />
                  <span>Your Candle Is Shining in Sanctuary</span>
                </div>
              ) : (
                <button
                  onClick={handleLightCandle}
                  className="px-7 py-3 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs uppercase tracking-[0.08em] font-medium cursor-pointer shadow-xs inline-flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-[#A58A6D]" />
                  <span>Light a Memorial Candle</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Two-Column Guestbook Section: Post Reflection (Left 5 Cols) + Memories Feed (Right 7 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Post Reflection Form */}
          <div className="lg:col-span-5 bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-6 sm:p-7 shadow-memorial space-y-5">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-[#899588]">
                <Feather className="w-3.5 h-3.5 text-[#A58A6D]" />
                <span>Memorial Registry</span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[#343835]">
                Leave a Condolence or Memory
              </h3>
              <p className="text-xs text-[#566156]">
                Your words will be bound into Margaret’s archival remembrance book for the Williams family.
              </p>
            </div>

            {isSubmitted && (
              <div className="p-3 bg-[#D7E3D4]/40 border border-[#899588] rounded-[4px] text-xs text-[#2F402E] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#899588] fill-[#899588]" />
                <span>Thank you. Your memory has been recorded in Margaret’s book.</span>
              </div>
            )}

            <form onSubmit={handlePostMemory} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider font-medium text-[#444844] block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Katherine & Thomas Hayes"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-medium text-[#444844] block mb-1">
                  Relationship to Margaret or the Family
                </label>
                <input
                  type="text"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  placeholder="e.g. Neighbor, University Colleague, Cousin"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20"
                />
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-medium text-[#444844] block mb-1">
                  Select a Commemorative Botanical Symbol
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {botanicals.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setSelectedBotanical(b)}
                      className={`px-2.5 py-1 text-[11px] rounded-[4px] border transition cursor-pointer ${
                        selectedBotanical === b
                          ? 'bg-[#899588] text-white border-[#899588]'
                          : 'bg-[#F8F6F1] border-[#E6E1D7] text-[#444844] hover:bg-[#F0EEE9]'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase tracking-wider font-medium text-[#444844] block mb-1">
                  Your Condolence or Cherished Memory *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a quiet recollection, a lesson learned, or words of sympathy..."
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588] focus:ring-2 focus:ring-[#899588]/20 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs uppercase tracking-[0.08em] font-medium cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#899588]" />
                <span>Publish to Memorial Registry</span>
              </button>
            </form>
          </div>

          {/* Memories Feed */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#E6E1D7]">
              <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#899588]">
                Tributes & Reflections ({memories.length})
              </span>
              <span className="text-xs text-[#A58A6D]">Recorded for the Williams Family</span>
            </div>

            <div className="space-y-4">
              {memories.map((entry) => (
                <div
                  key={entry.id}
                  className="bg-[#FFFFFF] border border-[#E6E1D7] rounded-[4px] p-5 shadow-xs space-y-3 relative group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-serif text-base font-medium text-[#343835]">
                        {entry.authorName}
                      </h4>
                      <div className="text-[11px] text-[#899588] tracking-wide">
                        {entry.relationship} · {entry.date}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#A58A6D] bg-[#F8F6F1] px-2.5 py-1 rounded-[2px] border border-[#E6E1D7]">
                      <Flower2 className="w-3 h-3 text-[#899588]" />
                      <span>{entry.botanicalBadge}</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-[#444844] leading-relaxed font-normal italic font-serif">
                    “{entry.message}”
                  </p>

                  <div className="pt-2 border-t border-[#E6E1D7]/60 flex items-center justify-between text-[11px] text-[#747874]">
                    <div className="flex items-center gap-1.5">
                      <Flame className="w-3 h-3 text-[#A58A6D] fill-[#A58A6D]" />
                      <span>Candle lit in Margaret’s honor</span>
                    </div>
                    <span className="text-[10px] tracking-wider text-[#899588] uppercase">Archived</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
