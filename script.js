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
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;

    // Criar Overlay (Fundo desfocado que bloqueia a tela)
    const overlay = document.createElement('div');
    overlay.id = 'pwa-install-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px); display: flex;
        align-items: center; justify-content: center; z-index: 99999;
    `;

    // Criar Caixa do Popup
    overlay.innerHTML = `
        <div style="background: #fff; border-radius: 20px; padding: 30px; text-align: center; max-width: 350px; width: 90%; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <img src="images/joao.jpg" style="width: 70px; height: 70px; border-radius: 50%; margin-bottom: 15px;">
            <strong style="font-size: 1.2rem; color: #333; display: block;">JV Sato no seu Celular</strong>
            <p style="color: #666; margin: 10px 0 20px;">Instale o app para navegar pelo portfólio de forma rápida e offline.</p>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button id="pwa-install-btn" class="btn btn-primary" style="background:#535da1; border:none; padding:12px; border-radius:10px; font-weight:bold;">Instalar Agora</button>
                <button id="pwa-close-btn" class="btn btn-link" style="color:#999; text-decoration:none;">Depois</button>
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
