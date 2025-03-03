document.addEventListener('DOMContentLoaded', () => {
    // Password visibility toggle
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.querySelector('#password');
    
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    // Input animations
    const inputs = document.querySelectorAll('.auth-form input');
    inputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });

        // Validate input on change
        input.addEventListener('input', validateInput);
    });

    function validateInput(e) {
        const input = e.target;
        const wrapper = input.parentElement;
        
        if (input.type === 'email') {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
            wrapper.classList.toggle('invalid', !isValid && input.value);
        }
        
        if (input.type === 'password') {
            const isValid = input.value.length >= 8;
            wrapper.classList.toggle('invalid', !isValid && input.value);
        }
    }

    // Form submission with loading state
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('.submit-btn');
            
            try {
                // Add loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
                
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Success!';
                submitBtn.classList.add('success');
                
                // Redirect after success animation
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
                
            } catch (error) {
                // Error handling
                submitBtn.innerHTML = 'Try Again';
                submitBtn.classList.add('error');
                setTimeout(() => {
                    submitBtn.classList.remove('error');
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Sign In <i class="fas fa-arrow-right"></i>';
                }, 2000);
            }
        });
    }

    // Social login with animations
    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            btn.classList.add('loading');
            
            try {
                // Simulate social login
                await new Promise(resolve => setTimeout(resolve, 1500));
                btn.classList.add('success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            } catch (error) {
                btn.classList.add('error');
                setTimeout(() => {
                    btn.classList.remove('loading', 'error');
                }, 2000);
            }
        });
    });
});
