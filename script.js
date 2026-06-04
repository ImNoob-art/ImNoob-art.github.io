
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
        id: "xiao",
        name: "兵力密度(5km)",
        desc: "俄乌两军兵力密度图,单位格子长度为5km。",
        history: [
            "2026-6-4",
            "2026-5-30",
            "2025-9-4",
            "2025-9-3" // 历史起点
        ]
    },
        {
        id: "zhong",
        name: "兵力密度(10km)",
        desc: "俄乌两军兵力密度图,单位格子长度为10km。图中俄乌双方格子会出现叠加的情况具体内容请看对应方的具体情况",
        history: [
            "2026-6-4",
            "2026-6-1",
            "2026-5-29",
            "2026-5-24" // 历史起点
        ]
    },
];

// ================= 2. 全局状态控制 =================
let activeFront = null;        // 当前点进去的分类对象
let activeMapIndex = 0;        // 当前大图对应的索引

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

// ================= 4. 初始化与现实日期渲染 =================
function init() {
    // 自动获取用户当天的现实系统时间并显示在标题栏
    const today = new Date();
    liveDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    renderGridHome();
    setupEventListeners();
}

// ================= 5. 渲染主页网格 (面包屑: 总览) =================
function renderGridHome() {
    gridView.innerHTML = "";
    
    // 面包屑归位
    crumbHome.classList.add("active");
    crumbSep.classList.add("hidden");
    crumbDetail.classList.add("hidden");

    mapProjectData.forEach(front => {
        const card = document.createElement("div");
        card.className = "front-card";
        
        // 关键改动：封面图直接采用该分类自身 history 里的第一张（最新的一张）
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

// ================= 6. 进入分类详情页 (面包屑: 总览 > 分类名称) =================
function enterDetailView(front) {
    activeFront = front;
    activeMapIndex = 0; // 默认展示该分类最新的第一张图

    gridView.classList.add("hidden");
    detailView.classList.remove("hidden");

    // 动态同步面包屑
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

    // 获取当前索引对应的专属日期文件名
    const currentMapName = activeFront.history[activeMapIndex];
    mainMapViewer.src = `maps/${activeFront.id}/${currentMapName}.jpeg`;

    // 渲染底部纯图片画廊轨道（只循环当前分类自己的 history 数组，不显示任何文字标签）
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

// ================= 8. 统一返回主页逻辑 =================
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

    // 灯箱大图切换控制：左箭头（看更早的历史记录）
    document.getElementById("prevMap").addEventListener("click", () => {
        if (activeFront && activeFront.history && activeMapIndex < activeFront.history.length - 1) {
            activeMapIndex++;
            updateLightboxAndGallery();
        }
    });

    // 灯箱大图切换控制：右箭头（看更新的记录）
    document.getElementById("nextMap").addEventListener("click", () => {
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
}

// 确保在页面加载完毕后拉起初始化
window.addEventListener("DOMContentLoaded", init);
