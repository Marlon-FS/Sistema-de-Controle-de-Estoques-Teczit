document.getElementById('register-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const newUsername = document.getElementById('new-username').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Verificar se a senha e a confirmação de senha são iguais
    if (newPassword !== confirmPassword) {
        alert('As senhas não coincidem. Por favor, tente novamente.');
        return;
    }

    // Verificar se o nome de usuário tem 8 caracteres
    if (newUsername.length !== 8) {
        alert('O nome de usuário deve ter exatamente 8 caracteres.');
        return;
    }

    // Verificar se a senha é alfanumérica e tem entre 8 e 16 caracteres
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
    if (!passwordPattern.test(newPassword)) {
        alert('A senha deve ter entre 8 e 16 caracteres e ser alfanumérica.');
        return;
    }

    // Salvar os dados de login no localStorage
    localStorage.setItem(newUsername, newPassword);

    alert(`Conta criada para o usuário ${newUsername}!`);
    window.location.href = 'login.html'; // Redirecionar para a página de login após o registro
});

document.getElementById('show-passwords').addEventListener('change', function (e) {
    const passwordFields = document.querySelectorAll('#new-password, #confirm-password');
    passwordFields.forEach(field => {
        field.type = e.target.checked ? 'text' : 'password';
    });
});
