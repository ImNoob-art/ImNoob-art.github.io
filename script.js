// 1. 配置你的数据（当你有新地图或新日期时，只需修改这里）
const availableDates = ["2026-05-30", "2026-06-01"];
const locations = ["康斯坦丁尼夫卡", "大扎波罗热", "亚历山德里夫卡"];

// 2. 状态变量
let currentDateIndex = 0; 
let currentLocation = locations[0]; 

// 3. 获取DOM元素
const dateText = document.getElementById('current-date-text');
const prevDateBtn = document.getElementById('prev-date');
const nextDateBtn = document.getElementById('next-date');
const locationList = document.getElementById('location-list');
const mapViewer = document.getElementById('map-viewer');
const viewTitle = document.getElementById('view-title');

// 4. 初始化左侧菜单
function initMenu() {
    locationList.innerHTML = '';
    locations.forEach(loc => {
        const li = document.createElement('li');
        li.textContent = loc;
        if(loc === currentLocation) li.classList.add('active');
        
        li.addEventListener('click', () => {
            document.querySelectorAll('#location-list li').forEach(el => el.classList.remove('active'));
            li.classList.add('active');
            currentLocation = loc;
            updateDisplay();
        });
        locationList.appendChild(li);
    });
}

// 5. 更新图片和文字显示
function updateDisplay() {
    const currentDate = availableDates[currentDateIndex];
    dateText.textContent = currentDate;
    viewTitle.textContent = `${currentLocation} - 地区态势`;
    
    // 拼接图片路径，例如: maps/苏梅/2026-05-30.jpeg
    // 使用 encodeURIComponent 防止中文路径在某些浏览器里解析出错
    const imgPath = `maps/${encodeURIComponent(currentLocation)}/${currentDate}.jpeg`;
    mapViewer.src = imgPath;
}

// 6. 日期按钮事件绑定
prevDateBtn.addEventListener('click', () => {
    if (currentDateIndex > 0) {
        currentDateIndex--;
        updateDisplay();
    }
});

nextDateBtn.addEventListener('click', () => {
    if (currentDateIndex < availableDates.length - 1) {
        currentDateIndex++;
        updateDisplay();
    }
});

// 初始化运行
initMenu();
updateDisplay();
