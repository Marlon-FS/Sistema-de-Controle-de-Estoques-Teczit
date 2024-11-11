document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Verificar se os dados de login estão corretos
    const storedPassword = localStorage.getItem(username);

    if (storedPassword && storedPassword === password) {
        alert('Login bem-sucedido!');
        window.location.href = 'index.html'; // Redirecionar para a página principal do sistema
    } else {
        alert('Usuário ou senha inválidos.');
    }
});

document.getElementById('show-password-login').addEventListener('change', function (e) {
    const passwordField = document.getElementById('password');
    passwordField.type = e.target.checked ? 'text' : 'password';
});
