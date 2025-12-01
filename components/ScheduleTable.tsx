import React from 'react';
import { ScheduleRow } from '../types';

interface ScheduleTableProps {
  schedule: ScheduleRow[];
  colorTheme: string;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule, colorTheme }) => {
  // Map color theme to actual tailwind classes safely
  const headerBg = {
    orange: 'bg-orange-100 text-orange-900',
    sky: 'bg-sky-100 text-sky-900',
    emerald: 'bg-emerald-100 text-emerald-900',
  }[colorTheme] || 'bg-gray-100 text-gray-900';

  const borderColor = {
    orange: 'border-orange-200',
    sky: 'border-sky-200',
    emerald: 'border-emerald-200',
  }[colorTheme] || 'border-gray-200';

  return (
    <div className={`overflow-x-auto rounded-lg border ${borderColor} shadow-sm`}>
      <table className="min-w-[800px] w-full text-sm text-left">
        <thead className={`${headerBg} uppercase font-bold`}>
          <tr>
            <th className="px-4 py-3">時間</th>
            <th className="px-4 py-3">週一</th>
            <th className="px-4 py-3">週二</th>
            <th className="px-4 py-3">週三</th>
            <th className="px-4 py-3">週四</th>
            <th className="px-4 py-3">週五</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {schedule.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap bg-gray-50/50">
                {row.time}
              </td>
              <td className="px-4 py-3 text-gray-700 whitespace-pre-line">{row.mon}</td>
              <td className="px-4 py-3 text-gray-700 whitespace-pre-line">{row.tue}</td>
              <td className="px-4 py-3 text-gray-700 whitespace-pre-line">{row.wed}</td>
              <td className="px-4 py-3 text-gray-700 whitespace-pre-line">{row.thu}</td>
              <td className="px-4 py-3 text-gray-700 font-medium text-indigo-600 whitespace-pre-line">
                {row.fri}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable;