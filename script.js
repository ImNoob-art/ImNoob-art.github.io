// ================= 1. 数据源配置（可在此自由增删修改归档） =================
const mapProjectData = [
    {
        id: "north",
        name: "北方",
        desc: "哈尔科夫及周边边界区域最新战势跟踪图。",
        history: ["2026-6-4", "2026-6-3", "2026-6-2", "2026-6-1"] // 对应图片的名称
    },
    {
        id: "donbas",
        name: "顿涅茨克",
        desc: "顿涅茨克防御动态。",
        history: ["2026-6-4", "2026-6-03", "2026-6-1"]
    },
    {
        id: "south",
        name: "扎波罗热",
        desc: "扎波罗热交战态势。",
        history: ["2026-6-4", "2026-6-03", "2026-6-1"]
    },
    {
        id: "xiao",
        name: "兵力密度(5km)",
        desc: "俄乌两军兵力密度图,单位格子长度为5km。",
        history: ["2026-6-4", "2026-6-03", "2026-6-1"]
    },
];

// ================= 2. 全局状态控制 =================
let activeFront = null;        // 当前激活的分类对象
let activeMapIndex = 0;        // 当前激活的图在历史记录中的索引

// ================= 3. 元素捕获 =================
const gridView = document.getElementById("gridView");
const detailView = document.getElementById("detailView");
const liveDateEl = document.getElementById("liveDate");
const frontTitle = document.getElementById("frontTitle");
const mainMapViewer = document.getElementById("mainMapViewer");
const galleryTrack = document.getElementById("galleryTrack");
const backBtn = document.getElementById("backBtn");

// ================= 4. 初始化与现实日期渲染 =================
function init() {
    // 捕获当下的现实系统时间并按要求放置在标题栏
    const today = new Date();
    liveDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    renderGridHome();
    setupEventListeners();
}

// ================= 5. 渲染主页导航卡片 (图1 风格) =================
function renderGridHome() {
    gridView.innerHTML = "";
    mapProjectData.forEach(front => {
        const card = document.createElement("div");
        card.className = "front-card";
        
        // 默认卡片封面使用它历史记录中最新的那张图(第一张)
        const coverImgPath = `maps/${front.id}/${front.history[0]}.jpeg`;

        card.innerHTML = `
            <div class="card-thumb-wp">
                <img src="${coverImgPath}" alt="${front.name}" onerror="this.src='https://placehold.co/600x400/111416/8a949d?text=No+Image'">
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

// ================= 6. 切换至看板详情页 (图2 风格) =================
function enterDetailView(front) {
    activeFront = front;
    activeMapIndex = 0; // 默认展示最新的第一张

    gridView.classList.add("hidden");
    detailView.classList.remove("hidden");

    frontTitle.textContent = front.name;
    updateLightboxAndGallery();
}

// ================= 7. 渲染大图与底部的历史时间轴画廊 =================
function updateLightboxAndGallery() {
    if (!activeFront || activeFront.history.length === 0) return;

    const currentMapName = activeFront.history[activeMapIndex];
    // 图片渲染核心：识别为 .jpeg 格式
    mainMapViewer.src = `maps/${activeFront.id}/${currentMapName}.jpeg`;

    // 渲染底部画廊横向轨道
    galleryTrack.innerHTML = "";
    activeFront.history.forEach((mapName, index) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-item ${index === activeMapIndex ? 'active' : ''}`;
        
        const thumbImgPath = `maps/${activeFront.id}/${mapName}.jpeg`;
        thumb.innerHTML = `<img src="${thumbImgPath}" onerror="this.src='https://placehold.co/120x75/111416/8a949d?text=Error'">`;
        
        thumb.addEventListener("click", () => {
            activeMapIndex = index;
            updateLightboxAndGallery();
        });
        galleryTrack.appendChild(thumb);
    });
}

// ================= 8. 事件监听设置 =================
function setupEventListeners() {
    // 返回按钮事件
    backBtn.addEventListener("click", () => {
        detailView.classList.add("hidden");
        gridView.classList.remove("hidden");
        activeFront = null;
    });

    // 大图切换控制：左箭头
    document.getElementById("prevMap").addEventListener("click", () => {
        if (activeFront && activeMapIndex < activeFront.history.length - 1) {
            activeMapIndex++;
            updateLightboxAndGallery();
        }
    });

    // 大图切换控制：右箭头
    document.getElementById("nextMap").addEventListener("click", () => {
        if (activeFront && activeMapIndex > 0) {
            activeMapIndex--;
            updateLightboxAndGallery();
        }
    });

    // 底部画廊左右滚动控制
    document.getElementById("scrollLeft").addEventListener("click", () => {
        galleryTrack.scrollLeft -= 150;
    });
    document.getElementById("scrollRight").addEventListener("click", () => {
        galleryTrack.scrollLeft += 150;
    });
}

// 启动程序
window.addEventListener("DOMContentLoaded", init);
