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

    // 1. Cria o Overlay (Fundo que escurece e desfoca)
    const overlay = document.createElement('div');
    overlay.id = 'pwa-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    `;

    // 2. Cria a Caixinha (Popup centralizado)
    const popupBox = document.createElement('div');
    popupBox.className = 'container'; // Usa o container do Bootstrap para responsividade
    popupBox.style.cssText = `
        background: #fff;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        max-width: 380px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        margin: 20px;
    `;

    popupBox.innerHTML = `
        <strong style="font-size: 1.3rem; color: #333; display: block; margin-bottom: 10px;">Instale nosso aplicativo!</strong>
        <p style="color: #666; margin-bottom: 25px;">Tenha acesso rápido ao portfólio de JV Sato diretamente da sua tela inicial.</p>
        <div class="d-grid gap-2">
            <button id="pwa-install-btn" class="btn btn-primary" style="border-radius: 50px; padding: 12px;">Instalar Agora</button>
            <button id="pwa-close-btn" class="btn btn-link text-muted">Depois</button>
        </div>
    `;

    overlay.appendChild(popupBox);
    document.body.appendChild(overlay);

    // 3. Lógica de cliques
    document.getElementById('pwa-install-btn').onclick = () => {
        overlay.remove();
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('Usuário aceitou a instalação');
            }
            deferredPrompt = null;
        });
    };

    document.getElementById('pwa-close-btn').onclick = () => {
        overlay.remove();
    };
});
