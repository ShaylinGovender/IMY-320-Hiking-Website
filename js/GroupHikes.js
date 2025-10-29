// Group Hikes JavaScript
class GroupHikesManager {
    constructor() {
        this.groupHikes = [];
        this.filteredHikes = [];
        this.currentFilters = {};
        this.init();
    }

    init() {
        this.loadGroupHikes();
        this.displayGroupHikes();
        this.displayYourHikes();
        this.displayYourGroups();
        this.setupEventListeners();
        this.initCustomDropdowns();
    }

    loadGroupHikes() {
        // Sample group hikes data
        this.groupHikes = [
            {
                id: 1,
                name: "Table Mountain Sunrise Adventure",
                date: "2024-03-15",
                time: "05:30",
                duration: "4-6 hours",
                meetingPoint: "Table Mountain Lower Cable Station Parking",
                organizer: "Sarah M.",
                organizerId: 1,
                difficulty: "challenging",
                maxParticipants: 12,
                currentParticipants: 8,
                location: "Western Cape",
                province: "western-cape",
                description: "Join us for an early morning hike up Table Mountain via Platteklip Gorge. We'll catch the sunrise from the top and enjoy panoramic views of Cape Town. This is a challenging hike requiring good fitness levels.",
                requiredGear: "Hiking boots, headlamp, warm layers, water (2L minimum), snacks, rain jacket",
                participants: [
                    { id: 1, name: "John D.", avatar: "JD" },
                    { id: 2, name: "Lisa K.", avatar: "LK" },
                    { id: 3, name: "Mike T.", avatar: "MT" },
                    { id: 4, name: "Emma R.", avatar: "ER" }
                ]
            },
            {
                id: 2,
                name: "Kirstenbosch Forest Walk",
                date: "2024-03-16",
                time: "09:00",
                duration: "2-4 hours",
                meetingPoint: "Kirstenbosch Botanical Gardens Main Entrance",
                organizer: "Mike T.",
                organizerId: 2,
                difficulty: "easy",
                maxParticipants: 15,
                currentParticipants: 12,
                location: "Western Cape",
                province: "western-cape",
                description: "A gentle family-friendly walk through the beautiful Kirstenbosch Gardens and surrounding forest. Perfect for beginners and families with children. We'll explore the canopy walkway and learn about indigenous plants.",
                requiredGear: "Comfortable walking shoes, sun hat, water bottle, camera",
                participants: [
                    { id: 5, name: "Anna S.", avatar: "AS" },
                    { id: 6, name: "Tom B.", avatar: "TB" },
                    { id: 7, name: "Kate M.", avatar: "KM" }
                ]
            },
            {
                id: 3,
                name: "Drakensberg Amphitheatre Challenge",
                date: "2024-03-22",
                time: "06:00",
                duration: "Full day",
                meetingPoint: "Royal Natal National Park Gate",
                organizer: "Alex P.",
                organizerId: 3,
                difficulty: "challenging",
                maxParticipants: 8,
                currentParticipants: 6,
                location: "KwaZulu-Natal",
                province: "kwazulu-natal",
                description: "Epic full-day adventure to the top of the Drakensberg Amphitheatre. This challenging hike includes chain ladders and spectacular mountain scenery. Only for experienced hikers in excellent physical condition.",
                requiredGear: "Hiking boots, gloves for chain ladders, warm clothing, 3L water, packed lunch, first aid kit",
                participants: [
                    { id: 8, name: "Chris H.", avatar: "CH" },
                    { id: 9, name: "Rachel L.", avatar: "RL" },
                    { id: 10, name: "David W.", avatar: "DW" }
                ]
            },
            {
                id: 4,
                name: "Lion's Head Full Moon Hike",
                date: "2024-03-25",
                time: "18:30",
                duration: "2-4 hours",
                meetingPoint: "Signal Hill Road Parking",
                organizer: "Lisa K.",
                organizerId: 4,
                difficulty: "moderate",
                maxParticipants: 20,
                currentParticipants: 15,
                location: "Western Cape",
                province: "western-cape",
                description: "Experience the magic of Cape Town by moonlight! We'll hike up Lion's Head under the full moon, enjoying stunning views of the city lights and Table Mountain. Headlamps required for safety.",
                requiredGear: "Headlamp with extra batteries, warm jacket, non-slip hiking shoes, water, snacks",
                participants: [
                    { id: 11, name: "Sam R.", avatar: "SR" },
                    { id: 12, name: "Nina P.", avatar: "NP" },
                    { id: 13, name: "Joel K.", avatar: "JK" },
                    { id: 14, name: "Maya L.", avatar: "ML" }
                ]
            },
            {
                id: 5,
                name: "Magaliesberg Weekend Retreat",
                date: "2024-03-30",
                time: "07:00",
                duration: "Full day",
                meetingPoint: "Hartbeespoort Dam Visitor Centre",
                organizer: "James R.",
                organizerId: 5,
                difficulty: "moderate",
                maxParticipants: 10,
                currentParticipants: 7,
                location: "Gauteng",
                province: "gauteng",
                description: "Discover the ancient Magaliesberg mountains with scenic trails, rock formations, and optional adventure activities. Great for intermediate hikers looking for a weekend escape from the city.",
                requiredGear: "Sturdy hiking boots, day pack, 2L water, lunch, sun protection, camera",
                participants: [
                    { id: 15, name: "Ben S.", avatar: "BS" },
                    { id: 16, name: "Chloe T.", avatar: "CT" },
                    { id: 17, name: "Mark D.", avatar: "MD" }
                ]
            },
            {
                id: 6,
                name: "Tsitsikamma Forest Trail",
                date: "2024-04-05",
                time: "08:00",
                duration: "4-6 hours",
                meetingPoint: "Storms River Mouth Rest Camp",
                organizer: "Emma R.",
                organizerId: 6,
                difficulty: "easy",
                maxParticipants: 12,
                currentParticipants: 4,
                location: "Eastern Cape",
                province: "eastern-cape",
                description: "Explore the pristine indigenous forest of Tsitsikamma with beautiful waterfalls and swimming opportunities. Perfect for nature lovers and photographers.",
                requiredGear: "Comfortable hiking shoes, swimwear, towel, waterproof bag, water, snacks",
                participants: [
                    { id: 18, name: "Oliver J.", avatar: "OJ" },
                    { id: 19, name: "Sophie K.", avatar: "SK" }
                ]
            }
        ];

        this.filteredHikes = [...this.groupHikes];
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchHikes(e.target.value);
            });
        }

        // Create hike form submission
        const createHikeForm = document.getElementById('createHikeForm');
        if (createHikeForm) {
            createHikeForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCreateHike();
            });
        }

        // Contact organizer form submission
        const contactForm = document.getElementById('contactOrganizerForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                handleContactForm();
            });
        }
    }

    displayGroupHikes() {
        const hikesContainer = document.getElementById('hikesGrid');
        if (!hikesContainer) return;

        if (this.filteredHikes.length === 0) {
            hikesContainer.innerHTML = '<p>No group hikes match your search criteria.</p>';
            return;
        }

        hikesContainer.innerHTML = this.filteredHikes.map(hike => this.createHikeCard(hike)).join('');
    }

    createHikeCard(hike) {
        const spotsRemaining = hike.maxParticipants - hike.currentParticipants;
        const isAlmostFull = spotsRemaining <= 3;
        const isFull = spotsRemaining <= 0;
        // Determine if the current user already joined this hike
        const joinedHikesLocal = JSON.parse(localStorage.getItem('joinedHikes') || '[]');
        const isJoined = joinedHikesLocal.includes(hike.id);
        
        const participantAvatars = hike.participants.slice(0, 4).map(participant => 
            `<div class="participant-avatar">${participant.avatar}</div>`
        ).join('');

        const moreParticipants = hike.participants.length > 4 ? 
            `<div class="participant-avatar">+${hike.participants.length - 4}</div>` : '';

        return `
            <div class="hike-card" data-id="${hike.id}">
                <div class="hike-header">
                    <div class="hike-title">${hike.name}</div>
                    ${isJoined ? '<div class="joined-badge">Joined</div>' : ''}
                    <div class="hike-date-time">
                        📅 ${this.formatDate(hike.date)} at ${hike.time}
                    </div>
                    <div class="hike-organizer">
                        👤 Organized by ${hike.organizer}
                    </div>
                </div>
                
                <div class="hike-content">
                    <div class="hike-details">
                        <div class="hike-detail">
                            <span>📍</span>
                            <span>${hike.location}</span>
                        </div>
                        <div class="hike-detail">
                            <span>🏃</span>
                            <span>${this.capitalizeFirst(hike.difficulty)}</span>
                        </div>
                        <div class="hike-detail">
                            <span>⏱️</span>
                            <span>${hike.duration}</span>
                        </div>
                        <div class="hike-detail">
                            <span>📍</span>
                            <span>Meeting: ${hike.meetingPoint}</span>
                        </div>
                    </div>
                    
                    <p class="hike-description">${hike.description}</p>
                    
                    <div class="hike-participants">
                        <div class="participants-count">
                            ${hike.currentParticipants}/${hike.maxParticipants} participants
                            ${isFull ? '(FULL)' : isAlmostFull ? '(Almost Full)' : ''}
                        </div>
                        <div class="participants-avatars">
                            ${participantAvatars}
                            ${moreParticipants}
                        </div>
                    </div>
                    
                    <div class="hike-actions">
                        <button class="btn-primary ${isFull || isJoined ? 'disabled' : ''}" 
                                onclick="joinHike(${hike.id})" 
                                ${isFull || isJoined ? 'disabled' : ''}>
                            ${isFull ? 'Full' : isJoined ? 'Joined' : 'Join Hike'}
                        </button>
                        ${isJoined ? `<button class="btn-secondary" onclick="cancelJoin(${hike.id})">Leave</button>` : ''}
                        <button class="btn-secondary" onclick="viewHikeDetails(${hike.id})">
                            Details
                        </button>
                        <button class="btn-secondary" onclick="contactOrganizer(${hike.organizerId})">
                            Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return date.toLocaleDateString('en-US', options);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    searchHikes(searchTerm) {
        if (!searchTerm.trim()) {
            this.filteredHikes = [...this.groupHikes];
        } else {
            this.filteredHikes = this.groupHikes.filter(hike =>
                hike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hike.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hike.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hike.organizer.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        this.displayGroupHikes();
    }

    filterHikes() {
        const difficulty = document.getElementById('difficultyFilter').value;
        const location = document.getElementById('locationFilter').value;

        this.currentFilters = { difficulty, location };

        this.filteredHikes = this.groupHikes.filter(hike => {
            return (!difficulty || hike.difficulty === difficulty) &&
                   (!location || hike.province === location);
        });

        this.displayGroupHikes();
        this.showMessage(`Found ${this.filteredHikes.length} hikes matching your criteria`, 'success');
    }

    getHikeById(id) {
        return this.groupHikes.find(hike => hike.id === parseInt(id));
    }

    handleCreateHike() {
        const form = document.getElementById('createHikeForm');
        const formData = new FormData(form);
        
        // Validate required fields
        const requiredFields = ['hikeName', 'hikeDate', 'hikeTime', 'hikeDuration', 'meetingPoint', 'difficulty', 'maxParticipants', 'hikeDescription'];
        let isValid = true;
        
        for (let field of requiredFields) {
            if (!formData.get(field)) {
                isValid = false;
                this.showMessage(`Please fill in the ${field.replace('hike', '').toLowerCase()} field`, 'error');
                break;
            }
        }

        if (!isValid) return;

        // Validate date (must be in the future)
        const hikeDate = new Date(formData.get('hikeDate'));
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (hikeDate < today) {
            this.showMessage('Hike date must be in the future', 'error');
            return;
        }

        // Create new hike object
        const newHike = {
            id: this.groupHikes.length + 1,
            name: formData.get('hikeName'),
            date: formData.get('hikeDate'),
            time: formData.get('hikeTime'),
            duration: formData.get('hikeDuration'),
            meetingPoint: formData.get('meetingPoint'),
            organizer: 'You', // In a real app, this would be the logged-in user
            organizerId: 999, // Current user ID
            difficulty: formData.get('difficulty'),
            maxParticipants: parseInt(formData.get('maxParticipants')),
            currentParticipants: 1, // Organizer is automatically joined
            location: 'Your Location', // Would be determined from user profile
            province: 'western-cape', // Default or from user location
            description: formData.get('hikeDescription'),
            requiredGear: formData.get('requiredGear') || 'Standard hiking gear',
            participants: [
                { id: 999, name: 'You', avatar: 'YU' }
            ]
        };

        // Add to hikes array
        this.groupHikes.unshift(newHike); // Add to beginning of array
        this.filteredHikes = [...this.groupHikes];
        
        // Update display
        this.displayGroupHikes();
        
        // Add to user's hikes (since you organized it)
        this.addToYourHikes(newHike);
        
        // Close modal and show success
        this.closeCreateHikeModal();
        this.showMessage('Your group hike has been created successfully!', 'success');
        
        // Auto-scroll to Your Hikes section
        setTimeout(() => {
            const yourHikesSection = document.getElementById('yourHikes');
            if (yourHikesSection) {
                yourHikesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, 500);
        
        // Clear form
        form.reset();
    }

    showCreateHikeModal() {
        const modal = document.getElementById('createHikeModal');
        modal.style.display = 'block';
        
        // Set minimum date to today
        const dateInput = document.getElementById('hikeDate');
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    closeCreateHikeModal() {
        document.getElementById('createHikeModal').style.display = 'none';
    }

    showMessage(message, type = 'success') {
        const args = Array.from(arguments);
        const opts = (args[2] && typeof args[2] === 'object') ? args[2] : {};
        const duration = opts.duration || (type === 'success' ? 6000 : 4000);

        const messageEl = document.createElement('div');
        messageEl.className = `alert alert-${type}`;
        messageEl.style.cssText = `
            position: fixed;
            top: 100px;
            left: 50%;
            transform: translateX(-50%);
            padding: 14px 18px;
            border-radius: 10px;
            color: white;
            font-weight: 700;
            z-index: 1100;
            max-width: 360px;
            background: ${type === 'success' ? '#1651a3ff' : type === 'info' ? '#0ea5e9' : '#e11d48'};
            box-shadow: 0 6px 20px rgba(0,0,0,0.12);
            display: flex;
            gap: 12px;
            align-items: center;
        `;

        const textSpan = document.createElement('div');
        textSpan.style.flex = '1';
        textSpan.style.fontSize = '0.95rem';
        textSpan.textContent = message;
        messageEl.appendChild(textSpan);

        // Optional action button (e.g., 'View your hikes')
        if (opts.actionLabel && typeof opts.action === 'function') {
            const actionBtn = document.createElement('button');
            actionBtn.textContent = opts.actionLabel;
            actionBtn.style.cssText = `
                background: rgba(255,255,255,0.12);
                color: white;
                border: none;
                padding: 8px 10px;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 700;
            `;
            actionBtn.onclick = (e) => { e.stopPropagation(); opts.action(); };
            messageEl.appendChild(actionBtn);
        }

        document.body.appendChild(messageEl);

        setTimeout(() => {
            messageEl.classList.add('hiding');
            // small fade out then remove
            setTimeout(() => messageEl.remove(), 300);
        }, duration);
    }

    addToYourHikes(hike) {
        // Get existing joined hikes from localStorage
        const joinedHikes = JSON.parse(localStorage.getItem('joinedHikes') || '[]');
        
        // Add the hike ID if not already there
        if (!joinedHikes.includes(hike.id)) {
            joinedHikes.push(hike.id);
            localStorage.setItem('joinedHikes', JSON.stringify(joinedHikes));
        }
        
        // Update the Your Hikes display
        this.displayYourHikes();
        // Update top-bar joined count
        try { updateJoinedCount(); } catch(e) { /* ignore if not available */ }
    }

    addToYourGroups(hike) {
        // Get existing organized hikes from localStorage
        const organizedHikes = JSON.parse(localStorage.getItem('organizedHikes') || '[]');
        
        // Add the hike ID if not already there
        if (!organizedHikes.includes(hike.id)) {
            organizedHikes.push(hike.id);
            localStorage.setItem('organizedHikes', JSON.stringify(organizedHikes));
        }
        
        // Update the Your Groups display
        this.displayYourGroups();
    }

    displayYourHikes() {
        const container = document.getElementById('yourHikesContainer');
        if (!container) return;

        const joinedHikes = JSON.parse(localStorage.getItem('joinedHikes') || '[]');
        
        if (joinedHikes.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No hikes yet</h3>
                    <p>Join a group hike to see it appear here!</p>
                    <button class="btn-primary" onclick="scrollToUpcoming()">Browse Hikes</button>
                </div>
            `;
            return;
        }

        const hikeCards = joinedHikes.map(hikeId => {
            const hike = this.getHikeById(hikeId);
            if (!hike) return '';

            // Check if user is the organizer
            const isOrganizer = hike.organizerId === 999;
            const roleLabel = isOrganizer ? '👑 Organizer' : 'Participant';
            const roleClass = isOrganizer ? 'organizer' : 'participant';

            return `
                <div class="your-hike-card">
                    <div class="your-card-header">
                        <div class="your-card-title">${hike.name}</div>
                        <div style="font-size: 0.9rem; opacity: 0.9;">${this.formatDate(hike.date)} at ${hike.time}</div>
                        <div class="role-badge ${roleClass}">${roleLabel}</div>
                    </div>
                    <div class="your-card-body">
                        <div class="your-card-meta">
                            <span><div></div><div>${hike.location}</div></span>
                            <span><div></div><div>${this.capitalizeFirst(hike.difficulty)}</div></span>
                            <span><div></div><div>${hike.duration}</div></span>
                        </div>
                        <p style="color: #6c757d; margin: 1rem 0;">${hike.description.substring(0, 100)}...</p>
                        <div class="your-card-actions">
                            <button class="btn-small btn-view" onclick="viewHikeDetails(${hike.id})">View Details</button>
                            ${isOrganizer ? 
                                '<button class="btn-small btn-edit" onclick="editHike(' + hike.id + ')">Edit</button>' +
                                '<button class="btn-small btn-cancel" onclick="cancelHike(' + hike.id + ')">Cancel</button>' :
                                '<button class="btn-small btn-cancel" onclick="leaveHike(' + hike.id + ')">Leave Hike</button>'
                            }
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = hikeCards;
    }

    displayYourGroups() {
        const container = document.getElementById('yourGroupsContainer');
        if (!container) return;

        // For now, we'll show sample hiking groups/communities
        // In a real app, this would come from user's joined groups
        const joinedGroups = JSON.parse(localStorage.getItem('joinedGroups') || '[]');
        
        if (joinedGroups.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">👥</div>
                    <h3>No groups joined yet</h3>
                    <p>Join hiking communities to connect with fellow adventurers!</p>
                    <button class="btn-primary" onclick="scrollToUpcoming()">Find Groups</button>
                </div>
            `;
            return;
        }

        // Sample groups - in a real app these would be actual hiking groups/communities
        const sampleGroups = [
            {
                id: 1,
                name: "Cape Town Weekend Warriors",
                memberCount: 245,
                description: "Weekend hiking enthusiasts exploring the Western Cape",
                nextHike: "Table Mountain Sunrise",
                category: "Weekend Hiking"
            },
            {
                id: 2,
                name: "Drakensberg Adventurers",
                memberCount: 156,
                description: "Challenging multi-day hikes in the Drakensberg mountains",
                nextHike: "Amphitheatre Trail",
                category: "Multi-day Hiking"
            }
        ];

        const groupCards = sampleGroups.map(group => `
            <div class="your-group-card">
                <div class="your-card-header">
                    <div class="your-card-title">${group.name}</div>
                    <div style="font-size: 0.9rem; opacity: 0.9;">${group.category}</div>
                </div>
                <div class="your-card-body">
                    <div class="your-card-meta">
                        <span>👥 ${group.memberCount} members</span>
                        <span>🥾 Next: ${group.nextHike}</span>
                    </div>
                    <p style="color: #6c757d; margin: 1rem 0;">${group.description}</p>
                    <div class="your-card-actions">
                        <button class="btn-small btn-view" onclick="viewGroupDetails(${group.id})">View Group</button>
                        <button class="btn-small btn-edit" onclick="openGroupChat(${group.id})">Group Chat</button>
                        <button class="btn-small btn-cancel" onclick="leaveGroup(${group.id})">Leave Group</button>
                    </div>
                </div>
            </div>
        `).join('');

        container.innerHTML = groupCards;
    }

    initCustomDropdowns() {
        // Convert all select elements to custom dropdowns
        const selects = document.querySelectorAll('select');
        selects.forEach(select => this.createCustomDropdown(select));
    }

    createCustomDropdown(selectElement) {
        // Skip if already converted
        if (selectElement.style.display === 'none') return;

        const wrapper = document.createElement('div');
        wrapper.className = 'custom-dropdown';
        
        const selected = document.createElement('div');
        selected.className = 'custom-dropdown-selected';
        
        const selectedText = document.createElement('span');
        selectedText.textContent = selectElement.options[selectElement.selectedIndex].text;
        
        const arrow = document.createElement('div');
        arrow.className = 'custom-dropdown-arrow';
        arrow.innerHTML = '&#9662;';
        
        selected.appendChild(selectedText);
        selected.appendChild(arrow);
        
        const options = document.createElement('div');
        options.className = 'custom-dropdown-options';
        
        // Create options
        Array.from(selectElement.options).forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'custom-dropdown-option';
            optionElement.textContent = option.text;
            optionElement.dataset.value = option.value;
            
            if (option.selected) {
                optionElement.classList.add('selected');
            }
            
            optionElement.addEventListener('click', () => {
                // Update selected option
                options.querySelectorAll('.custom-dropdown-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                optionElement.classList.add('selected');
                
                // Update original select
                selectElement.selectedIndex = index;
                selectedText.textContent = option.text;
                
                // Close dropdown
                selected.classList.remove('open');
                options.classList.remove('show');
                
                // Trigger change event
                selectElement.dispatchEvent(new Event('change'));
            });
            
            options.appendChild(optionElement);
        });
        
        // Toggle dropdown on click
        selected.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = selected.classList.contains('open');
            
            // Close all other dropdowns
            document.querySelectorAll('.custom-dropdown-selected').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
            document.querySelectorAll('.custom-dropdown-options').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
            
            if (!isOpen) {
                selected.classList.add('open');
                options.classList.add('show');
            }
        });
        
        wrapper.appendChild(selected);
        wrapper.appendChild(options);
        
        // Replace original select
        selectElement.parentNode.insertBefore(wrapper, selectElement);
        selectElement.style.display = 'none';
        
        return wrapper;
    }
}

// Global functions
function showCreateHikeForm() {
    groupHikesManager.showCreateHikeModal();
}

function closeCreateHikeModal() {
    groupHikesManager.closeCreateHikeModal();
}

function filterHikes() {
    groupHikesManager.filterHikes();
}

function scrollToUpcoming() {
    document.getElementById('upcomingHikes').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToOrganize() {
    document.getElementById('organizeSection').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function resetForm() {
    const form = document.getElementById('createHikeForm');
    if (form) {
        form.reset();
        groupHikesManager.showMessage('Form has been reset', 'info');
    } else {
        groupHikesManager.showMessage('Form not found', 'error');
    }
}

function leaveHike(hikeId) {
    const hike = groupHikesManager.getHikeById(hikeId);
    if (!hike) return;
    
    if (confirm(`Are you sure you want to leave "${hike.name}"?`)) {
        // Remove user from participants
        hike.participants = hike.participants.filter(p => p.id !== 999);
        hike.currentParticipants--;
        
        // Remove from joined hikes
        const joinedHikes = JSON.parse(localStorage.getItem('joinedHikes') || '[]');
        const updatedJoinedHikes = joinedHikes.filter(id => id !== hikeId);
        localStorage.setItem('joinedHikes', JSON.stringify(updatedJoinedHikes));
        
        // Update displays
        groupHikesManager.displayGroupHikes();
        groupHikesManager.displayYourHikes();
        groupHikesManager.showMessage(`You have left "${hike.name}"`, 'success');
        try { updateJoinedCount(); } catch(e) {}
    }
}

// Alias for user-facing "Cancel" action on a joined hike (participant)
function cancelJoin(hikeId) {
    // reuse existing leaveHike behaviour so we keep a single implementation point
    // leaveHike already asks for confirmation and updates localStorage and UI
    leaveHike(hikeId);
}

function editHike(hikeId) {
    groupHikesManager.showMessage('Edit functionality would open a form to modify hike details', 'info');
}

function cancelHike(hikeId) {
    const hike = groupHikesManager.getHikeById(hikeId);
    if (!hike) return;
    
    if (confirm(`Are you sure you want to cancel "${hike.name}"? This action cannot be undone.`)) {
        // Remove from group hikes
        groupHikesManager.groupHikes = groupHikesManager.groupHikes.filter(h => h.id !== hikeId);
        groupHikesManager.filteredHikes = [...groupHikesManager.groupHikes];
        
        // Remove from organized hikes
        const organizedHikes = JSON.parse(localStorage.getItem('organizedHikes') || '[]');
        const updatedOrganizedHikes = organizedHikes.filter(id => id !== hikeId);
        localStorage.setItem('organizedHikes', JSON.stringify(updatedOrganizedHikes));
        
        // Update displays
        groupHikesManager.displayGroupHikes();
        groupHikesManager.displayYourGroups();
        groupHikesManager.showMessage(`"${hike.name}" has been cancelled`, 'success');
        try { updateJoinedCount(); } catch(e) {}
    }
}

function joinHike(hikeId) {
    const hike = groupHikesManager.getHikeById(hikeId);
    if (!hike) return;
    
    if (hike.currentParticipants >= hike.maxParticipants) {
        groupHikesManager.showMessage('This hike is already full', 'error');
        return;
    }
    
    // In a real app, this would check if user is already joined
    const userAlreadyJoined = hike.participants.some(p => p.id === 999);
    if (userAlreadyJoined) {
        groupHikesManager.showMessage('You are already registered for this hike', 'error');
        return;
    }
    
    // Add user to participants
    hike.participants.push({ id: 999, name: 'You', avatar: 'YU' });
    hike.currentParticipants++;
    
    // Update display
    groupHikesManager.displayGroupHikes();
    // Add to user's hikes and persist
    groupHikesManager.addToYourHikes(hike);

    // Save to localStorage for persistence - get existing hikes first
    const existingJoinedHikes = JSON.parse(localStorage.getItem('joinedHikes') || '[]');
    if (!existingJoinedHikes.includes(hikeId)) {
        existingJoinedHikes.push(hikeId);
        localStorage.setItem('joinedHikes', JSON.stringify(existingJoinedHikes));
    }

    // Update top-bar joined count and give a clearer handoff (longer toast + quick action)
    try { updateJoinedCount(); } catch (e) { /* ignore */ }
    groupHikesManager.showMessage(`You joined "${hike.name}" — it's in Your Hikes.`, 'success', {
        duration: 7000,
        actionLabel: 'View your hikes',
        action: () => scrollToYourHikes()
    });

    // Smoothly scroll the Your Hikes section into view after a short delay
    setTimeout(() => scrollToYourHikes(), 600);
}

function viewHikeDetails(hikeId) {
    const hike = groupHikesManager.getHikeById(hikeId);
    if (!hike) return;
    
    const participantsList = hike.participants.map(p => `
        <div class="participant-item">
            <div class="participant-avatar">${p.avatar}</div>
            <span>${p.name}</span>
        </div>
    `).join('');
    
    const modalBody = document.getElementById('hikeModalBody');
    modalBody.innerHTML = `
        <div class="hike-details-modal">
            <div class="modal-header">
                <h2>${hike.name}</h2>
                <div class="hike-badge ${hike.difficulty}">${groupHikesManager.capitalizeFirst(hike.difficulty)}</div>
            </div>
            
            <div class="modal-info-grid">
                <div class="info-item">
                    <span class="info-label">📅 Date & Time</span>
                    <span class="info-value">${groupHikesManager.formatDate(hike.date)} at ${hike.time}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">📍 Location</span>
                    <span class="info-value">${hike.location}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">🚗 Meeting Point</span>
                    <span class="info-value">${hike.meetingPoint}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">⏱️ Duration</span>
                    <span class="info-value">${hike.duration}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">👤 Organizer</span>
                    <span class="info-value">${hike.organizer}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">👥 Participants</span>
                    <span class="info-value">${hike.currentParticipants}/${hike.maxParticipants}</span>
                </div>
            </div>
            
            <div class="modal-description">
                <h3>Description</h3>
                <p>${hike.description}</p>
            </div>
            
            <div class="modal-gear">
                <h3>Required Gear</h3>
                <p>${hike.requiredGear}</p>
            </div>
            
            <div class="modal-participants">
                <h3>Participants (${hike.currentParticipants})</h3>
                <div class="participants-list">
                    ${participantsList}
                </div>
            </div>
            
            <div class="modal-actions">
                <button class="btn-primary ${hike.currentParticipants >= hike.maxParticipants ? 'disabled' : ''}" 
                        onclick="joinHike(${hike.id}); closeHikeDetailsModal();"
                        ${hike.currentParticipants >= hike.maxParticipants ? 'disabled' : ''}>
                    ${hike.currentParticipants >= hike.maxParticipants ? '❌ Full' : 'Join Hike'}
                </button>
                <button class="btn-secondary" onclick="contactOrganizer(${hike.organizerId})">
                    💬 Contact Organizer
                </button>
            </div>
        </div>
    `;
    
    document.getElementById('hikeDetailsModal').style.display = 'block';
}

// Scroll to Your Hikes section and briefly highlight it
function scrollToYourHikes() {
    const yourHikesSection = document.getElementById('yourHikes');
    if (!yourHikesSection) return;
    yourHikesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Add a short highlight
    yourHikesSection.style.transition = 'box-shadow 0.4s ease';
    yourHikesSection.style.boxShadow = '0 6px 30px rgba(230,126,34,0.25)';
    setTimeout(() => { yourHikesSection.style.boxShadow = ''; }, 1800);
}

// Update the joined hikes count in the navbar
function updateJoinedCount() {
    try {
        const joined = JSON.parse(localStorage.getItem('joinedHikes') || '[]');
        const el = document.getElementById('joined-count') || document.querySelector('.joined-count');
        if (el) el.textContent = joined.length;
    } catch (e) {
        console.error('Error updating joined count:', e);
    }
}

function closeHikeDetailsModal() {
    document.getElementById('hikeDetailsModal').style.display = 'none';
}

function contactOrganizer(organizerId) {
    // Find the hike based on organizer ID to get context
    const hike = groupHikesManager.groupHikes.find(h => h.organizerId === organizerId);
    
    if (!hike) {
        groupHikesManager.showMessage('Unable to find organizer information', 'error');
        return;
    }
    
    // Populate organizer info in modal
    const organizerInfo = document.getElementById('organizerInfo');
    organizerInfo.innerHTML = `
        <h3>Contacting: ${hike.organizer}</h3>
        <p class="hike-title">Regarding: ${hike.name}</p>
        <p><strong>Date:</strong> ${groupHikesManager.formatDate(hike.date)} at ${hike.time}</p>
        <p><strong>Location:</strong> ${hike.location}</p>
    `;
    
    // Clear form fields
    document.getElementById('messageSubject').value = `Query about ${hike.name}`;
    document.getElementById('messageContent').value = '';
    
    // Show modal
    document.getElementById('contactOrganizerModal').style.display = 'block';
}

function closeContactModal() {
    document.getElementById('contactOrganizerModal').style.display = 'none';
}

function handleContactForm() {
    const form = document.getElementById('contactOrganizerForm');
    const formData = new FormData(form);
    
    const subject = formData.get('messageSubject');
    const message = formData.get('messageContent');
    
    // Validate form
    if (!subject.trim()) {
        groupHikesManager.showMessage('Please enter a subject line', 'error');
        return;
    }
    
    if (!message.trim()) {
        groupHikesManager.showMessage('Please enter your message', 'error');
        return;
    }
    
    if (message.trim().length < 10) {
        groupHikesManager.showMessage('Please write a more detailed message (at least 10 characters)', 'error');
        return;
    }
    
    // Close modal first
    closeContactModal();
    
    // Show success message
    groupHikesManager.showMessage('Message sent to organizer! They will contact you soon.', 'success');
    
    // Clear form for next use
    form.reset();
}

function viewHikingTips() {
    alert(`
🥾 ESSENTIAL GROUP HIKING SAFETY TIPS:

BEFORE THE HIKE:
• Check weather conditions and trail status
• Inform someone not on the hike of your plans
• Ensure you have proper gear and fitness level
• Bring emergency contact information

DURING THE HIKE:
• Stay with the group - never hike ahead alone
• Communicate any concerns to the group leader
• Help slower members and practice patience
• Follow Leave No Trace principles

EMERGENCY PROTOCOLS:
• Know basic first aid procedures
• Carry emergency whistle and phone
• Have emergency numbers programmed
• Know evacuation routes and procedures

GEAR ESSENTIALS:
• Proper hiking boots with good grip
• Weather-appropriate clothing layers
• Minimum 2L water per person
• High-energy snacks and lunch
• First aid kit and emergency supplies
• Navigation tools (map, GPS, compass)
    `);
}

function viewGearGuide() {
    alert(`
🎒 GROUP HIKING GEAR GUIDE:

ESSENTIAL GEAR FOR EVERY HIKE:
• Sturdy hiking boots (broken in)
• Moisture-wicking base layers
• Insulating mid-layer (fleece/down)
• Waterproof outer shell
• Day pack (20-35L capacity)
• Water bottles or hydration system
• High-energy snacks and lunch
• Sun protection (hat, sunglasses, sunscreen)
• First aid kit
• Emergency whistle
• Headlamp with extra batteries

NAVIGATION & SAFETY:
• Detailed trail map
• GPS device or smartphone with offline maps
• Compass
• Emergency contact information
• Personal identification

OPTIONAL COMFORT ITEMS:
• Trekking poles
• Portable camping chair
• Camera
• Binoculars
• Field guidebooks

WEATHER-SPECIFIC ADDITIONS:
• Rain gear for wet conditions
• Extra warm layers for cold weather
• Gaiters for snow or muddy conditions
• Insect repellent for summer hikes

Remember: It's better to have gear and not need it than to need it and not have it!
    `);
}

function viewGroupDetails(groupId) {
    groupHikesManager.showMessage('Group details would show member list, upcoming hikes, and group info', 'info');
}

function openGroupChat(groupId) {
    groupHikesManager.showMessage('Group chat feature would open messaging interface', 'info');
}

function leaveGroup(groupId) {
    if (confirm('Are you sure you want to leave this hiking group?')) {
        groupHikesManager.showMessage('You have left the hiking group', 'success');
        // In a real app, this would remove the group from localStorage and update display
        groupHikesManager.displayYourGroups();
    }
}

// Initialize group hikes manager when DOM is loaded
let groupHikesManager;
document.addEventListener('DOMContentLoaded', () => {
    groupHikesManager = new GroupHikesManager();
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        const createModal = document.getElementById('createHikeModal');
        const detailsModal = document.getElementById('hikeDetailsModal');
        const contactModal = document.getElementById('contactOrganizerModal');
        
        if (event.target === createModal) {
            closeCreateHikeModal();
        }
        if (event.target === detailsModal) {
            closeHikeDetailsModal();
        }
        if (event.target === contactModal) {
            closeContactModal();
        }
        
        // Close custom dropdowns when clicking outside
        if (!event.target.closest('.custom-dropdown')) {
            document.querySelectorAll('.custom-dropdown-selected').forEach(dropdown => {
                dropdown.classList.remove('open');
            });
            document.querySelectorAll('.custom-dropdown-options').forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    }
});

// Initialize navbar scroll functionality
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

// Update favorites count
function updateFavoritesCount() {
    try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        const favoriteTrails = JSON.parse(localStorage.getItem('favoriteTrails') || '[]');
        const total = wishlist.length + favoriteTrails.length;
        
        const el = document.querySelector('.favorites-count');
        if (el) {
            el.textContent = total;
        }
    } catch (e) {
        console.error('Error updating favorites count:', e);
    }
}

// Update cart count
function updateCartCount() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        
        const el = document.querySelector('.cart-count');
        if (el) {
            el.textContent = total;
        }
    } catch (e) {
        console.error('Error updating cart count:', e);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initNavbarScroll();
    
    // Update counts on page load
    updateCartCount();
    updateFavoritesCount();
    // Update joined hikes count on load
    try { updateJoinedCount(); } catch(e) { /* ignore */ }
});
