'use client';

import { useState, useRef } from 'react';
import { Download, Palette, Type, Settings } from 'lucide-react';

interface IconConfig {
  mainText: string;
  logoText: string;
  primaryColor: string;
  auxiliaryColor: string;
  backgroundColor: string;
  contrast: number;
  strokeWidth: number;
  shadowIntensity: number;
  borderRadius: number;
  layoutType: 'horizontal' | 'vertical' | 'stacked';
}

const presetStyles = {
  pornhub: {
    name: 'PornHub风格',
    primaryColor: '#ff9000',
    auxiliaryColor: '#ffffff',
    backgroundColor: '#000000',
    contrast: 100,
    strokeWidth: 2,
    shadowIntensity: 20,
    borderRadius: 4,
    layoutType: 'horizontal' as const
  },
  youtube: {
    name: 'YouTube风格',
    primaryColor: '#ff0000',
    auxiliaryColor: '#ffffff',
    backgroundColor: '#ffffff',
    contrast: 100,
    strokeWidth: 1,
    shadowIntensity: 10,
    borderRadius: 8,
    layoutType: 'horizontal' as const
  },
  modern: {
    name: '现代风格',
    primaryColor: '#3b82f6',
    auxiliaryColor: '#ffffff',
    backgroundColor: '#1f2937',
    contrast: 90,
    strokeWidth: 1,
    shadowIntensity: 15,
    borderRadius: 12,
    layoutType: 'horizontal' as const
  }
};

export default function IconGenerator() {
  const [config, setConfig] = useState<IconConfig>({
    mainText: 'Brand',
    logoText: 'Logo',
    primaryColor: '#ff9000',
    auxiliaryColor: '#ffffff',
    backgroundColor: '#000000',
    contrast: 100,
    strokeWidth: 2,
    shadowIntensity: 20,
    borderRadius: 4,
    layoutType: 'horizontal'
  });

  const [selectedStyle, setSelectedStyle] = useState('pornhub');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const updateConfig = (updates: Partial<IconConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const applyPresetStyle = (styleKey: string) => {
    const style = presetStyles[styleKey as keyof typeof presetStyles];
    if (style) {
      setSelectedStyle(styleKey);
      updateConfig({
        primaryColor: style.primaryColor,
        auxiliaryColor: style.auxiliaryColor,
        backgroundColor: style.backgroundColor,
        contrast: style.contrast,
        strokeWidth: style.strokeWidth,
        shadowIntensity: style.shadowIntensity,
        borderRadius: style.borderRadius,
        layoutType: style.layoutType
      });
    }
  };

  const generateSVG = () => {
    const { mainText, logoText, primaryColor, auxiliaryColor, backgroundColor, borderRadius, shadowIntensity } = config;
    
    return `
      <svg width="300" height="120" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="${shadowIntensity / 10}" flood-opacity="0.3"/>
          </filter>
        </defs>
        <rect width="300" height="120" rx="${borderRadius}" fill="${backgroundColor}" filter="url(#shadow)"/>
        <text x="30" y="45" font-family="Arial, sans-serif" font-size="24" font-weight="bold" fill="${auxiliaryColor}">${mainText}</text>
        <rect x="200" y="25" width="70" height="30" rx="${borderRadius / 2}" fill="${primaryColor}"/>
        <text x="235" y="44" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="${backgroundColor}" text-anchor="middle">${logoText}</text>
        <text x="30" y="75" font-family="Arial, sans-serif" font-size="10" fill="${auxiliaryColor}" opacity="0.7">风格: ${presetStyles[selectedStyle as keyof typeof presetStyles]?.name || '自定义'}</text>
        <text x="30" y="90" font-family="Arial, sans-serif" font-size="10" fill="${auxiliaryColor}" opacity="0.7">文本: "${mainText}" + "${logoText}"</text>
      </svg>
    `;
  };

  const exportIcon = () => {
    const svg = generateSVG();
    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.mainText}-${config.logoText}-icon.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">品牌标识生成器</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            创建类似YouTube、PornHub风格的品牌标识，支持自定义文本、颜色和布局，实时预览并导出高质量的SVG标识
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Style Selection */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Palette className="w-5 h-5 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">选择风格</h2>
            </div>
            
            <div className="space-y-3">
              {Object.entries(presetStyles).map(([key, style]) => (
                <button
                  key={key}
                  onClick={() => applyPresetStyle(key)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedStyle === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">{style.name}</span>
                    <div className="flex space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: style.primaryColor }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: style.backgroundColor }}
                      />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Parameter Settings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Settings className="w-5 h-5 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">参数调整</h2>
            </div>

            <div className="space-y-6">
              {/* Text Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">主文本</label>
                <input
                  type="text"
                  value={config.mainText}
                  onChange={(e) => updateConfig({ mainText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Brand"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标签文本</label>
                <input
                  type="text"
                  value={config.logoText}
                  onChange={(e) => updateConfig({ logoText: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Logo"
                />
              </div>

              {/* Color Inputs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">主色调</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.primaryColor}
                    onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">辅助色</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.auxiliaryColor}
                    onChange={(e) => updateConfig({ auxiliaryColor: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.auxiliaryColor}
                    onChange={(e) => updateConfig({ auxiliaryColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">背景色</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                  />
                  <input
                    type="text"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Sliders */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  对比度: {config.contrast}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={config.contrast}
                  onChange={(e) => updateConfig({ contrast: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  线条粗细: {config.strokeWidth}px
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={config.strokeWidth}
                  onChange={(e) => updateConfig({ strokeWidth: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  阴影强度: {config.shadowIntensity}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={config.shadowIntensity}
                  onChange={(e) => updateConfig({ shadowIntensity: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  圆角半径: {config.borderRadius}px
                </label>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={config.borderRadius}
                  onChange={(e) => updateConfig({ borderRadius: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>

              {/* Layout Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">布局类型</label>
                <div className="grid grid-cols-3 gap-2">
                  {['horizontal', 'vertical', 'stacked'].map((layout) => (
                    <button
                      key={layout}
                      onClick={() => updateConfig({ layoutType: layout as any })}
                      className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                        config.layoutType === layout
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {layout === 'horizontal' ? '横版' : layout === 'vertical' ? '竖版' : '位标式'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Preview and Export */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Type className="w-5 h-5 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">预览和导出</h2>
            </div>

            {/* Preview */}
            <div className="mb-6">
              <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center">
                <div 
                  dangerouslySetInnerHTML={{ __html: generateSVG() }}
                  className="transform hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>

            {/* Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">
                <strong>风格:</strong> {presetStyles[selectedStyle as keyof typeof presetStyles]?.name || '自定义'}
              </p>
              <p className="text-sm text-gray-600 mb-2">
                <strong>布局:</strong> {config.layoutType === 'horizontal' ? '横版' : config.layoutType === 'vertical' ? '竖版' : '位标式'}
              </p>
              <p className="text-sm text-gray-600">
                <strong>文本:</strong> "{config.mainText}" + "{config.logoText}"
              </p>
            </div>

            {/* Export Button */}
            <button
              onClick={exportIcon}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span>导出品牌标识</span>
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              导出为高质量SVG格式，支持无损缩放
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}