// === FAKE DATABASE (MOCK DATA) - MỞ RỘNG ĐẦY ĐỦ CÁC DÒNG ===
const MOCK_PRODUCTS = [
    {
        id: 1,
        name: "ASUS ROG Strix GeForce RTX 4090 OC Edition",
        brand: "ASUS",
        chipset: "NVIDIA",
        price: 54990000,
        oldPrice: 58000000,
        vram: "24GB GDDR6X",
        bus: "384-bit",
        tag: "HOT",
        image: "./img/ha.webp",
        description: "Card màn hình đầu bảng mạnh mẽ nhất hiện nay với hệ thống tản nhiệt Axial-tech vượt trội, hỗ trợ DLSS 3 và dò tia thời gian thực."
    },
    {
        id: 2,
        name: "MSI GeForce RTX 4070 Ti SUPER Gaming X Slim",
        brand: "MSI",
        chipset: "NVIDIA",
        price: 23490000,
        oldPrice: 25990000,
        vram: "16GB GDDR6X",
        bus: "256-bit",
        tag: "GIẢM 10%",
        image: "./img/haa.webp",
        description: "Thiết kế mỏng gọn tối ưu không gian nhưng vẫn giữ hiệu năng tản nhiệt cực tốt cho độ phân giải 2K."
    },
    {
        id: 3,
        name: "Gigabyte Radeon RX 7900 XTX GAMING OC",
        brand: "GIGABYTE",
        chipset: "AMD",
        price: 27890000,
        oldPrice: null,
        vram: "24GB GDDR6",
        bus: "384-bit",
        tag: "NEW",
        image: "./img/haaa.webp",
        description: "Quái vật đồ họa AMD với VRAM khủng 24GB, băng thông siêu rộng đáp ứng dựng hình 3D và game nặng."
    },
    {
        id: 4,
        name: "Zotac Gaming GeForce RTX 4060 Twin Edge",
        brand: "ZOTAC",
        chipset: "NVIDIA",
        price: 7990000,
        oldPrice: 8500000,
        vram: "8GB GDDR6",
        bus: "128-bit",
        tag: "BEST SELLER",
        image: "./img/haaaa.jpg",
        description: "Lựa chọn quốc dân phân khúc tầm trung, tối ưu chi phí và tiết kiệm điện năng kiến trúc Ada Lovelace."
    },
    {
        id: 5,
        name: "ASUS TUF Gaming Radeon RX 7800 XT OC",
        brand: "ASUS",
        chipset: "AMD",
        price: 15490000,
        oldPrice: 16990000,
        vram: "16GB GDDR6",
        bus: "256-bit",
        tag: "HOT",
        image: "./img/haaaaa.webp",
        description: "Độ bền chuẩn quân sự TUF, vận hành ổn định bền bỉ, chiến tốt mọi tựa game AAA."
    },
    {
        id: 6,
        name: "MSI GeForce RTX 4080 SUPER 16G EXPERT",
        brand: "MSI",
        chipset: "NVIDIA",
        price: 31990000,
        oldPrice: 33500000,
        vram: "16GB GDDR6X",
        bus: "256-bit",
        tag: null,
        image: "./img/haaaaaa.jpg",
        description: "Thiết kế nhôm đúc sang trọng, tản nhiệt buồng hơi độc quyền mang lại hiệu suất đỉnh cao."
    },
    {
        id: 7,
        name: "Gigabyte GeForce RTX 3060 Gaming OC 12G",
        brand: "GIGABYTE",
        chipset: "NVIDIA",
        price: 7490000,
        oldPrice: 8200000,
        vram: "12GB GDDR6",
        bus: "192-bit",
        tag: "GIẢM SỐC",
        image: "./img/ga.jpg",
        description: "Dòng RTX 3060 quốc dân với 12GB VRAM cực kỳ hời cho các tác vụ làm đồ họa và chơi game phổ thông."
    },
    {
        id: 8,
        name: "Colorful GeForce RTX 3050 Battle AX 8GB",
        brand: "COLORFUL",
        chipset: "NVIDIA",
        price: 5290000,
        oldPrice: 5900000,
        vram: "8GB GDDR6",
        bus: "128-bit",
        tag: "GIÁ RẺ",
        image: "./img/gaa.jpg",
        description: "Giải pháp tiết kiệm tối ưu để trải nghiệm công nghệ Ray Tracing và DLSS ở độ phân giải Full HD."
    }
];

// === FAKE API SERVICE ===
const FakeAPI = {
    getProducts: function() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...MOCK_PRODUCTS]);
            }, 500);
        });
    },
    getProductById: function(id) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const product = MOCK_PRODUCTS.find(p => p.id === Number(id));
                resolve(product || null);
            }, 300);
        });
    }
};

let allProducts = [];
let currentFilter = "ALL";

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    setupEventListeners();
    updateCartBadge();
    injectModalHTML();
});

function getCartFromStorage() {
    const savedCart = localStorage.getItem("gpustore_cart");
    return savedCart ? JSON.parse(savedCart) : [];
}

function saveCartToStorage(cart) {
    localStorage.setItem("gpustore_cart", JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const cart = getCartFromStorage();
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById("cartCount");
    if (cartCountEl) cartCountEl.innerText = totalCount;
}

async function fetchProducts() {
    const productGrid = document.getElementById("productGrid");
    try {
        allProducts = await FakeAPI.getProducts();
        renderProducts(allProducts);
    } catch (error) {
        productGrid.innerHTML = `<p class="no-product">Có lỗi xảy ra khi tải danh sách sản phẩm!</p>`;
    }
}

function formatCurrency(price) {
    return price.toLocaleString('vi-VN') + '₫';
}

function renderProducts(products) {
    const productGrid = document.getElementById("productGrid");

    if (products.length === 0) {
        productGrid.innerHTML = `<p class="no-product">Không tìm thấy sản phẩm nào phù hợp với bộ lọc!</p>`;
        return;
    }

    productGrid.innerHTML = products.map(product => {
        const tagHTML = product.tag ? `<span class="tag">${product.tag}</span>` : '';
        const oldPriceHTML = product.oldPrice ? `<span class="old-price">${formatCurrency(product.oldPrice)}</span>` : '';

        return `
            <div class="product-card">
                ${tagHTML}
                <img src="${product.image}" alt="${product.name}" class="product-img" onclick="showProductDetail(${product.id})" style="cursor: pointer;">
                <div class="product-info">
                    <span class="product-brand">${product.brand}</span>
                    <h3 class="product-name" onclick="showProductDetail(${product.id})" style="cursor: pointer;">${product.name}</h3>
                    <ul class="product-specs">
                        <li><i class="fa-solid fa-memory"></i> ${product.vram}</li>
                        <li><i class="fa-solid fa-bolt"></i> ${product.bus}</li>
                    </ul>
                    <div class="product-bottom">
                        <div class="price-box">
                            <span class="price">${formatCurrency(product.price)}</span>
                            ${oldPriceHTML}
                        </div>
                        <button class="btn-add-cart" onclick="addToCart(${product.id})" title="Thêm vào giỏ">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    let cart = getCartFromStorage();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCartToStorage(cart);
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
}

// === HỆ THỐNG LỌC ĐA DẠNG (HÃNG, GIÁ, SERIES) ===
function filterProducts() {
    const keyword = document.getElementById("searchInput").value.toLowerCase().trim();
    const priceVal = document.getElementById("priceFilter").value;
    const seriesVal = document.getElementById("seriesFilter").value;

    const filtered = allProducts.filter(product => {
        // 1. Lọc theo hãng hoặc chipset (từ nút bấm thương hiệu)
        const matchesBrand = (currentFilter === "ALL") || 
                             (product.brand === currentFilter) || 
                             (product.chipset === currentFilter);

        // 2. Lọc theo ô tìm kiếm từ khóa
        const matchesSearch = product.name.toLowerCase().includes(keyword) || 
                              product.brand.toLowerCase().includes(keyword);

        // 3. Lọc theo khoảng giá
        let matchesPrice = true;
        if (priceVal === "UNDER_10M") matchesPrice = product.price < 10000000;
        else if (priceVal === "10M_20M") matchesPrice = product.price >= 10000000 && product.price <= 20000000;
        else if (priceVal === "20M_30M") matchesPrice = product.price > 20000000 && product.price <= 30000000;
        else if (priceVal === "OVER_30M") matchesPrice = product.price > 30000000;

        // 4. Lọc theo Series (3050, 3060, 4060, v.v.)
        let matchesSeries = true;
        if (seriesVal !== "ALL") {
            matchesSeries = product.name.includes(seriesVal);
        }

        return matchesBrand && matchesSearch && matchesPrice && matchesSeries;
    });

    renderProducts(filtered);
}

function setupEventListeners() {
    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", filterProducts);
    }

    const brandBtns = document.querySelectorAll(".brand-btn");
    brandBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            brandBtns.forEach(b => b.classList.remove("active"));
            e.target.classList.add("active");

            currentFilter = e.target.getAttribute("data-brand");
            filterProducts();
        });
    });
}

// === MODAL CHI TIẾT SẢN PHẨM ===
function injectModalHTML() {
    if (document.getElementById("productModal")) return;

    const modalHTML = `
        <div id="productModal" class="modal-overlay" style="display:none;">
            <div class="modal-content">
                <button class="modal-close" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
                <div class="modal-body" id="modalBodyContent"></div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const style = document.createElement('style');
    style.innerHTML = `
        .modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.8); z-index: 2000;
            display: flex; justify-content: center; align-items: center;
            backdrop-filter: blur(5px);
        }
        .modal-content {
            background: #1a1d24; border: 1px solid #2e3440; border-radius: 12px;
            width: 90%; max-width: 800px; padding: 30px; position: relative;
            box-shadow: 0 20px 40px rgba(0,0,0,0.7); color: #f3f4f6;
        }
        .modal-close {
            position: absolute; top: 15px; right: 15px; background: transparent;
            border: none; color: #9ca3af; font-size: 20px; cursor: pointer;
        }
        .modal-close:hover { color: #76b900; }
        .modal-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; align-items: center; }
        .modal-img { width: 100%; border-radius: 8px; object-fit: cover; max-height: 300px; background: #0f1115; }
        .modal-details h2 { font-size: 20px; margin-bottom: 10px; color: #fff; }
        .modal-details .price { font-size: 22px; font-weight: bold; color: #76b900; margin: 15px 0; display: block; }
        .modal-details p { color: #9ca3af; font-size: 14px; margin-bottom: 20px; line-height: 1.5; }
        @media (max-width: 768px) { .modal-grid { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);
}

async function showProductDetail(productId) {
    const modal = document.getElementById("productModal");
    const content = document.getElementById("modalBodyContent");
    
    modal.style.display = "flex";
    content.innerHTML = `<div style="text-align:center; padding:40px;"><i class="fa-solid fa-spinner fa-spin"></i> Đang tải thông tin...</div>`;

    const product = await FakeAPI.getProductById(productId);

    if (!product) {
        content.innerHTML = `<p style="text-align:center; color:#ff4757;">Không tìm thấy thông tin sản phẩm!</p>`;
        return;
    }

    content.innerHTML = `
        <div class="modal-grid">
            <img src="${product.image}" alt="${product.name}" class="modal-img">
            <div class="modal-details">
                <span class="product-brand">${product.brand} - Chipset: ${product.chipset}</span>
                <h2>${product.name}</h2>
                <span class="price">${formatCurrency(product.price)}</span>
                <p>${product.description}</p>
                <ul class="product-specs" style="margin-bottom: 20px;">
                    <li><i class="fa-solid fa-memory"></i> VRAM: ${product.vram}</li>
                    <li><i class="fa-solid fa-bolt"></i> Băng thông bus: ${product.bus}</li>
                </ul>
                <button class="btn-primary" onclick="addToCartAndClose(${product.id})">Thêm Vào Giỏ Hàng</button>
            </div>
        </div>
    `;
}

function closeModal() {
    document.getElementById("productModal").style.display = "none";
}

function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    let cart = getCartFromStorage();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    saveCartToStorage(cart);
    
    // Sử dụng bảng thông báo tùy chỉnh thay vì alert trình duyệt
    showCustomAlert(`Đã thêm "${product.name}" vào giỏ hàng thành công!`);
}
// Hàm hiển thị bảng thông báo thay thế cho alert() mặc định
function showCustomAlert(message) {
    // Xóa bảng cũ nếu đang tồn tại
    const existingOverlay = document.getElementById("customAlertOverlay");
    if (existingOverlay) existingOverlay.remove();

    const alertHTML = `
        <div id="customAlertOverlay" class="custom-alert-overlay">
            <div class="custom-alert-box">
                <i class="fa-solid fa-circle-check"></i>
                <h3>Thông Báo</h3>
                <p>${message}</p>
                <button class="custom-alert-btn" onclick="closeCustomAlert()">Xác Nhận</button>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHTML);
}

function closeCustomAlert() {
    const overlay = document.getElementById("customAlertOverlay");
    if (overlay) overlay.remove();
}