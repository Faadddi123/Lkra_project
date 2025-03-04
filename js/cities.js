// Cities data
const CITIES = [
    { name: 'Rabat', region: 'Rabat-Salé-Kénitra' },
    { name: 'Casablanca', region: 'Casablanca-Settat' },
    { name: 'Marrakech', region: 'Marrakech-Safi' },
    { name: 'Fès', region: 'Fès-Meknès' },
    { name: 'Tanger', region: 'Tanger-Tétouan-Al Hoceïma' },
    { name: 'Agadir', region: 'Souss-Massa' },
    { name: 'Meknès', region: 'Fès-Meknès' },
    { name: 'Oujda', region: "L'Oriental" },
    { name: 'Kénitra', region: 'Rabat-Salé-Kénitra' },
    { name: 'Tétouan', region: 'Tanger-Tétouan-Al Hoceïma' },
    { name: 'Salé', region: 'Rabat-Salé-Kénitra' },
    { name: 'Nador', region: "L'Oriental" },
    { name: 'Mohammedia', region: 'Casablanca-Settat' },
    { name: 'El Jadida', region: 'Casablanca-Settat' },
    { name: 'Béni Mellal', region: 'Béni Mellal-Khénifra' }
];

// Initialize cities dropdown
document.addEventListener('DOMContentLoaded', () => {
    const locationDropdown = document.querySelector('.location-dropdown');
    const citiesList = document.createElement('div');
    citiesList.className = 'cities-list';

    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'city-search';
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search city...';
    searchContainer.appendChild(searchInput);
    citiesList.appendChild(searchContainer);

    // Create cities list
    const ul = document.createElement('ul');
    CITIES.forEach(city => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${city.name}</span>
            <i class="fas fa-check"></i>
        `;
        li.addEventListener('click', () => {
            const currentCity = locationDropdown.querySelector('span');
            currentCity.textContent = city.name;
            citiesList.classList.remove('active');
            document.querySelectorAll('.cities-list li').forEach(item => {
                item.classList.remove('selected');
            });
            li.classList.add('selected');
        });
        ul.appendChild(li);
    });
    citiesList.appendChild(ul);
    locationDropdown.appendChild(citiesList);

    // Toggle cities list
    locationDropdown.addEventListener('click', (e) => {
        if (e.target.closest('.city-search')) return;
        citiesList.classList.toggle('active');
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const cityItems = ul.querySelectorAll('li');
        
        cityItems.forEach(item => {
            const cityName = item.querySelector('span').textContent.toLowerCase();
            if (cityName.includes(searchTerm)) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!locationDropdown.contains(e.target)) {
            citiesList.classList.remove('active');
        }
    });
}); 