const SUPABASE_URL = 'https://mpdfhlsjovouxppgtxaz.supabase.co'; 
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wZGZobHNqb3ZvdXhwcGd0eGF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0Mzc5MzMsImV4cCI6MjA3ODAxMzkzM30.IQ3vMR4wJggsE34bucum0ayBU58bSbu0CXaFhpDkGFw';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', async (evento) => {
        evento.preventDefault(); // Impede o recarregamento da página

        const email = evento.target.email.value;
        const senha = evento.target.password.value; // Nome do campo 'password'

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha
        });

        if (error) {
            alert("Erro ao cadastrar: " + error.message);
            console.error(error); // Para debug
        } else {
            alert("Usuário cadastrado com sucesso! Faça o login.");
            window.location.href = "index.html"; // Redireciona para a página de login
        }
    });
}
// --- Lógica de Login ---
const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', async (evento) => {
        evento.preventDefault();

        const email = evento.target.email.value;
        const senha = evento.target.password.value; // Nome do campo 'password'

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if (error) {
            alert("Erro ao logar: " + error.message);
            console.error(error); // Para debug
        } else {
            alert("Login realizado com sucesso!");
            // Redireciona para uma página de dashboard, por exemplo
            // window.location.href = "dashboard.html"; 
            console.log("Usuário logado:", data.user);
        }
    });
}

// Opcional: Adicionar lógica para verificar sessão e redirecionar
async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
        console.log("Usuário já logado:", user.email);
        // Ex: window.location.href = "dashboard.html";
    } else {
        console.log("Nenhum usuário logado.");
    }
}
// checkUser(); // Descomente se quiser verificar o login ao carregar a página