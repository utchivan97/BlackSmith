const inventoryItems = [
    // ARMAS
    {
        id: 'weapon_01',
        category: 'weapon',
        name: 'Espada de madera',
        icon: 'img/items/espada_01.png',
        desc: 'Una daga de madera ligera pero muy afilada. Ideal para principiantes.',
        stats: { daño: 15, durabilidad: 50, rareza: 'Común' }
    },
    {
        id: 'weapon_02',
        category: 'weapon',
        name: 'Espada Larga',
        icon: 'img/items/espada_02.png',
        desc: 'Una espada versátil, equilibrada entre peso y fuerza.',
        stats: { daño: 55, durabilidad: 120, rareza: 'Poco Común' }
    },
    
    {
        id: 'weapon_03',
        category: 'weapon',
        name: 'Espada Mediana',
        icon: 'img/items/espada_03.png',
        desc: 'Una espada rapida y ligera, perfecta para todo mundo.',
        stats: { daño: 35, durabilidad: 100, rareza: 'Poco Común' }
    }
    ,
    {
        id: 'weapon_04',
        category: 'weapon',
        name: 'Hacha de combate',
        icon: 'img/items/hacha_01.png',
        desc: 'Una hacha peligrosa, equilibrada entre peso y fuerza.',
        stats: { daño: 85, durabilidad: 70, rareza: 'Poco Común' }
    },
    // ARMADURAS
    {
        id: 'armor_01',
        category: 'armor',
        name: 'Casco Vikingo',
        icon: 'img/items/casco_hierro.png',
        desc: 'Casco de hierro vikingo.',
        stats: { durabilidad: 120, armadura: 20, rareza: 'Común' }
    },
    {
        id: 'armor_02',
        category: 'armor',
        name: 'Pechera de Vikingo',
        icon: 'img/items/pechera_hierro.png',
        desc: 'Pechera de hierro vikingo.',
        stats: { durabilidad: 220, armadura: 50, rareza: 'Común' }
    },
    {
        id: 'armor_03',
        category: 'armor',
        name: 'Botas de Vikingo',
        icon: 'img/items/botas_hierro.png',
        desc: 'Botas de hierro de vikingo.',
        stats: { durabilidad: 180, armadura: 30, rareza: 'Común' }
    },

    // CONSUMIBLES
    {
        id: 'potion_01',
        category: 'potion',
        name: 'Poción de Salud Menor',
        icon: 'img/items/pocion_salud.png',
        desc: 'Restaura una pequeña cantidad de salud.',
        stats: { efecto: '+50 Salud', usos: 1, rareza: 'Común' }
    },
    {
        id: 'potion_02',
        category: 'potion',
        name: 'Porción de comida',
        icon: 'img/items/comida_01.png',
        desc: 'Restaura una pequeña cantidad de salud.',
        stats: { efecto: '+70 Salud', usos: 1, rareza: 'Común' }
    },
    {
        id: 'potion_03',
        category: 'potion',
        name: 'Agua',
        icon: 'img/items/bebida_1.png',
        desc: 'Restaura una pequeña cantidad de salud.',
        stats: { efecto: '+60 Salud', usos: 1, rareza: 'Común' }
    },
    {
        id: 'potion_04',
        category: 'potion',
        name: 'Cerveza',
        icon: 'img/items/bebida_2.png',
        desc: 'Restaura una pequeña cantidad de salud.',
        stats: { efecto: '+90 Salud', usos: 1, rareza: 'Común' }
    },
    // RECURSOS
    {
        id: 'resource_01',
        category: 'resource',
        name: 'Lingote de Hierro',
        icon: 'img/items/lingote_hierro.png',
        desc: 'Material base para forjar la mayoría de las armas y armaduras comunes.',
        stats: { usos: 'Forja', rareza: 'Común' }
    },
    {
        id: 'resource_02',
        category: 'resource',
        name: 'Cuero',
        icon: 'img/items/cuero.png',
        desc: 'Material base para forjar la mayoría de las armas y armaduras comunes.',
        stats: { usos: 'Forja', rareza: 'Común' }
    },
    {
        id: 'resource_03',
        category: 'resource',
        name: 'Trozo de Madera',
        icon: 'img/items/trozo_madera.png',
        desc: 'Material base para forjar la mayoría de las armas y armaduras comunes.',
        stats: { usos: 'Forja', rareza: 'Común' }
    }
];


document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('inventoryGrid');
    const modal = document.getElementById('itemModal');
    const modalBody = modal.querySelector('.modal-body');
    const closeModalBtn = document.getElementById('closeModal');
    const tabButtons = document.querySelectorAll('.tab-btn');

    function renderInventory(categoryToFilter) {
        grid.innerHTML = '';

        const filteredItems = inventoryItems.filter(item => item.category === categoryToFilter);

        filteredItems.forEach(item => {

            const itemIcon = document.createElement('div');
            itemIcon.classList.add('inventory-item-icon');
            itemIcon.dataset.itemId = item.id;

            const img = document.createElement('img');
            img.src = item.icon;
            img.alt = item.name;

            itemIcon.appendChild(img);
            grid.appendChild(itemIcon);

            itemIcon.addEventListener('click', openModal);
        });
    }

    function openModal(event) {
        const itemId = event.currentTarget.dataset.itemId;
        const item = inventoryItems.find(i => i.id === itemId);

        if (item) {

            let statsHtml = '<ul class="modal-item-stats">';
            for (const [key, value] of Object.entries(item.stats)) {
                statsHtml += `<li><span class="stat-label">${key.toUpperCase()}:</span> ${value}</li>`;
            }
            statsHtml += '</ul>';

            modalBody.innerHTML = `
                <h2 class="modal-item-title">${item.name}</h2>
                <div class="modal-item-info">
                    <img src="${item.icon}" alt="${item.name}" class="modal-item-info-img">
                    <div class="modal-item-info-text">
                        <p>${item.desc}</p>
                        ${statsHtml}
                    </div>
                </div>
            `;

            modal.classList.add('open');
        }
    }

    function closeModal() {
        modal.classList.remove('open');
    }

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {

            document.querySelector('.tab-btn.active').classList.remove('active');
            button.classList.add('active');

            const category = button.dataset.category;
            renderInventory(category);
        });
    });

    renderInventory('weapon');
});