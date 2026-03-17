/**
 * JV SATO - Script de Performance e UX
 * 1. Envio de Formulário com Feedback
 * 2. Compartilhamento Nativo
 * 3. Gestão de PWA (Instalação)
 */

// --- 1. ENVIO DO FORMULÁRIO VIA AJAX ---
document.getElementById('formContato').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    const originalBtnText = btn.innerHTML;

    // Feedback visual para o utilizador
    btn.disabled = true;
    btn.innerHTML = 'Enviando... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

    try {
        const data = new FormData(form);
        const response = await fetch(form.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            alert('🚀 Mensagem enviada com sucesso! Entrarei em contacto em breve.');
            form.reset();
        } else {
            throw new Error('Falha no envio');
        }
    } catch (error) {
        alert('❌ Erro ao enviar. Por favor, tente novamente ou use o WhatsApp.');
    } finally {
        // Restaura o botão original após o processo
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
    }
});

// --- 2. FUNÇÃO DE COMPARTILHAMENTO ---
function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'Confira o trabalho de JV Sato - Desenvolvimento Web!',
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback para navegadores que não suportam partilha nativa
        navigator.clipboard.writeText(window.location.href);
        alert('Link copiado para a área de transferência!');
    }
}

// --- 3. LOGICA PWA (INSTALAÇÃO) ---
let deferredPrompt;

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .catch(err => console.log('Service Worker não registado:', err));
    });
}

window.addEventListener('beforeinstallprompt', (e) => {
    // Impede o Chrome de mostrar o prompt automático
    e.preventDefault();
    deferredPrompt = e;
    
    // Chama a criação do popup customizado
    showPwaPopup();
});

function showPwaPopup() {
    // Verifica se já existe um popup para não duplicar
    if (document.getElementById('pwa-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'pwa-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7); backdrop-filter: blur(8px);
        display: flex; align-items: center; justify-content: center; z-index: 10000;
    `;

    overlay.innerHTML = `
        <div style="background: #fff; padding: 30px; border-radius: 20px; text-align: center; max-width: 350px; margin: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.5);">
            <h4 style="color: #333; margin-bottom: 10px;">Instalar Aplicativo?</h4>
            <p style="color: #666; margin-bottom: 20px;">Acesse ao meu site como um aplicativo diretamente da sua tela inicial!</p>
            <div class="d-grid gap-2">
                <button id="pwa-install-btn" class="btn btn-primary" style="border-radius: 50px;">Instalar Agora</button>
                <button id="pwa-close-btn" class="btn btn-link text-muted" style="text-decoration: none;">Depois</button>
            </div>
        </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('pwa-install-btn').onclick = () => {
        overlay.remove();
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choice) => {
                deferredPrompt = null;
            });
        }
    };

    document.getElementById('pwa-close-btn').onclick = () => {
        overlay.remove();
    };
}
