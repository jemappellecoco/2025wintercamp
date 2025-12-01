import React, { useState } from 'react';
import { CAMP_SESSIONS } from '../constants';
import { FormData, RegistrationStatus } from '../types';
import { Check, Loader2 } from 'lucide-react';

interface Props {
  preSelectedSessionId?: string;
}

const RegistrationForm: React.FC<Props> = ({ preSelectedSessionId }) => {
  const [status, setStatus] = useState<RegistrationStatus>(RegistrationStatus.IDLE);
  const [formData, setFormData] = useState<FormData>({
    parentName: '',
    studentName: '',
    studentAge: '',
    phone: '',
    email: '',
    selectedSessions: preSelectedSessionId ? [preSelectedSessionId] : [],
    remarks: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (sessionId: string) => {
    setFormData(prev => {
      const current = prev.selectedSessions;
      if (current.includes(sessionId)) {
        return { ...prev, selectedSessions: current.filter(id => id !== sessionId) };
      } else {
        return { ...prev, selectedSessions: [...current, sessionId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.selectedSessions.length === 0) {
      alert("請至少選擇一個梯次");
      return;
    }
    
    setStatus(RegistrationStatus.SUBMITTING);

    // Simulate API call
    setTimeout(() => {
      setStatus(RegistrationStatus.SUCCESS);
      console.log('Submitted Data:', formData);
    }, 1500);
  };

  if (status === RegistrationStatus.SUCCESS) {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center py-16">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="w-10 h-10" />
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-4">報名成功！</h3>
        <p className="text-gray-600 text-lg mb-8">感謝您的報名，我們會盡快透過 Email 或電話與您聯繫後續繳費事宜。</p>
        <button 
          onClick={() => {
            setStatus(RegistrationStatus.IDLE);
            setFormData({
              parentName: '',
              studentName: '',
              studentAge: '',
              phone: '',
              email: '',
              selectedSessions: [],
              remarks: ''
            });
          }}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-indigo-700 transition"
        >
          填寫下一位
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-2xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-gray-700 font-bold mb-2">家長姓名 <span className="text-red-500">*</span></label>
          <input 
            type="text" name="parentName" required 
            value={formData.parentName} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="請輸入家長姓名"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">學員姓名 <span className="text-red-500">*</span></label>
          <input 
            type="text" name="studentName" required 
            value={formData.studentName} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="請輸入小朋友姓名"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">學員年級/年齡 <span className="text-red-500">*</span></label>
          <input 
            type="text" name="studentAge" required 
            value={formData.studentAge} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="例如：小學三年級"
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">聯絡電話 <span className="text-red-500">*</span></label>
          <input 
            type="tel" name="phone" required 
            value={formData.phone} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="0912-345-678"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-gray-700 font-bold mb-2">電子信箱 <span className="text-red-500">*</span></label>
          <input 
            type="email" name="email" required 
            value={formData.email} onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
            placeholder="example@email.com"
          />
        </div>
      </div>

      <div className="mb-8 bg-indigo-50 p-6 rounded-xl">
        <label className="block text-indigo-900 font-bold mb-4 text-lg">選擇報名梯次 <span className="text-red-500">*</span></label>
        <div className="space-y-3">
          {CAMP_SESSIONS.map(session => (
            <label key={session.id} className="flex items-center p-3 bg-white rounded-lg border border-indigo-100 hover:border-indigo-300 cursor-pointer transition">
              <input 
                type="checkbox" 
                checked={formData.selectedSessions.includes(session.id)}
                onChange={() => handleCheckboxChange(session.id)}
                className="w-5 h-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-3 font-medium text-gray-800 flex-1">
                {session.title}
              </span>
              <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                ${session.price.toLocaleString()}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-gray-700 font-bold mb-2">備註事項</label>
        <textarea 
          name="remarks"
          value={formData.remarks} onChange={handleChange}
          rows={3}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
          placeholder="如有特殊飲食需求或過敏體質，請在此告知..."
        />
      </div>

      <button 
        type="submit" 
        disabled={status === RegistrationStatus.SUBMITTING}
        className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl py-4 rounded-xl shadow-lg hover:shadow-xl transform active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {status === RegistrationStatus.SUBMITTING ? (
          <>
            <Loader2 className="animate-spin mr-2" /> 處理中...
          </>
        ) : '送出報名表'}
      </button>
    </form>
  );
};

export default RegistrationForm;
