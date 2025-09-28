import React, { useState } from 'react';
import Navbar from './Navbar';
import { MapPin, Sprout, Mountain, Droplets, ArrowRight } from 'lucide-react';

interface CropPredictionProps {
  user: any;
  onLogout: () => void;
  onNavigate: (screen: string) => void;
}

export default function CropPrediction({ user, onLogout, onNavigate }: CropPredictionProps) {
  const [formData, setFormData] = useState({
    state: 'Odisha',
    district: '',
    village: '',
    pincode: '',
    farmSize: '',
    unit: 'Hectare',
    cropName: '',
    variety: '',
    sowingDate: '',
    season: '',
    soilType: '',
    fertilizerType: '',
    soilPH: '',
    organicCarbon: '',
    irrigationSource: '',
    irrigationFrequency: '',
    waterAvailability: ''
  });

  // District options based on state
  const getDistrictsForState = (_state: string) => {
    const districts: string[] = ['Bhubaneswar', 'Cuttack', 'Puri', 'Balasore', 'Bhadrak', 'Jajpur', 'Kendrapada', 'Jagatsinghpur', 'Khordha', 'Nayagarh', 'Ganjam', 'Gajapati', 'Koraput', 'Rayagada', 'Malkangiri', 'Nabarangpur', 'Nuapada', 'Kalahandi', 'Bargarh', 'Sambalpur', 'Jharsuguda', 'Sundargarh', 'Deogarh', 'Angul', 'Dhenkanal', 'Keonjhar', 'Mayurbhanj', 'Balangir', 'Sonepur', 'Boudh'];
    return districts;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      // Reset district when state changes
      if (field === 'state') {
        newData.district = '';
      }
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    alert('Predicted Yield: ' + result.predicted_yield);
    // Optionally, navigate or update state with result
    onNavigate('dashboard');
  } catch (error) {
    alert('Error predicting yield: ' + error);
  }
};

  return (
    <div className="min-h-screen">
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        onNavigate={onNavigate}
        activeTab="crop-prediction"
      />
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-green-800">Crop Yield Prediction</h1>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            AI-Powered Analysis
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Farm Details Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Farm Details</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Basic information about your farm location and size</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="Odisha">Odisha</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  District <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => handleInputChange('district', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                  disabled={!formData.state}
                >
                  <option value="">{formData.state ? 'Select your district' : 'Select state first'}</option>
                  {getDistrictsForState(formData.state).map((district) => (
                    <option key={district} value={district}>{district}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Village/Area</label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleInputChange('village', e.target.value)}
                  placeholder="Enter village name"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Pincode</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Enter pincode"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Farm Size <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange('farmSize', e.target.value)}
                  placeholder="Enter farm size"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => handleInputChange('unit', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                >
                  <option value="Hectare">Hectare</option>
                  <option value="Acre">Acre</option>
                  <option value="Bigha">Bigha</option>
                </select>
              </div>
            </div>
          </div>

          {/* Crop Information Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Sprout className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Crop Information</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Details about the crop you want to predict</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crop Name <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.cropName}
                  onChange={(e) => handleInputChange('cropName', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="">Select crop</option>
                  <option value="Rice">Rice</option>
                  <option value="Wheat">Wheat</option>
                  <option value="Maize">Maize</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Sugarcane">Sugarcane</option>
                  <option value="Soybean">Soybean</option>
                  <option value="Groundnut">Groundnut</option>
                  <option value="Mustard">Mustard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Variety/Seed Type</label>
                <select
                  value={formData.variety}
                  onChange={(e) => handleInputChange('variety', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Select variety</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Traditional">Traditional</option>
                  <option value="High Yield">High Yield</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sowing Date</label>
                <input
                  type="date"
                  value={formData.sowingDate}
                  onChange={(e) => handleInputChange('sowingDate', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Season <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.season}
                  onChange={(e) => handleInputChange('season', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="">Select season</option>
                  <option value="Kharif">Kharif</option>
                  <option value="Rabi">Rabi</option>
                  <option value="Summer">Summer</option>
                </select>
              </div>
            </div>
          </div>

          {/* Soil & Inputs Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Mountain className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Soil & Inputs</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Information about your soil type and fertilizer usage</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Soil Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.soilType}
                  onChange={(e) => handleInputChange('soilType', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="">Select soil type</option>
                  <option value="Clay">Clay</option>
                  <option value="Sandy">Sandy</option>
                  <option value="Loamy">Loamy</option>
                  <option value="Red Soil">Red Soil</option>
                  <option value="Black Soil">Black Soil</option>
                  <option value="Alluvial">Alluvial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fertilizer Used</label>
                <select
                  value={formData.fertilizerType}
                  onChange={(e) => handleInputChange('fertilizerType', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Select fertilizer type</option>
                  <option value="Organic">Organic</option>
                  <option value="NPK">NPK</option>
                  <option value="Urea">Urea</option>
                  <option value="DAP">DAP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soil pH Level (Optional)</label>
                <input
                  type="number"
                  value={formData.soilPH}
                  onChange={(e) => handleInputChange('soilPH', e.target.value)}
                  placeholder="e.g., 6.5"
                  step="0.1"
                  min="0"
                  max="14"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Organic Carbon % (Optional)</label>
                <input
                  type="number"
                  value={formData.organicCarbon}
                  onChange={(e) => handleInputChange('organicCarbon', e.target.value)}
                  placeholder="e.g., 0.75"
                  step="0.01"
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Irrigation & Water Section */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-4">
              <Droplets className="w-5 h-5 text-gray-600" />
              <h2 className="text-lg font-semibold text-gray-800">Irrigation & Water</h2>
            </div>
            <p className="text-gray-600 text-sm mb-6">Water management and irrigation details</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Irrigation Source <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.irrigationSource}
                  onChange={(e) => handleInputChange('irrigationSource', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="">Select irrigation source</option>
                  <option value="Tube Well">Tube Well</option>
                  <option value="Canal">Canal</option>
                  <option value="Rain-fed">Rain-fed</option>
                  <option value="Drip Irrigation">Drip Irrigation</option>
                  <option value="Sprinkler">Sprinkler</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Irrigation Frequency <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.irrigationFrequency}
                  onChange={(e) => handleInputChange('irrigationFrequency', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                  required
                >
                  <option value="">Select frequency</option>
                  <option value="Daily">Daily</option>
                  <option value="Every 2 days">Every 2 days</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Water Availability</label>
                <select
                  value={formData.waterAvailability}
                  onChange={(e) => handleInputChange('waterAvailability', e.target.value)}
                  className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-gray-50"
                >
                  <option value="">Select water availability</option>
                  <option value="Good">Good</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Poor">Poor</option>
                </select>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2"
            >
              <span>Predict Yield</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}