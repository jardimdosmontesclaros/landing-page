/**
 * JARDINS CLAROS - TRAILS, MAP & BOOKING ENGINE
 * Interactive Trail Waypoints & Multi-step Reservation Wizard
 */

const WAYPOINTS_DATA = {
  sobreiro: {
    title: 'O Sobreiro Patriarca',
    subtitle: 'Monumento Vivo • 320 Anos',
    badge: 'Ponto Botânico Notável',
    desc: 'O mais antigo ser vivo da Herdade de Jardins Claros. Uma árvore majestosa com copa de 28 metros de diâmetro que sobreviveu a sismos e secas, funcionando como âncora biológica da floresta.',
    altitude: '142 m',
    fauna: 'Coruja-das-torres, Pica-pau-malhado, Morcego-de-ferradura',
    audioTrack: 'Áudio Guia #01 (3:15 min)'
  },
  levadas: {
    title: 'Fonte & Vale das Levadas',
    subtitle: 'Nascente Natural & Feto-real',
    badge: 'Microclima Húmido',
    desc: 'Nascente de água cristalina que alimenta os antigos aquedutos de pedra da quinta. Área sombreada e fresca onde prosperam fetos seculares, musgos raros e a murta aromática.',
    altitude: '98 m',
    fauna: 'Salamandra-de-pintas-amarelas, Rã-ibérica, Libelinhas azuis',
    audioTrack: 'Áudio Guia #02 (2:40 min)'
  },
  miradouro: {
    title: 'Miradouro dos Aromas',
    subtitle: 'Cume da Encosta & Vista Panorâmica',
    badge: 'Vista Panorâmica',
    desc: 'Ponto mais alto da propriedade com horizonte aberto sobre a orla marítima e a mata nativa. Encosta coberta por estevas resinosas, rosmaninho e tomilho silvestre.',
    altitude: '210 m',
    fauna: 'Águia-de-asa-redonda, Borboleta-cauda-de-andorinha',
    audioTrack: 'Áudio Guia #03 (4:05 min)'
  },
  estufas: {
    title: 'Estufas Históricas de Propagação',
    subtitle: 'Arquitetura de Ferro de 1892 & Banco de Germoplasma',
    badge: 'Viveiro & Investigação',
    desc: 'Estrutura histórica vitoriana de ferro e vidro onde são germinadas as sementes de espécies autóctones colhidas eticamente na herdade para reflorestação e venda ao público.',
    altitude: '85 m',
    fauna: 'Insetos polinizadores, abelhas solitárias',
    audioTrack: 'Áudio Guia #04 (3:50 min)'
  },
  prado: {
    title: 'Prado dos Pinhais Mansos & Casa de Chá',
    subtitle: 'Área de Piqueniques & Provas Gastronómicas',
    badge: 'Hospitalidade & Repouso',
    desc: 'Clareira ampla sob os pinheiros-mansos centenários onde são servidos piqueniques artesanais e infusões preparadas com plantas colhidas diretamente na quinta.',
    altitude: '90 m',
    fauna: 'Pega-azul, Chapim-real, Melro-preto',
    audioTrack: 'Áudio Guia #05 (2:20 min)'
  }
};

const EXPERIENCES = {
  tour: { name: 'Passeio Botânico Guiado & Degustação da Floresta', price: 28 },
  workshop: { name: 'Workshop de Propagação no Viveiro (Leva 2 Mudas)', price: 45 },
  picnic: { name: 'Piquenique Gourmet na Sombra dos Pinhais (Cesto p/ 2)', price: 65 },
  night: { name: 'Imersão Noturna & Observação de Fauna Silvestre', price: 35 }
};

document.addEventListener('DOMContentLoaded', () => {
  initMapWaypoints();
  initBookingWizard();
});

/* Interactive Map Waypoints */
function initMapWaypoints() {
  const waypointBtns = document.querySelectorAll('.map-waypoint-btn');
  const detailsCard = document.getElementById('waypoint-details-display');

  if (!waypointBtns.length || !detailsCard) return;

  const selectWaypoint = (key) => {
    const data = WAYPOINTS_DATA[key];
    if (!data) return;

    // Update active button styling
    waypointBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-point') === key);
    });

    // Animate content refresh
    detailsCard.style.opacity = '0';
    setTimeout(() => {
      detailsCard.innerHTML = `
        <span class="waypoint-badge">${data.badge}</span>
        <h4>${data.title}</h4>
        <p style="font-size: 0.88rem; color: var(--terracotta-500); font-weight: 600; margin-bottom: 0.75rem;">${data.subtitle}</p>
        <p>${data.desc}</p>
        <div class="waypoint-meta-list">
          <div>⛰️ <strong>Altitude:</strong> ${data.altitude}</div>
          <div>🦅 <strong>Fauna Observável:</strong> ${data.fauna}</div>
          <div>🎧 <strong>Audioguia:</strong> ${data.audioTrack}</div>
        </div>
        <div style="margin-top: 1.5rem;">
          <button class="btn btn-outline btn-sm" onclick="window.showToast('🎧 A carregar faixa de audioguia...')">
            Ouvir Audioguia no Local
          </button>
        </div>
      `;
      detailsCard.style.opacity = '1';
    }, 150);
  };

  waypointBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-point');
      selectWaypoint(key);
    });
  });
}

/* Booking Wizard Modal */
let bookingState = {
  experience: 'tour',
  date: '',
  time: '10:30',
  guests: 2,
  name: '',
  email: '',
  notes: ''
};

function initBookingWizard() {
  const dialog = document.getElementById('booking-dialog');
  const openBtns = document.querySelectorAll('.open-booking-btn');
  const closeBtn = document.getElementById('close-booking-dialog');

  if (!dialog) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const expKey = btn.getAttribute('data-experience');
      if (expKey && EXPERIENCES[expKey]) {
        bookingState.experience = expKey;
      }
      openBookingStep(1);
      dialog.showModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  // Close when clicking outside dialog backdrop
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) dialog.close();
  });

  // Pre-fill tomorrow's date
  const dateInput = document.getElementById('book-date-input');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = tomorrow.toISOString().split('T')[0];
    bookingState.date = dateInput.value;
  }
}

function openBookingStep(stepNumber) {
  // Update step indicators
  document.querySelectorAll('.step-bubble').forEach((bubble, index) => {
    const step = index + 1;
    bubble.classList.remove('active', 'completed');
    if (step === stepNumber) {
      bubble.classList.add('active');
    } else if (step < stepNumber) {
      bubble.classList.add('completed');
    }
  });

  // Show target step pane
  document.querySelectorAll('.booking-form-step').forEach(stepPane => {
    stepPane.classList.toggle('active', stepPane.getAttribute('data-step') === String(stepNumber));
  });

  if (stepNumber === 1) {
    const expSelect = document.getElementById('book-experience-select');
    if (expSelect) expSelect.value = bookingState.experience;
  } else if (stepNumber === 2) {
    updateSummaryPreview();
  }
}
window.openBookingStep = openBookingStep;

function nextBookingStep(currentStep) {
  if (currentStep === 1) {
    const expSelect = document.getElementById('book-experience-select');
    const dateInput = document.getElementById('book-date-input');
    const timeSelect = document.getElementById('book-time-select');
    const guestsInput = document.getElementById('book-guests-input');

    if (expSelect) bookingState.experience = expSelect.value;
    if (dateInput) bookingState.date = dateInput.value;
    if (timeSelect) bookingState.time = timeSelect.value;
    if (guestsInput) bookingState.guests = parseInt(guestsInput.value, 10) || 1;

    openBookingStep(2);
  } else if (currentStep === 2) {
    const nameInput = document.getElementById('book-name-input');
    const emailInput = document.getElementById('book-email-input');
    const notesInput = document.getElementById('book-notes-input');

    if (!nameInput.value.trim() || !emailInput.value.trim()) {
      alert('Por favor preencha o seu nome e email para confirmação da reserva.');
      return;
    }

    bookingState.name = nameInput.value.trim();
    bookingState.email = emailInput.value.trim();
    bookingState.notes = notesInput ? notesInput.value.trim() : '';

    renderBookingConfirmation();
    openBookingStep(3);
  }
}
window.nextBookingStep = nextBookingStep;

function updateSummaryPreview() {
  const exp = EXPERIENCES[bookingState.experience];
  const total = exp.price * bookingState.guests;

  const summaryEl = document.getElementById('booking-step2-summary');
  if (summaryEl) {
    summaryEl.innerHTML = `
      <div class="booking-summary-row">
        <span>Experiência:</span>
        <strong>${exp.name}</strong>
      </div>
      <div class="booking-summary-row">
        <span>Data & Horário:</span>
        <strong>${bookingState.date} às ${bookingState.time}</strong>
      </div>
      <div class="booking-summary-row">
        <span>Nº Participantes:</span>
        <strong>${bookingState.guests} pessoa(s)</strong>
      </div>
      <div class="booking-summary-row total">
        <span>Total Estimado:</span>
        <strong>€${total.toFixed(2)}</strong>
      </div>
    `;
  }
}

function renderBookingConfirmation() {
  const exp = EXPERIENCES[bookingState.experience];
  const total = exp.price * bookingState.guests;
  const refCode = 'JC-' + Math.floor(100000 + Math.random() * 900000);

  const confirmBox = document.getElementById('booking-confirmation-details');
  if (confirmBox) {
    confirmBox.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div style="width: 56px; height: 56px; border-radius: 50%; background: var(--sage-100); color: var(--forest-800); display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">
          ✓
        </div>
        <span class="eyebrow">Reserva Confirmada</span>
        <h3 style="margin-bottom: 0.25rem;">Esperamos por Si na Herdade!</h3>
        <p style="font-size: 0.95rem; color: var(--bark-500);">Referência: <strong>${refCode}</strong></p>
      </div>

      <div style="background: var(--parchment-100); padding: 1.5rem; border-radius: var(--radius-md); font-size: 0.92rem; margin-bottom: 1.5rem;">
        <p style="margin-bottom: 0.5rem;"><strong>Titular:</strong> ${bookingState.name} (${bookingState.email})</p>
        <p style="margin-bottom: 0.5rem;"><strong>Experiência:</strong> ${exp.name}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Data:</strong> ${bookingState.date} às ${bookingState.time}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Participantes:</strong> ${bookingState.guests} pessoa(s)</p>
        <p style="margin-top: 0.75rem; border-top: 1px solid var(--parchment-300); padding-top: 0.75rem; font-weight: 700; color: var(--forest-900);">
          Valor Total: €${total.toFixed(2)} (Pagamento no check-in da Herdade)
        </p>
      </div>

      <p style="font-size: 0.85rem; color: var(--bark-500); text-align: center; margin-bottom: 1rem;">
        Enviámos o voucher eletrónico e direções de acesso para o seu endereço de email.
      </p>

      <div style="display: flex; gap: 1rem; justify-content: center;">
        <button class="btn btn-outline btn-sm" onclick="window.print()">
          Imprimir Comprovativo
        </button>
        <button class="btn btn-primary btn-sm" onclick="document.getElementById('booking-dialog').close()">
          Concluir
        </button>
      </div>
    `;
  }
}
