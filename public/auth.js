function checkAuthStatus() {
    const token = localStorage.getItem('token');
    const isAuthPage = window.location.pathname.includes('login.html') ||
        window.location.pathname.includes('register.html');

    if (!token && !isAuthPage) {
        window.location.href = 'login.html';
    } else if (token && isAuthPage) {
        window.location.href = 'search.html';
    }

    if (token) {
        document.getElementById('loginLink')?.remove();
        document.getElementById('registerLink')?.remove();
        document.getElementById('logoutBtn').style.display = 'block';
    }
}

document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});
