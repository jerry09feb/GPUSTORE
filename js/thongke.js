// === CSDL LỊCH SỬ GPU THEO NĂM ===
const GPU_HISTORY_DATA = [
    {
        year: 2026,
        name: "NVIDIA GeForce RTX 5090",
        brand: "NVIDIA",
        vram: "32GB GDDR7",
        impact: "Đỉnh cao hiệu năng AI và Gaming 8K",
        image: "./img/5090.jpg",
        description: "Mở ra kỷ nguyên bộ nhớ GDDR7 siêu tốc, sức mạnh xử lý Ray Tracing thế hệ mới kết hợp phần cứng AI chuyên sâu."
    },
    {
        year: 2024,
        name: "NVIDIA GeForce RTX 4090",
        brand: "NVIDIA",
        vram: "24GB GDDR6X",
        impact: "Quái vật phân khúc cao cấp kiến trúc Ada Lovelace",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop",
        description: "Được coi là biểu tượng sức mạnh gaming trong nhiều năm liền với công nghệ DLSS 3 Frame Generation đột phá."
    },
    {
        year: 2023,
        name: "AMD Radeon RX 7900 XTX",
        brand: "AMD",
        vram: "24GB GDDR6",
        impact: "Lựa chọn VRAM khủng hiệu năng thuần cực đỉnh",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop",
        description: "Kiến trúc RDNA 3 mang lại khả năng chiến game độ phân giải 4K cực mượt mà với mức giá cạnh tranh."
    },
    {
        year: 2021,
        name: "NVIDIA GeForce RTX 3080",
        brand: "NVIDIA",
        vram: "10GB/12GB GDDR6X",
        impact: "Cú hích lớn cho phong trào chơi game 4K phổ thông",
        image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop",
        description: "Mẫu card mang lại hiệu năng trên giá thành (P/P) xuất sắc nhất thế hệ Ampere, săn lùng cực mạnh trên thị trường."
    },
    {
        year: 2019,
        name: "NVIDIA GeForce RTX 2080 Ti",
        brand: "NVIDIA",
        vram: "11GB GDDR6",
        impact: "Kỷ nguyên khai sinh công nghệ Ray Tracing",
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop",
        description: "Con chip đầu tiên thương mại hóa nhân RT và Tensor Core, thay đổi hoàn toàn cách thế giới nhìn nhận về đồ họa thời gian thực."
    },
    {
        year: 2016,
        name: "NVIDIA GeForce GTX 1080 Ti",
        brand: "NVIDIA",
        vram: "11GB GDDR5X",
        impact: "Huyền thoại sống mãi trong lịch sử ngành GPU",
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop",
        description: "Được mệnh danh là 'vị vua không ngai' khi độ bền và sức mạnh chiến game trường tồn qua nhiều thế hệ mà không bị lỗi thời."
    }
];

document.addEventListener("DOMContentLoaded", () => {
    initYearSelector();
    filterGPUByYear();
    updateCartBadge();
});

// Khởi tạo danh sách các năm vào thẻ <select>
function initYearSelector() {
    const yearSelect = document.getElementById("yearSelect");
    // Lấy danh sách năm không trùng lặp và sắp xếp từ mới nhất đến cũ nhất
    const years = [...new Set(GPU_HISTORY_DATA.map(item => item.year))].sort((a, b) => b - a);

    years.forEach(year => {
        const option = `<option value="${year}">Năm ${year} - Các dòng GPU đỉnh cao</option>`;
        yearSelect.insertAdjacentHTML('beforeend', option);
    });
}

// Lọc và hiển thị card theo năm được chọn
function filterGPUByYear() {
    const selectedYear = parseInt(document.getElementById("yearSelect").value);
    const resultContainer = document.getElementById("historyResult");

    // Nếu chưa chọn hoặc muốn hiện toàn bộ theo năm
    const filteredList = GPU_HISTORY_DATA.filter(item => isNaN(selectedYear) || item.year === selectedYear);

    if (filteredList.length === 0) {
        resultContainer.innerHTML = `<p style="color: #9ca3af; text-align: center; grid-column: 1/-1;">Chưa có dữ liệu thống kê cho năm này.</p>`;
        return;
    }

    let html = "";
    filteredList.forEach(gpu => {
        html += `
            <div class="history-card">
                <img src="${gpu.image}" alt="${gpu.name}" class="history-card-img">
                <div class="history-card-body">
                    <span class="history-card-badge">Phát hành: ${gpu.year}</span>
                    <h3 class="history-card-title">${gpu.name}</h3>
                    <div class="history-card-specs">
                        <span><strong>Thương hiệu:</strong> ${gpu.brand}</span>
                        <span><strong>VRAM:</strong> ${gpu.vram}</span>
                        <span><strong>Dấu ấn lịch sử:</strong> ${gpu.impact}</span>
                    </div>
                    <p class="history-card-desc">${gpu.description}</p>
                </div>
            </div>
        `;
    });

    resultContainer.innerHTML = html;
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