document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const usernameField = document.getElementById('username');
    const passwordField = document.getElementById('password');
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    const message = document.getElementById('message');
    const togglePasswordButton = document.getElementById('togglePassword');
    const spinner = document.getElementById('spinner');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        // Clear previous error messages
        usernameError.textContent = '';
        passwordError.textContent = '';
        message.textContent = '';

        const username = usernameField.value.trim();
        const password = passwordField.value.trim();
        let isValid = true;

        // Validate username/email
        if (!username) {
            usernameError.textContent = 'Username/Email is required.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(username)) {
            usernameError.textContent = 'Enter a valid email address.';
            isValid = false;
        }

        // Validate password
        if (!password) {
            passwordError.textContent = 'Password is required.';
            isValid = false;
        } else if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters long.';
            isValid = false;
        }

        if (isValid) {
            // Show spinner
            spinner.style.display = 'block';

            // API Integration
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();

                if (response.ok) {
                    message.textContent = 'Login successful!';
                    message.style.color = 'green';
                } else {
                    message.textContent = 'Login failed. Please try again.';
                    message.style.color = 'red';
                }
            } catch (error) {
                message.textContent = 'An error occurred. Please try again later.';
                message.style.color = 'red';
            } finally {
                // Hide spinner
                spinner.style.display = 'none';
            }
        }
    });

    togglePasswordButton.addEventListener('click', () => {
        const isPassword = passwordField.type === 'password';
        passwordField.type = isPassword ? 'text' : 'password';
        togglePasswordButton.textContent = isPassword ? 'Hide' : 'Show';
    });
});
