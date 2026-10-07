import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Calendar, 
  Image as ImageIcon, 
  Paperclip, 
  Clock, 
  CheckCheck, 
  CalendarCheck,
  User as UserIcon,
  ChevronLeft
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ChatMessage } from '../types';

export const ChatModal: React.FC = () => {
  const { 
    activeChatId, 
    closeModal, 
    conversations, 
    messages, 
    sendMessage, 
    currentUser, 
    openBookingModal, 
    artists, 
    openChatById 
  } = useApp();

  const [inputText, setInputText] = useState('');
  const [showAttachmentInput, setShowAttachmentInput] = useState(false);
  const [attachmentUrl, setAttachmentUrl] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConv = conversations.find(c => c.id === activeChatId) || conversations[0];
  const chatMessages: ChatMessage[] = (currentConv && messages[currentConv.id]) || [];
  const targetArtist = currentConv ? artists.find(a => a.id === currentConv.artistId) : null;

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  if (!currentConv) return null;

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !attachmentUrl.trim()) return;

    sendMessage(
      currentConv.id, 
      inputText, 
      attachmentUrl.trim() || undefined, 
      attachmentUrl.trim() ? 'image' : undefined
    );

    setInputText('');
    setAttachmentUrl('');
    setShowAttachmentInput(false);

    // Simulate typing indicator before artist reply
    if (currentUser?.role !== 'artist') {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1400);
    }
  };

  const quickReplies = [
    "Are you available for bridal booking this weekend?",
    "Can you travel to my venue in Mumbai?",
    "What organic materials and tools do you use?",
    "Can you share more photos of royal bridal designs?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in">
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto h-[85vh] flex flex-col relative"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white p-3.5 sm:p-4 px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img 
                src={currentConv.artistAvatar} 
                alt={currentConv.artistName} 
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover ring-2 ring-amber-400"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-stone-900"></span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-bold text-sm sm:text-base font-serif-luxury text-amber-100">
                  {currentConv.artistName}
                </h3>
                <span className="flex items-center gap-0.5 px-1.5 py-0.2 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  <span>Pro</span>
                </span>
              </div>
              <div className="text-[11px] text-stone-300 flex items-center gap-2">
                <span>{currentConv.artistCategory}</span>
                <span>•</span>
                <span className="text-emerald-400">● Online & Direct Messenger</span>
              </div>
            </div>
          </div>

          {/* Top Actions */}
          <div className="flex items-center gap-2">
            {targetArtist && (
              <button
                onClick={() => openBookingModal(targetArtist)}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 hover:brightness-105 text-white rounded-full text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Artist</span>
              </button>
            )}

            <button
              onClick={closeModal}
              aria-label="Close chat window"
              className="p-2 text-stone-400 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-conversation tabs if user has chats */}
        {conversations.length > 1 && (
          <div className="bg-stone-100 border-b border-stone-200 px-4 py-1.5 flex items-center gap-2 overflow-x-auto text-xs shrink-0">
            <span className="text-stone-500 text-[10px] font-bold uppercase tracking-wider shrink-0">Chats:</span>
            {conversations.map(c => (
              <button
                key={c.id}
                onClick={() => openChatById(c.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 cursor-pointer transition-colors ${
                  c.id === currentConv.id
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-200 border border-stone-200'
                }`}
              >
                <img src={c.artistAvatar} alt={c.artistName} className="w-4 h-4 rounded-full object-cover" />
                <span>{c.artistName}</span>
              </button>
            ))}
          </div>
        )}

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-amber-50/20">
          
          {/* Security Notice */}
          <div className="max-w-md mx-auto bg-stone-100/90 border border-stone-200/80 rounded-2xl p-2.5 text-center text-[11px] text-stone-500">
            🔒 End-to-end direct messenger with <strong>{currentConv.artistName}</strong>. Discuss date availability, customized bridal themes, and negotiate packages safely.
          </div>

          {chatMessages.map(msg => {
            const isMe = msg.senderRole === (currentUser?.role || 'client');

            return (
              <div 
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} space-y-1`}
              >
                <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[70%]">
                  {!isMe && (
                    <img 
                      src={msg.senderAvatar} 
                      alt={msg.senderName} 
                      className="w-7 h-7 rounded-full object-cover shrink-0 ring-1 ring-amber-400"
                    />
                  )}

                  <div 
                    className={`rounded-2xl p-3.5 text-xs sm:text-sm shadow-xs ${
                      isMe 
                        ? 'bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-br-xs' 
                        : 'bg-white border border-stone-200 text-stone-800 rounded-bl-xs'
                    }`}
                  >
                    {/* Booking Inquiry Card inside chat */}
                    {msg.bookingInquiry && (
                      <div className="mb-2 p-2.5 rounded-xl bg-black/15 border border-white/20 text-xs space-y-1">
                        <div className="font-bold flex items-center gap-1">
                          <CalendarCheck className="w-3.5 h-3.5" />
                          <span>Booking Inquiry: {msg.bookingInquiry.packageName}</span>
                        </div>
                        <div className="text-[11px] opacity-90">
                          Date: {msg.bookingInquiry.date} • Total: ₹{msg.bookingInquiry.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                    )}

                    {/* Image Attachment */}
                    {msg.attachmentUrl && (
                      <div className="mb-2 rounded-xl overflow-hidden border border-black/10 max-h-48">
                        <img 
                          src={msg.attachmentUrl} 
                          alt="Attachment" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}

                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>

                <div className={`text-[10px] text-stone-400 flex items-center gap-1 ${isMe ? 'pr-2' : 'pl-9'}`}>
                  <span>{msg.timestamp}</span>
                  {isMe && <CheckCheck className="w-3 h-3 text-rose-500" />}
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex items-center gap-2 pl-2">
              <img 
                src={currentConv.artistAvatar} 
                alt={currentConv.artistName} 
                className="w-6 h-6 rounded-full object-cover"
              />
              <div className="bg-white border border-stone-200 rounded-full px-3 py-1.5 flex items-center gap-1 shadow-xs">
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Question Chips */}
        <div className="bg-white border-t border-stone-100 px-4 py-2 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[10px] font-bold text-stone-400 uppercase shrink-0">Quick Ask:</span>
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => {
                sendMessage(currentConv.id, reply);
                setIsTyping(true);
                setTimeout(() => setIsTyping(false), 1400);
              }}
              className="px-2.5 py-1 bg-stone-100 hover:bg-rose-50 hover:text-rose-700 text-stone-600 rounded-full text-[11px] font-medium shrink-0 transition-colors border border-stone-200/60 cursor-pointer"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Attachment URL drawer */}
        {showAttachmentInput && (
          <div className="bg-stone-50 border-t border-stone-200 p-3 px-4 flex items-center gap-2">
            <input
              type="url"
              placeholder="Paste image URL to attach reference design..."
              value={attachmentUrl}
              onChange={e => setAttachmentUrl(e.target.value)}
              className="flex-1 p-2 bg-white border border-stone-300 rounded-xl text-xs outline-none"
            />
            <button
              onClick={() => setShowAttachmentInput(false)}
              className="text-xs text-stone-500 hover:text-stone-800"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Chat Input Bar */}
        <form onSubmit={handleSend} className="bg-white border-t border-stone-200 p-3 px-4 flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setShowAttachmentInput(!showAttachmentInput)}
            className="p-2 text-stone-500 hover:text-rose-600 hover:bg-stone-100 rounded-full transition-colors cursor-pointer"
            title="Attach reference photo"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            type="text"
            placeholder={`Message ${currentConv.artistName}...`}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            className="flex-1 py-2.5 px-4 bg-stone-50 focus:bg-white border border-stone-200 focus:border-rose-400 rounded-full text-xs sm:text-sm outline-none transition-all placeholder:text-stone-400"
          />

          <button
            type="submit"
            disabled={!inputText.trim() && !attachmentUrl.trim()}
            className="p-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition-all shadow-sm disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
