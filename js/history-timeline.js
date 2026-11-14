/**
 * JARDINS CLAROS - HERITAGE & TIMELINE SCRIPT
 * Inspired by SOS Quinta dos Ingleses & National Trust Historic Garden Timelines
 */

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initArchivalSlider();
});

function initTimeline() {
  const scrubberPills = document.querySelectorAll('.timeline-pill');
  const timelineCards = document.querySelectorAll('.timeline-card');

  if (!scrubberPills.length || !timelineCards.length) return;

  scrubberPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const targetYear = pill.getAttribute('data-year');

      // Update pills
      scrubberPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      // Update cards
      timelineCards.forEach(card => {
        if (card.getAttribute('data-year') === targetYear) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
    });
  });
}

function initArchivalSlider() {
  const toggleBtn = document.getElementById('archive-toggle-btn');
  const archiveImg = document.getElementById('archive-featured-img');
  const archiveBadge = document.getElementById('archive-status-badge');
  const archiveCaption = document.getElementById('archive-caption-text');

  if (!toggleBtn || !archiveImg) return;

  let showingArchive = true;

  toggleBtn.addEventListener('click', () => {
    showingArchive = !showingArchive;
    if (!showingArchive) {
      archiveImg.src = 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1600&q=80';
      archiveImg.style.filter = 'contrast(1.05) saturate(1.1)';
      archiveBadge.textContent = 'Restauro Botânico 2026';
      archiveBadge.style.background = 'var(--sage-100)';
      archiveBadge.style.color = 'var(--forest-800)';
      archiveCaption.textContent = 'O Sobreiro Patriarca hoje: 320 anos de idade, sob plano ativo de conservação e sementeira ética.';
      toggleBtn.textContent = 'Ver Fotografia de Arquivo (1924)';
    } else {
      archiveImg.src = 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1600&q=80';
      archiveImg.style.filter = 'sepia(0.3) contrast(1.1) grayscale(0.2)';
      archiveBadge.textContent = 'Registo de Arquivo • 1924';
      archiveBadge.style.background = 'var(--terracotta-100)';
      archiveBadge.style.color = 'var(--terracotta-700)';
      archiveCaption.textContent = 'Registo fotográfico dos mestres botânicos da Herdade junto ao sobreiral primitivo, 1924.';
      toggleBtn.textContent = 'Ver Estado Atual da Floresta';
    }
  });
}
