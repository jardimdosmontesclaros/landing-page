/**
 * JARDIM DOS MONTES CLAROS - MVP INTERACTION CONTROLLER
 * 2-Year Forest Garden & Living Laboratory in Rural West Portugal
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpeciesFilter();
  initLandMapInteractive();
  initVolunteerForm();
  initGrowthTabs();
});

/* ==========================================================================
   1. NATIVE SPECIES DATABASE & FILTERING (West Portugal / Lourinhã Flora)
   ========================================================================== */
const NATIVE_SPECIES = [
  {
    name: "Sobreiro",
    sci: "Quercus suber",
    layer: "Dossel / Árvore Nobre",
    type: "canopy",
    img: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80",
    desc: "A árvore rainha da floresta mediterrânica. Casca espessa em cortiça que protege contra incêndios e retém humidade.",
    growth: "Crescimento firme, enraizamento profundo nos solos do Oeste.",
    tags: ["Resistente à Seca", "Habitat de Aves", "Fogo-Resiliente"]
  },
  {
    name: "Carvalho-cerquinho",
    sci: "Quercus faginea",
    layer: "Dossel / Árvore Nobre",
    type: "canopy",
    img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
    desc: "Autóctone dominante da região Oeste. Tolera solos calcários e pesados, criando copas frescas e abundante folhada rica em húmus.",
    growth: "Excelente vigor aos 2 anos, copa bem formada com 1.8m a 2.4m.",
    tags: ["Solo Calcário", "Sombra Densa", "Folhosa Nativa"]
  },
  {
    name: "Medronheiro",
    sci: "Arbutus unedo",
    layer: "Sub-bosque / Pequena Árvore",
    type: "understory",
    img: "https://images.unsplash.com/photo-1606041008023-472dfb5e530f?auto=format&fit=crop&w=800&q=80",
    desc: "Bagas vermelhas comestíveis ricas em antioxidantes e flores brancas simultâneas no outono. Imã biológico para polinizadores.",
    growth: "Frutificação inaugural observada no segundo outono da micro-floresta.",
    tags: ["Fruto Comestível", "Floração Outonal", "Polinizadores"]
  },
  {
    name: "Murta",
    sci: "Myrtus communis",
    layer: "Arbusto Médio & Bagas",
    type: "shrub",
    img: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    desc: "Arbusto aromático perenifólio sagrado na bacia mediterrânica. Folhagem lustrosa perfumada e bagas azul-escuras ricas em óleos essenciais.",
    growth: "Fecho denso de ramagem, abrigo vital para pequenos pássaros.",
    tags: ["Aromática", "Bagas Silvestres", "Folha Perene"]
  },
  {
    name: "Pilriteiro",
    sci: "Crataegus monogyna",
    layer: "Arbusto Espinhoso & Fruto",
    type: "shrub",
    img: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=800&q=80",
    desc: "Conhecido como espinheiro-alvar. Floresce em branco na primavera e produz bagas vermelhas no outono que alimentam tordos e melros.",
    growth: "Crescimento vigoroso, estrutura protectora de ninhais.",
    tags: ["Ninhos Seguros", "Frutos de Inverno", "Pioneira"]
  },
  {
    name: "Loureiro Selvagem",
    sci: "Laurus nobilis",
    layer: "Sub-bosque Denso",
    type: "understory",
    img: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80",
    desc: "Relíquia da floresta laurissilva ancestral de Portugal continental. Cria sombra densa que abriga o solo e reduz a evaporação estival.",
    growth: "Atingiu mais de 2 metros aos 2 anos, acelerado pelo microclima húmido.",
    tags: ["Resistente ao Vento", "Aromática", "Sombra Perene"]
  },
  {
    name: "Folhado",
    sci: "Viburnum tinus",
    layer: "Arbusto de Sombra",
    type: "shrub",
    img: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=800&q=80",
    desc: "Arbusto sempre-verde com inflorescências brancas e rosadas no inverno, período em que quase nada floresce.",
    growth: "Floresce vigorosamente entre dezembro e março na nossa parcela.",
    tags: ["Flor de Inverno", "Bagas Metálicas", "Sub-bosque"]
  },
  {
    name: "Aroeira / Lentisco",
    sci: "Pistacia lentiscus",
    layer: "Arbusto Rústico",
    type: "shrub",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80",
    desc: "Um dos campeões mundiais de resistência à seca e ao sal marítimo trazido pelos ventos da Lourinhã. Raízes que quebram solos argilosos duros.",
    growth: "Cobre a base das árvores maiores, suprimindo infestantes.",
    tags: ["Resistência ao Sal", "Anti-Seca", "Fixadora de Solo"]
  },
  {
    name: "Alecrim Bravio",
    sci: "Salvia rosmarinus",
    layer: "Herbáceo & Melífero",
    type: "aromatic",
    img: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=800&q=80",
    desc: "Planta mediterrânica por excelência. Fornece néctar aos polinizadores em dias amenos de inverno e liberta óleos essenciais bactericidas no solo.",
    growth: "Borda a face ensolarada do bosque com profusa floração azul.",
    tags: ["Melífera", "Solo Seco", "Aroma Silvestre"]
  },
  {
    name: "Esteva do Oeste",
    sci: "Cistus ladanifer",
    layer: "Arbusto Pioneiro",
    type: "aromatic",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    desc: "Pioneira que prepara a terra. Associa-se a fungos micorrízicos no solo e protege as jovens árvores da insolação direta nos primeiros verões.",
    growth: "Crescimento explosivo no primeiro ano, gerando biomassa para mulching.",
    tags: ["Pioneira", "Micorrizas", "Biomassa"]
  },
  {
    name: "Sabugueiro Autóctone",
    sci: "Sambucus nigra",
    layer: "Sub-bosque Húmido",
    type: "understory",
    img: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    desc: "Adora as linhas de drenagem natural do terreno. Flores perfumadas e bagas ricas em antocianinas apreciadas por pássaros silvestres.",
    growth: "Desenvolvimento rápido, sombreia o solo com folhas compostas caducas.",
    tags: ["Linhas de Água", "Bagas", "Biomassa Rápida"]
  },
  {
    name: "Gilbardeira",
    sci: "Ruscus aculeatus",
    layer: "Estrato Rasteiro de Sombra",
    type: "shrub",
    img: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
    desc: "Espécie protegida em Portugal. Sobrevive à sombra mais profunda sob os carvalhos e sobreiros, mantendo o solo coberto e fresco.",
    growth: "Adaptada na perfeição sob o dossel que agora se fecha aos 2 anos.",
    tags: ["Sombra Total", "Espécie Protegida", "Solo Protegido"]
  }
];

function initSpeciesFilter() {
  const container = document.getElementById('mvp-species-grid');
  const filterBtns = document.querySelectorAll('.species-filter-btn');
  if (!container) return;

  function render(items) {
    container.innerHTML = items.map(s => `
      <div class="species-card-mvp">
        <div class="species-media-mvp">
          <img src="${s.img}" alt="${s.name} (${s.sci})" loading="lazy">
          <span class="species-layer-badge">${s.layer}</span>
        </div>
        <div class="species-body-mvp">
          <h4>${s.name}</h4>
          <span class="species-sci-name">${s.sci}</span>
          <p>${s.desc}</p>
          <div style="font-size: 0.8rem; color: var(--forest-800); background: var(--sage-50); padding: 0.45rem 0.65rem; border-radius: var(--radius-sm); margin-bottom: 0.85rem; border-left: 3px solid var(--forest-500);">
            <strong>Aos 2 anos:</strong> ${s.growth}
          </div>
          <div class="species-tag-strip">
            ${s.tags.map(t => `<span class="species-tag">${t}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  render(NATIVE_SPECIES);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-type');
      if (type === 'all') {
        render(NATIVE_SPECIES);
      } else {
        render(NATIVE_SPECIES.filter(s => s.type === type));
      }
    });
  });
}

/* ==========================================================================
   2. INTERACTIVE 2-HECTARE LAND SCHEMATIC MAP
   ========================================================================== */
const ZONES_DATA = {
  zone1: {
    title: "1. O Jardim-Floresta Pioneiro (2 Anos)",
    badge: "Núcleo Miyawaki • Estabelecido Nov. 2024",
    area: "450 m²",
    species: "675 mudas (30+ espécies nativas)",
    method: "Método Miyawaki adaptado ao Oeste",
    desc: "O coração do projeto. Plantado a 23 de novembro de 2024 com o apoio de 30+ voluntários. Densidade de 3 a 5 plantas por m², solo descompactado com composto e camada de palha de 15 cm. Aos 2 anos apresenta copa a tocar-se, auto-sombreamento e humidade constante sob a manta morta.",
    status: "Fase de autonomia hídrica e maturação acelerada."
  },
  zone2: {
    title: "2. Parcela de Ensaio: Sementeira Direta de Bolotas",
    badge: "Estudo Científico Comparativo",
    area: "1.200 m²",
    species: "Sobreiro (Quercus suber) & Carvalho-cerquinho",
    method: "Sementeira no local sem transplante",
    desc: "Área onde as bolotas foram colhidas nas matas vizinhas e semeadas diretamente no solo definitivo. O objetivo é testar a raiz aprumada (taproot): raízes que descem verticalmente sem dobra plástica resistem melhor aos verões secos sem rega de apoio.",
    status: "Resultados comparativos aos 2 anos mostram excelente vigor radicular."
  },
  zone3: {
    title: "3. Regeneração Natural Assistida",
    badge: "Banco de Sementes Autóctone",
    area: "2.500 m²",
    species: "Pioneiras espontâneas, estevas, giestas e gramíneas",
    method: "Proteção contra mobilização mecânica & corte seletivo",
    desc: "Área reservada para observar a resposta espontânea do terreno sem plantação ativa. Revela o potencial dormente da paisagem rural do Oeste quando cessam as lavouras profundas de trator e o uso de herbicidas.",
    status: "Recuperação espontânea de fungos do solo e cobertura pioneira."
  },
  zone4: {
    title: "4. Cortina Quebra-Vento Oceânica",
    badge: "Proteção Bio-Climática",
    area: "Faixa Linear de 180 metros",
    species: "Zambujeiro, Lentisco, Murta, Cipreste e Loureiro",
    method: "Sebes vivas densas contra ventos dominantes do Atlântico",
    desc: "Na Lourinhã e no Oeste rural, o vento do mar é constante e desidratante no verão. Esta barreira verde perene desacelera as rajadas, reduz a erosão e cria um microclima protegido para as parcelas interiores da propriedade.",
    status: "Estrutura densa a proteger ativamente as mudas mais jovens."
  },
  zone5: {
    title: "5. Zona Agroflorestal & Futuro Viveiro Comunitário",
    badge: "Visão & Expansão nos 2 Hectares",
    area: "Restantes ~13.000 m² da propriedade",
    species: "Pomar tradicional de sequeiro, árvores de fruto e viveiro nativo",
    method: "Sintropia, linhas de nível e retenção de água da chuva",
    desc: "A tela aberta dos nossos 2 hectares para os próximos anos. Planeamento de linhas agroflorestais que combinem espécies florestais com árvores de fruto locais (como a Pêra Rocha do Oeste, maçãs tradicionais e figueiras) e um pequeno viveiro comunitário para propagar sementes da nossa floresta.",
    status: "Fase de desenho permacultural e captação de recursos."
  }
};

function initLandMapInteractive() {
  const mapZones = document.querySelectorAll('.map-zone-interactive');
  const cardBadge = document.getElementById('zone-badge');
  const cardTitle = document.getElementById('zone-title');
  const cardDesc = document.getElementById('zone-desc');
  const cardArea = document.getElementById('zone-area');
  const cardSpecies = document.getElementById('zone-species');
  const cardMethod = document.getElementById('zone-method');
  const cardStatus = document.getElementById('zone-status');

  if (!cardTitle) return;

  function updateZone(zoneKey) {
    const data = ZONES_DATA[zoneKey];
    if (!data) return;

    mapZones.forEach(z => {
      if (z.getAttribute('data-zone') === zoneKey) {
        z.classList.add('active-zone');
      } else {
        z.classList.remove('active-zone');
      }
    });

    cardBadge.textContent = data.badge;
    cardTitle.textContent = data.title;
    cardDesc.textContent = data.desc;
    cardArea.textContent = data.area;
    cardSpecies.textContent = data.species;
    cardMethod.textContent = data.method;
    cardStatus.textContent = data.status;
  }

  mapZones.forEach(zone => {
    zone.addEventListener('click', () => {
      const key = zone.getAttribute('data-zone');
      updateZone(key);
    });

    zone.addEventListener('mouseenter', () => {
      const key = zone.getAttribute('data-zone');
      updateZone(key);
    });
  });
}

/* ==========================================================================
   3. GROWTH STAGES TABS (0 Meses vs 1 Ano vs 2 Anos)
   ========================================================================== */
function initGrowthTabs() {
  const tabBtns = document.querySelectorAll('.growth-tab-btn');
  const stagePanels = document.querySelectorAll('.growth-stage-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.getAttribute('data-stage');
      tabBtns.forEach(b => b.classList.remove('active'));
      stagePanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const target = document.getElementById(`stage-${stage}`);
      if (target) target.classList.add('active');
    });
  });
}

/* ==========================================================================
   4. VOLUNTEERING & FIELD DAYS FORM
   ========================================================================== */
function initVolunteerForm() {
  const form = document.getElementById('volunteer-signup-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim();
    const email = form.querySelector('[name="email"]').value.trim();
    const role = form.querySelector('[name="role"]').value;

    if (!name || !email) {
      if (window.showToast) window.showToast("⚠️ Por favor preencha o seu nome e email.");
      return;
    }

    form.reset();
    if (window.showToast) {
      window.showToast(`🌱 Obrigado, ${name}! Entraremos em contacto brevemente para as próximas ações em Montes Claros.`);
    } else {
      alert(`Obrigado, ${name}! Registado com sucesso.`);
    }
  });
}
