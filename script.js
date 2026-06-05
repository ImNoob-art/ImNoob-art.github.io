
// ================= 1. 分类基础配置（保持你的分类名称） =================
const mapProjectData = [
    {
        id: "north",
        name: "北方",
        desc: "哈尔科夫及周边边界区域最新战势跟踪图。",
        history: [
            "2026-6-4",
            "2026-6-2",
            "2025-9-3"
        ]
    },
    {
        id: "donbas",
        name: "顿涅茨克",
        desc: "顿涅茨克防御动态。",
        history: [
            "2026-6-4",
            "2026-6-3",
            "2026-5-30"
        ]
    },
        {
        id: "south",
        name: "南方",
        desc: "扎波罗热和第聂伯罗比得罗夫斯克(亚历山德里夫卡)的局势动态。",
        history: [
            "2026-6-4",
            "2026-6-3",
            "2026-5-30"
        ]
    },
    {
        id: "xiao",
        name: "兵力密度 俄乌 (5km)",
        desc: "俄乌两军兵力密度图,单位格子长度为5km。",
        history: [
            "2026-6-4",
            "2026-6-1",
            "2026-5-29",
            "2026-5-16",
            "2026-4-18",
            "2026-3-16",
            "2026-2-27",
            "2026-2-2" // 历史起点
        ]
    },
    {
        id: "zhong",
        name: "兵力密度 俄乌 (10km)",
        desc: "俄乌两军兵力密度图,单位格子长度为10km。图中俄乌双方格子会出现叠加的情况具体内容请看对应方的具体情况",
        history: [
            "2026-6-4",
            "2026-6-1",
            "2026-5-29",
            "2026-5-16",
            "2026-4-18",
            "2026-3-16",
            "2026-2-27",
            "2026-2-2" // 历史起点
        ]
    },
    {
        id: "RUzhong",
        name: "兵力密度 俄军 (10km)",
        desc: "俄军兵力密度图,单位格子长度为10km。",
        history: [
            "2026-6-4",
            "2026-6-1",
            "2026-5-29",
            "2026-5-16",
            "2026-4-18",
            "2026-3-16",
            "2026-2-27",
            "2026-2-2" // 历史起点
        ]
    },
    {
        id: "RUfull",
        name: "兵力密度 俄军 (full)",
        desc: "每月更新的俄军兵力密度图,单位格子长度为10km。",
        history: [
            "2026-6-1",
            "2026-5-16",
            "2025-1-1",
            "2024-10-1",
            "2024-8-1",
            "2024-6-1",
            "2024-1-1" // 历史起点
            
        ]
    },
    {
        id: "UAzhong",
        name: "兵力密度 乌军 (10km)",
        desc: "乌军兵力密度图,单位格子长度为10km。",
        history: [
            "2026-6-4",
            "2026-6-1",
            "2026-5-29",
            "2026-5-24" // 历史起点
        ]
    },
     {
        id: "UAfull",
        name: "兵力密度 乌军 (full)",
        desc: "每月更新的乌军兵力密度图,单位格子长度为10km。",
        history: [
            "2026-6-1",
            "2026-5-1",
            "2026-4-1",
            "2026-3-1" // 历史起点
        ]
    },
    {
        id: "Kostiantynivka",
        name: "康斯坦丁尼夫卡",
        desc: "不定期更新的康斯坦丁尼夫卡方向态势图。",
        history: [
            "2026-6-5",// 历史起点
        ]
    },
    {
        id: "Oleksandrivka",
        name: "亚历山德里夫卡",
        desc: "或叫第聂伯罗比得罗夫斯克方向。不定期更新该方向的局势。",
        history: [
            "2026-6-5",// 历史起点
        ]
    },
    {
        id: "Zaporizhzhia",
        name: "扎波罗热",
        desc: "扎波罗热州战场态势图。不定期更新该方向的局势。",
        history: [
            "2026-6-5",// 历史起点
        ]
    },
];

// ================= 2. 状态控制池 =================
let activeFront = null;        
let activeMapIndex = 0;        

// 缩放与拖拽物理引擎变量
let isMaxZoom = false; 
let scale = 1;
let isDragging = false;
let startX = 0, startY = 0;
let translateX = 0, translateY = 0;

// DOM 捕获
const gridView = document.getElementById("gridView");
const detailView = document.getElementById("detailView");
const liveDateEl = document.getElementById("liveDate");
const frontTitle = document.getElementById("frontTitle");
const mainMapViewer = document.getElementById("mainMapViewer");
const galleryTrack = document.getElementById("galleryTrack");
const backBtn = document.getElementById("backBtn");

const crumbHome = document.getElementById("crumbHome");
const crumbSep = document.getElementById("crumbSep");
const crumbDetail = document.getElementById("crumbDetail");

// 新交互节点
const zoomWindow = document.getElementById("zoomWindow");
const zoomToggleBtn = document.getElementById("zoomToggleBtn");

// ================= 3. 初始化 =================
function init() {
    const today = new Date();
    liveDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    renderGridHome();
    setupEventListeners();
}

// ================= 4. 渲染主网格 =================
function renderGridHome() {
    gridView.innerHTML = "";
    crumbHome.classList.add("active");
    crumbSep.classList.add("hidden");
    crumbDetail.classList.add("hidden");

    mapProjectData.forEach(front => {
        const card = document.createElement("div");
        card.className = "front-card";
        const coverImgPath = front.history.length > 0 ? `maps/${front.id}/${front.history[0]}.jpeg` : "";

        card.innerHTML = `
            <div class="card-thumb-wp">
                <img src="${coverImgPath}" alt="${front.name}" onerror="this.src='https://placehold.co/600x400/111416/8a949d?text=%E6%9A%82%E6%97%A0%E5%9C%B0%E5%9B%BE'">
            </div>
            <div class="card-info">
                <h3>${front.name}</h3>
                <p>${front.desc}</p>
            </div>
        `;
        card.addEventListener("click", () => enterDetailView(front));
        gridView.appendChild(card);
    });
}

// ================= 5. 进入详情页 =================
function enterDetailView(front) {
    activeFront = front;
    activeMapIndex = 0; 

    gridView.classList.add("hidden");
    detailView.classList.remove("hidden");

    crumbHome.classList.remove("active");
    crumbSep.classList.remove("hidden");
    crumbDetail.classList.remove("hidden");
    crumbDetail.textContent = front.name;
    crumbDetail.classList.add("active");

    frontTitle.textContent = front.name;
    updateLightboxAndGallery();
}

// ================= 6. 核心渲染大图 =================
function updateLightboxAndGallery() {
    if (!activeFront || activeFront.history.length === 0) return;

    const currentMapName = activeFront.history[activeMapIndex];
    mainMapViewer.src = `maps/${activeFront.id}/${currentMapName}.jpeg`;
    
    // 每次换图时，重置缩放矩阵引擎
    resetZoomEngine();

    galleryTrack.innerHTML = "";
    activeFront.history.forEach((mapName, index) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-item ${index === activeMapIndex ? 'active' : ''}`;
        thumb.innerHTML = `<img src="maps/${activeFront.id}/${mapName}.jpeg" onerror="this.parentNode.style.display='none';">`;
        
        thumb.addEventListener("click", () => {
            activeMapIndex = index;
            updateLightboxAndGallery();
        });
        galleryTrack.appendChild(thumb);
    });
}

// ================= 7. 物理缩放与矩阵位置重置引擎 =================
function resetZoomEngine() {
    scale = 1;
    translateX = 0;
    translateY = 0;
    mainMapViewer.style.transform = `translate(0px, 0px) scale(1)`;
}

function updateTransformMatrix() {
    mainMapViewer.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// ================= 8. 展开 / 取消放大核心逻辑切换 =================
function toggleMaxZoomMode() {
    isMaxZoom = !isMaxZoom;
    
    if (isMaxZoom) {
        // 进入平铺满屏看图模式
        document.body.classList.add("max-zoom-mode");
        zoomWindow.classList.add("zoom-window-active");
        zoomToggleBtn.textContent = "❌ 双击取消放大";
        
        // 隐藏面包屑、导航标题、历史画廊
        document.getElementById("topBar").classList.add("hidden");
        document.getElementById("breadcrumb").classList.add("hidden");
        document.getElementById("controlHeader").classList.add("hidden");
        document.getElementById("galleryWrapper").classList.add("hidden");
    } else {
        // 退出看图模式，全部还原
        document.body.classList.remove("max-zoom-mode");
        zoomWindow.classList.remove("zoom-window-active");
        zoomToggleBtn.textContent = "🔍 点击放大";
        
        document.getElementById("topBar").classList.remove("hidden");
        document.getElementById("breadcrumb").classList.remove("hidden");
        document.getElementById("controlHeader").classList.remove("hidden");
        document.getElementById("galleryWrapper").classList.remove("hidden");
        
        resetZoomEngine();
    }
}

function returnToHome() {
    if (isMaxZoom) toggleMaxZoomMode();
    detailView.classList.add("hidden");
    gridView.classList.remove("hidden");
    activeFront = null;
    renderGridHome();
}

// ================= 9. 完整手势控制与系统级监听 =================
function setupEventListeners() {
    backBtn.addEventListener("click", returnToHome);
    crumbHome.addEventListener("click", returnToHome);

    // 左右切图
    document.getElementById("prevMap").addEventListener("click", (e) => {
        e.stopPropagation();
        if (activeFront && activeMapIndex < activeFront.history.length - 1) {
            activeMapIndex++;
            updateLightboxAndGallery();
        }
    });

    document.getElementById("nextMap").addEventListener("click", (e) => {
        e.stopPropagation();
        if (activeFront && activeMapIndex > 0) {
            activeMapIndex--;
            updateLightboxAndGallery();
        }
    });

    // 触发平铺放大切换
    zoomWindow.addEventListener("click", (e) => {
        // 如果点的是左右切图按钮则不执行
        if (e.target.classList.contains('arrow-btn')) return;
        if (!isDragging) {
            toggleMaxZoomMode();
        }
    });

    // 🌟 高级交互 A：鼠标滚轮无限镜效果（仅在放大状态下生效）
    zoomWindow.addEventListener("wheel", (e) => {
        if (!isMaxZoom) return;
        e.preventDefault(); // 阻止网页默认滚动

        const zoomFactor = 0.15;
        if (e.deltaY < 0) {
            scale += zoomFactor; // 放大
        } else {
            scale = Math.max(0.5, scale - zoomFactor); // 缩小，设置安全底线 0.5
        }
        updateTransformMatrix();
    }, { passive: false });

    // 🌟 高级交互 B：鼠标左键任意抓取并拖拽
    zoomWindow.addEventListener("mousedown", (e) => {
        if (!isMaxZoom) return;
        isDragging = true;
        zoomWindow.style.cursor = "grabbing";
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
    });

    window.addEventListener("mousemove", (e) => {
        if (!isDragging || !isMaxZoom) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransformMatrix();
    });

    window.addEventListener("mouseup", () => {
        if (isDragging) {
            // 延迟微量阻尼时间，防止误触发点击退出
            setTimeout(() => { isDragging = false; }, 50);
            zoomWindow.style.cursor = "move";
        }
    });

    // 底部横向移动
    document.getElementById("scrollLeft").addEventListener("click", () => galleryTrack.scrollLeft -= 150);
    document.getElementById("scrollRight").addEventListener("click", () => galleryTrack.scrollLeft += 150);
}

window.addEventListener("DOMContentLoaded", init);
