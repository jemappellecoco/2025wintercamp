import React, { useRef, useState } from 'react';
import { CAMP_SESSIONS, GENERAL_INFO } from './constants';
import CampCard from './components/CampCard';
import RegistrationForm from './components/RegistrationForm';
import ChatWidget from './components/ChatWidget';
import { MapPin, Clock, Phone, Mail, ArrowDown } from 'lucide-react';

function App() {
  const formRef = useRef<HTMLDivElement>(null);
  const [selectedSessionForForm, setSelectedSessionForForm] = useState<string | undefined>(undefined);

  const scrollToForm = (sessionId?: string) => {
    if (sessionId) setSelectedSessionForForm(sessionId);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-900 text-white pt-24 pb-32 overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 bg-yellow-400 text-yellow-900 font-bold rounded-full mb-6 text-sm tracking-wide shadow-lg animate-bounce">
            2025 冬令營現正熱烈報名中 🔥
          </span>
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight drop-shadow-lg">
            點石書屋<br className="md:hidden" />・雙語冬令營
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            給孩子一個不一樣的冬天！結合故事創作、歐洲文化探索與古文明智慧，
            在沉浸式雙語環境中，開啟跨領域的學習之旅。
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToForm()}
              className="px-8 py-4 bg-white text-indigo-900 font-bold rounded-full shadow-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1"
            >
              立即報名
            </button>
            <a 
              href="#sessions"
              className="px-8 py-4 bg-indigo-700/50 text-white font-bold rounded-full border border-indigo-400/30 hover:bg-indigo-700 transition-all backdrop-blur-sm"
            >
              了解課程
            </a>
          </div>
        </div>
        
        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-gray-50 fill-current">
              <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,154.7C960,171,1056,181,1152,165.3C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
        </div>
      </header>

      {/* Info Cards */}
      <div className="container mx-auto px-4 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-orange-400 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">上課時間</h3>
            <p className="text-sm text-gray-600">{GENERAL_INFO.time}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-sky-400 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-sky-100 text-sky-600 rounded-full flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">上課地點</h3>
            <p className="text-sm text-gray-600">{GENERAL_INFO.location}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border-b-4 border-emerald-400 flex flex-col items-center text-center">
             <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
              <ArrowDown className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">超值優惠</h3>
            <p className="text-sm text-gray-600">多梯次與早鳥優惠<br/>詳情請往下查看</p>
          </div>
        </div>
      </div>

      {/* Main Sessions Content */}
      <section id="sessions" className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">精彩主題梯次</h2>
            <div className="w-24 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600">點選「查看課表」了解每日詳細安排</p>
          </div>

          {CAMP_SESSIONS.map(session => (
            <CampCard 
              key={session.id} 
              session={session} 
              onRegister={scrollToForm}
            />
          ))}
        </div>
      </section>

      {/* Registration Section */}
      <section ref={formRef} className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
           <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4">線上報名</h2>
            <p className="text-indigo-200">名額有限，請盡早填寫資料預約席次</p>
          </div>
          
          <RegistrationForm preSelectedSessionId={selectedSessionForForm} />
          
          <div className="mt-12 text-center text-indigo-300 text-sm">
            <p className="mb-2">匯款帳號將於報名成功後發送至您的信箱</p>
            <p>如有任何疑問，歡迎使用右下角 AI 小幫手查詢</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-white text-2xl font-bold mb-6">點石書屋</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> 03-123-4567
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" /> contact@stonebooks.com.tw
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" /> {GENERAL_INFO.location}
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-sm">
            &copy; 2025 點石書屋. All Rights Reserved.
          </div>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;
