// 监听扩展程序安装或更新
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // 初始化默认设置
    chrome.storage.sync.set({
      state: 'CA'
    });
  }
});

// 监听标签页更新
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url && !tab.url.startsWith('chrome://')) {
    // 获取当前设置的州/地区
    chrome.storage.sync.get(['state'], (data) => {
      // 向content script发送消息，触发自动填写
      chrome.tabs.sendMessage(tabId, {
        action: 'fillForm',
        state: data.state || 'CA'
      }).catch(() => {
        // 忽略错误，因为不是所有页面都会有content script
        // 或者页面可能还未完全加载
      });
    });
  }
});

// 处理来自popup和float.html的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'sendMessageToContentScript') {
    // 获取当前活动标签页
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        // 向content script发送消息
        chrome.tabs.sendMessage(tabs[0].id, {
          action: request.message,
          state: 'CA'
        }).catch(() => {
          // 忽略错误
        });
      }
    });
  }
  return true;
});
