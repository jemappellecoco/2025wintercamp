import React, { useState } from 'react';
import { CampSession } from '../types';
import ScheduleTable from './ScheduleTable';
import { ChevronDown, ChevronUp, CheckCircle, Calendar, MapPin } from 'lucide-react';

interface CampCardProps {
  session: CampSession;
  onRegister: (sessionId: string) => void;
}

const CampCard: React.FC<CampCardProps> = ({ session, onRegister }) => {
  const [showSchedule, setShowSchedule] = useState(false);

  // Dynamic classes based on theme
  const themeClasses = {
    orange: { btn: 'bg-orange-600 hover:bg-orange-700', text: 'text-orange-600', bg: 'bg-orange-50' },
    sky: { btn: 'bg-sky-600 hover:bg-sky-700', text: 'text-sky-600', bg: 'bg-sky-50' },
    emerald: { btn: 'bg-emerald-600 hover:bg-emerald-700', text: 'text-emerald-600', bg: 'bg-emerald-50' },
  }[session.colorTheme] || { btn: 'bg-gray-600', text: 'text-gray-600', bg: 'bg-gray-50' };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 transition-all hover:shadow-2xl mb-12">
      <div className="md:flex">
        <div className="md:w-1/3 relative h-64 md:h-auto">
          <img 
            src={session.image} 
            alt={session.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-0 left-0 bg-black/60 text-white px-4 py-2 rounded-br-lg backdrop-blur-sm">
            {session.date}
          </div>
        </div>
        <div className="md:w-2/3 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <h3 className={`text-2xl font-bold mb-2 ${themeClasses.text}`}>{session.title}</h3>
            <p className="text-gray-600 font-medium mb-4 italic">{session.subtitle}</p>
            
            <p className="text-gray-700 mb-6 leading-relaxed">{session.description}</p>

            <div className="mb-6">
              <h4 className="font-bold text-gray-900 mb-3 flex items-center">
                <CheckCircle className={`w-5 h-5 mr-2 ${themeClasses.text}`} />
                課程亮點
              </h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {session.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start text-sm text-gray-600">
                    <span className={`mr-2 mt-1 w-1.5 h-1.5 rounded-full ${themeClasses.btn}`}></span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
            <div className="text-center sm:text-left">
              <span className="block text-sm text-gray-500">費用</span>
              <span className={`text-3xl font-bold ${themeClasses.text}`}>NT$ {session.price.toLocaleString()}</span>
            </div>
            
            <div className="flex gap-3 w-full sm:w-auto">
              <button 
                onClick={() => setShowSchedule(!showSchedule)}
                className="flex-1 sm:flex-none flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                {showSchedule ? '隱藏課表' : '查看課表'}
                {showSchedule ? <ChevronUp className="ml-2 w-4 h-4" /> : <ChevronDown className="ml-2 w-4 h-4" />}
              </button>
              
              <button 
                 onClick={() => { window.location.href = '/2025wintercamp/register.html'; }}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-lg text-white font-bold shadow-md transform active:scale-95 transition-all ${themeClasses.btn}`}
              >
                立即報名
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Dropdown */}
      {showSchedule && (
        <div className={`p-4 md:p-8 border-t border-gray-100 ${themeClasses.bg} animate-fadeIn`}>
          <div className="flex items-center justify-between mb-4">
             <h4 className="font-bold text-gray-800 text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 opacity-70" />
              詳細課表
             </h4>
          </div>
          <ScheduleTable schedule={session.schedule} colorTheme={session.colorTheme} />
          <p className="text-xs text-right text-gray-500 mt-2">* 課表內容可能會依實際狀況微調</p>
        </div>
      )}
    </div>
  );
};

export default CampCard;
