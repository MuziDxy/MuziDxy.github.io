// 创建浮动图标
function createFloatingIcon() {
    // 创建样式
    const style = document.createElement('style');
    style.textContent = `
        .form-fill-float-icon {
            position: fixed;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            background-size: contain;
            background-repeat: no-repeat;
            cursor: pointer;
            z-index: 9999;
            background-color: white;
            border-radius: 8px 0 0 8px;
            box-shadow: -2px 2px 5px rgba(0,0,0,0.2);
            transition: all 0.3s ease;
        }
        .form-fill-float-icon:hover {
            transform: translateY(-50%) scale(1.1);
        }
    `;
    document.head.appendChild(style);

    // 创建图标元素
    const icon = document.createElement('div');
    icon.className = 'form-fill-float-icon';
    
    // 获取图标URL
    const iconUrl = chrome.runtime.getURL('icons/icon48.png');
    icon.style.backgroundImage = `url('${iconUrl}')`;
    
    // 添加点击事件
    icon.addEventListener('click', () => {
        // 获取保存的state设置
        chrome.storage.sync.get(['state'], (data) => {
            const state = data.state || 'CA';
            
            // 直接调用content.js中的函数
            if (typeof clearForm === 'function' && typeof fillForm === 'function') {
                clearForm();
                
                // 重置刷新检测计数器
                sessionStorage.setItem('formFillProRefreshDetection', '0');
                
                setTimeout(() => {
                    fillForm(state);
                }, 1000);
            }
        });
    });
    
    // 添加到页面
    document.body.appendChild(icon);
}

// 当页面加载完成时创建浮动图标
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    createFloatingIcon();
} else {
    window.addEventListener('load', createFloatingIcon);
}
