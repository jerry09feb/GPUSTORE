// === MOCK DATABASE (ĐỒNG BỘ DỮ LIỆU SẢN PHẨM) ===
const MOCK_PRODUCTS = [
    { id: 1, name: "ASUS ROG Strix GeForce RTX 4090 OC Edition", brand: "ASUS", chipset: "NVIDIA", price: 54990000, oldPrice: 58000000, vram: "24GB GDDR6X", bus: "384-bit", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", description: "Card đầu bảng mạnh mẽ nhất." },
    { id: 2, name: "MSI GeForce RTX 4070 Ti SUPER Gaming X Slim", brand: "MSI", chipset: "NVIDIA", price: 23490000, oldPrice: 25990000, vram: "16GB GDDR6X", bus: "256-bit", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop", description: "Thiết kế mỏng gọn, tối ưu 2K." },
    { id: 3, name: "Gigabyte Radeon RX 7900 XTX GAMING OC", brand: "GIGABYTE", chipset: "AMD", price: 27890000, oldPrice: null, vram: "24GB GDDR6", bus: "384-bit", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop", description: "Quái vật đồ họa AMD 24GB." },
    { id: 4, name: "Zotac Gaming GeForce RTX 4060 Twin Edge", brand: "ZOTAC", chipset: "NVIDIA", price: 7990000, oldPrice: 8500000, vram: "8GB GDDR6", bus: "128-bit", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop", description: "Phân khúc tầm trung tiết kiệm." },
    { id: 5, name: "ASUS TUF Gaming Radeon RX 7800 XT OC", brand: "ASUS", chipset: "AMD", price: 15490000, oldPrice: 16990000, vram: "16GB GDDR6", bus: "256-bit", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop", description: "Độ bền chuẩn quân sự TUF." },
    { id: 6, name: "MSI GeForce RTX 4080 SUPER 16G EXPERT", brand: "MSI", chipset: "NVIDIA", price: 31990000, oldPrice: 33500000, vram: "16GB GDDR6X", bus: "256-bit", image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=500&auto=format&fit=crop", description: "Thiết kế nhôm đúc sang trọng." },
    { id: 7, name: "Gigabyte GeForce RTX 3060 Gaming OC 12G", brand: "GIGABYTE", chipset: "NVIDIA", price: 7490000, oldPrice: 8200000, vram: "12GB GDDR6", bus: "192-bit", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?q=80&w=500&auto=format&fit=crop", description: "RTX 3060 quốc dân 12GB." },
    { id: 8, name: "Colorful GeForce RTX 3050 Battle AX 8GB", brand: "COLORFUL", chipset: "NVIDIA", price: 5290000, oldPrice: 5900000, vram: "8GB GDDR6", bus: "128-bit", image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=500&auto=format&fit=crop", description: "Giải pháp giá rẻ trải nghiệm Ray Tracing." }
];

document.addEventListener("DOMContentLoaded", () => {
    populateSelectOptions();
    updateCartBadge();
});

function populateSelectOptions() {
    const select1 = document.getElementById("product1Select");
    const select2 = document.getElementById("product2Select");

    MOCK_PRODUCTS.forEach(p => {
        const option1 = `<option value="${p.id}">${p.name} (${formatCurrency(p.price)})</option>`;
        const option2 = `<option value="${p.id}">${p.name} (${formatCurrency(p.price)})</option>`;
        select1.insertAdjacentHTML('beforeend', option1);
        select2.insertAdjacentHTML('beforeend', option2);
    });
}

function formatCurrency(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

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

function updateComparison() {
    const id1 = document.getElementById("product1Select").value;
    const id2 = document.getElementById("product2Select").value;
    const resultContainer = document.getElementById("compareResult");

    if (!id1 || !id2) {
        resultContainer.innerHTML = `<div class="compare-placeholder">Vui lòng chọn đầy đủ cả 2 sản phẩm ở phía trên để so sánh thông số kỹ thuật.</div>`;
        return;
    }

    const p1 = MOCK_PRODUCTS.find(p => p.id == id1);
    const p2 = MOCK_PRODUCTS.find(p => p.id == id2);

    // Thuật toán gợi ý thông minh dựa trên giá tiền và thông số
    let recommendationHTML = "";
    if (p1.price === p2.price) {
        recommendationHTML = `Cả hai sản phẩm có mức giá tương đương. Hãy chọn <strong>${p1.name.includes('AMD') || p1.vram.includes('24GB') ? p1.name : p2.name}</strong> nếu bạn ưu tiên dung lượng VRAM lớn hơn.`;
    } else {
        const cheaper = p1.price < p2.price ? p1 : p2;
        const expensive = p1.price < p2.price ? p2 : p1;
        
        recommendationHTML = `
            🔥 <strong>Gợi ý lựa chọn:</strong><br>
            - Nếu bạn muốn <strong>tối ưu chi phí / tiết kiệm ngân sách</strong>: Nên chọn <strong>${cheaper.name}</strong> (${formatCurrency(cheaper.price)}).<br>
            - Nếu bạn muốn <strong>hiệu năng đỉnh cao, chiến game nặng / đồ họa 4K lâu dài</strong> và không ngại đầu tư: Nên chọn <strong>${expensive.name}</strong> (${formatCurrency(expensive.price)}).
        `;
    }

    resultContainer.innerHTML = `
        <table class="compare-table">
            <tr>
                <th>Hình Ảnh</th>
                <td><img src="${p1.image}" alt="${p1.name}"><br><strong>${p1.name}</strong></td>
                <td><img src="${p2.image}" alt="${p2.name}"><br><strong>${p2.name}</strong></td>
            </tr>
            <tr>
                <th>Thương Hiệu</th>
                <td style="color: #76b900; font-weight: bold;">${p1.brand}</td>
                <td style="color: #76b900; font-weight: bold;">${p2.brand}</td>
            </tr>
            <tr>
                <th>Chipset</th>
                <td>${p1.chipset}</td>
                <td>${p2.chipset}</td>
            </tr>
            <tr>
                <th>Mức Giá</th>
                <td style="color: #76b900; font-weight: bold; font-size: 16px;">${formatCurrency(p1.price)}</td>
                <td style="color: #76b900; font-weight: bold; font-size: 16px;">${formatCurrency(p2.price)}</td>
            </tr>
            <tr>
                <th>Dung Lượng VRAM</th>
                <td>${p1.vram}</td>
                <td>${p2.vram}</td>
            </tr>
            <tr>
                <th>Băng Thông (Bus)</th>
                <td>${p1.bus}</td>
                <td>${p2.bus}</td>
            </tr>
            <tr>
                <th>Mô Tả</th>
                <td>${p1.description}</td>
                <td>${p2.description}</td>
            </tr>
            <tr style="background-color: rgba(118, 185, 0, 0.05);">
                <th>💡 Lời Khuyên Mua Sắm</th>
                <td colspan="2" style="text-align: left; padding: 20px; color: #d1d5db; line-height: 1.6;">
                    ${recommendationHTML}
                </td>
            </tr>
        </table>
    `;
}