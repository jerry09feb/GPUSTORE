let cartItems = [];
let discountPercent = 0; // % giảm giá

document.addEventListener("DOMContentLoaded", () => {
  loadCartFromStorage();
  renderCart();
  setupEvents();
});

// Lấy danh sách từ localStorage
function loadCartFromStorage() {
  const savedCart = localStorage.getItem("gpustore_cart");
  cartItems = savedCart ? JSON.parse(savedCart) : [];
}

// Lưu danh sách vào localStorage
function saveCartToStorage() {
  localStorage.setItem("gpustore_cart", JSON.stringify(cartItems));
}

// Định dạng tiền tệ VND
function formatCurrency(price) {
  return price.toLocaleString('vi-VN') + '₫';
}

// Render giỏ hàng ra màn hình
function renderCart() {
  const container = document.getElementById("cartItemsContainer");
  const badge = document.getElementById("cartBadge");
  const totalCount = document.getElementById("totalItemsCount");

  const totalQty = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) badge.innerText = totalQty;
  if (totalCount) totalCount.innerText = totalQty;

  if (cartItems.length === 0) {
    container.innerHTML = `
      <div class="empty-msg" style="text-align: center; padding: 40px 0; color: #a0aec0;">
        <i class="fa-solid fa-cart-flatbed" style="font-size: 40px; margin-bottom: 12px; color: #cbd5e0;"></i>
        <p>Giỏ hàng của bạn đang trống!</p>
      </div>`;
    updateSummary();
    return;
  }

  container.innerHTML = cartItems.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <div class="cart-item-price">${formatCurrency(item.price)}</div>
      </div>
      <div class="cart-item-actions">
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
        <button class="btn-remove" onclick="removeItem(${item.id})">
          <i class="fa-solid fa-trash-can"></i> Xóa
        </button>
      </div>
    </div>
  `).join('');

  updateSummary();
}

// Tăng/giảm số lượng sản phẩm
function changeQty(id, delta) {
  const item = cartItems.find(p => p.id === id);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeItem(id);
    } else {
      saveCartToStorage();
      renderCart();
    }
  }
}

// Xóa sản phẩm khỏi giỏ
function removeItem(id) {
  cartItems = cartItems.filter(p => p.id !== id);
  saveCartToStorage();
  renderCart();
}

// Cập nhật bảng tổng giá
function updateSummary() {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = Math.max(0, subtotal - discountAmount);

  const subtotalEl = document.getElementById("subtotalPrice");
  const discountEl = document.getElementById("discountPrice");
  const totalEl = document.getElementById("totalPrice");

  if (subtotalEl) subtotalEl.innerText = formatCurrency(subtotal);
  if (discountEl) discountEl.innerText = `-${formatCurrency(discountAmount)}`;
  if (totalEl) totalEl.innerText = formatCurrency(total);
}

// Lắng nghe sự kiện
function setupEvents() {
  // Mã giảm giá
  const applyBtn = document.getElementById("applyCouponBtn");
  if (applyBtn) {
    applyBtn.addEventListener("click", () => {
      const code = document.getElementById("couponInput").value.trim().toUpperCase();
      const msg = document.getElementById("couponMsg");

      if (code === "GPUZONE10" || code === "GPUSTORE") {
        discountPercent = 10;
        msg.className = "coupon-msg success";
        msg.innerText = "Áp dụng mã giảm 10% thành công!";
      } else if (code === "") {
        discountPercent = 0;
        msg.innerText = "";
      } else {
        discountPercent = 0;
        msg.className = "coupon-msg error";
        msg.innerText = "Mã giảm giá không chính xác!";
      }
      updateSummary();
    });
  }

  // Nút đặt hàng
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cartItems.length === 0) {
        showCustomAlert("Giỏ hàng đang trống, không thể đặt hàng!");
        return;
      }

      const name = document.getElementById("fullname")?.value.trim();
      const phone = document.getElementById("phone")?.value.trim();
      const address = document.getElementById("address")?.value.trim();

      if (!name || !phone || !address) {
        showCustomAlert("Vui lòng nhập đầy đủ các thông tin giao hàng!");
        return;
      }

      showCustomAlert(`Đặt hàng thành công! Cảm ơn bạn ${name}.`);
      cartItems = [];
      saveCartToStorage();
      renderCart();
    });
  }
}

// Hàm hiển thị bảng thông báo tùy chỉnh
function showCustomAlert(message) {
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