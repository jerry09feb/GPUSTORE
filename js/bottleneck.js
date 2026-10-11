// Dữ liệu sản phẩm GPU đồng bộ từ hệ thống
const MOCK_PRODUCTS = [
    { id: 1, name: "ASUS ROG Strix GeForce RTX 4090 OC Edition", power: 450, tier: 5 },
    { id: 2, name: "MSI GeForce RTX 4070 Ti SUPER Gaming X Slim", power: 285, tier: 4 },
    { id: 3, name: "Gigabyte Radeon RX 7900 XTX GAMING OC", power: 355, tier: 4 },
    { id: 4, name: "Zotac Gaming GeForce RTX 4060 Twin Edge", power: 115, tier: 2 },
    { id: 5, name: "ASUS TUF Gaming Radeon RX 7800 XT OC", power: 263, tier: 3 },
    { id: 6, name: "MSI GeForce RTX 4080 SUPER 16G EXPERT", power: 320, tier: 5 },
    { id: 7, name: "Gigabyte GeForce RTX 3060 Gaming OC 12G", power: 170, tier: 2 },
    { id: 8, name: "Colorful GeForce RTX 3050 Battle AX 8GB", power: 130, tier: 1 }
];

// Trọng số sức mạnh CPU tương ứng
const CPU_TIERS = {
    "i3-12100": 2,
    "i5-12400": 3,
    "i5-13600": 4,
    "i7-13700": 5,
    "i9-14900": 5,
    "r5-3600": 2,
    "r5-7600": 3,
    "r7-7800x3d": 5,
    "r9-7950x": 5
};

document.addEventListener("DOMContentLoaded", () => {
    updateCartBadge();
});

function calculateBottleneck() {
    const cpuVal = document.getElementById("cpuSelect").value;
    const gpuId = document.getElementById("gpuSelect").value;
    const resultContainer = document.getElementById("analysisResult");

    if (!cpuVal || !gpuId) {
        alert("Vui lòng chọn đầy đủ cả CPU và GPU để hệ thống tiến hành phân tích!");
        return;
    }

    const gpu = MOCK_PRODUCTS.find(p => p.id == gpuId);
    const cpuTier = CPU_TIERS[cpuVal];
    const gpuTier = gpu.tier;

    // Tính toán độ nghẽn cổ chai giả lập dựa trên chênh lệch tier
    let bottleneckPercent = 0;
    let bottleneckText = "";
    let psuRecommended = gpu.power + 250; // Dự trù nguồn tối thiểu

    if (cpuTier >= gpuTier) {
        bottleneckPercent = Math.floor(Math.random() * 5) + 1; // 1-5%
        bottleneckText = "Tuyệt vời! Cấu hình cân bằng hoàn hảo, CPU phát huy tối đa sức mạnh của GPU.";
    } else if (gpuTier - cpuTier === 1) {
        bottleneckPercent = Math.floor(Math.random() * 10) + 12; // 12-22%
        bottleneckText = "Mức nghẽn nhẹ ở các tựa game ăn nhiều CPU (Esports độ phân giải thấp). Chơi game 2K/4K vẫn rất mượt.";
    } else {
        bottleneckPercent = Math.floor(Math.random() * 15) + 28; // 28-43%
        bottleneckText = "Cảnh báo: CPU của bạn đang yếu hơn khá nhiều so với GPU này. Nên cân nhắc nâng cấp CPU để tránh lãng phí hiệu năng card!";
    }

    resultContainer.style.display = "block";
    resultContainer.innerHTML = `
        <div class="analysis-header">
            <i class="fa-solid fa-chart-line"></i> Kết Quả Phân Tích Chuyên Sâu
        </div>
        <div class="result-row">
            <div class="result-box">
                <h4>Độ Nghẽn Cổ Chai (Bottleneck)</h4>
                <div class="result-value" style="color: ${bottleneckPercent > 25 ? '#ff4757' : '#76b900'};">${bottleneckPercent}%</div>
                <p class="result-desc">${bottleneckText}</p>
            </div>
            <div class="result-box">
                <h4>Khuyến Nghị Nguồn Điện (PSU)</h4>
                <div class="result-value">${psuRecommended}W - 850W</div>
                <p class="result-desc">Công suất tiêu thụ tối đa của GPU là ${gpu.power}W. Đề xuất nguồn đạt chuẩn 80 Plus Bronze/Gold trở lên.</p>
            </div>
        </div>
    `;
}

// Đồng bộ giỏ hàng
function getCartFromStorage() {
    const savedCart = localStorage.getItem("gpustore_cart");
    return savedCart ? JSON.parse(savedCart) : [];
}

function updateCartBadge() {
    const cart = getCartFromStorage();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById("cartCount");
    if (badge) badge.innerText = totalCount;
}