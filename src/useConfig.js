import { useState, useEffect } from 'react';

// 默认配置
const defaultConfig = {
  protocol: 'http',
  ip: '192.168.31.84',
  port: '8629'
};

export const useConfig = () => {
  const [config, setConfig] = useState(defaultConfig);
  const [isElectron, setIsElectron] = useState(false);

  useEffect(() => {
    // 检查是否在 Electron 环境中
    if (window.electronAPI) {
      setIsElectron(true);
      loadElectronConfig();
    } else {
      loadWebConfig();
    }
  }, []);

  // 从 Electron 加载配置
  const loadElectronConfig = async () => {
    try {
      const savedConfig = await window.electronAPI.loadConfig();
      if (savedConfig && Object.keys(savedConfig).length > 0) {
        setConfig({ ...defaultConfig, ...savedConfig });
      }
    } catch (error) {
      console.error('加载 Electron 配置失败:', error);
    }
  };

  // 从 localStorage 加载配置
  const loadWebConfig = () => {
    try {
      const savedConfig = localStorage.getItem('gemini-chat-config');
      if (savedConfig) {
        const parsedConfig = JSON.parse(savedConfig);
        setConfig({ ...defaultConfig, ...parsedConfig });
      }
    } catch (error) {
      console.error('加载 Web 配置失败:', error);
    }
  };

  // 保存配置
  const saveConfig = async (newConfig) => {
    try {
      setConfig(newConfig);
      
      if (isElectron && window.electronAPI) {
        // 在 Electron 中保存到文件
        const success = await window.electronAPI.saveConfig(newConfig);
        if (success) {
          console.log('配置已保存到文件');
        } else {
          console.error('保存配置到文件失败');
        }
      } else {
        // 在 Web 中保存到 localStorage
        localStorage.setItem('gemini-chat-config', JSON.stringify(newConfig));
        console.log('配置已保存到 localStorage');
      }
      
      return true;
    } catch (error) {
      console.error('保存配置失败:', error);
      return false;
    }
  };

  // 获取配置文件路径（仅 Electron）
  const getConfigPath = async () => {
    if (isElectron && window.electronAPI) {
      try {
        return await window.electronAPI.getConfigPath();
      } catch (error) {
        console.error('获取配置路径失败:', error);
        return null;
      }
    }
    return null;
  };

  return {
    config,
    saveConfig,
    getConfigPath,
    isElectron
  };
};