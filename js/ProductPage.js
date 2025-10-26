/* =========================================================
   ProductPage.merged.js
   - Single product page script (merged)
   - Uses shared window.ProductData if available
   - Dynamic gallery (#productThumbnails) + reviews (#reviewsList)
   - Keeps footwear specs & reviews + hides certain footwear thumbs
   ========================================================= */

/* ---------- Guarded shared product data (defines once) ---------- */
if (!window.ProductData) {
  (function () {
    const PRODUCTS = [
      { id: 1,  name: "Women's Hiking Boots", brand: "TrailMaster", category: "footwear",
        price: 2699.82, originalPrice: 3239.82, rating: 4.5,
        description: "Durable waterproof hiking boots with superior ankle support and grip. Perfect for challenging terrain and long-distance hikes.",
        image: "../images/Women-Hiking-Boots.jpg",
        features: ["Waterproof","Ankle Support","Vibram Sole","Breathable"], inStock: true,  dateAdded: "2024-01-15" },

      { id: 2,  name: "Hiking Gloves", brand: "GripTech", category: "accessories",
        price: 539.82, originalPrice: null, rating: 4.2,
        description: "Lightweight, breathable hiking gloves with enhanced grip and touchscreen compatibility. Ideal for trail navigation and protection.",
        image: "../images/Hiking-Gloves.jpg",
        features: ["Touchscreen Compatible","Breathable","Enhanced Grip","Lightweight"], inStock: true,  dateAdded: "2024-02-01" },

      { id: 3,  name: "Backpacking Gear Essentials", brand: "AdventurePro", category: "gear",
        price: 5399.82, originalPrice: 6299.82, rating: 4.8,
        description: "Complete backpacking gear set including sleeping bag, camping mat, portable stove, and essential survival tools.",
        image: "../images/Backpacking-Gear-Essentials.jpg",
        features: ["Complete Set","Lightweight","Compact","Weather Resistant"], inStock: true,  dateAdded: "2024-01-20" },

      { id: 5,  name: "GPS Navigation Device", brand: "TrailTech", category: "safety",
        price: 4499.82, originalPrice: null, rating: 4.4,
        description: "Advanced GPS device with topographic maps, weather alerts, and emergency SOS functionality. Essential for backcountry adventures.",
        image: "../images/gps.jpg",
        features: ["GPS Navigation","Topographic Maps","Weather Alerts","SOS Function"], inStock: false, dateAdded: "2024-01-30" },

      { id: 6,  name: "Ultralight Hiking Jacket", brand: "WindShield", category: "clothing",
        price: 3419.82, originalPrice: 4139.82, rating: 4.3,
        description: "Packable ultralight jacket with wind and water resistance. Perfect for unpredictable mountain weather conditions.",
        image: "../images/hikingjacket.jpg",
        features: ["Ultralight","Packable","Water Resistant","Wind Proof"], inStock: true,  dateAdded: "2024-02-05" },

      { id: 7,  name: "Trekking Poles Set", brand: "StableStep", category: "gear",
        price: 1619.82, originalPrice: null, rating: 4.7,
        description: "Adjustable carbon fiber trekking poles with ergonomic grips and shock absorption. Reduces strain on knees and improves stability.",
        image: "../images/trekkingpoles.jpg",
        features: ["Carbon Fiber","Adjustable","Shock Absorption","Ergonomic"], inStock: true,  dateAdded: "2024-01-25" },

      { id: 8,  name: "Trail Running Shoes", brand: "SpeedTrail", category: "footwear",
        price: 2339.82, originalPrice: 2879.82, rating: 4.4,
        description: "Lightweight trail running shoes with aggressive tread pattern and rock protection. Built for speed on technical terrain.",
        image: "../images/Trail Running Shoes.jpg",
        features: ["Lightweight","Rock Protection","Aggressive Tread","Quick Dry"], inStock: true,  dateAdded: "2024-02-12" },

      { id: 9,  name: "Hydration Backpack", brand: "HydroFlow", category: "gear",
        price: 2159.82, originalPrice: null, rating: 4.5,
        description: "25L hydration pack with 3L reservoir, multiple compartments, and breathable back panel. Perfect for day hikes and trail running.",
        image: "../images/hydrationbackpack.jpg",
        features: ["3L Reservoir","25L Capacity","Breathable","Multiple Pockets"], inStock: true,  dateAdded: "2024-01-18" },

      { id: 10, name: "Camping Headlamp", brand: "BrightBeam", category: "accessories",
        price: 899.82, originalPrice: 1169.82, rating: 4.6,
        description: "High-powered LED headlamp with multiple brightness settings, red light mode, and waterproof design. Essential for night hiking.",
        image: "../images/headlamp.jpg",
        features: ["LED Light","Multiple Modes","Waterproof","Long Battery"], inStock: true, dateAdded: "2024-02-08" },

      { id: 11, name: "Mountaineering Boots", brand: "AlpinePro", category: "footwear",
        price: 1200, originalPrice: 799.99, rating: 4.7,
        description: "Heavy-duty mountaineering boots designed for extreme alpine conditions. Featuring rigid construction, crampon compatibility, and superior insulation for high-altitude adventures.",
        image: "../images/Mountaineering Boots.jpeg",
        features: ["Crampon Compatible","Insulated","Rigid Construction","Alpine Ready"], inStock: true, dateAdded: "2024-01-10" },

      { id: 12, name: "Lightweight Hiking Sandals", brand: "ComfortWalk", category: "footwear",
        price: 1299.82, originalPrice: null, rating: 4.2,
        description: "Ultra-lightweight hiking sandals with superior comfort and excellent grip. Perfect for warm weather adventures, river crossings, and casual trail walking.",
        image: "../images/Lightweight Hiking Sandals.jpeg",
        features: ["Lightweight","Quick Dry","Adjustable Straps","Excellent Grip"], inStock: true, dateAdded: "2024-02-15" },

      { id: 13, name: "Winter Hiking Boots", brand: "WinterTrek", category: "footwear",
        price: 3599.82, originalPrice: 4319.82, rating: 4.5,
        description: "Insulated winter hiking boots designed for extreme cold weather conditions. Features waterproof construction, thermal insulation, and aggressive tread for snow and ice traction.",
        image: "../images/Winter Hiking Boots.jpeg",
        features: ["Thermal Insulation","Waterproof","Ice Traction","Cold Weather"], inStock: false, dateAdded: "2024-01-05" },


      { id: 15, name: "Hiking Cap", brand: "SunGuard", category: "accessories",
        price: 479.82, originalPrice: null, rating: 4.3,
        description: "UV protection hiking cap with moisture-wicking band and adjustable chin strap. Keeps you cool and protected.",
        image: "../images/hikingCap3.jpg",
        features: ["UV Protection","Moisture Wicking","Adjustable","Lightweight"], inStock: true, dateAdded: "2024-01-28" },

      { id: 16, name: "Portable Camping Stove", brand: "FlameMax", category: "gear",
        price: 1799.82, originalPrice: 2159.82, rating: 4.6,
        description: "Lightweight portable stove with wind shield and efficient fuel consumption. Perfect for backcountry cooking.",
        image: "../images/stove.jpg",
        features: ["Lightweight","Wind Resistant","Fuel Efficient","Compact"], inStock: true, dateAdded: "2024-01-12" },

      { id: 17, name: "Sleeping Bag", brand: "NightRest", category: "gear",
        price: 2879.82, originalPrice: 3599.82, rating: 4.5,
        description: "3-season sleeping bag with down insulation and compression sack. Rated for temperatures down to -5°C.",
        image: "../images/sleepingbag.jpg",
        features: ["Down Insulation","3-Season","Compression Sack","Lightweight"], inStock: true, dateAdded: "2024-02-20" },

      { id: 20, name: "Rain Poncho", brand: "StormShield", category: "clothing",
        price: 899.82, originalPrice: 1169.82, rating: 4.1,
        description: "Lightweight rain poncho with hood and snap closures. Packs small and provides excellent rain protection.",
        image: "../images/raincoat.jpg",
        features: ["Waterproof","Lightweight","Packable","Hood"], inStock: false, dateAdded: "2024-01-08" },

      { id: 21, name: "Emergency Whistle", brand: "SafeSound", category: "safety",
        price: 179.82, originalPrice: null, rating: 4.5,
        description: "High-decibel emergency whistle with lanyard. Essential safety item for solo hikers and emergency situations.",
        image: "../images/whistle.png",
        features: ["High Decibel","Lightweight","Lanyard Included","Weather Resistant"], inStock: true, dateAdded: "2024-02-12" },

      { id: 22, name: "First Aid Kit", brand: "MedTrail", category: "safety",
        price: 719.82, originalPrice: 899.82, rating: 4.7,
        description: "Comprehensive first aid kit with bandages, antiseptic, and emergency medications. Compact and trail-ready.",
        image: "../images/firstaidkit.png",
        features: ["Comprehensive","Compact","Trail Ready","Emergency Meds"], inStock: true, dateAdded: "2024-01-15" },

      { id: 23, name: "Emergency Beacon", brand: "RescueLink", category: "safety",
        price: 5399.82, originalPrice: null, rating: 4.8,
        description: "Satellite emergency beacon with GPS tracking and SOS messaging. Critical safety device for remote adventures.",
        image: "../images/beacon.jpg",
        features: ["Satellite","GPS Tracking","SOS Messaging","Long Battery"], inStock: true, dateAdded: "2024-01-30" },

      { id: 24, name: "Reflective Safety Vest", brand: "VisibleTrek", category: "safety",
        price: 359.82, originalPrice: 479.82, rating: 4.2,
        description: "High-visibility reflective vest for early morning or late evening hikes. Lightweight and adjustable.",
        image: "../images/vest.png",
        features: ["High Visibility","Reflective","Lightweight","Adjustable"], inStock: true, dateAdded: "2024-02-05" },

      { id: 25, name: "Water Purification Tablets", brand: "PureH2O", category: "safety",
        price: 299.82, originalPrice: null, rating: 4.4,
        description: "Emergency water purification tablets for treating questionable water sources. Essential for backcountry safety.",
        image: "../images/waterPure.jpg",
        features: ["Water Purification","Emergency Use","Lightweight","Long Shelf Life"], inStock: true, dateAdded: "2024-01-18" }
    ];

    // Your richer Gear/Safety overrides (images + reviews)
    const PRODUCT_OVERRIDES = {
      3:  { image: "../images/backge.jpg", images: ["../images/backge.jpg"],
            description: "Compact, trail-ready kit: 3-season sleeping system, cook set, repair essentials and packing cubes—optimized for low weight and fast setup.",
            features: ["Complete Set","Lightweight","Compact","Weather Resistant","Quick Setup","Trail-Ready"],
            reviews: [
              { user: "Sibusiso N.", rating: 5, date: "2025-06-01", title: "Great starter kit", text: "Had everything I needed for an overnight in Cederberg." },
              { user: "Nandi K.",    rating: 4, date: "2025-04-17", title: "Well thought out",  text: "Smart selection—added my own mug and was set." }
            ] },
      5:  { image: "../images/gps.jpg", images: ["../images/gps.jpg","../images/gps1.jpg"],
            description: "Handheld GPS with topo maps, multi-GNSS support, weather alerts and breadcrumb track-back—built for off-grid navigation.",
            features: ["Multi-GNSS","Topo Maps","Weather Alerts","Track-Back","IPX7 Waterproof","Long Battery"],
            reviews: [
              { user: "Daniel R.", rating: 4, date: "2025-06-15", title: "Reliable lock", text: "Kept signal under canopy. Interface is basic but fine." },
              { user: "Palesa S.", rating: 5, date: "2025-03-22", title: "Saved my route", text: "Track-back worked perfectly after a wrong turn." }
            ] },
      7:  { image: "../images/trekkingpoles.jpg", images: ["../images/trekkingpoles.jpg","../images/trekkingpoles1.jpg","../images/trekkingpoles2.jpg"],
            description: "Carbon fiber trekking poles with quick-lock length adjust, ergonomic cork grips and carbide tips for confident traction on steep terrain.",
            features: ["Carbon Fiber","Quick-Lock Adjust","Cork Grips","Carbide Tips","Shock Absorption","Adjustable Straps"],
            reviews: [
              { user: "Thandi P.", rating: 5, date: "2025-05-20", title: "Knees say thanks", text: "Massive difference on Table Mountain descents." },
              { user: "Musa R.",   rating: 4, date: "2025-03-03", title: "Light but sturdy",   text: "Locks hold firm; tips bite well on rock." }
            ] },
      9:  { image: "../images/hydrationbackpack.jpg", images: ["../images/hydrationbackpack.jpg","../images/backwater1.jpg","../images/backwater2.jpg"],
            description: "2 L daypack, ventilated back panel, hose clip and stretch pockets—balanced carry for long day hikes.",
            features: ["2L Reservoir","Ventilated Back Panel","Hose Clip","Stretch Pockets","Chest & Hip Straps","Lightweight"],
            reviews: [
              { user: "Aisha K.", rating: 4, date: "2025-04-10", title: "Comfy carry", text: "Breathes well; hip pockets could be larger." },
              { user: "Sipho Z.", rating: 5, date: "2025-02-25", title: "Great value", text: "Perfect for Magalies day hikes. No sloshing." }
            ] },
      16: { image: "../images/stove.jpg", images: ["../images/stove1.jpg","../images/stove.jpg"],
            description: "Ultralight canister stove with wind-shielded burner and fast boil performance; packs small with fold-out pot supports for stability.",
            features: ["Ultralight","Wind Shielded Burner","Fast Boil","Compact Fold","Stable Supports","Fuel Efficient"],
            reviews: [
              { user: "Lerato P.", rating: 5, date: "2025-03-12", title: "Boils fast", text: "Wind didn’t faze it. Coffee in minutes." },
              { user: "Kyle D.",   rating: 4, date: "2025-01-29", title: "Tiny & tough", text: "Packs into my pot; great simmer control." }
            ] },
      17: { image: "../images/sleepingbag.jpg", images: ["../images/sleepingbag.jpg","../images/sleepingbag1.jpg","../images/sleepingbag2.jpg"],
            description: "3-season mummy bag with down insulation, draft collar and DWR shell—warmth, low bulk and reliable comfort around −5 °C.",
            features: ["Down Insulation","Draft Collar","DWR Shell","3-Season","Compression Sack","Lightweight"],
            reviews: [
              { user: "Nomsa D.", rating: 5, date: "2025-07-01", title: "Warm & compact", text: "No cold spots in Drakensberg. Packs small." },
              { user: "Craig J.", rating: 4, date: "2025-05-09", title: "Good at −2°C",    text: "Comfortable sleep with a liner. Zips smoothly." }
            ] },
      21: { image: "../images/whistle.png", images: ["../images/whistle.png","../images/whistle2.png"],
            description: "High-output emergency whistle with lanyard; lightweight, durable and audible over wind and river noise.",
            features: ["120 dB Output","Lightweight","Durable","Weather Resistant","Lanyard Included"],
            reviews: [
              { user: "Zanele S.", rating: 5, date: "2025-05-11", title: "Loud!",         text: "Cuts through wind. Easy to clip onto sternum strap." },
              { user: "Pieter L.", rating: 4, date: "2025-02-08", title: "Simple & tough", text: "No moving parts—exactly what I want for safety." }
            ] },
      22: { image: "../images/firstaidkit.png", images: ["../images/firstaidkit.png","../images/first1.jpg"],
            description: "Trail-focused first aid kit in a water-resistant pouch: bandages, antiseptic wipes, blister care, tape and mini shears.",
            features: ["Comprehensive","Water-Resistant Pouch","Blister Care","Mini Shears","Compact"],
            reviews: [
              { user: "Aviwe T.", rating: 4, date: "2025-04-03", title: "Well organized", text: "Great selection; I added extra tape and meds." },
              { user: "Lungi M.", rating: 5, date: "2025-01-19", title: "Trail essential", text: "Used the blister kit—worked brilliantly." }
            ] },
      23: { image: "../images/beacon.jpg", images: ["../images/beacon.jpg","../images/beacon1.jpg","../images/beacon2.jpg"],
            description: "Satellite SOS beacon with one-touch emergency alert and location sharing—designed for remote backcountry trips.",
            features: ["Satellite SOS","GPS Tracking","Location Share","IP67 Waterproof","Long Battery"],
            reviews: [
              { user: "Leroy N.",  rating: 5, date: "2025-05-28", title: "Peace of mind", text: "Setup was easy; tracking breadcrumb is neat." },
              { user: "Nomonde H.", rating: 4, date: "2025-02-14", title: "Solid build",    text: "Compact and tough. App could be smoother." }
            ] },
      24: { image: "../images/vest.png", images: ["../images/vest.png","../images/vest1.jpg"],
            description: "High-visibility mesh vest with 360° reflective strips and adjustable sides—packs flat for early/late starts.",
            features: ["360° Reflective","Mesh Fabric","Adjustable Sides","Packs Flat","Lightweight"],
            reviews: [
              { user: "Aisha K.", rating: 4, date: "2025-02-19", title: "Does the job", text: "Very visible at dawn; comfy over a jacket." },
              { user: "Tumi B.",  rating: 5, date: "2025-01-05", title: "Light & bright", text: "Lives in my pack now—no bulk at all." }
            ] },
      25: { image: "../images/waterPure.jpg",
            description: "Compact chlorine-dioxide tablets for emergency water treatment; simple, packable and reliable for backcountry use.",
            features: ["Chlorine Dioxide","Emergency Use","Lightweight","Long Shelf Life","Simple to Use"],
            reviews: [
              { user: "Pieter L.", rating: 5, date: "2025-01-30", title: "Always carry", text: "Backup to my filter—great peace of mind." },
              { user: "Thabo M.",  rating: 4, date: "2024-12-12", title: "Tastes fine",   text: "Minimal aftertaste; instructions are clear." }
            ] },
      6:  { image: "../images/hikingjacket.jpg", images: ["../images/hikingjacket.jpg"],
            description: "Ultralight packable jacket with advanced DWR coating and windproof membrane. Perfect for unpredictable mountain weather with exceptional breathability and comfort.",
            features: ["Ultralight Design","DWR Water Resistant","Windproof Membrane","Packable","Breathable Fabric","Adjustable Hood","Elastic Cuffs"],
            specifications: {
              "Weight": "180g (Size M)",
              "Material": "20D Ripstop Nylon",
              "Water Resistance": "DWR Coating + Windproof Membrane",
              "Packability": "Packs into own pocket",
              "Sizes": "XS, S, M, L, XL, XXL",
              "Care": "Machine wash cold, air dry"
            },
            reviews: [
              { user: "Sarah M.", rating: 5, date: "2025-06-15", title: "Amazing packability", text: "This jacket is incredible! Weighs almost nothing and packs down to the size of an apple. Kept me dry and comfortable during a sudden thunderstorm on Table Mountain." },
              { user: "Mike R.", rating: 4, date: "2025-05-22", title: "Great for layering", text: "Perfect outer layer. Breathes well during uphill climbs and blocks wind effectively. Only wish the pockets were a bit larger." },
              { user: "Nomsa K.", rating: 5, date: "2025-04-18", title: "Ultralight champion", text: "Best hiking jacket I've owned. The DWR coating works brilliantly - water just beads off. Essential for any serious hiker." }
            ] },
      20: { image: "../images/raincoat.jpg", images: ["../images/raincoat.jpg"],
            description: "Durable rain poncho with adjustable hood and snap closures. Provides excellent coverage and protection from heavy rain while maintaining breathability for active use.",
            features: ["Waterproof Construction","Adjustable Hood","Snap Closures","Breathable Fabric","Reinforced Seams","Lightweight","Compact Storage"],
            specifications: {
              "Weight": "320g",
              "Material": "Ripstop Polyester with PU Coating",
              "Water Resistance": "5000mm waterproof rating",
              "Size": "One size fits most",
              "Coverage": "Full torso and thigh protection",
              "Storage": "Compact stuff sack included"
            },
            reviews: [
              { user: "James T.", rating: 4, date: "2025-07-02", title: "Great emergency gear", text: "Saved me during an unexpected downpour in Cederberg. Easy to put on quickly and covers my backpack too. Quality construction." },
              { user: "Lisa P.", rating: 4, date: "2025-05-30", title: "Reliable protection", text: "Keeps me completely dry even in heavy rain. The hood adjustment is excellent. Only downside is it can get a bit warm during intense activity." },
              { user: "David L.", rating: 5, date: "2025-04-25", title: "Perfect for hiking", text: "Lightweight but incredibly durable. The snap closures are secure and the cut allows good mobility while hiking. Essential gear!" }
            ] },
      10: { image: "../images/headlamp.jpg", images: ["../images/headlamp.jpg"],
            description: "Professional-grade LED headlamp with multiple brightness settings, red light mode, and waterproof construction. Features hands-free operation with gesture control and ultra-long battery life for extended adventures.",
            features: ["High-Power LED","Multiple Brightness Settings","Red Light Mode","Waterproof IPX7","Gesture Control","Rechargeable Battery","Adjustable Headband","Lightweight Design"],
            specifications: {
              "Brightness": "800 lumens maximum output",
              "Battery Life": "120 hours on low setting",
              "Charging": "USB-C rechargeable",
              "Weight": "85g with battery",
              "Water Rating": "IPX7 waterproof",
              "Beam Distance": "150 meters",
              "Modes": "High, Medium, Low, Red, Strobe"
            },
            reviews: [
              { user: "Marcus K.", rating: 5, date: "2025-06-20", title: "Incredibly bright", text: "This headlamp is amazing! The 800 lumens is more than enough for night hiking. The gesture control works perfectly and the battery lasts forever. Best headlamp I've owned." },
              { user: "Rachel S.", rating: 5, date: "2025-05-15", title: "Perfect for camping", text: "Love the red light mode for preserving night vision. Super comfortable to wear for hours. The waterproofing has been tested in heavy rain - works perfectly!" },
              { user: "Tom W.", rating: 4, date: "2025-04-28", title: "Great features", text: "Excellent headlamp with impressive battery life. The gesture control is a game-changer when your hands are full. Only minor complaint is the headband could be slightly more padded." }
            ] },
      15: { image: "../images/hikingCap3.jpg", images: ["../images/hikingCap3.jpg"],
            description: "Professional hiking cap with UPF 50+ sun protection, moisture-wicking sweatband, and quick-dry fabric. Features adjustable chin strap and ventilation panels for maximum comfort during long outdoor adventures.",
            features: ["UPF 50+ Sun Protection","Moisture-Wicking Sweatband","Quick-Dry Fabric","Adjustable Chin Strap","Ventilation Panels","Lightweight Construction","Packable Design","Reflective Details"],
            specifications: {
              "Material": "Polyester blend with UPF coating",
              "Weight": "65g",
              "Sun Protection": "UPF 50+ rating",
              "Sizes": "One size fits most (adjustable)",
              "Brim Width": "7.5cm all around",
              "Care": "Machine wash cold, air dry",
              "Special Features": "Crushable and packable"
            },
            reviews: [
              { user: "Anna M.", rating: 5, date: "2025-06-25", title: "Perfect sun protection", text: "This cap is fantastic! The UPF 50+ protection really works - no sunburn on my face or neck during a full day hike in the Karoo." },
              { user: "Peter J.", rating: 4, date: "2025-05-18", title: "Comfortable and practical", text: "Really comfortable cap with excellent ventilation. The moisture-wicking band works great during sweaty climbs. Packable design is perfect for travel. Highly recommended." },
              { user: "Sue L.", rating: 5, date: "2025-04-12", title: "Great hiking essential", text: "Love this cap! Lightweight but provides excellent coverage. The quick-dry fabric is amazing - dries in minutes after getting wet. Perfect for multi-day hikes." }
            ] }
    };

    function applyProductOverrides(list) {
      return list.map(p => {
        const hasOverride = p.category === 'gear' || p.category === 'safety' || p.category === 'clothing' || p.category === 'accessories';
        return (hasOverride && PRODUCT_OVERRIDES[p.id]) ? { ...p, ...PRODUCT_OVERRIDES[p.id] } : p;
      });
    }

    window.ProductData = {
      products: PRODUCTS,
      overrides: PRODUCT_OVERRIDES,
      getProducts: () => applyProductOverrides(PRODUCTS)
    };
  })();
}

// Helper accessor
const getProducts = () => window.ProductData.getProducts();

/* =========================================================
   PRODUCT PAGE LOGIC
   ========================================================= */
let currentProduct = null;
let quantity = 1;
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

/* ---------- Navbar scroll effect function ---------- */
function initNavbarScroll() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const navbar = document.getElementById('navbar');
        
        if (scrolled > 100) {
            navbar.style.background = 'rgba(44, 62, 80, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(44, 62, 80, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'), 10);

  if (productId) {
    loadProduct(productId);
  } else {
    const def = getProducts().find(p => p.category === 'accessories');
    if (def) loadProduct(def.id);
  }

  updateFavoritesCount();
  setupEventListeners();
  initNavbarScroll(); // Add navbar scroll effect
});

function loadProduct(productId) {
  const list = getProducts();
  currentProduct = list.find(p => p.id === productId);
  if (!currentProduct) { console.error('Product not found'); return; }

  updateProductDisplay();
  generateRelatedProducts();
  updateURL(productId);
}

function updateProductDisplay() {
  if (!currentProduct) return;

  // Breadcrumb + header
  document.getElementById('breadcrumbCategory').textContent = capitalizeFirst(currentProduct.category);
  document.getElementById('breadcrumbProduct').textContent = currentProduct.name;

  document.getElementById('productBrand').textContent = currentProduct.brand.toUpperCase();
  document.getElementById('productName').textContent = currentProduct.name;
  document.title = `TrailBlazer - ${currentProduct.name}`;

  // Rating
  updateRatingDisplay(currentProduct.rating);
  document.getElementById('ratingScore').textContent = currentProduct.rating;

  // Pricing
  updatePricingDisplay();

  // Stock
  updateStockStatus();

  // Images
  document.getElementById('mainProductImage').src = currentProduct.image;
  document.getElementById('mainProductImage').alt = currentProduct.name;

  // Description + features
  document.getElementById('productDescription').textContent = currentProduct.description;
  updateFeaturesDisplay();

  // Gallery + reviews
  updateGalleryDisplay();
  updateReviewsDisplay();

  // Wishlist state
  updateWishlistButton();
}

function updateRatingDisplay(rating) {
  const starsContainer = document.getElementById('productRating');
  const full = Math.floor(rating);
  const hasHalf = (rating % 1) >= 0.5;
  let out = '';
  for (let i = 0; i < full; i++) out += '★';
  if (hasHalf) out += '☆'; // visual stand-in (no real half-star glyph)
  for (let i = full + (hasHalf ? 1 : 0); i < 5; i++) out += '☆';
  starsContainer.innerHTML = out;
}

function updatePricingDisplay() {
  document.getElementById('productPrice').textContent = currentProduct.price.toFixed(2);
  const oc = document.getElementById('originalPriceContainer');
  if (currentProduct.originalPrice) {
    document.getElementById('originalPrice').textContent = currentProduct.originalPrice.toFixed(2);
    oc.style.display = 'flex';
  } else {
    oc.style.display = 'none';
  }
}

function updateStockStatus() {
  const stockIndicator = document.getElementById('stockIndicator');
  const btn = document.querySelector('.add-to-cart-btn');
  if (currentProduct.inStock) {
    stockIndicator.className = 'stock-indicator in-stock';
    stockIndicator.innerHTML = '<span class="status-icon">✓</span><span class="status-text">In stock</span>';
    btn.disabled = false;
  } else {
    stockIndicator.className = 'stock-indicator out-of-stock';
    stockIndicator.innerHTML = '<span class="status-icon">✗</span><span class="status-text">OUT OF STOCK</span>';
    btn.disabled = true;
  }
}

function updateFeaturesDisplay() {
  const box = document.getElementById('productFeatures');
  box.innerHTML = '';
  currentProduct.features.forEach(f => {
    const el = document.createElement('div');
    el.className = 'feature-item';
    el.innerHTML = `<span class="feature-text">${f}</span>`;
    box.appendChild(el);
  });
}

/* ---------- Footwear specs (from her version) ---------- */
const footwearSpecs = {
  1: { // Women's Hiking Boots
    "Material": "Full-grain leather and synthetic mesh",
    "Weight": "620g per pair (size 7)",
    "Sizes Available": "5, 6, 7, 8, 9, 10, 11",
    "Sole": "Vibram® Megagrip outsole",
    "Waterproofing": "GORE-TEX® membrane",
    "Care Instructions": "Clean with brush, air dry, condition leather"
  },
  8: { // Trail Running Shoes
    "Material": "Mesh upper with synthetic overlays",
    "Weight": "280g per pair (size 7)",
    "Sizes Available": "5, 6, 7, 8, 9, 10, 11, 12",
    "Sole": "Aggressive lug outsole",
    "Drop": "4mm heel-to-toe drop",
    "Care Instructions": "Machine wash cold, air dry"
  },
  11: { // Mountaineering Boots
    "Material": "Full leather upper with insulation",
    "Weight": "950g per pair (size 7)",
    "Sizes Available": "6, 7, 8, 9, 10, 11, 12",
    "Sole": "Rigid mountaineering sole",
    "Insulation": "Primaloft® synthetic insulation",
    "Temperature Rating": "-40°C to -10°C",
    "Crampon Compatibility": "C2 (semi-automatic) and C3 (automatic)",
    "Care Instructions": "Clean with brush, air dry, waterproof regularly"
  },
  12: { // Lightweight Hiking Sandals
    "Material": "Synthetic webbing and EVA footbed",
    "Weight": "195g per pair (size 7)",
    "Sizes Available": "5, 6, 7, 8, 9, 10, 11, 12",
    "Sole": "Non-marking rubber outsole",
    "Footbed": "Contoured EVA with arch support",
    "Straps": "Adjustable heel and toe straps",
    "Water Rating": "Quick-dry, suitable for water activities",
    "Care Instructions": "Rinse with water, air dry"
  },
  13: { // Winter Hiking Boots
    "Material": "Waterproof leather with insulated lining",
    "Weight": "780g per pair (size 7)",
    "Sizes Available": "6, 7, 8, 9, 10, 11, 12",
    "Sole": "Deep-lug outsole with ice traction",
    "Insulation": "400g Thinsulate™ insulation",
    "Temperature Rating": "-25°C to 5°C",
    "Waterproofing": "Sealed seam waterproof construction",
    "Height": "7-inch ankle support",
    "Care Instructions": "Clean with damp cloth, air dry, apply waterproofing treatment"
  }
};

function updateSpecificationsDisplay() {
  const table = document.querySelector('.specs-table');
  if (!table) return;
  const specs = footwearSpecs[currentProduct.id];
  if (specs) {
    table.innerHTML = '';
    Object.entries(specs).forEach(([k, v]) => {
      const row = document.createElement('tr');
      row.innerHTML = `<td>${k}</td><td>${v}</td>`;
      table.appendChild(row);
    });
  } else {
    // leave as-is for non-footwear (or clear if you prefer)
    // table.innerHTML = '';
  }
}

/* ---------- Reviews (prefers your dynamic reviews; falls back to footwear sets) ---------- */
const footwearReviews = {
  1: { rating: 4.5, count: 245, reviews: [
        { name: "Jennifer L.", stars: "★★★★★", date: "1 week ago",
          text: "Amazing boots! Completely waterproof and incredibly comfortable even on long hikes. The ankle support is excellent and they have great traction on rocky terrain." },
        { name: "Maria K.", stars: "★★★★☆", date: "2 weeks ago",
          text: "Great quality boots, very durable. Took a few hikes to break them in but now they're perfect. Worth the investment for serious hikers." }
      ] },
  8: { rating: 4.4, count: 189, reviews: [
        { name: "Alex R.", stars: "★★★★★", date: "3 days ago",
          text: "Perfect for trail running! Lightweight yet protective. The grip on technical terrain is outstanding and they drain water quickly." },
        { name: "Emily S.", stars: "★★★★☆", date: "1 week ago",
          text: "Great shoes for fast hiking and trail running. Very comfortable and the rock protection works well. Sizing runs a bit small." }
      ] },
  11: { rating: 4.7, count: 156, reviews: [
        { name: "Mark T.", stars: "★★★★★", date: "2 weeks ago",
          text: "Exceptional boots for serious mountaineering. Used them on a winter ascent and they kept my feet warm and dry in -30°C. Crampon attachment is secure and reliable." },
        { name: "Sarah W.", stars: "★★★★★", date: "1 month ago",
          text: "These boots are built like tanks! Heavy but incredibly durable. Perfect for alpine climbing and glacier travel. The insulation is top-notch." }
      ] },
  12: { rating: 4.2, count: 127, reviews: [
        { name: "Lisa M.", stars: "★★★★☆", date: "5 days ago",
          text: "Perfect for summer hiking! Super comfortable and they dry incredibly fast after river crossings. Great grip on wet rocks. Sizing is accurate." },
        { name: "David R.", stars: "★★★★★", date: "2 weeks ago",
          text: "Love these sandals! So lightweight I barely notice them. Perfect for warm weather hikes and beach walks. The adjustable straps ensure a perfect fit." }
      ] },
  13: { rating: 4.5, count: 203, reviews: [
        { name: "Michael S.", stars: "★★★★★", date: "1 week ago",
          text: "Outstanding winter boots! Kept my feet warm and dry during a -20°C winter hike. The ice traction is phenomenal and they're surprisingly comfortable for long distances." },
        { name: "Karen J.", stars: "★★★★☆", date: "3 weeks ago",
          text: "Great boots for winter hiking. Very warm and completely waterproof. They run a bit large, so size down half a size. Worth the investment for serious winter adventurers." }
      ] }
};

function updateReviewsDisplay() {
  const list = document.getElementById('reviewsList');
  const bigRating = document.querySelector('.big-rating');
  const reviewCount = document.querySelector('.review-count');
  const starsDisplay = document.querySelector('.overall-rating .stars');

  if (!list) return;

  // Prefer product.reviews (from your overrides). If none, fall back to her footwear sets.
  if (Array.isArray(currentProduct.reviews) && currentProduct.reviews.length) {
    // Overall numbers (simple average & count)
    const avg = (currentProduct.reviews.reduce((s, r) => s + (r.rating || 0), 0) / currentProduct.reviews.length) || currentProduct.rating;
    if (bigRating) bigRating.textContent = avg.toFixed(1);
    if (reviewCount) reviewCount.textContent = `Based on ${currentProduct.reviews.length} reviews`;
    if (starsDisplay) starsDisplay.innerHTML = '★'.repeat(Math.round(avg)) + '☆'.repeat(5 - Math.round(avg));

    list.innerHTML = currentProduct.reviews.map(r => `
      <div class="review">
        <div class="review-header">
          <strong>${r.title || 'Review'}</strong>
          <span class="review-rating">${'★'.repeat(r.rating || 0)}${'☆'.repeat(5 - (r.rating || 0))}</span>
        </div>
        <div class="review-meta">${r.user || 'Customer'} • ${r.date || ''}</div>
        <p class="review-text">${r.text || ''}</p>
      </div>`).join('');
    return;
  }

  // Footwear fallback
  const fr = footwearReviews[currentProduct.id];
  if (fr) {
    if (bigRating) bigRating.textContent = fr.rating;
    if (reviewCount) reviewCount.textContent = `Based on ${fr.count} reviews`;

    if (starsDisplay) {
      const full = Math.floor(fr.rating);
      const half = (fr.rating % 1) >= 0.5;
      let s = '';
      for (let i = 0; i < full; i++) s += '★';
      if (half) s += '☆';
      for (let i = full + (half ? 1 : 0); i < 5; i++) s += '☆';
      starsDisplay.innerHTML = s;
    }

    list.innerHTML = '';
    fr.reviews.forEach(r => {
      const item = document.createElement('div');
      item.className = 'review-item';
      item.innerHTML = `
        <div class="review-header">
          <span class="reviewer-name">${r.name}</span>
          <div class="review-stars">${r.stars}</div>
          <span class="review-date">${r.date}</span>
        </div>
        <p class="review-text">"${r.text}"</p>`;
      list.appendChild(item);
    });
  } else {
    list.innerHTML = `<p class="no-reviews">No reviews yet.</p>`;
  }
}

/* ---------- Gallery (your dynamic thumbs + her hide rule) ---------- */
function isFootwearWithHiddenThumbs(id) {
  // Her rule: hide thumbnails for these footwear products
  return [1, 8, 11, 12, 13].includes(id);
}

function updateGalleryDisplay() {
  const thumbsEl = document.getElementById('productThumbnails'); // must exist in HTML
  if (!thumbsEl) return;

  const images = Array.isArray(currentProduct.images) && currentProduct.images.length
    ? currentProduct.images
    : [currentProduct.image];

  // If footwear that should hide thumbs OR only one image → hide the strip
  if (isFootwearWithHiddenThumbs(currentProduct.id) || images.length <= 1) {
    thumbsEl.style.display = 'none';
  } else {
    thumbsEl.style.display = 'flex';
    thumbsEl.innerHTML = '';
    images.forEach((src, i) => {
      const item = document.createElement('div');
      item.className = 'thumbnail' + (i === 0 ? ' active' : '');
      item.innerHTML = `<img src="${src}" alt="${currentProduct.name} thumbnail">`;
      item.onclick = () => changeMainImage(src, item);
      thumbsEl.appendChild(item);
    });
  }

  // Ensure main image matches current first image
  document.getElementById('mainProductImage').src = images[0];
}

function setupEventListeners() {
  document.getElementById('mainProductImage').addEventListener('click', openZoomModal);
  const qty = document.getElementById('quantity');
  if (qty) {
    qty.addEventListener('change', function () {
      const v = parseInt(this.value, 10);
      if (v < 1) this.value = 1;
      if (v > 10) this.value = 10;
      quantity = parseInt(this.value, 10);
    });
  }
}

function changeMainImage(src, el) {
  document.getElementById('mainProductImage').src = src;
  document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
  if (el) el.classList.add('active');
}

function changeQuantity(d) {
  const input = document.getElementById('quantity');
  let q = parseInt(input.value, 10) + d;
  if (q < 1) q = 1;
  if (q > 10) q = 10;
  input.value = q;
  quantity = q;
}

function addToCart() {
  if (!currentProduct || !currentProduct.inStock) return;
  
  const product = {
    id: currentProduct.id,
    title: currentProduct.name,
    brand: currentProduct.brand,
    price: currentProduct.price,
    image: currentProduct.image,
    descriptor: currentProduct.description || '',
    link: location.href,
    availability: 'in_stock',
    availabilityDate: new Date().toISOString()
  };
  
  Cart.add(product, quantity);
  showNotification(currentProduct.name);
}

function showNotification(productName) {
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');
  
  if (notification && notificationText) {
    // Update notification text with product name
    notificationText.textContent = `"${productName}" has been added to your cart successfully.`;
    
    // Show notification
    notification.style.display = 'block';
    notification.classList.remove('hiding');
    
    // Auto-hide after 2 seconds and redirect to cart
    setTimeout(() => {
      hideNotification();
      // Redirect to cart page after notification is hidden
      setTimeout(() => {
        window.location.href = 'Cart.html';
      }, 300); // Wait for animation to complete
    }, 2000);
  }
}

function hideNotification() {
  const notification = document.getElementById('notification');
  if (notification) {
    notification.classList.add('hiding');
    // Hide after animation completes
    setTimeout(() => {
      notification.style.display = 'none';
      notification.classList.remove('hiding');
    }, 300);
  }
}

function showFavoriteNotification(productName, isAdded) {
  const notification = document.getElementById('favoriteNotification');
  const title = document.getElementById('favorite-title');
  const text = document.getElementById('favorite-text');
  
  if (notification && title && text) {
    if (isAdded) {
      title.textContent = 'Added to Favorites!';
      text.textContent = `"${productName}" has been added to your favorites.`;
    } else {
      title.textContent = 'Removed from Favorites';
      text.textContent = `"${productName}" has been removed from your favorites.`;
    }
    
    notification.style.display = 'block';
    notification.classList.remove('hiding');
    
    setTimeout(() => {
      hideFavoriteNotification();
      if (isAdded) {
        window.location.href = 'FavoritesPage.html#products';
      }
    }, 3000);
  }
}

function hideFavoriteNotification() {
  const notification = document.getElementById('favoriteNotification');
  if (notification) {
    notification.classList.add('hiding');
    setTimeout(() => {
      notification.style.display = 'none';
      notification.classList.remove('hiding');
    }, 300);
  }
}

function showAddToCartFeedback() {
  const btn = document.querySelector('.add-to-cart-btn');
  if (!btn) return;
  const original = btn.innerHTML;
  btn.classList.add('added'); btn.innerHTML = 'Added to Cart'; btn.disabled = true;
  setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = original; btn.disabled = false; }, 3000);
}

function toggleWishlist() {
  if (!currentProduct) return;
  const btn = document.querySelector('.wishlist-btn');
  const isIn = wishlist.some(i => i.id === currentProduct.id);
  if (isIn) {
    wishlist = wishlist.filter(i => i.id !== currentProduct.id);
    if (btn) { 
      btn.classList.remove('active'); 
      btn.querySelector('.heart-icon').className = 'heart-icon far fa-heart';
    }
    showFavoriteNotification(currentProduct.name, false);
  } else {
    wishlist.push({ id: currentProduct.id, name: currentProduct.name, price: currentProduct.price, image: currentProduct.image, dateAdded: new Date().toISOString() });
    if (btn) { 
      btn.classList.add('active'); 
      btn.querySelector('.heart-icon').className = 'heart-icon fas fa-heart';
    }
    showFavoriteNotification(currentProduct.name, true);
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateFavoritesCount();
}

function updateWishlistButton() {
  const btn = document.querySelector('.wishlist-btn');
  const isIn = wishlist.some(i => i.id === currentProduct.id);
  if (!btn) return;
  if (isIn) { 
    btn.classList.add('active'); 
    btn.querySelector('.heart-icon').className = 'heart-icon fas fa-heart';
  }
  else { 
    btn.classList.remove('active'); 
    btn.querySelector('.heart-icon').className = 'heart-icon far fa-heart';
  }
}


function updateFavoritesCount() {
  const el = document.querySelector('.favorites-count');
  if (!el) return;
  const total = wishlist.length;
  el.textContent = total;
}

function showTab(tabName, el) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-button').forEach(b => b.classList.remove('active'));
  const tgt = document.getElementById(tabName);
  if (tgt) tgt.classList.add('active');
  if (el) el.classList.add('active');
}

function generateRelatedProducts() {
  if (!currentProduct) return;
  const withOverrides = getProducts();
  const related = withOverrides
    .filter(p => p.category === currentProduct.category && p.id !== currentProduct.id)
    .slice(0, 4);
  const container = document.getElementById('relatedProductsGrid');
  if (!container) return;
  container.innerHTML = '';
  related.forEach(product => {
    const card = document.createElement('div');
    card.className = 'related-product-card';
    card.onclick = () => {
      resetPageState();
      loadProduct(product.id);
    };
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="related-product-image">
      <div class="related-product-info">
        <div class="related-product-name">${product.name}</div>
        <div class="related-product-price">R${product.price.toFixed(2)}</div>
      </div>`;
    container.appendChild(card);
  });
}

function resetPageState() {
  // Jump to top of page instantly
  window.scrollTo(0, 0);
  
  closeZoomModal();
  
  // Reset quantity selector to 1
  const quantityInput = document.getElementById('quantity');
  if (quantityInput) {
    quantityInput.value = 1;
  }
  
  const sizeButtons = document.querySelectorAll('.size-option');
  sizeButtons.forEach(btn => btn.classList.remove('selected'));
  
  const colorButtons = document.querySelectorAll('.color-option');
  colorButtons.forEach(btn => btn.classList.remove('selected'));
  
  const reviewContents = document.querySelectorAll('.review-content.expanded');
  reviewContents.forEach(content => content.classList.remove('expanded'));
}

/* ---------- Zoom Modal ---------- */
function openZoomModal() {
  const modal = document.getElementById('imageZoomModal');
  const zoomed = document.getElementById('zoomedImage');
  if (!modal || !zoomed) return;
  zoomed.src = this.src;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeZoomModal() {
  const modal = document.getElementById('imageZoomModal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

/* ---------- URL & navigation ---------- */
function updateURL(productId) {
  const newURL = `${window.location.pathname}?id=${productId}`;
  window.history.replaceState({}, '', newURL);
}
function capitalizeFirst(str) { return str.charAt(0).toUpperCase() + str.slice(1); }
window.addEventListener('popstate', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'), 10);
  if (productId && (!currentProduct || productId !== currentProduct.id)) loadProduct(productId);
});

/* ---------- Helpers used by catalogue (if called) ---------- */
function viewProductDetails(productId) {
  window.location.href = `ProductPage.html?id=${productId}`;
}

/* ---------- Modal background & keyboard ---------- */
document.addEventListener('click', function (event) {
  const modal = document.getElementById('imageZoomModal');
  if (event.target === modal) closeZoomModal();
});
document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') closeZoomModal();
});

document.addEventListener('click',e=>{
  const btn=e.target.closest('[data-add-to-cart]');
  if(!btn)return;
  const qtyEl=document.querySelector('[data-qty]');
  const qty=Math.max(1,parseInt(qtyEl?qtyEl.value:1,10));
  const product={
    id:document.body.dataset.productId,
    title:document.body.dataset.productTitle,
    price:parseFloat(document.body.dataset.productPrice),
    image:document.body.dataset.productImage,
    brand:document.body.dataset.productBrand,
    descriptor:document.body.dataset.productDescriptor||'',
    link:location.href,
    availability:'in_stock',
    availabilityDate:new Date().toISOString()
  };
  Cart.add(product,qty);
});

/* ---------- Breadcrumb Navigation Functions ---------- */
function navigateToHome() {
  window.location.href = 'ProductCatalogue.html';
}

function navigateToCategory() {
  if (!currentProduct) return;
  
  // Create URL with category filter parameter
  const categoryFilter = currentProduct.category.toLowerCase();
  window.location.href = `ProductCatalogue.html?category=${categoryFilter}`;
}
