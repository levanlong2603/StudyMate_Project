// Hàm xử lý quên mật khẩu
function handlePasswordReset() {
    const email = document.getElementById('reset-email').value.trim();
    
    // Reset error message
    document.getElementById('reset-email-error').style.display = 'none';
    
    // Validate email
    if (!validateEmail(email)) {
        document.getElementById('reset-email-error').style.display = 'block';
        return;
    }
    
    // Hiển thị loading
    const btnText = document.getElementById('reset-btn-text');
    const loading = document.getElementById('reset-loading');
    btnText.textContent = 'Đang gửi...';
    loading.style.display = 'block';
    
    // Gửi yêu cầu reset mật khẩu (mô phỏng)
    setTimeout(() => {
        // Giả lập response từ server
        const isSuccess = true; // Giả sử gửi thành công
        
        if (isSuccess) {
            showSuccessMessage('Đã gửi liên kết đặt lại mật khẩu đến email của bạn. Vui lòng kiểm tra hộp thư.');
            document.getElementById('reset-email').value = '';
        } else {
            showSuccessMessage('Email không tồn tại trong hệ thống.', 'error');
        }
        
        btnText.textContent = 'Gửi yêu cầu';
        loading.style.display = 'none';
    }, 1500);
}

// ========== CÁC HÀM HỖ TRỢ ==========
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function togglePassword(inputId, toggleId) {
    const passwordInput = document.getElementById(inputId);
    const toggleIcon = document.getElementById(toggleId);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

function showSuccessMessage(message, type = 'success') {
    const successMsg = document.getElementById('success-message');
    successMsg.textContent = message;
    successMsg.style.display = 'block';
    successMsg.className = 'success-message ' + type;
    
    setTimeout(() => {
        successMsg.style.display = 'none';
    }, 5000);
}

// Thêm sự kiện toggle password cho form đăng nhập (nếu chưa có)
document.getElementById('toggle-password').addEventListener('click', function() {
    togglePassword('password', 'toggle-password');
});
