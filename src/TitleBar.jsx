import React, { useState, useEffect } from 'react';
import { Minus, Square, X, Maximize2, Minimize2 } from 'lucide-react';
import './TitleBar.css';

const TitleBar = () => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // 检查是否在 Electron 环境中
    if (window.electronAPI) {
      setIsElectron(true);
      
      // 检查窗口是否已最大化
      window.electronAPI.isWindowMaximized().then(setIsMaximized);
    }
  }, []);

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow();
    }
  };

  const handleMaximize = async () => {
    if (window.electronAPI) {
      await window.electronAPI.maximizeWindow();
      const maximized = await window.electronAPI.isWindowMaximized();
      setIsMaximized(maximized);
    }
  };

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow();
    }
  };

  // 如果不在 Electron 环境中，不显示标题栏
  if (!isElectron) {
    return null;
  }

  return (
    <div className="custom-title-bar">
      <div className="title-bar-content">
        <div className="title-bar-title">
          <span>Gemini Chat - Discord Like</span>
        </div>
        <div className="title-bar-controls">
          <button 
            className="title-bar-button minimize"
            onClick={handleMinimize}
            title="最小化"
          >
            <Minus size={14} />
          </button>
          <button 
            className="title-bar-button maximize"
            onClick={handleMaximize}
            title={isMaximized ? "还原" : "最大化"}
          >
            {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
          </button>
          <button 
            className="title-bar-button close"
            onClick={handleClose}
            title="关闭"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleBar;