document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initScrollAnimations();
    initParallaxEffect();
    initNavbarScroll();
    initTeamInteractions();
    initValueInteractions();
    initMissionAnimation();
});

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (entry.target.classList.contains('team-section')) {
                    animateTeamMembers();
                }
                if (entry.target.classList.contains('values-section')) {
                    animateValues();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

function initParallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        const parallaxSections = document.querySelectorAll('.story-section, .values-section, .mission-section');
        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const speed = 0.3;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled - section.offsetTop) * speed;
                section.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });
}

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

function initTeamInteractions() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            
            this.style.boxShadow = '0 20px 40px rgba(39, 174, 96, 0.2)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });

        member.addEventListener('click', function() {
            const memberInfo = this.querySelector('.member-info');
            memberInfo.style.transition = 'all 0.3s ease';
            
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

function initValueInteractions() {
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach((item, index) => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) rotateY(5deg)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            
            createRippleEffect(this);
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateY(0deg)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });

        item.style.animationDelay = `${index * 0.1}s`;
    });
}

function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.classList.add('ripple');
    ripple.style.position = 'absolute';
    ripple.style.width = '10px';
    ripple.style.height = '10px';
    ripple.style.background = 'rgba(230, 126, 34, 0.6)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'translate(-50%, -50%)';
    ripple.style.animation = 'ripple-animation 0.6s ease-out';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.pointerEvents = 'none';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function initMissionAnimation() {
    const missionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const missionPoints = entry.target.querySelectorAll('.mission-point');
                const missionCircle = entry.target.querySelector('.mission-circle');
                
                missionPoints.forEach((point, index) => {
                    setTimeout(() => {
                        point.style.opacity = '0';
                        point.style.transform = 'translateX(-50px)';
                        point.style.transition = 'all 0.6s ease-out';
                        
                        setTimeout(() => {
                            point.style.opacity = '1';
                            point.style.transform = 'translateX(0)';
                        }, 100);
                    }, index * 200);
                });
                
                if (missionCircle) {
                    missionCircle.style.transform = 'scale(0.8) rotate(-10deg)';
                    missionCircle.style.opacity = '0.7';
                    missionCircle.style.transition = 'all 0.8s ease-out';
                    
                    setTimeout(() => {
                        missionCircle.style.transform = 'scale(1) rotate(0deg)';
                        missionCircle.style.opacity = '1';
                    }, 300);
                }
            }
        });
    }, { threshold: 0.3 });

    const missionSection = document.querySelector('.mission-section');
    if (missionSection) {
        missionObserver.observe(missionSection);
    }
}

function animateTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach((member, index) => {
        setTimeout(() => {
            member.style.opacity = '0';
            member.style.transform = 'translateY(50px) rotateX(10deg)';
            member.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                member.style.opacity = '1';
                member.style.transform = 'translateY(0) rotateX(0deg)';
            }, 100);
        }, index * 150);
    });
}

function animateValues() {
    const valueItems = document.querySelectorAll('.value-item');
    
    valueItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8) translateY(30px)';
            item.style.transition = 'all 0.5s ease-out';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1) translateY(0)';
            }, 100);
        }, index * 100);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
});

function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    const query = searchInput.value.trim();
    
    if (query) {
        searchInput.style.transform = 'scale(0.95)';
        setTimeout(() => {
            searchInput.style.transform = 'scale(1)';
        }, 150);
        
        console.log('Searching for:', query);
        
        alert(`Searching for: "${query}"`);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
        }
    }
    
    @keyframes pulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }
`;
document.head.appendChild(style);

function addFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.mission-circle');
    
    floatingElements.forEach(element => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 3 + Math.random() * 2;
        
        element.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
    });
}

document.addEventListener('DOMContentLoaded', addFloatingAnimation);

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #27ae60, #e67e22);
        z-index: 9999;
        transition: width 0.1s ease-out;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

document.addEventListener('DOMContentLoaded', initScrollProgress);

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.activeElement.blur();
    }
    
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

let ticking = false;

function updateOnScroll() {
    initParallaxEffect();
    initNavbarScroll();
    ticking = false;
}

function requestTick() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

window.addEventListener('scroll', requestTick);