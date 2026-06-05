
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
            "2025-9-3" // 历史起点
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
            "2026-5-24" // 历史起点
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
            "2026-5-24" // 历史起点
        ]
    },
    {
        id: "RUfull",
        name: "兵力密度 俄军 (full)",
        desc: "每月更新的俄军兵力密度图,单位格子长度为10km。",
        history: [
            "2026-6-1",
            "2026-5-1",
            "2026-4-1",
            "2026-4-1",
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
];

// ================= 2. 全局状态控制 =================
let activeFront = null;        
let activeMapIndex = 0;        

// ================= 3. 元素捕获 =================
const gridView = document.getElementById("gridView");
const detailView = document.getElementById("detailView");
const liveDateEl = document.getElementById("liveDate");
const frontTitle = document.getElementById("frontTitle");
const mainMapViewer = document.getElementById("mainMapViewer");
const galleryTrack = document.getElementById("galleryTrack");
const backBtn = document.getElementById("backBtn");

// 面包屑 DOM 节点
const crumbHome = document.getElementById("crumbHome");
const crumbSep = document.getElementById("crumbSep");
const crumbDetail = document.getElementById("crumbDetail");

// 全屏放大组件捕获
const zoomTrigger = document.getElementById("zoomTrigger");
const fullscreenOverlay = document.getElementById("fullscreenOverlay");
const fullscreenTargetImg = document.getElementById("fullscreenTargetImg");
const closeOverlay = document.getElementById("closeOverlay");

// ================= 4. 初始化与现实日期渲染 =================
function init() {
    const today = new Date();
    liveDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    renderGridHome();
    setupEventListeners();
}

// ================= 5. 渲染主页网格 =================
function renderGridHome() {
    gridView.innerHTML = "";
    
    crumbHome.classList.add("active");
    crumbSep.classList.add("hidden");
    crumbDetail.classList.add("hidden");

    mapProjectData.forEach(front => {
        const card = document.createElement("div");
        card.className = "front-card";
        
        const hasMap = front.history && front.history.length > 0;
        const coverImgPath = hasMap 
            ? `maps/${front.id}/${front.history[0]}.jpeg` 
            : `https://placehold.co/600x400/111416/8a949d?text=%E6%9A%82%E6%97%A0%E5%9C%B0%E5%9B%BE`;

        card.innerHTML = `
            <div class="card-thumb-wp">
                <img src="${coverImgPath}" alt="${front.name}" onerror="this.src='https://placehold.co/600x400/111416/8a949d?text=%E5%9C%B0%E5%9B%BE%E5%8A%A0%E8%BD%BD%E5%A4%B1%E8%B4%A5'">
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

// ================= 6. 进入分类详情页 =================
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

// ================= 7. 更新大图与底部的历史时间轴画廊 =================
function updateLightboxAndGallery() {
    if (!activeFront || !activeFront.history || activeFront.history.length === 0) {
        mainMapViewer.src = "";
        galleryTrack.innerHTML = "<p style='padding:20px;color:#8a949d;'>该分类暂无归档地图</p>";
        return;
    }

    const currentMapName = activeFront.history[activeMapIndex];
    mainMapViewer.src = `maps/${activeFront.id}/${currentMapName}.jpeg`;

    // 同步把超清大图路径也塞入放大组件的缓冲池中
    fullscreenTargetImg.src = `maps/${activeFront.id}/${currentMapName}.jpeg`;

    galleryTrack.innerHTML = "";
    activeFront.history.forEach((mapName, index) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-item ${index === activeMapIndex ? 'active' : ''}`;
        
        const thumbImgPath = `maps/${activeFront.id}/${mapName}.jpeg`;
        thumb.innerHTML = `<img src="${thumbImgPath}" onerror="this.parentNode.style.display='none';">`;
        
        thumb.addEventListener("click", () => {
            activeMapIndex = index;
            updateLightboxAndGallery();
        });
        galleryTrack.appendChild(thumb);
    });
}

// ================= 8. 返回主页逻辑 =================
function returnToHome() {
    detailView.classList.add("hidden");
    gridView.classList.remove("hidden");
    activeFront = null;
    renderGridHome();
}

// ================= 9. 事件监听设置 =================
function setupEventListeners() {
    backBtn.addEventListener("click", returnToHome);
    crumbHome.addEventListener("click", returnToHome);

    // 大图切换控制
    document.getElementById("prevMap").addEventListener("click", (e) => {
        e.stopPropagation(); // 阻止触发放大
        if (activeFront && activeFront.history && activeMapIndex < activeFront.history.length - 1) {
            activeMapIndex++;
            updateLightboxAndGallery();
        }
    });

    document.getElementById("nextMap").addEventListener("click", (e) => {
        e.stopPropagation(); // 阻止触发放大
        if (activeFront && activeFront.history && activeMapIndex > 0) {
            activeMapIndex--;
            updateLightboxAndGallery();
        }
    });

    // 底部画廊水平滚动条控制
    document.getElementById("scrollLeft").addEventListener("click", () => {
        galleryTrack.scrollLeft -= 150;
    });
    document.getElementById("scrollRight").addEventListener("click", () => {
        galleryTrack.scrollLeft += 150;
    });

    // ================= 放大镜手势核心绑定 =================
    // 1. 点击核心大图触发超清全屏显示
    zoomTrigger.addEventListener("click", () => {
        if (mainMapViewer.src && !mainMapViewer.src.includes("placehold")) {
            fullscreenOverlay.classList.remove("hidden");
            document.body.style.overflow = "hidden"; // 全屏查看时主网页禁止跟随滚动
        }
    });

    // 2. 点击关闭按钮隐藏大图
    closeOverlay.addEventListener("click", () => {
        fullscreenOverlay.classList.add("hidden");
        document.body.style.overflow = ""; // 恢复网页滚动
    });

    // 3. 点击超清大图本身也能快速缩回，优化用户体验
    fullscreenTargetImg.addEventListener("click", () => {
        fullscreenOverlay.classList.add("hidden");
        document.body.style.overflow = "";
    });
}

// 确保在页面加载完毕后拉起初始化
window.addEventListener("DOMContentLoaded", init);
