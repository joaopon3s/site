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
   // Cria o overlay (fundo escuro e desfocado)
const installPopup = document.createElement('div');
installPopup.id = 'pwa-install-popup';

// Estilos do fundo (Overlay) aplicados direto na div principal
installPopup.style.cssText = `
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Fundo levemente escuro */
  backdrop-filter: blur(5px); /* Efeito de desfoque mágico */
  z-index: 9999;
  display: flex;
  justify-content: center; /* Centraliza na horizontal */
  align-items: center; /* Centraliza na vertical */
`;

// O conteúdo da caixinha (sem os estilos de position fixed, pois o Flexbox já centraliza)
installPopup.innerHTML = `
  <div style="background: #fff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 16px rgba(0,0,0,0.2); text-align: center; max-width: 90%; width: 350px;">
      <strong style="font-size: 1.2rem; color: #333;">Instale nosso aplicativo!</strong><br>
      <p style="color: #666; margin-top: 10px; margin-bottom: 20px;">E tenha acesso rápido as nossas novidades.</p>
      
      <div style="display: flex; gap: 10px; justify-content: center;">
          <button id="pwa-install-btn" class="btn btn-success" style="flex: 1;">Instalar</button>
          <button id="pwa-close-btn" class="btn btn-outline-secondary" style="flex: 1;">Fechar</button>
      </div>
  </div>
`;

document.body.appendChild(installPopup);

// Os eventos de clique continuam iguais aos que você já tem:
document.getElementById('pwa-install-btn').onclick = () => {
    installPopup.remove();
    deferredPrompt.prompt();
};

document.getElementById('pwa-close-btn').onclick = () => {
    installPopup.remove();
};
