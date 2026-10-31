import React, { useState } from 'react';
import { X, Trash2, ShieldCheck, Check, HeartHandshake, ArrowRight, Printer, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { SERVICE_DETAILS } from '../data/tributes';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmation'>('cart');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [orderNumber, setOrderNumber] = useState('');

  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedOrder = `MW-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderNumber(generatedOrder);
    setCheckoutStep('confirmation');
  };

  const handleResetAndClose = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#1F2320]/60 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md sm:max-w-xl bg-[#FFFFFF] border-l border-[#E6E1D7] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-[#E6E1D7] bg-[#FBF9F4] flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#899588] block">
                Official Memorial Basket
              </span>
              <h2 className="font-serif text-lg sm:text-xl text-[#343835] font-medium">
                {checkoutStep === 'confirmation' ? 'Tribute Confirmed' : 'Tributes for Margaret Williams'}
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="w-8 h-8 rounded-[4px] border border-[#E6E1D7] flex items-center justify-center text-[#566156] hover:bg-[#F0EEE9] transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body Content based on Step */}
          {checkoutStep === 'cart' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#F5F3EE] border border-[#E6E1D7] flex items-center justify-center text-[#899588]">
                    <Sparkles className="w-5 h-5 text-[#899588]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-serif text-lg text-[#343835]">Your memorial basket is empty</p>
                    <p className="text-xs text-[#747874] max-w-xs mx-auto">
                      Explore our curated floral tributes, stone urns, and keepsakes honoring Margaret Williams.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="mt-2 px-5 py-2.5 rounded-[4px] bg-[#343835] text-[#F8F6F1] text-xs uppercase tracking-wider font-medium hover:bg-[#4A504B] transition"
                  >
                    Return to Memorial Home
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Delivery reminder pill */}
                  <div className="p-3 bg-[#F8F6F1] border border-[#E6E1D7] rounded-[4px] flex items-center gap-2.5 text-xs text-[#566156]">
                    <ShieldCheck className="w-4 h-4 text-[#899588] shrink-0" />
                    <span>
                      Complimentary gift packaging & safe home delivery included for all memorial keepsakes.
                    </span>
                  </div>

                  {/* List of items */}
                  <div className="divide-y divide-[#E6E1D7]">
                    {items.map((item) => (
                      <div key={item.cartItemId} className="py-4 space-y-3 first:pt-0">
                        <div className="flex gap-4">
                          <img
                            src={item.product.imageUrl}
                            alt={item.product.title}
                            className={`w-18 h-18 sm:w-20 sm:h-20 rounded-[4px] border border-[#E6E1D7] shrink-0 ${
                              item.product.imageUrl.includes('.png') || item.product.id === 'heritage-rose-urn'
                                ? 'object-contain p-1.5 bg-[#FAF8F5]'
                                : 'object-cover'
                            }`}
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-start justify-between">
                              <h4 className="font-serif text-sm sm:text-base font-medium text-[#343835]">
                                {item.product.title}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.cartItemId)}
                                aria-label="Remove tribute item"
                                className="text-[#9EA19D] hover:text-[#BA1A1A] transition p-1 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="font-serif text-sm text-[#A58A6D] font-medium">
                              ${item.product.price} each
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3 pt-1">
                              <div className="flex items-center border border-[#D8D1C5] rounded-[4px] bg-[#FFFFFF]">
                                <button
                                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                                  className="px-2 py-0.5 text-xs text-[#444844] hover:bg-[#F0EEE9]"
                                >
                                  -
                                </button>
                                <span className="px-3 py-0.5 text-xs font-medium text-[#1B1C19]">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                                  className="px-2 py-0.5 text-xs text-[#444844] hover:bg-[#F0EEE9]"
                                >
                                  +
                                </button>
                              </div>

                              <span className="text-xs font-serif font-medium text-[#343835]">
                                Total: ${item.product.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Personalization Summary Accordion */}
                        <div className="p-3 bg-[#F8F6F1] rounded-[4px] border border-[#E6E1D7] text-[11px] space-y-1.5 text-[#444844]">
                          {item.personalization.selectedSize && (
                            <div>
                              <span className="font-semibold text-[#1B1C19]">Selected Size: </span>
                              <span>{item.personalization.selectedSize}</span>
                            </div>
                          )}

                          {item.personalization.selectedFinish && (
                            <div>
                              <span className="font-semibold text-[#1B1C19]">Finish: </span>
                              <span>{item.personalization.selectedFinish}</span>
                            </div>
                          )}

                          {item.personalization.selectedChainLength && (
                            <div>
                              <span className="font-semibold text-[#1B1C19]">Chain Length: </span>
                              <span>{item.personalization.selectedChainLength}</span>
                            </div>
                          )}

                          {item.personalization.selectedRingSize && (
                            <div>
                              <span className="font-semibold text-[#1B1C19]">Ring Size: </span>
                              <span>{item.personalization.selectedRingSize}</span>
                            </div>
                          )}

                          {item.personalization.photoTokenUrl && (
                            <div className="flex items-center gap-2 pt-1">
                              <span className="font-semibold text-[#1B1C19]">Photo Token: </span>
                              <img
                                src={item.personalization.photoTokenUrl}
                                alt="Cameo Inset"
                                className="w-5 h-5 rounded-full object-cover border border-[#A58A6D]"
                              />
                              <span className="text-[10px] text-[#747874]">Custom Portrait Cameo</span>
                            </div>
                          )}

                          {(item.personalization.engravingLine1 || item.personalization.engravingText) && (
                            <div className="space-y-0.5">
                              <span className="font-semibold text-[#1B1C19]">Personal Inscription: </span>
                              {item.personalization.engravingLine1 ? (
                                <div className="pl-2 border-l border-[#A58A6D]/40 font-serif text-[11px] text-[#343835]">
                                  <div className="font-semibold">{item.personalization.engravingLine1}</div>
                                  {item.personalization.engravingLine2 && <div>{item.personalization.engravingLine2}</div>}
                                  {item.personalization.engravingLine3 && <div className="italic">“{item.personalization.engravingLine3}”</div>}
                                </div>
                              ) : (
                                <span className="italic font-serif">“{item.personalization.engravingText}”</span>
                              )}
                            </div>
                          )}

                          {item.personalization.ribbonColor && (
                            <div>
                              <span className="font-semibold text-[#1B1C19]">Ribbon: </span>
                              <span>{item.personalization.ribbonColor} Silk</span>
                            </div>
                          )}

                          {item.personalization.cardMessage && (
                            <div>
                              <span className="font-semibold text-[#1B1C19]">Sympathy Card: </span>
                              <span className="italic">“{item.personalization.cardMessage}”</span>
                              <span className="font-medium"> — {item.personalization.cardSignature || 'Sympathy'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handleCompleteOrder} className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-1">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#899588]">
                  Step 2 of 2
                </span>
                <h3 className="font-serif text-xl font-medium text-[#343835]">
                  Coordinator & Sender Details
                </h3>
                <p className="text-xs text-[#566156]">
                  Willow & Pine will log your tribute into the family memorial records and notify the Williams family of your condolences.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider font-medium text-[#444844] block mb-1">
                    Your Full Name (Sender) *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Charlotte & Robert Sterling"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-medium text-[#444844] block mb-1">
                    Email Address (for placement confirmation) *
                  </label>
                  <input
                    type="email"
                    required
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="charlotte.sterling@example.com"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider font-medium text-[#444844] block mb-1">
                    Telephone (for chapel florist questions)
                  </label>
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    placeholder="(555) 234-5678"
                    className="w-full px-3 py-2 text-xs sm:text-sm bg-[#FFFFFF] border border-[#D8D1C5] rounded-[4px] text-[#343835] focus:outline-none focus:border-[#899588]"
                  />
                </div>

                <div className="p-4 bg-[#F8F6F1] border border-[#E6E1D7] rounded-[4px] space-y-2 text-xs text-[#444844]">
                  <div className="font-semibold text-[#1B1C19] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#899588]" />
                    <span>Willow & Pine Funeral Home Coordination Guarantee</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    No physical billing or promotional material is ever sent to the bereaved family. A photographic placement confirmation will be sent to your email once the tribute is set in the Chapel of the Pines.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E6E1D7] space-y-3">
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs uppercase tracking-[0.08em] font-medium cursor-pointer shadow-xs flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4 text-[#899588]" />
                  <span>Confirm Memorial Tribute (${subtotal})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="w-full py-2 text-xs text-[#747874] hover:text-[#1B1C19] transition"
                >
                  Return to Basket Review
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'confirmation' && (
            <div className="flex-1 overflow-y-auto p-6 space-y-6 text-center">
              <div className="w-14 h-14 rounded-full bg-[#D7E3D4] border border-[#899588] mx-auto flex items-center justify-center text-[#2F402E]">
                <Check className="w-7 h-7 text-[#566156]" />
              </div>

              <div className="space-y-2">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-[#899588]">
                  Tribute Coordination Confirmed
                </span>
                <h3 className="font-serif text-2xl text-[#343835] font-normal">
                  Thank You, {senderName || 'Dear Friend'}
                </h3>
                <p className="text-xs text-[#566156] max-w-sm mx-auto leading-relaxed">
                  Your tribute for <strong>Margaret Williams</strong> has been registered with Willow & Pine Funeral Home.
                </p>
              </div>

              {/* Commemorative receipt slip */}
              <div className="p-5 bg-[#FBF9F4] border border-[#E6E1D7] rounded-[4px] text-left space-y-3 shadow-xs text-xs">
                <div className="flex items-center justify-between border-b border-[#E6E1D7] pb-2">
                  <span className="font-semibold uppercase tracking-wider text-[#1B1C19] text-[10px]">
                    Official Confirmation
                  </span>
                  <span className="font-serif font-medium text-[#A58A6D]">{orderNumber}</span>
                </div>

                <div className="space-y-1 text-[#444844]">
                  <div>
                    <span className="font-medium text-[#1B1C19]">Honoree: </span>
                    <span>Margaret Williams (1942 – 2026)</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1B1C19]">Service Date: </span>
                    <span>Saturday, Nov 7, 2026 at 11:00 AM</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1B1C19]">Location: </span>
                    <span>Willow & Pine Funeral Home, Chapel of the Pines</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1B1C19]">Tributes Ordered: </span>
                    <span>{items.length} arrangement(s)</span>
                  </div>
                  <div>
                    <span className="font-medium text-[#1B1C19]">Placement Window: </span>
                    <span>Saturday morning by 9:30 AM CST</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E6E1D7] flex items-center justify-between text-xs font-serif font-semibold text-[#343835]">
                  <span>Total Amount:</span>
                  <span>${subtotal}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="w-full py-2.5 px-4 rounded-[4px] border border-[#B7A99A] text-[#343835] hover:bg-[#F2EFEA] text-xs font-medium tracking-wide transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#899588]" />
                  <span>Print Memorial Tribute Receipt</span>
                </button>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 px-4 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] text-xs uppercase tracking-wider font-medium transition cursor-pointer"
                >
                  Return to Serene Remembrance
                </button>
              </div>
            </div>
          )}

          {/* Cart Footer Bar with Subtotal */}
          {checkoutStep === 'cart' && items.length > 0 && (
            <div className="p-6 border-t border-[#E6E1D7] bg-[#FBF9F4] space-y-4">
              <div className="space-y-1.5 text-xs text-[#444844]">
                <div className="flex justify-between">
                  <span>Arrangement Subtotal</span>
                  <span className="font-serif font-medium text-[#1B1C19]">${subtotal}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#899588]">
                  <span>Chapel Placement & Escort</span>
                  <span>Complimentary</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#899588]">
                  <span>Archival Sympathy Card</span>
                  <span>Included</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#E6E1D7] text-sm font-serif font-medium text-[#343835]">
                  <span>Total Tribute</span>
                  <span>${subtotal}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-[4px] bg-[#343835] text-[#F8F6F1] hover:bg-[#4A504B] transition text-xs uppercase tracking-[0.08em] font-medium cursor-pointer shadow-xs flex items-center justify-center gap-2"
              >
                <span>Proceed to Tribute Coordination</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#899588]" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
