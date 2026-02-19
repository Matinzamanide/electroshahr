"use client";
import { useState } from "react";
import { Check } from "lucide-react";

export default function ProductTabs({ description, features }: { description: string, features: any[] }) {
  const [activeTab, setActiveTab] = useState("description");

  return (
    <div className="mt-12 bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <div className="flex border-b border-gray-200 mb-6">
        {['description', 'features'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-lg font-bold transition-all ${activeTab === tab ? "text-blue-800 border-b-4 border-orange-600" : "text-gray-600"}`}>
            {tab === 'description' ? 'توضیحات کامل' : 'مشخصات فنی'}
          </button>
        ))}
      </div>
      <div className="py-4 leading-loose text-gray-700">
        {activeTab === "description" ? (
          <div>{description || "توضیحاتی ثبت نشده است."}</div>
        ) : (
          <ul className="list-none space-y-3">
            {features.map((f: any, i: number) => (
              <li key={i} className="flex items-start gap-3 text-gray-700">
                <Check size={20} className="text-blue-600 shrink-0 mt-1" />
                {typeof f === 'string' ? f : JSON.stringify(f)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}