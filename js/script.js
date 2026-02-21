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
    const installPopup = document.createElement('div');
    installPopup.id = 'pwa-install-popup';
    installPopup.innerHTML = `
        <div style="position:fixed;top:80px;text-center;z-index:9999;background:#fff;border-radius:12px;padding:20px;box-shadow:0 4px 16px rgba(0,0,0,0.2);text-align:center;">
            <strong>Instale nosso aplicativo!</strong><br>
            E tenha acesso rápido as nossas novidades.<br>
            <button id="pwa-install-btn" class="btn btn-success mt-2">Instalar</button>
            <button id="pwa-close-btn" class="btn btn-link mt-2">Fechar</button>
        </div>
    `;
    document.body.appendChild(installPopup);

    document.getElementById('pwa-install-btn').onclick = () => {
        installPopup.remove();
        deferredPrompt.prompt();
    };
    document.getElementById('pwa-close-btn').onclick = () => {
        installPopup.remove();
    };
});
