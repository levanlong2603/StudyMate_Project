
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberCheckbox = document.getElementById('remember');
    const loginBtn = document.getElementById('login-btn');
    const guestBtn = document.getElementById('guest-btn');
    const forgotPasswordLink = document.getElementById('forgot-password');
    const registerLink = document.getElementById('register-link');
    const togglePassword = document.getElementById('toggle-password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const successMessage = document.getElementById('success-message');
    const btnText = document.getElementById('btn-text');
    const loading = document.getElementById('loading');
    const facebookLogin = document.getElementById('facebook-login');
    const googleLogin = document.getElementById('google-login');
    const githubLogin = document.getElementById('github-login');

    // Check for saved credentials and success messages
    checkSavedCredentials();
    checkURLParams();

    // Event Listeners
    loginForm.addEventListener('submit', handleLogin);
    togglePassword.addEventListener('click', togglePasswordVisibility);
    guestBtn.addEventListener('click', continueAsGuest);
    forgotPasswordLink.addEventListener('click', handleForgotPassword);
    registerLink.addEventListener('click', handleRegister);
    facebookLogin.addEventListener('click', () => socialLogin('facebook'));
    googleLogin.addEventListener('click', () => socialLogin('google'));
    githubLogin.addEventListener('click', () => socialLogin('github'));

    // Check URL for success parameters (e.g., after registration or password reset)
    function checkURLParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');
        
        if (message) {
            successMessage.textContent = decodeURIComponent(message);
            successMessage.style.display = 'block';
            
            // Remove message from URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }

    // Check for saved credentials
    function checkSavedCredentials() {
        const savedEmail = localStorage.getItem('studymate_email');
        const savedToken = localStorage.getItem('studymate_token');
        
        if (savedEmail && savedToken) {
            emailInput.value = savedEmail;
            rememberCheckbox.checked = true;
            
            // In a real app, you would validate the token with the server
            // For demo, we'll just pre-fill the email
        }
    }

    // Handle login form submission
    async function handleLogin(e) {
        e.preventDefault();
        
        // Reset errors
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        
        // Get values
        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const remember = rememberCheckbox.checked;
        
        // Validate inputs
        if (!validateInputs(email, password)) return;
        
        // Show loading state
        btnText.style.display = 'none';
        loading.style.display = 'block';
        loginBtn.disabled = true;
        
        try {
            // Simulate API call with delay
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // In a real app, you would call your authentication API here
            const authenticated = await authenticateUser(email, password);
            
            if (authenticated) {
                // Successful login
                handleSuccessfulLogin(email, remember);
            } else {
                // Failed login
                showError('Email hoặc mật khẩu không đúng');
            }
        } catch (error) {
            showError('Đã xảy ra lỗi. Vui lòng thử lại sau.');
            console.error('Login error:', error);
        } finally {
            // Reset button state
            btnText.style.display = 'block';
            loading.style.display = 'none';
            loginBtn.disabled = false;
        }
    }

    // Validate email and password
    function validateInputs(email, password) {
        let isValid = true;
        
        if (!email || !validateEmail(email)) {
            emailError.style.display = 'block';
            isValid = false;
        }
        
        if (!password) {
            passwordError.style.display = 'block';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = 'Mật khẩu phải có ít nhất 6 ký tự';
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        return isValid;
    }

    // Email validation helper
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Simulate user authentication
    async function authenticateUser(email, password) {
        // In a real app, this would be an API call to your backend
        // Example:
        // const response = await fetch('/api/auth/login', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ email, password })
        // });
        // return response.ok;
        
        // For demo purposes, we'll use mock data
        const mockUsers = [
            { email: 'admin@studymate.com', password: 'Studymate123' },
            { email: 'user@studymate.com', password: 'Password123' }
        ];
        
        return mockUsers.some(user => 
            user.email === email && user.password === password
        );
    }

    // Handle successful login
    function handleSuccessfulLogin(email, remember) {
        // In a real app, you would receive a token from the server
        const mockToken = generateMockToken(email);
        
        // Save to session storage for current session
        sessionStorage.setItem('studymate_auth', 'true');
        sessionStorage.setItem('studymate_user', email);
        
        // Save to local storage if "remember me" is checked
        if (remember) {
            localStorage.setItem('studymate_email', email);
            localStorage.setItem('studymate_token', mockToken);
        } else {
            localStorage.removeItem('studymate_email');
            localStorage.removeItem('studymate_token');
        }
        
        // Redirect to dashboard
        window.location.href = '.home.html';
    }

    // Generate a mock token (for demo only)
    function generateMockToken(email) {
        return btoa(`mock-token:${email}:${Date.now()}`).replace(/=/g, '');
    }

    // Toggle password visibility
    function togglePasswordVisibility() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            togglePassword.classList.replace('fa-eye', 'fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            togglePassword.classList.replace('fa-eye-slash', 'fa-eye');
        }
    }

    // Continue as guest
    function continueAsGuest() {
        sessionStorage.setItem('studymate_guest', 'true');
        window.location.href = 'home.html';
    }

    // Handle forgot password
    function handleForgotPassword(e) {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && validateEmail(email)) {
            // In a real app, you would call your password reset API
            alert(`Yêu cầu đặt lại mật khẩu đã được gửi đến ${email}`);
        } else {
            window.location.href = 'forgot-password.html';
        }
    }

    // Handle register
    function handleRegister(e) {
        e.preventDefault();
        window.location.href = 'register.html';
    }

    // Social login
    function socialLogin(provider) {
        // In a real app, this would redirect to the provider's OAuth endpoint
        // or use their SDK (like Firebase Auth)
        alert(`Đăng nhập bằng ${provider} đang được phát triển`);
    }

    // Show error message
    function showError(message) {
        passwordError.textContent = message;
        passwordError.style.display = 'block';
        passwordInput.focus();
    }
});