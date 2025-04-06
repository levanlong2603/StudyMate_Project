// ========== PHẦN XỬ LÝ ĐĂNG KÝ ==========
document.getElementById('register-link').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Tạo form đăng ký động
    const loginForm = document.getElementById('login-form');
    loginForm.innerHTML = `
        <div class="input-group">
            <label for="reg-name">Họ và tên</label>
            <i class="fas fa-user input-icon"></i>
            <input type="text" id="reg-name" placeholder="Nhập họ và tên" required>
            <div class="error-message" id="name-error">Vui lòng nhập họ tên</div>
        </div>
        
        <div class="input-group">
            <label for="reg-email">Email</label>
            <i class="fas fa-envelope input-icon"></i>
            <input type="email" id="reg-email" placeholder="Nhập email của bạn" required>
            <div class="error-message" id="reg-email-error">Vui lòng nhập email hợp lệ</div>
        </div>
        
        <div class="input-group">
            <label for="reg-password">Mật khẩu</label>
            <i class="fas fa-lock input-icon"></i>
            <input type="password" id="reg-password" placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)" required>
            <i class="fas fa-eye password-toggle" id="toggle-reg-password"></i>
            <div class="error-message" id="reg-password-error">Mật khẩu phải có ít nhất 6 ký tự</div>
        </div>
        
        <div class="input-group">
            <label for="reg-confirm-password">Xác nhận mật khẩu</label>
            <i class="fas fa-lock input-icon"></i>
            <input type="password" id="reg-confirm-password" placeholder="Nhập lại mật khẩu" required>
            <i class="fas fa-eye password-toggle" id="toggle-reg-confirm-password"></i>
            <div class="error-message" id="reg-confirm-error">Mật khẩu không khớp</div>
        </div>
        
        <button type="submit" class="btn btn-primary" id="register-btn">
            <span id="reg-btn-text">Đăng ký</span>
            <div class="loading" id="reg-loading"></div>
        </button>
        
        <div class="back-to-login">
            Đã có tài khoản? <a href="#" id="back-to-login">Đăng nhập ngay</a>
        </div>
    `;
    
    // Cập nhật tiêu đề
    document.querySelector('.login-container h2').textContent = 'Đăng ký tài khoản';
    
    // Thêm sự kiện cho nút quay lại đăng nhập
    document.getElementById('back-to-login').addEventListener('click', function(e) {
        e.preventDefault();
        location.reload(); // Tải lại trang để quay về form đăng nhập
    });
    
    // Thêm sự kiện toggle password cho form đăng ký
    document.getElementById('toggle-reg-password').addEventListener('click', function() {
        togglePassword('reg-password', 'toggle-reg-password');
    });
    
    document.getElementById('toggle-reg-confirm-password').addEventListener('click', function() {
        togglePassword('reg-confirm-password', 'toggle-reg-confirm-password');
    });
    
    // Xử lý submit form đăng ký
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegistration();
    });
});

// Hàm xử lý đăng ký
function handleRegistration() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    
    // Reset error messages
    document.getElementById('name-error').style.display = 'none';
    document.getElementById('reg-email-error').style.display = 'none';
    document.getElementById('reg-password-error').style.display = 'none';
    document.getElementById('reg-confirm-error').style.display = 'none';
    
    let isValid = true;
    
    // Validate name
    if (name === '') {
        document.getElementById('name-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('reg-email-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate password
    if (password.length < 6) {
        document.getElementById('reg-password-error').style.display = 'block';
        isValid = false;
    }
    
    // Validate confirm password
    if (password !== confirmPassword) {
        document.getElementById('reg-confirm-error').style.display = 'block';
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Hiển thị loading
    const btnText = document.getElementById('reg-btn-text');
    const loading = document.getElementById('reg-loading');
    btnText.textContent = 'Đang đăng ký...';
    loading.style.display = 'block';
    
    // Gửi dữ liệu đăng ký đến server (mô phỏng)
    setTimeout(() => {
        // Giả lập response từ server
        const isSuccess = true; // Giả sử đăng ký thành công
        
        if (isSuccess) {
            showSuccessMessage('Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.');
            
            // Reset form
            document.getElementById('reg-name').value = '';
            document.getElementById('reg-email').value = '';
            document.getElementById('reg-password').value = '';
            document.getElementById('reg-confirm-password').value = '';
        } else {
            showSuccessMessage('Đăng ký thất bại. Email có thể đã được sử dụng.', 'error');
        }
        
        btnText.textContent = 'Đăng ký';
        loading.style.display = 'none';
    }, 1500);
}

