// ================= 1. 分类模组专属数据结构 =================
// 已转换为高级分组配置模板，支持通过给分类名称(category)赋值，将文件夹动态渲染至不同行
const mapProjectData = [
    {
        category: "总体态势",
        desc: "小比例尺下的战线演变，包含主要边界及关键战略方向的整体推移历史。",
        items: [
            {
                id: "north",
                name: "北方",
                desc: "哈尔科夫及周边边界区域最新战势跟踪图。",
                history: ["2026-7-1", "2026-6-1", "2026-5-1", "2026-4-1", "2026-3-1", "2026-2-1", "2026-1-1",
                          "2025-12-1", "2025-11-1", "2025-10-1", "2025-9-3"]
            },
            {
                id: "donbas",
                name: "顿涅茨克",
                desc: "顿涅茨克防御动态。",
                history: ["2026-7-1", "2026-6-1", "2026-1-1","2025-9-3"]
            },
            {
                id: "south",
                name: "南方",
                desc: "扎波罗热和第聂伯罗比得罗夫斯克(亚历山德里夫卡)的局势动态。",
                history: ["2026-7-1", "2026-6-1","2026-1-1","2025-11-1" ]
            }
        ]
    },
    {
        category: "兵力密度/兵力热力图",
        desc: "这里是定量化兵力配置图，采用不同公里网格进行离散化兵力统计与叠加显示。你可以明显看出哪些区域是某一方的兵力集中重点，又有哪些区域的兵力明显不足。",
        items: [
            {
                id: "xiao",
                name: "兵力密度 俄乌 (5km)",
                desc: "俄乌两军兵力密度图,单位格子长度为5km。",
                history: ["2026-7-8", "2026-7-1", "2026-6-28", "2026-6-24",
                          "2026-6-20", "2026-6-16","2026-6-12","2026-6-8",
                          "2026-6-4", "2026-6-1", "2026-5-29", "2026-5-16", 
                          "2026-4-18", "2026-3-16", "2026-2-27", "2026-2-2"]
            },
            {
                id: "zhong",
                name: "兵力密度 俄乌 (10km)",
                desc: "俄乌两军兵力密度图,单位格子长度为10km。图中俄乌双方格子会出现叠加的情况具体内容请看对应方的具体情况",
                history: ["2026-7-8", "2026-7-1", "2026-6-28", "2026-6-24", 
                          "2026-6-20", "2026-6-16","2026-6-12","2026-6-8",
                          "2026-6-4", "2026-6-1", "2026-5-29", "2026-5-16", 
                          "2026-4-18", "2026-3-16", "2026-2-27", "2026-2-2"]
            },
            {
                id: "RUzhong",
                name: "兵力密度 俄军 (10km)",
                desc: "俄军兵力密度图,单位格子长度为10km。",
                history: ["2026-7-8", "2026-7-1", "2026-6-28", "2026-6-24", 
                          "2026-6-20", "2026-6-16","2026-6-12","2026-6-8",
                          "2026-6-4", "2026-6-1", "2026-5-29", "2026-5-16",
                          "2026-4-18", "2026-3-16", "2026-2-27", "2026-2-2"]
            },
            {
                id: "RUfull",
                name: "兵力密度 俄军 (full)",
                desc: "月底或月中更新的俄军兵力密度图,单位格子长度为10km。",
                history: ["2026-7-1", "2026-6-16","2026-6-1", 
                          "2026-5-16", "2026-4-18", "2026-2-2", "2025-1-1", 
                          "2024-10-1", "2024-8-1", "2024-6-1", "2024-1-1"]
            },
            {
                id: "UAzhong",
                name: "兵力密度 乌军 (10km)",
                desc: "乌军兵力密度图,单位格子长度为10km。",
                history: ["2026-7-8", "2026-7-1", "2026-6-28", "2026-6-24",
                          "2026-6-20","2026-6-16","2026-6-12","2026-6-8",
                          "2026-6-4", "2026-6-1", "2026-5-29", "2026-5-16", 
                          "2026-4-18", "2026-3-16", "2026-2-27", "2026-2-2"]
            },
            {
                id: "UAfull",
                name: "兵力密度 乌军 (full)",
                desc: "月底或月中更新的乌军兵力密度图,单位格子长度为10km。",
                history: ["2026-7-1", "2026-6-16","2026-6-1", "2026-5-1", "2026-4-1", "2026-3-1"]
            }
        ]
    },
    {
        category: "具体前线",
        desc: "在这里可以找到不同的大比例尺区域下的具体地图.",
        items: [
            {
                id: "Kostiantynivka",
                name: "康斯坦丁尼夫卡",
                desc: "不定期更新的康斯坦丁尼夫卡方向态势图。负责该方向防御的乌军军团为19军。",
                history: ["2026-6-29", "2026-6-23","2026-6-14","2026-6-12","2026-6-7","2026-6-5"]
            },
            {
                id: "Oleksandrivka",
                name: "亚历山德里夫卡",
                desc: "或叫第聂伯罗比得罗夫斯克方向，不定期更新。突击部队、20军团、8快速反应军团、9军团部署在该方向。",
                history: ["2026-7-6", "2026-7-4", "2026-6-29", "2026-6-26", "2026-6-15", "2026-6-12", "2026-6-5"]
            },
            {
                id: "Zaporizhzhia",
                name: "扎波罗热",
                desc: "扎波罗热州战场态势图。不定期更新该方向的局势。",
                history: ["2026-7-2", "2026-6-27", "2026-6-17", "2026-6-11", "2026-6-5"]
            },
            {
                id: "Lyman",
                name: "红利曼",
                desc: "红利曼周边战场态势图。不定期更新该方向的局势。",
                history: ["2026-7-6", "2026-7-4", "2026-7-2",  "2026-6-26", "2026-6-14", "2026-6-11"]
            },
            {
                id: "Kupiansk",
                name: "库普扬斯克",
                desc: "库普扬斯克周边战场态势图。不定期更新该方向的局势。",
                history: ["2026-7-1", "2026-6-26"]
            },
            {
                id: "Sumy",
                name: "苏梅市",
                desc: "苏梅市北部和东部边境地区的态势图。不定期更新该方向的局势。",
                history: ["2026-7-2"]
            },
            {
                id: "Dobropillia",
                name: "多布罗皮利亚",
                desc: "多布罗皮利亚方向的态势图。不定期更新该方向的局势。",
                history: ["2026-7-3"]
            },
        ]
    },
    {
        category: "地图实验室",
        desc: "关于制图显示风格、自动化数据处理的测试沙盒。",
        items: [
            {
                id: "Lab1",
                name: "风格",
                desc: "不同的战线风格、乌军军团和指挥链的相关内容",
                history: ["2026-7-4", "2026-6-20", "2026-6-8","2026-6-7","2026-6-6", "2026-3-24"]
            }
        ]
    }
];

// ================= 2. 状态控制池 =================
let activeFront = null;        
let activeMapIndex = 0;        

// 缩放与拖拽物理引擎
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

const zoomWindow = document.getElementById("zoomWindow");
const zoomToggleBtn = document.getElementById("zoomToggleBtn");
const siteGlobalIntro = document.getElementById("siteGlobalIntro");

// ================= 3. 初始化 =================
function init() {
    const today = new Date();
    liveDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    renderGridHome();
    setupEventListeners();
}

// ================= 4. 渲染主网格（完美整合分类简介排版） =================
function renderGridHome() {
    gridView.innerHTML = "";
    siteGlobalIntro.classList.remove("hidden"); // 显示主页全局公告栏
    crumbHome.classList.add("active");
    crumbSep.classList.add("hidden");
    crumbDetail.classList.add("hidden");

    mapProjectData.forEach(catBlock => {
        const catSection = document.createElement("section");
        catSection.className = "category-section";

        // 创建复合分类文本组容器
        const headerGroup = document.createElement("div");
        headerGroup.className = "category-header-group";

        // 分类标题
        const catTitle = document.createElement("h2");
        catTitle.className = "category-title";
        catTitle.textContent = catBlock.category;
        headerGroup.appendChild(catTitle);

        // 分类简介 (灰色偏白)
        const catDesc = document.createElement("div");
        catDesc.className = "category-desc";
        catDesc.textContent = catBlock.desc;
        headerGroup.appendChild(catDesc);

        catSection.appendChild(headerGroup);

        // 文件夹网格流
        const catGrid = document.createElement("div");
        catGrid.className = "category-grid";

        catBlock.items.forEach(front => {
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
            catGrid.appendChild(card);
        });

        catSection.appendChild(catGrid);
        gridView.appendChild(catSection);
    });
}

// ================= 5. 进入详情页 =================
function enterDetailView(front) {
    activeFront = front;
    activeMapIndex = 0; 

    gridView.classList.add("hidden");
    siteGlobalIntro.classList.add("hidden"); // 切换时隐去网页全局简介栏
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

// ================= 7. 物理缩放与位置重置引擎 =================
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
        document.body.classList.add("max-zoom-mode");
        zoomWindow.classList.add("zoom-window-active");
        zoomToggleBtn.textContent = "❌ 取消放大";
        
        // 全画幅彻底隐藏所有多余的屏幕模块
        document.getElementById("topBar").classList.add("hidden");
        document.getElementById("wrapperHeaderZone").classList.add("hidden");
        document.getElementById("controlHeader").classList.add("hidden");
        document.getElementById("galleryWrapper").classList.add("hidden");
    } else {
        document.body.classList.remove("max-zoom-mode");
        zoomWindow.classList.remove("zoom-window-active");
        zoomToggleBtn.textContent = "🔍 点击放大";
        
        document.getElementById("topBar").classList.remove("hidden");
        document.getElementById("wrapperHeaderZone").classList.remove("hidden");
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

// ================= 9. 手势控制监听 =================
function setupEventListeners() {
    backBtn.addEventListener("click", returnToHome);
    crumbHome.addEventListener("click", returnToHome);

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

    zoomWindow.addEventListener("click", (e) => {
        if (e.target.classList.contains('arrow-btn')) return;
        if (!isDragging) {
            toggleMaxZoomMode();
        }
    });

    zoomWindow.addEventListener("wheel", (e) => {
        if (!isMaxZoom) return;
        e.preventDefault(); 
        const zoomFactor = 0.15;
        if (e.deltaY < 0) {
            scale += zoomFactor; 
        } else {
            scale = Math.max(0.5, scale - zoomFactor); 
        }
        updateTransformMatrix();
    }, { passive: false });

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
            setTimeout(() => { isDragging = false; }, 50);
            zoomWindow.style.cursor = "move";
        }
    });

    document.getElementById("scrollLeft").addEventListener("click", () => galleryTrack.scrollLeft -= 150);
    document.getElementById("scrollRight").addEventListener("click", () => galleryTrack.scrollLeft += 150);
}

window.addEventListener("DOMContentLoaded", init);
