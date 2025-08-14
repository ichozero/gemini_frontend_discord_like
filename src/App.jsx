import React, { useState, useRef, useEffect } from 'react';
import { Send, Settings, MessageCircle, Wifi, WifiOff, X, Copy, Terminal } from 'lucide-react';
import axios from 'axios';
import TitleBar from './TitleBar';
import { useConfig } from './useConfig';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isClosingSettings, setIsClosingSettings] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [copySuccess, setCopySuccess] = useState({});
  const [longPressTimer, setLongPressTimer] = useState(null);
  const [isSelecting, setIsSelecting] = useState({});
  const [currentView, setCurrentView] = useState('chat'); // 'chat' 或 'logs'
  const [logs, setLogs] = useState([]);
  const [configPath, setConfigPath] = useState(null);
  
  // 使用配置管理 hook
  const { config: apiConfig, saveConfig, getConfigPath, isElectron } = useConfig();
  const [localApiConfig, setLocalApiConfig] = useState(apiConfig);

  const messagesEndRef = useRef(null);
  const logsEndRef = useRef(null);

  // 同步配置
  useEffect(() => {
    setLocalApiConfig(apiConfig);
  }, [apiConfig]);

  // 获取配置文件路径
  useEffect(() => {
    if (isElectron) {
      getConfigPath().then(path => {
        if (path) {
          setConfigPath(path);
          addLog('info', `配置文件路径: ${path}`);
        }
      });
    }
  }, [isElectron, getConfigPath]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollLogsToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    scrollLogsToBottom();
  }, [logs]);

  // 添加日志条目
  const addLog = (type, message) => {
    const logEntry = {
      id: Date.now() + Math.random(),
      type,
      message,
      timestamp: new Date()
    };
    setLogs(prev => [...prev, logEntry]);
  };

  // 拦截console输出
  useEffect(() => {
    const originalConsole = {
      log: console.log,
      warn: console.warn,
      error: console.error,
      info: console.info,
      debug: console.debug
    };

    // 重写console方法
    console.log = (...args) => {
      originalConsole.log(...args);
      addLog('info', args.join(' '));
    };

    console.warn = (...args) => {
      originalConsole.warn(...args);
      addLog('warn', args.join(' '));
    };

    console.error = (...args) => {
      originalConsole.error(...args);
      addLog('error', args.join(' '));
    };

    console.info = (...args) => {
      originalConsole.info(...args);
      addLog('info', args.join(' '));
    };

    console.debug = (...args) => {
      originalConsole.debug(...args);
      addLog('debug', args.join(' '));
    };

    // 拦截网络错误
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        if (!response.ok) {
          addLog('network', `网络请求失败: ${response.status} ${response.statusText} - ${args[0]}`);
        }
        return response;
      } catch (error) {
        addLog('network', `网络错误: ${error.message} - ${args[0]}`);
        throw error;
      }
    };

    // 拦截未捕获的错误
    const handleError = (event) => {
      addLog('error', `未捕获错误: ${event.error?.message || event.message}`);
    };

    const handleUnhandledRejection = (event) => {
      addLog('error', `未处理的Promise拒绝: ${event.reason}`);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    // 清理函数
    return () => {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.error = originalConsole.error;
      console.info = originalConsole.info;
      console.debug = originalConsole.debug;
      window.fetch = originalFetch;
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // 清空日志
  const clearLogs = () => {
    setLogs([]);
  };

  // 格式化时间戳
  const formatLogTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      fractionalSecondDigits: 3
    });
  };

  // 复制文本到剪贴板
  const copyToClipboard = async (text, messageId) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(prev => ({ ...prev, [messageId]: true }));
      setTimeout(() => {
        setCopySuccess(prev => ({ ...prev, [messageId]: false }));
      }, 2000);
    } catch (err) {
      console.error('复制失败:', err);
      // 降级方案
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setCopySuccess(prev => ({ ...prev, [messageId]: true }));
        setTimeout(() => {
          setCopySuccess(prev => ({ ...prev, [messageId]: false }));
        }, 2000);
      } catch (fallbackErr) {
        console.error('降级复制也失败:', fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  // 长按开始
  const handleLongPressStart = (messageId, content) => {
    const timer = setTimeout(() => {
      setIsSelecting(prev => ({ ...prev, [messageId]: true }));
      copyToClipboard(content, messageId);
      // 添加触觉反馈（如果支持）
      if (navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 500); // 500ms长按
    setLongPressTimer(timer);
  };

  // 长按结束
  const handleLongPressEnd = (messageId) => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
    setTimeout(() => {
      setIsSelecting(prev => ({ ...prev, [messageId]: false }));
    }, 200);
  };

  // 测试连接
  const testConnection = async (configToTest = apiConfig) => {
    try {
      const url = `${configToTest.protocol}://${configToTest.ip}:${configToTest.port}/gemini`;
      const response = await axios.post(url, { text: "test" }, { timeout: 5000 });
      setIsConnected(true);
      return true;
    } catch (error) {
      setIsConnected(false);
      addLog('network', `连接测试失败: ${error.message} - ${configToTest.protocol}://${configToTest.ip}:${configToTest.port}/gemini`);
      return false;
    }
  };

  // 发送消息
  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const url = `${apiConfig.protocol}://${apiConfig.ip}:${apiConfig.port}/gemini`;
      const response = await axios.post(url, { 
        text: inputMessage
      }, { 
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.data.answer || '收到回复，但内容为空',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsConnected(true);
      addLog('info', `消息发送成功，收到回复: ${response.data.answer?.substring(0, 50)}...`);
    } catch (error) {
      console.error('发送消息失败:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'error',
        content: `连接失败: ${error.message}`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsConnected(false);
      addLog('network', `发送消息失败: ${error.message} - ${url}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // 处理设置面板关闭动画
  const handleCloseSettings = () => {
    setIsClosingSettings(true);
    setTimeout(() => {
      setShowSettings(false);
      setIsClosingSettings(false);
    }, 400);
  };

  // 处理设置面板打开
  const handleOpenSettings = () => {
    setShowSettings(true);
    setIsClosingSettings(false);
  };

  // 测试API连接
  const handleTestConnection = async () => {
    setTestResult({ type: 'loading', message: '正在测试连接...' });
    
    try {
      const success = await testConnection(localApiConfig);
      if (success) {
        setTestResult({ type: 'success', message: '连接成功！' });
      } else {
        setTestResult({ type: 'error', message: '连接失败，请检查配置' });
      }
    } catch (error) {
      setTestResult({ type: 'error', message: `连接失败: ${error.message}` });
    }
    
    setTimeout(() => setTestResult(null), 3000);
  };

  // 保存设置
  const handleSaveSettings = async () => {
    try {
      const success = await saveConfig(localApiConfig);
      if (success) {
        setTestResult({ type: 'success', message: '设置已保存！' });
        addLog('info', `配置已保存: ${JSON.stringify(localApiConfig)}`);
      } else {
        setTestResult({ type: 'error', message: '保存设置失败' });
      }
    } catch (error) {
      setTestResult({ type: 'error', message: `保存失败: ${error.message}` });
    }
    
    setTimeout(() => setTestResult(null), 3000);
  };

  return (
    <div className={`app ${isElectron ? 'electron-app' : ''}`}>
      {/* 自定义标题栏 */}
      <TitleBar />
      
      {/* 侧边栏 */}
      <div className="sidebar">
        <div className="sidebar-header">
          <MessageCircle size={24} />
          <span>Gemini Chat</span>
        </div>
        
        <div className="channel-list">
          <div 
            className={`channel-item ${currentView === 'chat' ? 'active' : ''}`}
            onClick={() => setCurrentView('chat')}
          >
            <span># 通用聊天</span>
          </div>
          <div 
            className={`channel-item ${currentView === 'logs' ? 'active' : ''}`}
            onClick={() => setCurrentView('logs')}
          >
            <Terminal size={16} />
            <span># 日志输出</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <button 
            className="settings-btn"
            onClick={handleOpenSettings}
          >
            <Settings size={20} />
            设置
          </button>
        </div>
      </div>

      {/* 主聊天区域 */}
      <div className="main-content">
        {/* 顶部栏 */}
        <div className="chat-header">
          <div className="channel-info">
            <span className="channel-name">
              {currentView === 'chat' ? '# 通用聊天' : '# 日志输出'}
            </span>
            <div className="connection-status">
              {isConnected ? (
                <><Wifi size={16} className="connected" /> 已连接</>
              ) : (
                <><WifiOff size={16} className="disconnected" /> 未连接</>
              )}
            </div>
          </div>
          <div className="api-info">
            {apiConfig.protocol}://{apiConfig.ip}:{apiConfig.port}
          </div>
        </div>

        {/* 消息区域或日志区域 */}
        {currentView === 'chat' ? (
          <div className="messages-container">
            {messages.length === 0 && (
              <div className="welcome-message">
                <MessageCircle size={48} />
                <h2>欢迎使用 Gemini Chat</h2>
                <p>开始与 Gemini AI 对话吧！</p>
              </div>
            )}
            
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-header">
                  <span className="username">
                    {message.type === 'user' ? '你' : message.type === 'error' ? '系统' : 'Gemini'}
                  </span>
                  <span className="timestamp">{formatTime(message.timestamp)}</span>
                </div>
                <div 
                  className={`message-content ${isSelecting[message.id] ? 'selecting' : ''}`}
                  onMouseDown={() => handleLongPressStart(message.id, message.content)}
                  onMouseUp={() => handleLongPressEnd(message.id)}
                  onMouseLeave={() => handleLongPressEnd(message.id)}
                  onTouchStart={() => handleLongPressStart(message.id, message.content)}
                  onTouchEnd={() => handleLongPressEnd(message.id)}
                  onTouchCancel={() => handleLongPressEnd(message.id)}
                >
                  {message.content}
                  
                  {/* 复制按钮 */}
                  <button
                    className="copy-button"
                    onClick={() => copyToClipboard(message.content, message.id)}
                    title="复制消息"
                  >
                    <Copy size={16} />
                  </button>
                  
                  {/* 复制成功提示 */}
                  {copySuccess[message.id] && (
                    <div className="copy-success">已复制</div>
                  )}
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="message bot loading">
                <div className="message-header">
                  <span className="username">Gemini</span>
                  <span className="timestamp">正在输入...</span>
                </div>
                <div className="message-content">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        ) : (
          <div className="messages-container">
            <div style={{ padding: '16px' }}>
              <button className="log-clear-btn" onClick={clearLogs}>
                清空日志
              </button>
              <div className="log-container">
                {logs.length === 0 ? (
                  <div style={{ color: 'rgba(255, 255, 255, 0.5)', textAlign: 'center', padding: '20px' }}>
                    暂无日志输出
                  </div>
                ) : (
                  logs.map((log) => (
                    <div key={log.id} className={`log-entry log-${log.type}`}>
                      <span className="log-timestamp">
                        {formatLogTime(log.timestamp)}
                      </span>
                      {log.message}
                    </div>
                  ))
                )}
                <div ref={logsEndRef} />
              </div>
            </div>
          </div>
        )}

        {/* 输入区域 - 只在聊天视图显示 */}
        {currentView === 'chat' && (
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="输入消息..."
                className="message-input"
                disabled={isLoading}
              />
              <button 
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="send-button"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 设置面板 */}
      {showSettings && (
        <div className={`settings-panel ${isClosingSettings ? 'closing' : ''}`}>
          <div className="settings-header">
            <div className="settings-title">
              <Settings size={20} />
              API 设置
            </div>
            <button className="close-button" onClick={handleCloseSettings}>
              <X size={20} />
            </button>
          </div>
          
          <div className="settings-content">
            <div className="settings-section">
              <h3 className="section-title">连接配置</h3>
              
              <div className="form-group">
                <label className="form-label">协议</label>
                <select 
                  className="form-select"
                  value={localApiConfig.protocol}
                  onChange={(e) => setLocalApiConfig(prev => ({...prev, protocol: e.target.value}))}
                >
                  <option value="http">HTTP</option>
                  <option value="https">HTTPS</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">IP 地址/域名</label>
                 <input
                   type="text"
                   className="form-input"
                   value={localApiConfig.ip || "us-hudiyun.vincentzyu233.cn"}
                   onChange={(e) => setLocalApiConfig(prev => ({...prev, ip: e.target.value}))}
                   placeholder="127.0.0.1"
                 />
               </div>

               <div className="form-group">
                 <label className="form-label">预设 IP/域名</label>
                 <select
                   className="form-select"
                   onChange={(e) => setLocalApiConfig(prev => ({...prev, ip: e.target.value}))}
                   value={localApiConfig.ip || "us-hudiyun.vincentzyu233.cn"}
                 >
                   <option value="">选择你的预设或者手动填写</option>
                   <option value="192.168.31.84">192.168.31.84</option>
                   <option value="us-hudiyun.vincentzyu233.cn">us-hudiyun.vincentzyu233.cn</option>
                 </select>
              </div>

              <div className="form-group">
                <label className="form-label">端口</label>
                <input
                  type="text"
                  className="form-input"
                  value={localApiConfig.port}
                  onChange={(e) => setLocalApiConfig(prev => ({...prev, port: e.target.value}))}
                  placeholder="8629"
                />
              </div>

              {/* 配置文件路径显示 */}
              {configPath && (
                <div className="form-group">
                  <label className="form-label">配置文件路径</label>
                  <div className="config-path">
                    {configPath}
                  </div>
                </div>
              )}

              <div className="button-group">
                <button className="btn btn-primary" onClick={handleTestConnection}>
                  测试连接
                </button>
                <button className="btn btn-success" onClick={handleSaveSettings}>
                  保存设置
                </button>
                <button className="btn btn-secondary" onClick={handleCloseSettings}>
                  关闭
                </button>
              </div>

              {testResult && (
                <div className={`test-result ${testResult.type}`}>
                  {testResult.message}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;