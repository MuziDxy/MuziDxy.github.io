document.addEventListener('DOMContentLoaded', function() {
  // 获取元素
  const fillFormBtn = document.getElementById('fillForm');
  const clearFormBtn = document.getElementById('clearForm');
  const stateSelect = document.getElementById('state');
  const statusDiv = document.getElementById('status');

  // 检查是否在扩展环境中运行
  const isExtensionEnvironment = typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync;
  
  // 从存储中加载设置（仅在扩展环境中）
  if (isExtensionEnvironment) {
    chrome.storage.sync.get(['state'], function(data) {
      if (data.state) {
        stateSelect.value = data.state;
      }
    });
  }

  // 保存设置（仅在扩展环境中）
  function saveSettings() {
    if (isExtensionEnvironment) {
      chrome.storage.sync.set({
        state: stateSelect.value
      });
    }
  }

  // 显示状态信息
  function showStatus(message, isError = false) {
    statusDiv.textContent = message;
    statusDiv.className = `status ${isError ? 'error' : 'success'}`;
    setTimeout(() => {
      statusDiv.textContent = '';
      statusDiv.className = 'status';
    }, 3000);
  }

  // 发送消息到content script（仅在扩展环境中）
  async function sendMessageToContentScript(action) {
    if (!isExtensionEnvironment) {
      showStatus('演示模式：' + action + ' 操作', false);
      return;
    }
    
    try {
      const [tab] = await chrome.tabs.query({active: true, currentWindow: true});
      if (!tab?.id) throw new Error('无法获取当前标签页');

      const response = await chrome.tabs.sendMessage(tab.id, {
        action: action,
        state: stateSelect.value
      });

      if (response.success) {
        showStatus(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      showStatus(error.message, true);
    }
  }

  // 事件监听器
  fillFormBtn.addEventListener('click', () => {
    sendMessageToContentScript('fillForm');
  });

  clearFormBtn.addEventListener('click', () => {
    sendMessageToContentScript('clearForm');
  });

  stateSelect.addEventListener('change', saveSettings);
});
