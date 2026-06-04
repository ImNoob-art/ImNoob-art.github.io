// ================= 1. 核心日期配置池（以后有新更新，直接在这里往前追加日期即可！） =================
// 这样可以 100% 避免纯前端盲猜图片导致的 HTTP 400 / 404 错误
const GLOBAL_RECORDS = [
    "2026-6-4",
    "2026-6-3",
    "2026-6-2",
    "2026-6-1",
    "2026-5-31",
    "2026-5-30"
];

// ================= 2. 分类基础配置（完全保持你需要的分类名称） =================
const MapsDate = [
    {
        id: "north",
        name: "北方",
        desc: "哈尔科夫及周边边界区域最新战势跟踪图。"
    },
    {
        id: "donbas",
        name: "顿涅茨克",
        desc: "顿涅茨克防御动态。"
    },
        {
        id: "south",
        name: "南方",
        desc: "扎波罗热和第聂伯罗比得罗夫斯克的防御动态。"
    },
    {
        id: "xiao",
        name: "兵力密度(5km)",
        desc: "俄乌两军兵力密度图,单位格子长度为5km。"
    }
];

// ================= 3. 全局状态控制 =================
let activeFront = null;        
let activeMapIndex = 0;        

// ================= 4. 元素捕获 =================
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

// ================= 5. 初始化与现实日期渲染 =================
function init() {
    // 自动捕获当天的现实系统时间并显示在标题栏
    const today = new Date();
    liveDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    renderGridHome();
    setupEventListeners();
}

// ================= 6. 渲染主页网格 (面包屑: 总览) =================
function renderGridHome() {
    gridView.innerHTML = "";
    
    // 更新面包屑状态
    crumbHome.classList.add("active");
    crumbSep.classList.add("hidden");
    crumbDetail.classList.add("hidden");

    mapProjectData.forEach(front => {
        const card = document.createElement("div");
        card.className = "front-card";
        
        // 默认封面图直接采用全局配置里最新一天的图片
        const latestDate = GLOBAL_RECORDS[0];
        const coverImgPath = `maps/${front.id}/${latestDate}.jpeg`;

        card.innerHTML = `
            <div class="card-thumb-wp">
                <img src="${coverImgPath}" alt="${front.name}" onerror="this.src='https://placehold.co/600x400/111416/8a949d?text=%E6%9A%82%E6%97%A0%E4%BB%8A%E6%97%A5%E5%9C%B0%E5%9B%BE'">
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

// ================= 7. 进入分类详情页 (面包屑: 总览 > 分类名称) =================
function enterDetailView(front) {
    activeFront = front;
    activeMapIndex = 0; // 默认拉取最新的一张

    gridView.classList.add("hidden");
    detailView.classList.remove("hidden");

    // 动态同步更新面包屑栏
    crumbHome.classList.remove("active");
    crumbSep.classList.remove("hidden");
    crumbDetail.classList.remove("hidden");
    crumbDetail.textContent = front.name;
    crumbDetail.classList.add("active");

    frontTitle.textContent = front.name;
    updateLightboxAndGallery();
}

// ================= 8. 更新大图与底部的历史时间轴画廊 (无任何文字和日期显示) =================
function updateLightboxAndGallery() {
    if (!activeFront || GLOBAL_RECORDS.length === 0) return;

    const currentMapName = GLOBAL_RECORDS[activeMapIndex];
    // 图片格式严格采用 .jpeg 格式
    mainMapViewer.src = `maps/${activeFront.id}/${currentMapName}.jpeg`;

    // 渲染底部纯图片画廊轨道（响应你的需求：不显示任何文字、名称和日期）
    galleryTrack.innerHTML = "";
    GLOBAL_RECORDS.forEach((mapName, index) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-item ${index === activeMapIndex ? 'active' : ''}`;
        
        const thumbImgPath = `maps/${activeFront.id}/${mapName}.jpeg`;
        thumb.innerHTML = `<img src="${thumbImgPath}" onerror="this.style.display='none';">`;
        
        thumb.addEventListener("click", () => {
            activeMapIndex = index;
            updateLightboxAndGallery();
        });
        galleryTrack.appendChild(thumb);
    });
}

// ================= 9. 统一退出并返回主页的方法 =================
function returnToHome() {
    detailView.classList.add("hidden");
    gridView.classList.remove("hidden");
    activeFront = null;
    renderGridHome();
}

// ================= 10. 事件监听设置 =================
function setupEventListeners() {
    // 点击返回按钮或面包屑上的“总览”均可安全返回
    backBtn.addEventListener("click", returnToHome);
    crumbHome.addEventListener("click", returnToHome);

    // 灯箱大图切换控制：左箭头
    document.getElementById("prevMap").addEventListener("click", () => {
        if (activeMapIndex < GLOBAL_RECORDS.length - 1) {
            activeMapIndex++;
            updateLightboxAndGallery();
        }
    });

    // 灯箱大图切换控制：右箭头
    document.getElementById("nextMap").addEventListener("click", () => {
        if (activeMapIndex > 0) {
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
window.addEventListener("DOMContentLoaded", init);
