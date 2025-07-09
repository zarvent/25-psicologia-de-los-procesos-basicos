/**
 * Main JavaScript file for Psicología de los Procesos Básicos
 * Handles theme toggling, search functionality, table of contents, and more
 */

(function () {
  'use strict';

  // ==========================================================================
  // THEME MANAGEMENT
  // ==========================================================================

  /**
   * Initialize theme based on localStorage or system preference
   */
  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);
    updateThemeIcon(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  }

  /**
   * Update theme toggle button icon
   */
  function updateThemeIcon(theme) {
    const sunIcon = document.querySelector('.theme-toggle .sun-icon');
    const moonIcon = document.querySelector('.theme-toggle .moon-icon');

    if (theme === 'dark') {
      sunIcon.style.display = 'none';
      moonIcon.style.display = 'block';
    } else {
      sunIcon.style.display = 'block';
      moonIcon.style.display = 'none';
    }
  }

  // ==========================================================================
  // SEARCH FUNCTIONALITY
  // ==========================================================================

  let searchData = [];
  let searchModal = null;
  let searchInput = null;
  let searchResults = null;

  /**
   * Initialize search functionality
   */
  function initializeSearch() {
    searchModal = document.getElementById('search-modal');
    searchInput = document.getElementById('search-input');
    searchResults = document.getElementById('search-results');

    if (searchInput) {
      searchInput.addEventListener('input', debounce(handleSearch, 300));
      searchInput.addEventListener('keydown', handleSearchKeydown);
    }

    // Load search data
    loadSearchData();
  }

  /**
   * Load search data from the site
   */
  function loadSearchData() {
    // In a real Jekyll site, this would fetch from a JSON file
    // For now, we'll use a simple array
    searchData = [
      {
        title: 'Introducción',
        url: '/sections/introduccion/',
        excerpt: 'La psicología de los procesos básicos es la disciplina científica que estudia la mente'
      },
      {
        title: 'Historia y Antecedentes',
        url: '/sections/historia/',
        excerpt: 'Antes de que la psicología se estableciera como una ciencia formal'
      },
      {
        title: 'Psicología del Sentido Común',
        url: '/sections/sentido-comun/',
        excerpt: 'La forma en que todos intentamos ser psicólogos en el día a día'
      },
      {
        title: 'El Obstáculo',
        url: '/sections/obstaculo/',
        excerpt: 'Por qué nos cuesta aceptar la psicología científica'
      }
    ];
  }

  /**
   * Handle search input
   */
  function handleSearch(event) {
    const query = event.target.value.toLowerCase().trim();

    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }

    const results = searchData.filter(item =>
      item.title.toLowerCase().includes(query) ||
      item.excerpt.toLowerCase().includes(query)
    );

    displaySearchResults(results, query);
  }

  /**
   * Display search results
   */
  function displaySearchResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = '<p class="search-no-results">No se encontraron resultados</p>';
      return;
    }

    const resultsHTML = results.map(result => `
            <div class="search-result" onclick="navigateToResult('${result.url}')">
                <h3 class="search-result-title">${highlightQuery(result.title, query)}</h3>
                <p class="search-result-excerpt">${highlightQuery(result.excerpt, query)}</p>
            </div>
        `).join('');

    searchResults.innerHTML = resultsHTML;
  }

  /**
   * Highlight search query in text
   */
  function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  /**
   * Navigate to search result
   */
  function navigateToResult(url) {
    window.location.href = url;
  }

  /**
   * Handle keyboard navigation in search
   */
  function handleSearchKeydown(event) {
    if (event.key === 'Escape') {
      toggleSearch();
    }
  }

  /**
   * Toggle search modal
   */
  function toggleSearch() {
    const isVisible = searchModal.style.display !== 'none';

    if (isVisible) {
      searchModal.style.display = 'none';
      document.body.style.overflow = '';
    } else {
      searchModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      searchInput.focus();
    }
  }

  // ==========================================================================
  // TABLE OF CONTENTS
  // ==========================================================================

  /**
   * Generate table of contents
   */
  function generateTableOfContents() {
    const tocContent = document.getElementById('toc-content');
    const floatingTocContent = document.getElementById('floating-toc-content');

    if (!tocContent && !floatingTocContent) return;

    const headings = document.querySelectorAll('.article-body h1, .article-body h2, .article-body h3, .article-body h4');

    if (headings.length === 0) {
      if (tocContent) tocContent.style.display = 'none';
      if (floatingTocContent) floatingTocContent.style.display = 'none';
      return;
    }

    const tocHTML = generateTocHTML(headings);

    if (tocContent) tocContent.innerHTML = tocHTML;
    if (floatingTocContent) floatingTocContent.innerHTML = tocHTML;
  }

  /**
   * Generate TOC HTML
   */
  function generateTocHTML(headings) {
    let html = '<ul>';

    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id;

      const level = parseInt(heading.tagName.charAt(1));
      const text = heading.textContent;

      html += `<li class="toc-level-${level}">
                <a href="#${id}" onclick="scrollToHeading('${id}')">${text}</a>
            </li>`;
    });

    html += '</ul>';
    return html;
  }

  /**
   * Scroll to heading
   */
  function scrollToHeading(id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Toggle TOC visibility
   */
  function toggleTOC() {
    const tocContent = document.getElementById('toc-content');
    const isVisible = tocContent.style.display !== 'none';

    tocContent.style.display = isVisible ? 'none' : 'block';
  }

  /**
   * Toggle floating TOC
   */
  function toggleFloatingTOC() {
    const floatingTocContent = document.getElementById('floating-toc-content');
    floatingTocContent.classList.toggle('show');
  }

  // ==========================================================================
  // PROGRESS BAR
  // ==========================================================================

  /**
   * Update reading progress
   */
  function updateReadingProgress() {
    const progressBar = document.querySelector('.progress-fill');
    if (!progressBar) return;

    const article = document.querySelector('.article-body');
    if (!article) return;

    const scrollTop = window.pageYOffset;
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;

    const progress = Math.min(Math.max((scrollTop - articleTop + windowHeight / 2) / articleHeight, 0), 1);
    progressBar.style.width = `${progress * 100}%`;
  }

  // ==========================================================================
  // READING TIME
  // ==========================================================================

  /**
   * Calculate and display reading time
   */
  function calculateReadingTime() {
    const readingTimeElement = document.getElementById('reading-time');
    if (!readingTimeElement) return;

    const article = document.querySelector('.article-body');
    if (!article) return;

    const wordCount = article.textContent.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 words per minute

    readingTimeElement.textContent = `Tiempo de lectura: ${readingTime} min`;
  }

  // ==========================================================================
  // SHARE FUNCTIONALITY
  // ==========================================================================

  /**
   * Share content on social media or copy link
   */
  function shareContent(platform) {
    const title = document.querySelector('.article-title').textContent;
    const url = window.location.href;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(url).then(() => {
          showNotification('Enlace copiado al portapapeles');
        });
        break;
    }
  }

  /**
   * Show notification
   */
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--color-primary);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            z-index: 1000;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
        `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateY(0)';
    }, 100);

    // Remove after delay
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(20px)';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }

  // ==========================================================================
  // MOBILE MENU
  // ==========================================================================

  /**
   * Toggle mobile menu
   */
  function toggleMobileMenu() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('mobile-open');
  }

  // ==========================================================================
  // UTILITY FUNCTIONS
  // ==========================================================================

  /**
   * Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Throttle function
   */
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // ==========================================================================
  // INITIALIZATION
  // ==========================================================================

  /**
   * Initialize all functionality when DOM is ready
   */
  function initialize() {
    initializeTheme();
    initializeSearch();
    generateTableOfContents();
    initializeProgressBar();
    initializeMobileMenu();
    initializePageTransitions();
    highlightActiveSection();
    calculateReadingTime();
  }

  // Initialize reading progress bar
  function initializeProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = Math.min((scrollTop / docHeight) * 100, 100);
            progressBar.style.width = percent + '%';
        });
    }
}

  // Initialize mobile menu
  function initializeMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
        if (document.body.classList.contains('menu-open') && 
            !sidebar.contains(event.target) && 
            !menuToggle.contains(event.target)) {
            document.body.classList.remove('menu-open');
        }
    });
}

  // Initialize page transitions
  function initializePageTransitions() {
    // Add loading animation to page content
    const content = document.querySelector('.main-content, .home-layout, .section-layout');
    if (content) {
        content.style.opacity = '0';
        content.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            content.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            content.style.opacity = '1';
            content.style.transform = 'translateY(0)';
        }, 100);
    }
}

  // Highlight active section
  function highlightActiveSection() {
    const currentPath = window.location.pathname.replace(/\/$/, '');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace(/\/$/, '');
        if (href === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

  // ==========================================================================
  // GLOBAL FUNCTIONS
  // ==========================================================================

  // Make functions available globally
  window.toggleTheme = toggleTheme;
  window.toggleSearch = toggleSearch;
  window.toggleTOC = toggleTOC;
  window.toggleFloatingTOC = toggleFloatingTOC;
  window.toggleMobileMenu = toggleMobileMenu;
  window.shareContent = shareContent;
  window.scrollToHeading = scrollToHeading;

  // ==========================================================================
  // DOM READY
  // ==========================================================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
  } else {
    initialize();
  }

})();
