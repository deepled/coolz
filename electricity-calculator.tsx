import React, { useState } from 'react';

const ElectricityCalculator = () => {
  const [amounts, setAmounts] = useState({
    counterFridge: '',
    freezerVitrine: '',
    coolingRoom: '',
    freezingRoom: ''
  });

  // מחירי היחידות
  const prices = {
    counterFridge: 77,     // ₪ לחודש
    freezerVitrine: 330,   // ₪ לחודש
    coolingRoom: 480,      // ₪ לחודש
    freezingRoom: 1200     // ₪ לחודש
  };

  // עדכון כמויות
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAmounts(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // חישוב עלויות
  const calculateCosts = () => {
    const costs = {
      counterFridge: (parseInt(amounts.counterFridge) || 0) * prices.counterFridge,
      freezerVitrine: (parseInt(amounts.freezerVitrine) || 0) * prices.freezerVitrine,
      coolingRoom: (parseInt(amounts.coolingRoom) || 0) * prices.coolingRoom,
      freezingRoom: (parseInt(amounts.freezingRoom) || 0) * prices.freezingRoom
    };

    const totalMonthlyCost = Object.values(costs).reduce((sum, cost) => sum + cost, 0);
    const totalDailyCost = totalMonthlyCost / 30;
    const savingsAmount = totalMonthlyCost * 0.3; // חיסכון של 30%

    return {
      itemizedCosts: costs,
      totalMonthlyCost,
      totalDailyCost,
      savingsAmount
    };
  };

  const costs = calculateCosts();

  return (
    <div dir="rtl" className="mx-auto max-w-2xl p-6 bg-blue-50 rounded-lg shadow-lg text-right">
      <h1 className="text-2xl font-bold text-center mb-6 text-blue-800">מחשבון צריכת חשמל למקררים</h1>
      
      <div className="bg-white p-4 rounded-md shadow mb-6">
        <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">הזן כמויות</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">1. מקרר דלפק (77 ₪/חודש)</label>
            <input
              type="number"
              name="counterFridge"
              value={amounts.counterFridge}
              onChange={handleChange}
              min="0"
              placeholder=""
              className="border border-gray-300 rounded p-2 w-20 text-center"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">2. ויטרינה הקפאה (330 ₪/חודש)</label>
            <input
              type="number"
              name="freezerVitrine"
              value={amounts.freezerVitrine}
              onChange={handleChange}
              min="0"
              placeholder=""
              className="border border-gray-300 rounded p-2 w-20 text-center"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">3. חדר קירור (480 ₪/חודש)</label>
            <input
              type="number"
              name="coolingRoom"
              value={amounts.coolingRoom}
              onChange={handleChange}
              min="0"
              placeholder=""
              className="border border-gray-300 rounded p-2 w-20 text-center"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <label className="font-medium text-gray-700">4. חדר הקפאה (1,200 ₪/חודש)</label>
            <input
              type="number"
              name="freezingRoom"
              value={amounts.freezingRoom}
              onChange={handleChange}
              min="0"
              placeholder=""
              className="border border-gray-300 rounded p-2 w-20 text-center"
            />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-700 text-center">עלויות</h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>מקרר דלפק:</span>
            <span className="font-medium">{costs.itemizedCosts.counterFridge.toLocaleString()} ₪</span>
          </div>
          <div className="flex justify-between">
            <span>ויטרינה הקפאה:</span>
            <span className="font-medium">{costs.itemizedCosts.freezerVitrine.toLocaleString()} ₪</span>
          </div>
          <div className="flex justify-between">
            <span>חדר קירור:</span>
            <span className="font-medium">{costs.itemizedCosts.coolingRoom.toLocaleString()} ₪</span>
          </div>
          <div className="flex justify-between">
            <span>חדר הקפאה:</span>
            <span className="font-medium">{costs.itemizedCosts.freezingRoom.toLocaleString()} ₪</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <div className="flex justify-between text-lg">
            <span className="font-bold">סה"כ עלות יומית:</span>
            <span className="font-bold">{costs.totalDailyCost.toFixed(2)} ₪</span>
          </div>
          <div className="flex justify-between text-xl text-blue-800">
            <span className="font-bold">סה"כ עלות חודשית:</span>
            <span className="font-bold">{costs.totalMonthlyCost.toLocaleString()} ₪</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-green-100 rounded-md shadow">
        <div className="flex justify-between text-lg text-green-800">
          <span className="font-bold">כמה Coolz יוכל לחסוך לך?</span>
          <span className="font-bold">{costs.savingsAmount.toLocaleString()} ₪</span>
        </div>
      </div>
      
      <div className="mt-6 text-xs text-gray-600 text-center">
        * החישובים מבוססים על תעריף של 0.64 ₪ לקילו-וואט כולל מע"מ
      </div>
    </div>
  );
};

export default ElectricityCalculator;
