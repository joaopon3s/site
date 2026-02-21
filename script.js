// Script para envio do formulário via AJAX (Formspree) -->
document.getElementById('formContato').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: {
            'Accept': 'application/json'
        }
    });

    if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        form.reset();
    } else {
        alert('Erro ao enviar mensagem. Tente novamente.');
    }
});

// Compartilhar página
document.getElementById('shareBtn').addEventListener('click', function() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Confira esta página!',
            url: window.location.href
        });
    } else {
        alert('Compartilhamento não suportado neste navegador.');
    }
});

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
// Mostra o popup customizado
    let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Criar o Overlay de fundo (Escurece e Desfoca)
    const overlay = document.createElement('div');
    overlay.id = 'pwa-install-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px); display: flex;
        align-items: center; justify-content: center; z-index: 99999;
    `;

    // Criar a caixa do Popup (Centralizada)
    overlay.innerHTML = `
        <div style="background: #fff; border-radius: 20px; padding: 30px; text-align: center; max-width: 350px; width: 90%; box-shadow: 0 15px 35px rgba(0,0,0,0.4);">
            <img src="images/joao.jpg" style="width: 80px; height: 80px; border-radius: 50%; margin-bottom: 15px; border: 3px solid #535da1;">
            <strong style="font-size: 1.3rem; color: #333; display: block;">JV Sato no seu Celular</strong>
            <p style="color: #666; margin: 15px 0 25px;">Instale meu portfólio como um aplicativo para acesso rápido e offline.</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="pwa-install-btn" class="btn btn-primary" style="padding: 12px; border-radius: 10px; font-weight: bold; background: #535da1; border: none;">Instalar Agora</button>
                <button id="pwa-close-btn" class="btn btn-link" style="color: #999; text-decoration: none;">Agora não</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('pwa-install-btn').onclick = () => {
        overlay.remove();
        deferredPrompt.prompt();
    };

    document.getElementById('pwa-close-btn').onclick = () => {
        overlay.remove();
    };
});
