// ===================== SHARED GUARDED DATA (only defines once) =====================
if (!window.ProductData) {
  (function () {
    const PRODUCTS = [
      { id: 1,  name: "Women's Hiking Boots", brand: "TrailMaster", category: "footwear",  price: 2699.82, originalPrice: 3239.82, rating: 4.5, description: "Durable waterproof hiking boots with superior ankle support and grip. Perfect for challenging terrain and long-distance hikes.", image: "../images/Women-Hiking-Boots.jpg", features: ["Waterproof","Ankle Support","Vibram Sole","Breathable"], inStock: true,  dateAdded: "2024-01-15" },
      { id: 2,  name: "Hiking Gloves", brand: "GripTech", category: "accessories", price: 539.82, originalPrice: null, rating: 4.2, description: "Lightweight, breathable hiking gloves with enhanced grip and touchscreen compatibility. Ideal for trail navigation and protection.", image: "../images/Hiking-Gloves.jpg", features: ["Touchscreen Compatible","Breathable","Enhanced Grip","Lightweight"], inStock: true,  dateAdded: "2024-02-01" },
      { id: 3,  name: "Backpacking Gear Essentials", brand: "AdventurePro", category: "gear", price: 5399.82, originalPrice: 6299.82, rating: 4.8, description: "Complete backpacking gear set including sleeping bag, camping mat, portable stove, and essential survival tools.", image: "../images/Backpacking-Gear-Essentials.jpg", features: ["Complete Set","Lightweight","Compact","Weather Resistant"], inStock: true,  dateAdded: "2024-01-20" },
      { id: 4,  name: "Merino Wool Base Layer", brand: "NatureFit", category: "clothing", price: 1439.82, originalPrice: 1799.82, rating: 4.6, description: "Premium merino wool base layer for temperature regulation and moisture wicking. Naturally odor-resistant and comfortable.", image: "../images/Women-Hiking-Boots.jpg", features: ["Merino Wool","Moisture Wicking","Odor Resistant","Temperature Control"], inStock: true,  dateAdded: "2024-02-10" },
      { id: 5,  name: "GPS Navigation Device", brand: "TrailTech", category: "safety", price: 4499.82, originalPrice: null, rating: 4.4, description: "Advanced GPS device with topographic maps, weather alerts, and emergency SOS functionality. Essential for backcountry adventures.", image: "../images/gps.jpg", features: ["GPS Navigation","Topographic Maps","Weather Alerts","SOS Function"], inStock: false, dateAdded: "2024-01-30" },
      { id: 6,  name: "Ultralight Hiking Jacket", brand: "WindShield", category: "clothing", price: 3419.82, originalPrice: 4139.82, rating: 4.3, description: "Packable ultralight jacket with wind and water resistance. Perfect for unpredictable mountain weather conditions.", image: "../images/Backpacking-Gear-Essentials.jpg", features: ["Ultralight","Packable","Water Resistant","Wind Proof"], inStock: true,  dateAdded: "2024-02-05" },
      { id: 7,  name: "Trekking Poles Set", brand: "StableStep", category: "gear", price: 1619.82, originalPrice: null, rating: 4.7, description: "Adjustable carbon fiber trekking poles with ergonomic grips and shock absorption. Reduces strain on knees and improves stability.", image: "../images/trekkingpoles.jpg", features: ["Carbon Fiber","Adjustable","Shock Absorption","Ergonomic"], inStock: true,  dateAdded: "2024-01-25" },
      { id: 8,  name: "Trail Running Shoes", brand: "SpeedTrail", category: "footwear",  price: 2339.82, originalPrice: 2879.82, rating: 4.4, description: "Lightweight trail running shoes with aggressive tread pattern and rock protection. Built for speed on technical terrain.", image: "../images/Hiking-Gloves.jpg", features: ["Lightweight","Rock Protection","Aggressive Tread","Quick Dry"], inStock: true,  dateAdded: "2024-02-12" },
      { id: 9,  name: "Hydration Backpack", brand: "HydroFlow", category: "gear", price: 2159.82, originalPrice: null, rating: 4.5, description: "25L hydration pack with 3L reservoir, multiple compartments, and breathable back panel. Perfect for day hikes and trail running.", image: "../images/hydrationbackpack.jpg", features: ["3L Reservoir","25L Capacity","Breathable","Multiple Pockets"], inStock: true,  dateAdded: "2024-01-18" },
      { id: 10, name: "Camping Headlamp", brand: "BrightBeam", category: "accessories", price: 899.82, originalPrice: 1169.82, rating: 4.6, description: "High-powered LED headlamp with multiple brightness settings, red light mode, and waterproof design. Essential for night hiking.", image: "../images/Women-Hiking-Boots.jpg", features: ["LED Light","Multiple Modes","Waterproof","Long Battery"], inStock: true, dateAdded: "2024-02-08" },
      { id: 11, name: "Mountaineering Boots", brand: "AlpinePro", category: "footwear", price: 4199.82, originalPrice: 4799.82, rating: 4.7, description: "Heavy-duty mountaineering boots with crampon compatibility and insulation for extreme cold conditions.", image: "../images/Women-Hiking-Boots.jpg", features: ["Crampon Compatible","Insulated","Waterproof","Steel Shank"], inStock: true, dateAdded: "2024-01-10" },
      { id: 12, name: "Lightweight Hiking Sandals", brand: "ComfortWalk", category: "footwear", price: 1299.82, originalPrice: null, rating: 4.2, description: "Breathable hiking sandals with excellent grip and quick-dry materials. Perfect for water crossings and hot weather.", image: "../images/Hiking-Gloves.jpg", features: ["Quick Dry","Water Friendly","Lightweight","Adjustable Straps"], inStock: true, dateAdded: "2024-02-15" },
      { id: 13, name: "Winter Hiking Boots", brand: "WinterTrek", category: "footwear", price: 3599.82, originalPrice: 4319.82, rating: 4.5, description: "Insulated winter hiking boots with thermal lining and snow-gripping outsole for cold weather adventures.", image: "../images/Backpacking-Gear-Essentials.jpg", features: ["Thermal Insulation","Snow Grip","Waterproof","Warm Lining"], inStock: false, dateAdded: "2024-01-05" },
      { id: 14, name: "Multi-Tool Kit", brand: "ToolMaster", category: "accessories", price: 719.82, originalPrice: 899.82, rating: 4.4, description: "Compact multi-tool with knife, pliers, screwdrivers, and essential outdoor tools. Perfect for trail repairs.", image: "../images/Women-Hiking-Boots.jpg", features: ["15 Tools","Compact","Stainless Steel","Belt Clip"], inStock: true, dateAdded: "2024-02-03" },
      { id: 15, name: "Hiking Hat", brand: "SunGuard", category: "accessories", price: 479.82, originalPrice: null, rating: 4.3, description: "UV protection hiking hat with moisture-wicking band and adjustable chin strap. Keeps you cool and protected.", image: "../images/Hiking-Gloves.jpg", features: ["UV Protection","Moisture Wicking","Adjustable","Lightweight"], inStock: true, dateAdded: "2024-01-28" },
      { id: 16, name: "Portable Camping Stove", brand: "FlameMax", category: "gear", price: 1799.82, originalPrice: 2159.82, rating: 4.6, description: "Lightweight portable stove with wind shield and efficient fuel consumption. Perfect for backcountry cooking.", image: "../images/stove.jpg", features: ["Lightweight","Wind Resistant","Fuel Efficient","Compact"], inStock: true, dateAdded: "2024-01-12" },
      { id: 17, name: "Sleeping Bag", brand: "NightRest", category: "gear", price: 2879.82, originalPrice: 3599.82, rating: 4.5, description: "3-season sleeping bag with down insulation and compression sack. Rated for temperatures down to -5°C.", image: "../images/sleepingbag.jpg", features: ["Down Insulation","3-Season","Compression Sack","Lightweight"], inStock: true, dateAdded: "2024-02-20" },
      { id: 18, name: "Hiking Pants", brand: "TrailFlex", category: "clothing", price: 1799.82, originalPrice: null, rating: 4.4, description: "Durable hiking pants with stretch fabric and multiple pockets. Water-resistant and quick-drying.", image: "../images/Hiking-Gloves.jpg", features: ["Stretch Fabric","Water Resistant","Quick Dry","Multiple Pockets"], inStock: true, dateAdded: "2024-01-22" },
      { id: 19, name: "Thermal Underwear Set", brand: "WarmLayer", category: "clothing", price: 1079.82, originalPrice: 1439.82, rating: 4.3, description: "Thermal underwear set with moisture-wicking properties and odor control. Essential for cold weather hiking.", image: "../images/Backpacking-Gear-Essentials.jpg", features: ["Thermal","Moisture Wicking","Odor Control","Comfortable Fit"], inStock: true, dateAdded: "2024-02-01" },
      { id: 20, name: "Rain Poncho", brand: "StormShield", category: "clothing", price: 899.82, originalPrice: 1169.82, rating: 4.1, description: "Lightweight rain poncho with hood and snap closures. Packs small and provides excellent rain protection.", image: "../images/Women-Hiking-Boots.jpg", features: ["Waterproof","Lightweight","Packable","Hood"], inStock: false, dateAdded: "2024-01-08" },
      { id: 21, name: "Emergency Whistle", brand: "SafeSound", category: "safety", price: 179.82, originalPrice: null, rating: 4.5, description: "High-decibel emergency whistle with lanyard. Essential safety item for solo hikers and emergency situations.", image: "../images/whistle.png", features: ["High Decibel","Lightweight","Lanyard Included","Weather Resistant"], inStock: true, dateAdded: "2024-02-12" },
      { id: 22, name: "First Aid Kit", brand: "MedTrail", category: "safety", price: 719.82, originalPrice: 899.82, rating: 4.7, description: "Comprehensive first aid kit with bandages, antiseptic, and emergency medications. Compact and trail-ready.", image: "../images/firstaidkit.png", features: ["Comprehensive","Compact","Trail Ready","Emergency Meds"], inStock: true, dateAdded: "2024-01-15" },
      { id: 23, name: "Emergency Beacon", brand: "RescueLink", category: "safety", price: 5399.82, originalPrice: null, rating: 4.8, description: "Satellite emergency beacon with GPS tracking and SOS messaging. Critical safety device for remote adventures.", image: "../images/beacon.jpg", features: ["Satellite","GPS Tracking","SOS Messaging","Long Battery"], inStock: true, dateAdded: "2024-01-30" },
      { id: 24, name: "Reflective Safety Vest", brand: "VisibleTrek", category: "safety", price: 359.82, originalPrice: 479.82, rating: 4.2, description: "High-visibility reflective vest for early morning or late evening hikes. Lightweight and adjustable.", image: "../images/vest.png", features: ["High Visibility","Reflective","Lightweight","Adjustable"], inStock: true, dateAdded: "2024-02-05" },
      { id: 25, name: "Water Purification Tablets", brand: "PureH2O", category: "safety", price: 299.82, originalPrice: null, rating: 4.4, description: "Emergency water purification tablets for treating questionable water sources. Essential for backcountry safety.", image: "../images/waterPure.jpg", features: ["Water Purification","Emergency Use","Lightweight","Long Shelf Life"], inStock: true, dateAdded: "2024-01-18" }
    ];

    const PRODUCT_OVERRIDES = {
      3:  { image: "../images/backge.jpg", images: ["../images/backge.jpg"], description: "Compact, trail-ready kit: 3-season sleeping system, cook set, repair essentials and packing cubes—optimized for low weight and fast setup.", features: ["Complete Set","Lightweight","Compact","Weather Resistant","Quick Setup","Trail-Ready"], reviews: [{ user: "Sibusiso N.", rating: 5, date: "2025-06-01", title: "Great starter kit", text: "Had everything I needed for an overnight in Cederberg." }, { user: "Nandi K.", rating: 4, date: "2025-04-17", title: "Well thought out", text: "Smart selection—added my own mug and was set." }] },
      7:  { image: "../images/trekkingpoles.jpg", images: ["../images/trekkingpoles.jpg","../images/trekkingpoles1.jpg","../images/trekkingpoles2.jpg"], description: "Carbon fiber trekking poles with quick-lock length adjust, ergonomic cork grips and carbide tips for confident traction on steep terrain.", features: ["Carbon Fiber","Quick-Lock Adjust","Cork Grips","Carbide Tips","Shock Absorption","Adjustable Straps"], reviews: [{ user: "Thandi P.", rating: 5, date: "2025-05-20", title: "Knees say thanks", text: "Massive difference on Table Mountain descents." }, { user: "Musa R.", rating: 4, date: "2025-03-03", title: "Light but sturdy", text: "Locks hold firm; tips bite well on rock." }] },
      9:  { image: "../images/hydrationbackpack.jpg", images: [ "../images/hydrationbackpack.jpg","../images/backwater1.jpg","../images/backwater2.jpg"], description: "2 L daypack, ventilated back panel, hose clip and stretch pockets—balanced carry for long day hikes.", features: ["2L Reservoir","Ventilated Back Panel","Hose Clip","Stretch Pockets","Chest & Hip Straps","Lightweight"], reviews: [{ user: "Aisha K.", rating: 4, date: "2025-04-10", title: "Comfy carry", text: "Breathes well; hip pockets could be larger." }, { user: "Sipho Z.", rating: 5, date: "2025-02-25", title: "Great value", text: "Perfect for Magalies day hikes. No sloshing." }] },
      16: { image: "../images/stove.jpg", images: ["../images/stove1.jpg","../images/stove.jpg"], description: "Ultralight canister stove with wind-shielded burner and fast boil performance; packs small with fold-out pot supports for stability.", features: ["Ultralight","Wind Shielded Burner","Fast Boil","Compact Fold","Stable Supports","Fuel Efficient"], reviews: [{ user: "Lerato P.", rating: 5, date: "2025-03-12", title: "Boils fast", text: "Wind didn’t faze it. Coffee in minutes." }, { user: "Kyle D.", rating: 4, date: "2025-01-29", title: "Tiny & tough", text: "Packs into my pot; great simmer control." }] },
      17: { image: "../images/sleepingbag.jpg", images: ["../images/sleepingbag.jpg","../images/sleepingbag1.jpg","../images/sleepingbag2.jpg"], description: "3-season mummy bag with down insulation, draft collar and DWR shell—warmth, low bulk and reliable comfort around −5 °C.", features: ["Down Insulation","Draft Collar","DWR Shell","3-Season","Compression Sack","Lightweight"], reviews: [{ user: "Nomsa D.", rating: 5, date: "2025-07-01", title: "Warm & compact", text: "No cold spots in Drakensberg. Packs small." }, { user: "Craig J.", rating: 4, date: "2025-05-09", title: "Good at −2°C", text: "Comfortable sleep with a liner. Zips smoothly." }] },
      5:  { image: "../images/gps.jpg", images: ["../images/gps.jpg","../images/gps1.jpg"], description: "Handheld GPS with topo maps, multi-GNSS support, weather alerts and breadcrumb track-back—built for off-grid navigation.", features: ["Multi-GNSS","Topo Maps","Weather Alerts","Track-Back","IPX7 Waterproof","Long Battery"], reviews: [{ user: "Daniel R.", rating: 4, date: "2025-06-15", title: "Reliable lock", text: "Kept signal under canopy. Interface is basic but fine." }, { user: "Palesa S.", rating: 5, date: "2025-03-22", title: "Saved my route", text: "Track-back worked perfectly after a wrong turn." }] },
      21: { image: "../images/whistle.png", images: ["../images/whistle.png","../images/whistle2.png"], description: "High-output emergency whistle with lanyard; lightweight, durable and audible over wind and river noise.", features: ["120 dB Output","Lightweight","Durable","Weather Resistant","Lanyard Included"], reviews: [{ user: "Zanele S.", rating: 5, date: "2025-05-11", title: "Loud!", text: "Cuts through wind. Easy to clip onto sternum strap." }, { user: "Pieter L.", rating: 4, date: "2025-02-08", title: "Simple & tough", text: "No moving parts—exactly what I want for safety." }] },
      22: { image: "../images/firstaidkit.png", images: ["../images/firstaidkit.png","../images/first1.jpg"], description: "Trail-focused first aid kit in a water-resistant pouch: bandages, antiseptic wipes, blister care, tape and mini shears.", features: ["Comprehensive","Water-Resistant Pouch","Blister Care","Mini Shears","Compact"], reviews: [{ user: "Aviwe T.", rating: 4, date: "2025-04-03", title: "Well organized", text: "Great selection; I added extra tape and meds." }, { user: "Lungi M.", rating: 5, date: "2025-01-19", title: "Trail essential", text: "Used the blister kit—worked brilliantly." }] },
      23: { image: "../images/beacon.jpg", images: ["../images/beacon.jpg", "../images/beacon1.jpg","../images/beacon2.jpg"], description: "Satellite SOS beacon with one-touch emergency alert and location sharing—designed for remote backcountry trips.", features: ["Satellite SOS","GPS Tracking","Location Share","IP67 Waterproof","Long Battery"], reviews: [{ user: "Leroy N.", rating: 5, date: "2025-05-28", title: "Peace of mind", text: "Setup was easy; tracking breadcrumb is neat." }, { user: "Nomonde H.", rating: 4, date: "2025-02-14", title: "Solid build", text: "Compact and tough. App could be smoother." }] },
      24: { image: "../images/vest.png", images: ["../images/vest.png","../images/vest1.jpg"], description: "High-visibility mesh vest with 360° reflective strips and adjustable sides—packs flat for early/late starts.", features: ["360° Reflective","Mesh Fabric","Adjustable Sides","Packs Flat","Lightweight"], reviews: [{ user: "Aisha K.", rating: 4, date: "2025-02-19", title: "Does the job", text: "Very visible at dawn; comfy over a jacket." }, { user: "Tumi B.", rating: 5, date: "2025-01-05", title: "Light & bright", text: "Lives in my pack now—no bulk at all." }] },
      25: { image: "../images/waterPure.jpg", description: "Compact chlorine-dioxide tablets for emergency water treatment; simple, packable and reliable for backcountry use.", features: ["Chlorine Dioxide","Emergency Use","Lightweight","Long Shelf Life","Simple to Use"], reviews: [{ user: "Pieter L.", rating: 5, date: "2025-01-30", title: "Always carry", text: "Backup to my filter—great peace of mind." }, { user: "Thabo M.", rating: 4, date: "2024-12-12", title: "Tastes fine", text: "Minimal aftertaste; instructions are clear." }] }
    };

    function applyProductOverrides(list) {
      return list.map(p => {
        const isTargetCat = p.category === 'gear' || p.category === 'safety';
        return (isTargetCat && PRODUCT_OVERRIDES[p.id]) ? { ...p, ...PRODUCT_OVERRIDES[p.id] } : p;
      });
    }

    window.ProductData = {
      products: PRODUCTS,
      overrides: PRODUCT_OVERRIDES,
      getProducts: () => applyProductOverrides(PRODUCTS)
    };
  })();
}

// Helper accessor (always use this; never keep stale copies)
const getProducts = () => window.ProductData.getProducts();

// ===================== CATALOGUE LOGIC =====================
let filteredProducts = getProducts();
let currentFilters = { search: '', category: 'all', brand: 'all', price: 'all' };
let currentSort = 'name';

document.addEventListener('DOMContentLoaded', function () {
  populateBrandFilter();
  const all = getProducts();
  displayProducts(all);
  updateResultsCount(all.length);

  const searchInput = document.getElementById('productSearch');
  searchInput.addEventListener('input', debounce(searchProducts, 300));
  searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') searchProducts(); });
});

function populateBrandFilter() {
  const brandFilter = document.getElementById('brandFilter');
  const all = getProducts();
  const uniqueBrands = [...new Set(all.map(p => p.brand))].sort();
  brandFilter.innerHTML = '<option value="all">All Brands</option>';
  uniqueBrands.forEach(brand => {
    const o = document.createElement('option');
    o.value = brand; o.textContent = brand; brandFilter.appendChild(o);
  });
}

function debounce(fn, wait) {
  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}

function displayProducts(productsToDisplay) {
  const productList = document.getElementById('productList');
  const noResults = document.getElementById('noResults');

  if (!productsToDisplay.length) {
    productList.style.display = 'none';
    noResults.style.display = 'block';
    return;
  }
  productList.style.display = 'block';
  noResults.style.display = 'none';

  productList.innerHTML = productsToDisplay.map(product => {
    const stars = generateStars(product.rating);
    const stockStatus = product.inStock ? '' : ' (Out of Stock)';
    const stockClass = product.inStock ? '' : 'out-of-stock';
    const categoryBadge = getCategoryBadge(product.category);

    return `
      <div class="product-item ${stockClass}" data-id="${product.id}">
        <div class="product-info">
          <img src="${product.image}" alt="${product.name}" class="product-image"
               onerror="this.src='../images/Women-Hiking-Boots.jpg'"
               onclick="viewProduct(${product.id})" style="cursor:pointer;">
          <div class="product-details">
            ${categoryBadge}
            <h3>${product.name}${stockStatus}</h3>
          </div>
        </div>

        <div class="product-brand-main">${product.brand}</div>

        <div class="product-price">
          R${formatPrice(product.price)}
          ${product.originalPrice ? `<span class="price-original">R${formatPrice(product.originalPrice)}</span>` : ''}
        </div>

        <div class="product-rating">
          <div class="stars">${stars}</div>
          <div class="rating-score">${product.rating}/5</div>
        </div>

        <div class="product-actions">
          <button class="btn btn-primary" onclick="addToCart(${product.id})" ${!product.inStock ? 'disabled' : ''}>
            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button class="btn btn-secondary" onclick="viewProduct(${product.id})">View Details</button>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryBadge(category) {
  const names = { footwear: 'Footwear', clothing: 'Clothing', gear: 'Gear', accessories: 'Accessories', safety: 'Safety' };
  return `<div class="category-badge" data-category="${category}">${names[category] || category}</div>`;
}

function formatPrice(price) {
  return new Intl.NumberFormat('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
}

function generateStars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 !== 0;
  const empty = 5 - full - (half ? 1 : 0);
  return `${'★'.repeat(full)}${half ? '★' : ''}${'☆'.repeat(empty)}`;
}

function searchProducts() {
  currentFilters.search = document.getElementById('productSearch').value.toLowerCase().trim();
  applyFiltersInternal();
}

function applyFilters() {
  currentFilters.category = document.getElementById('categoryFilter').value;
  currentFilters.brand = document.getElementById('brandFilter').value;
  currentFilters.price = document.getElementById('priceFilter').value;
  applyFiltersInternal();
}

function applyFiltersInternal() {
  const src = getProducts();
  filteredProducts = src.filter(product => {
    const q = currentFilters.search;
    const matchesSearch = q === '' ||
      product.name.toLowerCase().includes(q) ||
      product.brand.toLowerCase().includes(q) ||
      product.category.toLowerCase().includes(q) ||
      product.features.some(f => f.toLowerCase().includes(q));

    const matchesCategory = currentFilters.category === 'all' || product.category === currentFilters.category;
    const matchesBrand = currentFilters.brand === 'all' || product.brand === currentFilters.brand;

    let matchesPrice = true;
    if (currentFilters.price !== 'all') {
      const [min, max] = currentFilters.price.split('-').map(p => p.replace('+', '').replace(',', ''));
      const minP = parseInt(min, 10);
      const maxP = max ? parseInt(max, 10) : Infinity;
      matchesPrice = product.price >= minP && product.price <= maxP;
    }
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  sortProducts();
  updateResultsCount(filteredProducts.length);
}

function sortProducts() {
  const sortBy = document.getElementById('sortBy').value;
  currentSort = sortBy;
  const sorted = [...filteredProducts];

  switch (sortBy) {
    case 'name':       sorted.sort((a, b) => a.name.localeCompare(b.name)); break;
    case 'price-low':  sorted.sort((a, b) => a.price - b.price); break;
    case 'price-high': sorted.sort((a, b) => b.price - a.price); break;
    case 'rating':     sorted.sort((a, b) => b.rating - a.rating); break;
    case 'newest':     sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); break;
  }
  displayProducts(sorted);
}

function updateResultsCount(count) {
  const total = getProducts().length;
  const el = document.getElementById('resultsCount');
  el.textContent = (count === total) ? `Showing all ${count} products` : `Showing ${count} of ${total} products`;
}

function clearAllFilters() {
  document.getElementById('productSearch').value = '';
  document.getElementById('categoryFilter').value = 'all';
  document.getElementById('brandFilter').value = 'all';
  document.getElementById('priceFilter').value = 'all';
  document.getElementById('sortBy').value = 'name';

  currentFilters = { search: '', category: 'all', brand: 'all', price: 'all' };
  currentSort = 'name';

  filteredProducts = getProducts();
  displayProducts(filteredProducts);
  updateResultsCount(filteredProducts.length);
}

function viewProduct(productId) {
  const p = getProducts().find(x => x.id === productId);
  if (!p) return;
  window.location.href = `ProductPage.html?id=${productId}`;
}

function addToCart(productId) {
  const p = getProducts().find(x => x.id === productId);
  if (!p || !p.inStock) return;
  alert(`Added "${p.name}" to cart!`);
  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    const n = parseInt(cartCount.textContent || '0', 10);
    cartCount.textContent = n + 1;
  }
}

document.addEventListener('keydown', function (event) {
  if (event.ctrlKey && event.key === 'f') {
    event.preventDefault();
    document.getElementById('productSearch').focus();
  }
});
