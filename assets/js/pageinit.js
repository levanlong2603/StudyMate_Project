/**
 * PAGE INITIALIZATION MODULE
 * Handles dynamic loading of header/footer and page layout adjustments
 */
(function() {
    'use strict';

    // Configuration constants
    const CONFIG = {
        headerUrl: "header.html",
        footerUrl: "footer.html",
        defaultFooterHeight: 150,    // px (desktop)
        mobileFooterHeight: 200,     // px
        mobileBreakpoint: 768,       // px
        contentTopMargin: "28px",    // Margin for header content
        resizeDebounceTime: 100      // ms
    };

    // DOM Elements cache
    const domElements = {
        body: null,
        header: null,
        mainContent: null,
        footerContainer: null,
        breadcrumb: null
    };

    // Initialize the page
    function init() {
        cacheDomElements();
        loadHeader()
            .then(() => {
                initBreadcrumb();
                registerNavLinks();
                adjustHeaderContent();
            })
            .catch(handleError);

        loadFooter()
            .then(() => {
                setupFooterSpace();
                window.addEventListener('resize', 
                    debounce(setupFooterSpace, CONFIG.resizeDebounceTime));
            })
            .catch(handleError);
    }

    // Cache frequently used DOM elements
    function cacheDomElements() {
        domElements.body = document.querySelector("body");
        domElements.mainContent = document.querySelector(".main-content");
    }

    // Error handling
    function handleError(error) {
        console.error("Initialization error:", error);
        // Fallback UI can be implemented here
    }

    /**
     * HEADER MANAGEMENT
     */
    function loadHeader() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: CONFIG.headerUrl,
                dataType: "html",
                success: function(data) {
                    if (!data) {
                        reject(new Error("Empty header content"));
                        return;
                    }

                    // Create header container if not exists
                    if (!document.querySelector('.header')) {
                        const headerDiv = document.createElement('div');
                        headerDiv.className = 'header';
                        domElements.body.insertAdjacentElement('afterbegin', headerDiv);
                    }

                    document.querySelector('.header').innerHTML = data;
                    domElements.header = document.querySelector('.header');
                    resolve();
                },
                error: reject
            });
        });
    }

    function adjustHeaderContent() {
        const content = document.querySelector(".header .body");
        if (content) {
            content.style.marginTop = CONFIG.contentTopMargin;
        }
    }

    /**
     * BREADCRUMB FUNCTIONALITY
     */
    function initBreadcrumb() {
        domElements.breadcrumb = document.querySelector(".breadcrumb ul");
        if (!domElements.breadcrumb) return;

        const title = getCookie("currentPage");
        const urlPath = window.location.pathname;
        
        if (title && !urlPath.includes("home")) {
            const pageTitle = getPageTitle(urlPath, title);
            if (pageTitle) {
                addBreadcrumbItem(pageTitle);
            }
        }
    }

    function getPageTitle(urlPath, title) {
        if (urlPath.includes("major")) return title;
        if (urlPath.includes("borrow")) return "Mượn sách";
        return "";
    }

    function addBreadcrumbItem(title) {
        const breadcrumbItem = `
            <li>
                <a href="#!">${title}</a>
            </li>
        `;
        domElements.breadcrumb.insertAdjacentHTML("beforeend", breadcrumbItem);
    }

    /**
     * NAVIGATION LINKS HANDLING
     */
    function registerNavLinks() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('ul a');
            if (!link) return;

            const pageTitle = link.classList.contains("home") 
                ? "" 
                : link.textContent.trim();
            
            setCookie("currentPage", pageTitle);
            logCookieStatus();
        });
    }

    function logCookieStatus() {
        console.debug("Current page cookie:", getCookie("currentPage"));
    }

    /**
     * FOOTER MANAGEMENT
     */
    function loadFooter() {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: CONFIG.footerUrl,
                dataType: "html",
                success: function(data) {
                    if (!data) {
                        reject(new Error("Empty footer content"));
                        return;
                    }

                    createFooterContainer(data);
                    resolve();
                },
                error: reject
            });
        });
    }

    function createFooterContainer(htmlContent) {
        // Remove existing footer if present
        const oldFooter = document.querySelector('.footer-container');
        if (oldFooter) oldFooter.remove();

        // Create new footer container
        const footerContainer = document.createElement("div");
        footerContainer.className = "footer-container";
        footerContainer.innerHTML = htmlContent;
        domElements.body.appendChild(footerContainer);
        domElements.footerContainer = footerContainer;
    }

    function setupFooterSpace() {
        if (!domElements.mainContent || !domElements.footerContainer) return;

        const isMobile = window.innerWidth < CONFIG.mobileBreakpoint;
        const footerHeight = isMobile 
            ? CONFIG.mobileFooterHeight 
            : CONFIG.defaultFooterHeight;

        // Adjust footer height
        domElements.footerContainer.style.height = `${footerHeight}px`;
        
        // Adjust content padding
        domElements.mainContent.style.paddingBottom = `${footerHeight + 20}px`;
        
        // Handle short pages
        handleShortPages(footerHeight);
    }

    function handleShortPages(footerHeight) {
        const bodyHeight = domElements.body.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (bodyHeight < windowHeight) {
            domElements.footerContainer.style.position = 'absolute';
            domElements.footerContainer.style.bottom = '0';
        } else {
            domElements.footerContainer.style.position = 'fixed';
        }
    }

    /**
     * UTILITY FUNCTIONS
     */
    function debounce(func, wait) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            
            const later = function() {
                timeout = null;
                func.apply(context, args);
            };

            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Cookie helper functions
    function getCookie(name) {
        // ... (giữ nguyên hàm getCookie hiện có)
    }

    function setCookie(name, value) {
        // ... (giữ nguyên hàm setCookie hiện có)
    }

    // Initialize when DOM is ready
    if (document.readyState !== 'loading') {
        init();
    } else {
        document.addEventListener('DOMContentLoaded', init);
    }

    // Expose public methods if needed
    window.pageInit = {
        reloadFooter: loadFooter,
        adjustLayout: setupFooterSpace
    };

})();