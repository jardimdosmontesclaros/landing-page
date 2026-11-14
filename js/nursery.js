/**
 * JARDINS CLAROS - NATIVE PLANT NURSERY JAVASCRIPT
 * Botanical Database, Dynamic Filtering, Planting Plan Cart & Native Garden Tailor
 */

const NATIVE_PLANTS = [
  {
    id: 'sobreiro',
    botanical: 'Quercus suber',
    vernacular: 'Sobreiro',
    vernacularEn: 'Cork Oak',
    type: 'tree',
    typeLabel: 'Árvore Nobre',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Muito Baixa (Xerófila)',
    role: 'erosion-refuge',
    roleLabel: 'Refúgio de Aves & Retenção de Solo',
    price: 18.50,
    height: '15-20 m',
    growth: 'Lento / Secular',
    soil: 'Ácido a neutro, bem drenado',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    description: 'Árvore nacional de Portugal. Casca de cortiça grossa e isolante, resistente ao fogo. Cria microclimas sombreados que alimentam mais de 40 espécies de aves florestais.',
    ecologicalNotes: 'Produz bolotas essenciais para a fauna selvagem no outono. Fixador colossal de carbono no solo.'
  },
  {
    id: 'pinheiro-manso',
    botanical: 'Pinus pinea',
    vernacular: 'Pinheiro-manso',
    vernacularEn: 'Stone Pine',
    type: 'tree',
    typeLabel: 'Árvore Nobre',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Muito Baixa',
    role: 'erosion-refuge',
    roleLabel: 'Copa Protetora & Pinhões Comestíveis',
    price: 16.00,
    height: '12-25 m',
    growth: 'Médio',
    soil: 'Arenoso costeiro a pedregoso',
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    description: 'Copa arredondada em guarda-sol emblemática da costa atlântica e mediterrânica. Tolera ventos marítimos e secas estivais prolongadas.',
    ecologicalNotes: 'Excelente para estabilizar dunas e solos arenosos. As pinhas produzem pinhão nobre comestível.'
  },
  {
    id: 'medronheiro',
    botanical: 'Arbutus unedo',
    vernacular: 'Medronheiro',
    vernacularEn: 'Strawberry Tree',
    type: 'shrub',
    typeLabel: 'Arbusto / Pequena Árvore',
    sun: 'partial-shade',
    sunLabel: 'Sol Pleno / Meia Sombra',
    water: 'low',
    waterLabel: 'Baixa',
    role: 'pollinators',
    roleLabel: 'Polinizadores & Fruto Silvestre',
    price: 12.50,
    height: '3-7 m',
    growth: 'Médio',
    soil: 'Leve, fértil, não tolera calcário excessivo',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    description: 'Espetáculo outonal raro: exibe em simultâneo flores brancas em cacho e frutos escarlates maduros. O fruto é doce e aromático.',
    ecologicalNotes: 'Floração tardia vital para abelhas e polinizadores em novembro e dezembro.'
  },
  {
    id: 'esteva',
    botanical: 'Cistus ladanifer',
    vernacular: 'Esteva',
    vernacularEn: 'Gum Rockrose',
    type: 'aromatic',
    typeLabel: 'Arbusto Aromático',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Muito Baixa (Seca Extrema)',
    role: 'pollinators',
    roleLabel: 'Perfume da Charneca & Abelhas',
    price: 8.50,
    height: '1.2-2.2 m',
    growth: 'Rápido',
    soil: 'Pobre, xistoso, granítico',
    image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?auto=format&fit=crop&w=800&q=80',
    description: 'Grandes flores brancas com mancha púrpura no centro. Folhas libertam a resina ládano, perfume inconfundível do verão do sul.',
    ecologicalNotes: 'Pioneira na regeneração de solos degradados após incêndios florestais.'
  },
  {
    id: 'murta',
    botanical: 'Myrtus communis',
    vernacular: 'Murta',
    vernacularEn: 'Common Myrtle',
    type: 'shrub',
    typeLabel: 'Arbusto Aromatico',
    sun: 'partial-shade',
    sunLabel: 'Sol Pleno ou Meia Sombra',
    water: 'moderate',
    waterLabel: 'Moderada',
    role: 'pollinators',
    roleLabel: 'Aves & Perfumaria Antiga',
    price: 9.80,
    height: '1.5-3 m',
    growth: 'Médio',
    soil: 'Fértil, húmido a bem drenado',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    description: 'Folhagem perene verde-escura de aroma balsâmico e flores estivais brancas com estames vistosos. Bagas negro-azuladas no outono.',
    ecologicalNotes: 'Usada historicamente nas levadas e jardins da corte. As bagas alimentam tordos e melros.'
  },
  {
    id: 'rosmaninho',
    botanical: 'Lavandula stoechas',
    vernacular: 'Rosmaninho',
    vernacularEn: 'Spanish Lavender',
    type: 'aromatic',
    typeLabel: 'Aromática Baixa',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Muito Baixa',
    role: 'pollinators',
    roleLabel: 'Melífero Excecional',
    price: 6.50,
    height: '40-80 cm',
    growth: 'Rápido',
    soil: 'Pobre, seco, ligeiramente ácido',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    description: 'A verdadeira alfazema selvagem de Portugal. Espigas florais coroadas por brácteas roxas que lembram asas de borboleta.',
    ecologicalNotes: 'Planta de suporte fundamental para a apicultura sustentável e abelhas solitárias nativas.'
  },
  {
    id: 'zambujeiro',
    botanical: 'Olea europaea var. sylvestris',
    vernacular: 'Zambujeiro (Oliveira-brava)',
    vernacularEn: 'Wild Olive',
    type: 'tree',
    typeLabel: 'Árvore / Arbusto Rústico',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Extremamente Baixa',
    role: 'erosion-refuge',
    roleLabel: 'Longevidade Centenária',
    price: 15.00,
    height: '4-10 m',
    growth: 'Lento',
    soil: 'Rochoso, calcário ou argiloso',
    image: 'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80',
    description: 'Antepassado silvestre da oliveira cultivada. Troncos nodosos e esculturais, ramos espinescentes e folhas cinzento-prateadas.',
    ecologicalNotes: 'Resiste a secas violentas e ventos fortes. Produz azeitonas bravas adoradas por pequenas aves migratórias.'
  },
  {
    id: 'lentisco',
    botanical: 'Pistacia lentiscus',
    vernacular: 'Aroeira / Lentisco',
    vernacularEn: 'Mastic Bush',
    type: 'shrub',
    typeLabel: 'Arbusto Resistente',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Muito Baixa',
    role: 'erosion-refuge',
    roleLabel: 'Proteção de Encostas & Vento',
    price: 11.00,
    height: '1.5-4 m',
    growth: 'Médio',
    soil: 'Qualquer solo, mesmo pedregoso',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    description: 'Folhagem densa, brilhante e verdejante o ano todo. Pequenos frutos vermelhos que passam a pretos. Aroma resinoso e balsâmico.',
    ecologicalNotes: 'Cria uma muralha vegetal contra vendavais marítimos e previne a erosão em encostas acentuadas.'
  },
  {
    id: 'alecrim-bravo',
    botanical: 'Salvia rosmarinus',
    vernacular: 'Alecrim-bravo Costeiro',
    vernacularEn: 'Wild Coastal Rosemary',
    type: 'aromatic',
    typeLabel: 'Subarbusto Aromático',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Muito Baixa',
    role: 'pollinators',
    roleLabel: 'Aromática Culinária & Abelhas',
    price: 6.20,
    height: '0.8-1.5 m',
    growth: 'Médio',
    soil: 'Seco, permeável, calcário ou arenoso',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    description: 'Flores azuis pequenas em floração quase ininterrupta do inverno ao fim da primavera. Elevado teor de óleos essenciais.',
    ecologicalNotes: 'Repelente natural de pragas de horta e imã de joaninhas e insetos benéficos.'
  },
  {
    id: 'pilriteiro',
    botanical: 'Crataegus monogyna',
    vernacular: 'Pilriteiro / Espinheiro-alvar',
    vernacularEn: 'Hawthorn',
    type: 'shrub',
    typeLabel: 'Arbusto com Bagas',
    sun: 'partial-shade',
    sunLabel: 'Sol Pleno a Meia Sombra',
    water: 'low',
    waterLabel: 'Baixa a Moderada',
    role: 'erosion-refuge',
    roleLabel: 'Nidificação de Aves Canoras',
    price: 13.50,
    height: '3-8 m',
    growth: 'Médio',
    soil: 'Solos profundos e argilosos',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    description: 'Ramos espinhosos cobertos de cachos de flores brancas perfumadas em maio, seguidas de frutos vermelhos medicinais.',
    ecologicalNotes: 'Ideal para sebes vivas defensivas que oferecem proteção perfeita para ninhos de pássaros.'
  },
  {
    id: 'folhado',
    botanical: 'Viburnum tinus',
    vernacular: 'Folhado / Laurustinus',
    vernacularEn: 'Laurustinus',
    type: 'shrub',
    typeLabel: 'Arbusto de Sombra / Sub-bosque',
    sun: 'shade',
    sunLabel: 'Meia Sombra a Sombra',
    water: 'moderate',
    waterLabel: 'Moderada',
    role: 'pollinators',
    roleLabel: 'Floração de Inverno',
    price: 11.50,
    height: '2-4 m',
    growth: 'Médio',
    soil: 'Fresco, húmido e humífero',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    description: 'Excelente para os recantos sombrios da floresta. Floresce de dezembro a abril em inflorescências brancas e rosadas.',
    ecologicalNotes: 'Frutos azul-metálicos persistem no inverno, nutrindo pintassilgos e carriças.'
  },
  {
    id: 'prado-silvestre',
    botanical: 'Mix Flora Lusitânica',
    vernacular: 'Prado Biodiverso Silvestre',
    vernacularEn: 'Native Meadow Seed Mix',
    type: 'meadow',
    typeLabel: 'Prado Florido Perene',
    sun: 'full-sun',
    sunLabel: 'Sol Pleno',
    water: 'very-low',
    waterLabel: 'Auto-suficiente após germinação',
    role: 'pollinators',
    roleLabel: 'Pradaria Silvestre & Borboletas',
    price: 14.00,
    height: '30-70 cm',
    growth: 'Sazonal Perene',
    soil: 'Qualquer solo sem fertilização química',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
    description: 'Mistura com 24 espécies de sementes autóctones (papoilas, linárias, centáureas, trevos nativos). Substitui o relvado tradicional.',
    ecologicalNotes: 'Poupa até 90% da água de rega em comparação com relvados exóticos e requer apenas 1 corte anual.'
  }
];

// Planting Plan (Cart) State
let plantingPlan = JSON.parse(localStorage.getItem('jardins_claros_plan') || '[]');

document.addEventListener('DOMContentLoaded', () => {
  renderPlantCatalog(NATIVE_PLANTS);
  initSearchAndFilters();
  initPlantModal();
  initPlantingPlanDrawer();
  initGardenCalculator();
  updatePlanCounter();
});

/* Render Plant Cards */
function renderPlantCatalog(plants) {
  const container = document.getElementById('plant-grid-container');
  const countEl = document.getElementById('plant-results-count');
  if (!container) return;

  if (countEl) {
    countEl.textContent = `${plants.length} espécies encontradas`;
  }

  if (plants.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--bark-500);">
        <p style="font-size: 1.2rem; margin-bottom: 1rem;">Nenhuma espécie nativa encontrada com os filtros selecionados.</p>
        <button class="btn btn-outline btn-sm" onclick="resetAllFilters()">Limpar Filtros</button>
      </div>
    `;
    return;
  }

  container.innerHTML = plants.map(plant => `
    <article class="plant-card" data-id="${plant.id}">
      <div class="plant-card-media">
        <img src="${plant.image}" alt="${plant.vernacular} (${plant.botanical})" loading="lazy">
        <span class="plant-badge-eco">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
          ${plant.typeLabel}
        </span>
      </div>
      <div class="plant-card-body">
        <div class="plant-card-header">
          <h3 class="plant-botanical-name">${plant.botanical}</h3>
          <span class="plant-vernacular-name">${plant.vernacular}</span>
        </div>
        <p class="plant-description">${plant.description}</p>
        
        <div class="plant-specs-grid">
          <div class="spec-item">
            <span class="spec-title">Exposição</span>
            <span class="spec-value">${plant.sunLabel.split(' ')[0]}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Rega</span>
            <span class="spec-value">${plant.waterLabel.split(' ')[0]}</span>
          </div>
          <div class="spec-item">
            <span class="spec-title">Porte Adulto</span>
            <span class="spec-value">${plant.height}</span>
          </div>
        </div>

        <div class="plant-card-footer">
          <div class="plant-price">
            €${plant.price.toFixed(2)} <small>/ muda</small>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-outline btn-sm view-plant-btn" data-id="${plant.id}" title="Ficha Botânica">
              Detalhes
            </button>
            <button class="btn btn-primary btn-sm add-plan-btn" data-id="${plant.id}">
              + Plano
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join('');

  attachCardEvents();
}

/* Event Delegation for Plant Cards */
function attachCardEvents() {
  document.querySelectorAll('.view-plant-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plantId = btn.getAttribute('data-id');
      openPlantModal(plantId);
    });
  });

  document.querySelectorAll('.add-plan-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plantId = btn.getAttribute('data-id');
      addToPlantingPlan(plantId);
    });
  });
}

/* Search and Filters */
let activeType = 'all';
let activeSun = 'all';
let activeWater = 'all';
let searchQuery = '';

function initSearchAndFilters() {
  const searchInput = document.getElementById('nursery-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }

  // Type filter pills
  document.querySelectorAll('.filter-pill[data-filter-type]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill[data-filter-type]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeType = pill.getAttribute('data-filter-type');
      applyFilters();
    });
  });

  // Sun filter pills
  document.querySelectorAll('.filter-pill[data-filter-sun]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill[data-filter-sun]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeSun = pill.getAttribute('data-filter-sun');
      applyFilters();
    });
  });

  // Water filter pills
  document.querySelectorAll('.filter-pill[data-filter-water]').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill[data-filter-water]').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeWater = pill.getAttribute('data-filter-water');
      applyFilters();
    });
  });
}

function applyFilters() {
  const filtered = NATIVE_PLANTS.filter(plant => {
    const matchesSearch = !searchQuery || 
      plant.botanical.toLowerCase().includes(searchQuery) ||
      plant.vernacular.toLowerCase().includes(searchQuery) ||
      plant.vernacularEn.toLowerCase().includes(searchQuery) ||
      plant.description.toLowerCase().includes(searchQuery);

    const matchesType = (activeType === 'all') || (plant.type === activeType);
    const matchesSun = (activeSun === 'all') || (plant.sun === activeSun);
    const matchesWater = (activeWater === 'all') || (plant.water === activeWater);

    return matchesSearch && matchesType && matchesSun && matchesWater;
  });

  renderPlantCatalog(filtered);
}

function resetAllFilters() {
  activeType = 'all';
  activeSun = 'all';
  activeWater = 'all';
  searchQuery = '';

  const searchInput = document.getElementById('nursery-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.filter-pill').forEach(pill => {
    if (pill.getAttribute('data-filter-type') === 'all' ||
        pill.getAttribute('data-filter-sun') === 'all' ||
        pill.getAttribute('data-filter-water') === 'all') {
      pill.classList.add('active');
    } else {
      pill.classList.remove('active');
    }
  });

  applyFilters();
}
window.resetAllFilters = resetAllFilters;

/* Plant Modal Dialog */
function initPlantModal() {
  const dialog = document.getElementById('plant-detail-dialog');
  const closeBtn = document.getElementById('close-plant-dialog');

  if (!dialog || !closeBtn) return;

  closeBtn.addEventListener('click', () => dialog.close());

  // Close when clicking outside modal
  dialog.addEventListener('click', (e) => {
    const rect = dialog.getBoundingClientRect();
    const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
      rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
    if (!isInDialog) dialog.close();
  });
}

function openPlantModal(plantId) {
  const plant = NATIVE_PLANTS.find(p => p.id === plantId);
  const dialog = document.getElementById('plant-detail-dialog');
  const body = document.getElementById('plant-modal-body');

  if (!plant || !dialog || !body) return;

  body.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; align-items: start;">
      <div style="border-radius: var(--radius-md); overflow: hidden; height: 340px;">
        <img src="${plant.image}" alt="${plant.vernacular}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span class="eyebrow">${plant.typeLabel}</span>
        <h2 style="font-style: italic; margin-bottom: 0.25rem;">${plant.botanical}</h2>
        <h4 style="color: var(--terracotta-500); font-family: var(--font-sans); margin-bottom: 1.25rem;">${plant.vernacular} • ${plant.vernacularEn}</h4>
        
        <p style="font-size: 1rem; margin-bottom: 1.25rem;">${plant.description}</p>
        
        <div style="background: var(--parchment-100); padding: 1.25rem; border-radius: var(--radius-md); border-left: 4px solid var(--forest-600); margin-bottom: 1.5rem;">
          <strong style="color: var(--forest-900); display: block; margin-bottom: 0.25rem;">Função Ecológica & Paisagística:</strong>
          <span style="font-size: 0.92rem; color: var(--bark-700);">${plant.ecologicalNotes}</span>
        </div>

        <ul style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.9rem; margin-bottom: 1.75rem;">
          <li><strong>Necessidade Hídrica:</strong> ${plant.waterLabel}</li>
          <li><strong>Exposição Solar:</strong> ${plant.sunLabel}</li>
          <li><strong>Solo Recomendado:</strong> ${plant.soil}</li>
          <li><strong>Velocidade de Crescimento:</strong> ${plant.growth}</li>
        </ul>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--parchment-200); padding-top: 1rem;">
          <div style="font-size: 1.5rem; font-family: var(--font-serif); font-weight: 700; color: var(--forest-900);">
            €${plant.price.toFixed(2)}
          </div>
          <button class="btn btn-primary" onclick="addToPlantingPlan('${plant.id}'); document.getElementById('plant-detail-dialog').close();">
            Adicionar ao Plano de Plantação
          </button>
        </div>
      </div>
    </div>
  `;

  dialog.showModal();
}

/* Planting Plan Cart Functions */
function addToPlantingPlan(plantId) {
  const plant = NATIVE_PLANTS.find(p => p.id === plantId);
  if (!plant) return;

  const existing = plantingPlan.find(item => item.id === plantId);
  if (existing) {
    existing.qty += 1;
  } else {
    plantingPlan.push({ id: plant.id, botanical: plant.botanical, vernacular: plant.vernacular, price: plant.price, qty: 1 });
  }

  savePlan();
  updatePlanCounter();
  renderPlanDrawer();
  window.showToast(`🌿 <strong>${plant.vernacular}</strong> adicionado ao seu plano de plantação.`);
}
window.addToPlantingPlan = addToPlantingPlan;

function removeFromPlan(plantId) {
  plantingPlan = plantingPlan.filter(item => item.id !== plantId);
  savePlan();
  updatePlanCounter();
  renderPlanDrawer();
}
window.removeFromPlan = removeFromPlan;

function updatePlanQty(plantId, delta) {
  const item = plantingPlan.find(i => i.id === plantId);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromPlan(plantId);
      return;
    }
  }
  savePlan();
  updatePlanCounter();
  renderPlanDrawer();
}
window.updatePlanQty = updatePlanQty;

function savePlan() {
  localStorage.setItem('jardins_claros_plan', JSON.stringify(plantingPlan));
}

function updatePlanCounter() {
  const badges = document.querySelectorAll('.plan-count-badge');
  const totalQty = plantingPlan.reduce((acc, item) => acc + item.qty, 0);
  badges.forEach(badge => {
    badge.textContent = totalQty;
  });
}

function initPlantingPlanDrawer() {
  const pill = document.querySelector('.planting-plan-pill');
  const drawer = document.getElementById('planting-plan-drawer');
  const closeBtn = document.getElementById('close-plan-drawer');

  if (pill && drawer) {
    pill.addEventListener('click', () => {
      renderPlanDrawer();
      drawer.classList.add('open');
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', () => {
      drawer.classList.remove('open');
    });
  }
}

function renderPlanDrawer() {
  const listEl = document.getElementById('plan-items-list');
  const totalEl = document.getElementById('plan-total-amount');
  const checkoutBtn = document.getElementById('plan-submit-btn');
  if (!listEl) return;

  if (plantingPlan.length === 0) {
    listEl.innerHTML = `
      <div class="plan-empty-state">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; color: var(--bark-300);"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-4.5a1 1 0 0 1-2 0V7a1 1 0 0 1 2 0z"/></svg>
        <p>O seu plano de plantação ainda está vazio.</p>
        <p style="font-size: 0.85rem; margin-top: 0.5rem;">Adicione espécies nativas do viveiro para calcular o orçamento e densidade.</p>
      </div>
    `;
    if (totalEl) totalEl.textContent = '€0.00';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  let total = 0;
  listEl.innerHTML = plantingPlan.map(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    return `
      <div class="plan-item-row">
        <div class="plan-item-info">
          <h5>${item.botanical}</h5>
          <small>${item.vernacular} • €${item.price.toFixed(2)}/un</small>
        </div>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button class="btn btn-sm btn-outline" style="padding: 0.2rem 0.6rem;" onclick="updatePlanQty('${item.id}', -1)">-</button>
          <span style="font-weight: 700; min-width: 20px; text-align: center;">${item.qty}</span>
          <button class="btn btn-sm btn-outline" style="padding: 0.2rem 0.6rem;" onclick="updatePlanQty('${item.id}', 1)">+</button>
          <button style="color: var(--terracotta-500); margin-left: 0.5rem;" onclick="removeFromPlan('${item.id}')" title="Remover">✕</button>
        </div>
      </div>
    `;
  }).join('');

  if (totalEl) totalEl.textContent = `€${total.toFixed(2)}`;
  if (checkoutBtn) checkoutBtn.disabled = false;
}

/* Garden Calculator Widget */
function initGardenCalculator() {
  let calcSpace = 'medium';
  let calcSun = 'sun';
  let calcSoil = 'clay';

  const optionBtns = document.querySelectorAll('.calc-option-btn');
  const resultsPanel = document.getElementById('garden-calc-results');

  if (!optionBtns.length || !resultsPanel) return;

  optionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const step = btn.getAttribute('data-step');
      const val = btn.getAttribute('data-val');

      // Clear siblings
      btn.parentElement.querySelectorAll('.calc-option-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      if (step === 'space') calcSpace = val;
      if (step === 'sun') calcSun = val;
      if (step === 'soil') calcSoil = val;

      updateCalculatorResults(calcSpace, calcSun, calcSoil);
    });
  });

  // Calculate initial default
  updateCalculatorResults(calcSpace, calcSun, calcSoil);
}

function updateCalculatorResults(space, sun, soil) {
  const panel = document.getElementById('garden-calc-results');
  if (!panel) return;

  let recommendations = [];
  let waterSavings = '85%';
  let canopySuggestion = '';

  if (space === 'small') {
    canopySuggestion = 'Estrutura compacta: Foco em arbustos aromáticos e flores perenes em vasos de barro e pequenos canteiros.';
    recommendations = ['rosmaninho', 'alecrim-bravo', 'esteva'];
  } else if (space === 'medium') {
    canopySuggestion = 'Jardim Familiar mediterrânico: Uma árvore de pequeno porte (medronheiro ou zambujeiro) com anel de arbustos e aromáticas polinizadoras.';
    recommendations = ['medronheiro', 'murta', 'alecrim-bravo', 'prado-silvestre'];
  } else {
    canopySuggestion = 'Herdade / Ecossistema Completo: Sobreiral ou pinhal manso de sombra, sebes vivas protetoras de fauna e pradaria silvestre autoregenerativa.';
    recommendations = ['sobreiro', 'pinheiro-manso', 'lentisco', 'pilriteiro', 'esteva', 'prado-silvestre'];
  }

  const recCardsHtml = recommendations.map(id => {
    const p = NATIVE_PLANTS.find(item => item.id === id);
    if (!p) return '';
    return `
      <div style="background: #ffffff; padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--sage-300); display: flex; align-items: center; justify-content: space-between;">
        <div>
          <strong style="font-family: var(--font-serif); font-style: italic; color: var(--forest-900);">${p.botanical}</strong>
          <small style="display: block; color: var(--terracotta-500);">${p.vernacular}</small>
        </div>
        <button class="btn btn-sm btn-outline" onclick="addToPlantingPlan('${p.id}')">+ Adicionar</button>
      </div>
    `;
  }).join('');

  panel.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="eyebrow forest">Diagnóstico Botânico Personalizado</span>
      <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem;">A Sua Guilda de Plantas Nativas Recomendada</h3>
      <p style="font-size: 1rem; color: var(--bark-700);">${canopySuggestion}</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1rem; margin-bottom: 1.5rem;">
      ${recCardsHtml}
    </div>

    <div style="background: var(--parchment-100); padding: 1rem 1.25rem; border-radius: var(--radius-sm); display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem;">
      <span>💧 <strong>Poupança de água estimada:</strong> ${waterSavings} face a espécies ornamentais exóticas.</span>
      <button class="btn btn-primary btn-sm" onclick="addAllToPlan(${JSON.stringify(recommendations).replace(/"/g, '&quot;')})">Adicionar Todas ao Meu Plano</button>
    </div>
  `;
  panel.classList.add('active');
}

function addAllToPlan(ids) {
  ids.forEach(id => addToPlantingPlan(id));
  window.showToast(`🌿 ${ids.length} espécies adicionadas ao seu plano de plantação.`);
}
window.addAllToPlan = addAllToPlan;
