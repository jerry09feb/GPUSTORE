const savedUser = JSON.parse(localStorage.getItem('registeredUser'));

if (savedUser) {
    console.log('Email đã lưu:', savedUser.email);
    console.log('Mật khẩu đã lưu:', savedUser.password);
}