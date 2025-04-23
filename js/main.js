document.addEventListener("DOMContentLoaded", function() {
    // Get all floating elements
    const floatingElements = document.querySelectorAll('.floating-element');
    
    // Remove any existing elements
    floatingElements.forEach(el => el.remove());
    
    // Get the animated-elements container
    const container = document.querySelector('.animated-elements');
    
    // Create elements with bottom-to-top animation
    for (let i = 0; i < 9; i++) {
        // Create new span element
        const span = document.createElement('span');
        span.className = 'floating-element';
        
        // Create image element
        const img = document.createElement('img');
        img.src = 'images/enactus-logo.png';
        img.alt = 'Enactus';
        
        // Append image to span
        span.appendChild(img);
        
        // Generate horizontal position (spread across the width)
        const horizontalPosition = (i % 4) * 25 + Math.random() * 15 + 5; // Distribute across screen with some randomness
        
        // Generate random size (70px to 120px)
        const randomSize = Math.floor(Math.random() * 50) + 70;
        
        // Generate random animation properties
        const randomDuration = Math.random() * 8 + 12; // 12-20 seconds for full journey
        const randomDelay = Math.random() * 10; // 0-10 seconds delay
        const randomOpacity = Math.random() * 0.5 + 0.3; // 0.3-0.8 opacity
        
        // Apply styles
        span.style.left = `${horizontalPosition}%`;
        span.style.bottom = `-${randomSize}px`; // Start below the viewport
        span.style.zIndex = Math.floor(Math.random() * 5);
        span.style.position = 'absolute';
        
        img.style.width = `${randomSize}px`;
        img.style.height = `${randomSize}px`;
        img.style.opacity = randomOpacity;
        img.style.borderRadius = '50%';
        img.style.boxShadow = '0 5px 15px rgba(254, 191, 15, 0.4)';
        
        // Create unique animation for each element
        const keyframeId = `float-up-${i}`;
        
        // Create custom keyframes for bottom-to-top movement
        const keyframes = `
            @keyframes ${keyframeId} {
                0% {
                    transform: translateY(0) translateX(0) rotate(0deg);
                    opacity: ${randomOpacity};
                }
                10% {
                    transform: translateY(-20vh) translateX(${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg);
                    opacity: ${randomOpacity + 0.1};
                }
                30% {
                    transform: translateY(-40vh) translateX(${Math.random() * 30 - 15}px) rotate(${Math.random() * 30 - 15}deg);
                }
                50% {
                    transform: translateY(-60vh) translateX(${Math.random() * 40 - 20}px) rotate(${Math.random() * 40 - 20}deg);
                }
                70% {
                    transform: translateY(-80vh) translateX(${Math.random() * 30 - 15}px) rotate(${Math.random() * 30 - 15}deg);
                }
                90% {
                    transform: translateY(-100vh) translateX(${Math.random() * 20 - 10}px) rotate(${Math.random() * 20 - 10}deg);
                    opacity: ${randomOpacity + 0.1};
                }
                100% {
                    transform: translateY(-110vh) translateX(0) rotate(0deg);
                    opacity: 0;
                }
            }
        `;
        
        // Add keyframes to document
        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);
        
        // Apply animation
        span.style.animation = `${keyframeId} ${randomDuration}s infinite ease-in-out ${randomDelay}s`;
        
        // Add click interaction
        span.addEventListener('click', function() {
            // Create a ripple effect
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            ripple.style.position = 'absolute';
            ripple.style.width = '100%';
            ripple.style.height = '100%';
            ripple.style.borderRadius = '50%';
            ripple.style.backgroundColor = 'rgba(254, 191, 15, 0.4)';
            ripple.style.transform = 'scale(0)';
            ripple.style.left = '0';
            ripple.style.top = '0';
            ripple.style.animation = 'ripple-effect 0.8s ease-out forwards';
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 800);
            
            // Add ripple animation
            const rippleStyle = document.createElement('style');
            rippleStyle.innerHTML = `
                @keyframes ripple-effect {
                    0% {
                        transform: scale(0);
                        opacity: 0.8;
                    }
                    100% {
                        transform: scale(2.5);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(rippleStyle);
            
            // Increase size temporarily
            img.style.transition = 'all 0.5s ease';
            img.style.transform = 'scale(1.5)';
            img.style.opacity = '1';
            
            // Reset after animation
            setTimeout(() => {
                img.style.transform = '';
                img.style.opacity = randomOpacity;
            }, 800);
        });
        
        // Add to container
        container.appendChild(span);
    }
    
    // Add subtle wave motion on mouse move
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        
        const elements = document.querySelectorAll('.floating-element');
        elements.forEach((element, index) => {
            const depth = (index % 5 + 1) / 10; // Create different depth layers (reduced effect)
            const moveX = (mouseX - 0.5) * depth * 50; // Reduced horizontal movement
            
            // Get current transform and add horizontal movement
            const currentTransform = window.getComputedStyle(element).transform;
            if (currentTransform && currentTransform !== 'none') {
                // Only apply horizontal movement, preserving the vertical animation
                element.style.marginLeft = `${moveX}px`;
            }
        });
    });
    
    // Handle responsive behavior
    function updateForScreenSize() {
        const width = window.innerWidth;
        const elements = document.querySelectorAll('.floating-element');
        
        // Determine how many elements to show based on screen size
        let visibleCount = 12;
        
        if (width < 576) {
            visibleCount = 6;
        } else if (width < 768) {
            visibleCount = 8;
        } else if (width < 992) {
            visibleCount = 10;
        }
        
        // Show/hide elements
        elements.forEach((element, index) => {
            if (index < visibleCount) {
                element.style.display = 'block';
            } else {
                element.style.display = 'none';
            }
        });
    }
    
    // Initial update and add resize listener
    updateForScreenSize();
    window.addEventListener('resize', updateForScreenSize);
});
