// ================= 1. 数据源配置（可在此自由增删修改归档） =================
const maps = [
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
        name: "扎波罗热",
        desc: "扎波罗热交战态势。"
    },
    {
        id: "xiao",
        name: "兵力密度(5km)",
        desc: "俄乌两军兵力密度图,单位格子长度为5km。"
    },
        {
        id: "zhong",
        name: "兵力密度(10km)",
        desc: "俄乌两军兵力密度图,单位格子长度为5km。"
    },
];

// ================= 2. 全局状态控制 =================
let activeFront = null;        
let activeMapIndex = 0;        
let generatedDates = [];       // 存放自动化生成的日期检测池

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

// ================= 4. 初始化与自动生成日期检测池 =================
async function init() {
    const today = new Date();
    // 渲染标题栏自动识别的现实日期
    liveDateEl.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

    // 核心自动化逻辑：自动生成最近30天的日期用来检测服务器图片（如 2026-6-4 到 2026-5-5）
    generatedDates = [];
    for (let i = 0; i < 30; i++) {
        const d = new Date();
        d.setDate(today.getDate() - i);
        // 生成对应格式的字符串，如 "2026-6-4"
        const dateStr = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        generatedDates.push(dateStr);
    }

    // 预先筛查每个分类存在哪些图片
    for (let front of mapProjectData) {
        front.validHistory = await checkValidImages(front.id, generatedDates);
    }

    renderGridHome();
    setupEventListeners();
}

// ================= 5. 纯前端轻量级探针：自动检测服务器上是否有对应的 jpeg 图片 =================
function checkValidImages(frontId, dateArray) {
    return new Promise((resolve) => {
        let validList = [];
        let checkedCount = 0;

        dateArray.forEach((dateStr) => {
            const img = new Image();
            img.src = `maps/${frontId}/${dateStr}.jpeg`;
            
            // 如果图片存在，则加入有效列表中
            img.onload = () => {
                validList.push(dateStr);
                checkedCount++;
                if (checkedCount === dateArray.length) {
                    // 按时间从新到旧排序
                    validList.sort((a, b) => new Date(b) - new Date(a));
                    resolve(validList);
                }
            };
            // 如果图片不存在，说明这天没更新，直接跳过
            img.onerror = () => {
                checkedCount++;
                if (checkedCount === dateArray.length) {
                    validList.sort((a, b) => new Date(b) - new Date(a));
                    resolve(validList);
                }
            };
        });
    });
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
        
        // 如果自动检测到了图片，封面用最新的；没有检测到，则使用缺省占位图
        const hasMap = front.validHistory && front.validHistory.length > 0;
        const coverImgPath = hasMap 
            ? `maps/${front.id}/${front.validHistory[0]}.jpeg` 
            : `https://placehold.co/600x400/111416/8a949d?text=No+Image`;

        card.innerHTML = `
            <div class="card-thumb-wp">
                <img src="${coverImgPath}" alt="${front.name}">
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
    activeMapIndex = 0; 

    gridView.classList.add("hidden");
    detailView.classList.remove("hidden");

    // 动态同步更新面包屑
    crumbHome.classList.remove("active");
    crumbSep.classList.remove("hidden");
    crumbDetail.classList.remove("hidden");
    crumbDetail.textContent = front.name;
    crumbDetail.classList.add("active");

    frontTitle.textContent = front.name;
    updateLightboxAndGallery();
}

// ================= 8. 更新大图与底部的历史时间轴画廊 (无任何文字标签) =================
function updateLightboxAndGallery() {
    if (!activeFront || !activeFront.validHistory || activeFront.validHistory.length === 0) {
        mainMapViewer.src = "";
        galleryTrack.innerHTML = "<p style='padding:20px;color:#8a949d;'>暂无历史归档图片</p>";
        return;
    }

    const currentMapName = activeFront.validHistory[activeMapIndex];
    mainMapViewer.src = `maps/${activeFront.id}/${currentMapName}.jpeg`;

    // 渲染底部画廊（不包含任何名称和日期标签，只有缩略图）
    galleryTrack.innerHTML = "";
    activeFront.validHistory.forEach((mapName, index) => {
        const thumb = document.createElement("div");
        thumb.className = `thumb-item ${index === activeMapIndex ? 'active' : ''}`;
        
        const thumbImgPath = `maps/${activeFront.id}/${mapName}.jpeg`;
        thumb.innerHTML = `<img src="${thumbImgPath}">`;
        
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
    // 两个返回逻辑都调用统一的方法
    backBtn.addEventListener("click", returnToHome);
    crumbHome.addEventListener("click", returnToHome);

    // 大图切换控制：左箭头
    document.getElementById("prevMap").addEventListener("click", () => {
        if (activeFront && activeFront.validHistory && activeMapIndex < activeFront.validHistory.length - 1) {
            activeMapIndex++;
            updateLightboxAndGallery();
        }
    });

    // 大图切换控制：右箭头
    document.getElementById("nextMap").addEventListener("click", () => {
        if (activeFront && activeFront.validHistory && activeMapIndex > 0) {
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
