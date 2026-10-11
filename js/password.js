document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');

    const emailInput = document.querySelector('input[type="email"]');
    const nameInput = document.querySelector('input[type="text"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    if (!form || passwordInputs.length < 2) {
        console.error('Không tìm thấy form hoặc không đủ 2 ô mật khẩu!');
        return;
    }

    const password = passwordInputs[0];
    const confirmPassword = passwordInputs[1];
    const errorMessage = document.getElementById('errorMessage');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (password.value !== confirmPassword.value) {
            if (errorMessage) {
                errorMessage.textContent = 'Mật khẩu xác nhận không trùng khớp!';
                errorMessage.style.display = 'block';
            }
            confirmPassword.focus();
        } 
        else {
            if (errorMessage) {
                errorMessage.style.display = 'none';
            }

            const user = {
                email: emailInput ? emailInput.value.trim() : '',
                fullname: nameInput ? nameInput.value.trim() : '',
                password: password.value
            };
            localStorage.setItem('registeredUser', JSON.stringify(user));

            // Chuyển thẳng sang trang Đăng nhập
            window.location.href = 'login.html'; 
        }
    });
});