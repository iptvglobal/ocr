/**
 * Silktide Cookie Consent Manager
 * A vanilla JS implementation to display a cookie consent banner,
 * manage preferences, and integrate with Google Consent Mode v2.
 */
(function() {
    'use strict';

    // --- DOM ELEMENT HELPERS ---
    function E(tag, attributes, ...children) {
        const element = document.createElement(tag);
        if (attributes) {
            for (const key in attributes) {
                element.setAttribute(key, attributes[key]);
            }
        }
        children.forEach(child => {
            if (typeof child === 'string') {
                element.insertAdjacentHTML('beforeend', child);
            } else {
                element.appendChild(child);
            }
        });
        return element;
    }

    // --- STATE MANAGEMENT ---
    const COOKIE_NAME = 'silktide_cookie_consent_status';
    let config = {};
    let currentConsent = {};

    const elements = {
        background: null,
        banner: null,
        preferences: null,
        icon: null
    };

    // --- CORE LOGIC ---
    function updateConfig(newConfig) {
        config = { ...config, ...newConfig };
    }

    function saveConsent(consent) {
        try {
            localStorage.setItem(COOKIE_NAME, JSON.stringify(consent));
            currentConsent = consent;
            applyConsent();
            hideBannerAndPreferences();
            showFloatingIcon();
        } catch (e) {
            console.error("Could not save cookie consent.", e);
        }
    }

    function loadConsent() {
        try {
            const consent = localStorage.getItem(COOKIE_NAME);
            return consent ? JSON.parse(consent) : null;
        } catch (e) {
            console.error("Could not load cookie consent.", e);
            return null;
        }
    }

    function applyConsent() {
        if (!config.cookieTypes || !currentConsent) return;
        config.cookieTypes.forEach(type => {
            const consentGiven = currentConsent[type.id];
            if (consentGiven && typeof type.onAccept === 'function') {
                type.onAccept();
            } else if (!consentGiven && typeof type.onReject === 'function') {
                type.onReject();
            }
        });
    }

    // --- UI RENDERING ---
    function render() {
        destroy(); // Clean up existing elements

        if (config.background && config.background.showBackground) {
            elements.background = E('div', { id: 'silktide-cookie-background' });
            document.body.appendChild(elements.background);
        }

        if (config.text && config.text.banner) {
            const { description, acceptAllButtonText, rejectNonEssentialButtonText, preferencesButtonText } = config.text.banner;
            elements.banner = E('div', { id: 'silktide-cookie-banner', role: 'dialog', 'aria-live': 'polite', 'aria-label': 'Cookie consent' },
                E('div', { class: 'silktide-cookie-banner-content' },
                    E('p', {}, description),
                    E('div', { class: 'silktide-cookie-banner-buttons' },
                        E('button', { id: 'silktide-banner-button-accept', class: 'silktide-button-primary' }, acceptAllButtonText),
                        E('button', { id: 'silktide-banner-button-reject' }, rejectNonEssentialButtonText),
                        E('button', { id: 'silktide-banner-button-prefs' }, preferencesButtonText)
                    )
                )
            );
            document.body.appendChild(elements.banner);
        }

        if (config.cookieIcon) {
            elements.icon = E('div', { id: 'silktide-cookie-icon-container', class: `silktide-cookie-icon-${config.cookieIcon.position || 'bottomRight'}` },
                E('button', { 'aria-label': 'Manage cookie settings' },
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z"/><path d="M12 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 1 0 0-3.5zM6.25 12a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 1 0-3.5 0zM14.25 12a1.75 1.75 0 1 0 3.5 0 1.75 1.75 0 1 0-3.5 0z"/></svg>`
                )
            );
            document.body.appendChild(elements.icon);
        }

        addEventListeners();
    }
    
    function renderPreferences() {
        if (elements.preferences) elements.preferences.remove();
        
        const { title, description } = config.text.preferences;
        
        const typeToggles = config.cookieTypes.map(type => 
            E('div', { class: 'silktide-cookie-prefs-type' },
                E('div', { class: 'silktide-cookie-prefs-type-header'},
                    E('h3', {}, type.name),
                    !type.required ? E('label', { class: 'silktide-switch' },
                        E('input', { type: 'checkbox', 'data-type-id': type.id, checked: currentConsent[type.id] ? '' : null }),
                        E('span', { class: 'silktide-slider' })
                    ) : E('span', { class: 'silktide-required-text'}, 'Always active')
                ),
                E('div', { class: 'silktide-cookie-prefs-type-desc' }, type.description)
            )
        );

        elements.preferences = E('div', { id: 'silktide-cookie-preferences', role: 'dialog', 'aria-modal': 'true' },
            E('div', { class: 'silktide-cookie-preferences-content' },
                E('h2', {}, title),
                E('p', {}, description),
                E('div', { class: 'silktide-cookie-prefs-types-container' }, ...typeToggles),
                E('div', { class: 'silktide-cookie-prefs-buttons' },
                    E('button', { id: 'silktide-prefs-button-save' , class: 'silktide-button-primary' }, 'Save Preferences'),
                    E('button', { id: 'silktide-prefs-button-accept-all' }, 'Accept All'),
                    E('button', { id: 'silktide-prefs-button-close' }, 'Close')
                )
            )
        );
        document.body.appendChild(elements.preferences);

        document.getElementById('silktide-prefs-button-save').addEventListener('click', handleSavePreferences);
        document.getElementById('silktide-prefs-button-accept-all').addEventListener('click', handleAcceptAll);
        document.getElementById('silktide-prefs-button-close').addEventListener('click', hidePreferencesModal);
    }
    
    function destroy() {
        Object.values(elements).forEach(el => el && el.remove());
    }

    // --- UI VISIBILITY ---
    function showBanner() {
        if (elements.background) elements.background.style.display = 'block';
        if (elements.banner) elements.banner.style.display = 'block';
    }

    function showPreferencesModal() {
        if (elements.background) elements.background.style.display = 'block';
        if (elements.banner) elements.banner.style.display = 'none';
        renderPreferences(); // Re-render to get current state
        elements.preferences.style.display = 'block';
    }

    function hidePreferencesModal() {
        if (elements.background && !elements.banner.style.display) elements.background.style.display = 'none';
        if (elements.preferences) elements.preferences.style.display = 'none';
    }

    function hideBannerAndPreferences() {
        if (elements.background) elements.background.style.display = 'none';
        if (elements.banner) elements.banner.style.display = 'none';
        hidePreferencesModal();
    }
    
    function showFloatingIcon() {
        if (elements.icon) elements.icon.style.display = 'block';
    }

    // --- EVENT HANDLERS ---
    function handleAcceptAll() {
        const consent = {};
        config.cookieTypes.forEach(type => {
            consent[type.id] = true;
        });
        saveConsent(consent);
    }
    
    function handleRejectNonEssential() {
        const consent = {};
        config.cookieTypes.forEach(type => {
            consent[type.id] = !!type.required;
        });
        saveConsent(consent);
    }

    function handleSavePreferences() {
        const consent = {};
        const toggles = document.querySelectorAll('#silktide-cookie-preferences input[type="checkbox"]');
        
        config.cookieTypes.forEach(type => {
            if (type.required) {
                consent[type.id] = true;
            }
        });

        toggles.forEach(toggle => {
            const typeId = toggle.getAttribute('data-type-id');
            consent[typeId] = toggle.checked;
        });
        saveConsent(consent);
    }

    function addEventListeners() {
        const acceptBtn = document.getElementById('silktide-banner-button-accept');
        const rejectBtn = document.getElementById('silktide-banner-button-reject');
        const prefsBtn = document.getElementById('silktide-banner-button-prefs');
        
        if (acceptBtn) acceptBtn.addEventListener('click', handleAcceptAll);
        if (rejectBtn) rejectBtn.addEventListener('click', handleRejectNonEssential);
        if (prefsBtn) prefsBtn.addEventListener('click', showPreferencesModal);
        if (elements.icon) elements.icon.addEventListener('click', showPreferencesModal);
    }
    
    // --- INITIALIZATION ---
    function init() {
        const savedConsent = loadConsent();
        if (savedConsent) {
            currentConsent = savedConsent;
            applyConsent();
            render();
            hideBannerAndPreferences();
            showFloatingIcon();
        } else {
            // Set initial state for preferences modal
            currentConsent = {};
            config.cookieTypes.forEach(type => {
                currentConsent[type.id] = !!type.required;
            });
            render();
            showBanner();
        }
    }
    
    // Expose the manager to the window
    window.silktideCookieBannerManager = {
        updateCookieBannerConfig: (newConfig) => {
            updateConfig(newConfig);
        }
    };
    
    // Run after the DOM is ready and config is loaded
    document.addEventListener('DOMContentLoaded', init);

})();
