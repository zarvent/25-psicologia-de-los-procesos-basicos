/**
 * Firebase Configuration and Firestore Integration
 * Modern Serverless Architecture for GitHub Pages
 *
 * This implements the Fase 2 strategy from the diagnostic report:
 * - Real-time data management with Firestore
 * - Serverless architecture for scalability
 * - Enhanced user experience with live data
 */

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Initialize Firebase (will be loaded dynamically)
let db = null;
let analytics = null;

/**
 * Initialize Firebase services
 */
async function initializeFirebase() {
  try {
    // Import Firebase modules dynamically
    const { initializeApp } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
    const { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');
    const { getAnalytics } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    analytics = getAnalytics(app);

    console.log('✅ Firebase initialized successfully');
    return true;
  } catch (error) {
    console.warn('⚠️ Firebase initialization failed:', error);
    return false;
  }
}

/**
 * Analytics and User Behavior Tracking
 */
class AnalyticsManager {
  constructor() {
    this.initialized = false;
  }

  async init() {
    const firebaseReady = await initializeFirebase();
    if (firebaseReady) {
      this.initialized = true;
      this.trackPageView();
    }
  }

  trackPageView() {
    if (!this.initialized) return;

    try {
      // Track page view
      const pageData = {
        page: window.location.pathname,
        title: document.title,
        timestamp: new Date(),
        userAgent: navigator.userAgent,
        language: navigator.language,
        referrer: document.referrer
      };

      this.saveToFirestore('page_views', pageData);
    } catch (error) {
      console.warn('Analytics tracking failed:', error);
    }
  }

  trackReadingProgress(section, progress) {
    if (!this.initialized) return;

    try {
      const progressData = {
        section: section,
        progress: progress,
        timestamp: new Date(),
        sessionId: this.getSessionId()
      };

      this.saveToFirestore('reading_progress', progressData);
    } catch (error) {
      console.warn('Progress tracking failed:', error);
    }
  }

  trackSearchQuery(query, resultsCount) {
    if (!this.initialized) return;

    try {
      const searchData = {
        query: query,
        resultsCount: resultsCount,
        timestamp: new Date(),
        sessionId: this.getSessionId()
      };

      this.saveToFirestore('search_queries', searchData);
    } catch (error) {
      console.warn('Search tracking failed:', error);
    }
  }

  async saveToFirestore(collection, data) {
    if (!db) return;

    try {
      const { addDoc, collection: firestoreCollection } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');
      await addDoc(firestoreCollection(db, collection), data);
    } catch (error) {
      console.warn('Firestore save failed:', error);
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
}

/**
 * Dynamic Content Manager
 */
class ContentManager {
  constructor() {
    this.initialized = false;
    this.cache = new Map();
  }

  async init() {
    const firebaseReady = await initializeFirebase();
    if (firebaseReady) {
      this.initialized = true;
      await this.loadDynamicContent();
    }
  }

  async loadDynamicContent() {
    if (!this.initialized) return;

    try {
      // Load reading statistics
      await this.loadReadingStats();

      // Load user feedback
      await this.loadUserFeedback();

      // Load content suggestions
      await this.loadContentSuggestions();
    } catch (error) {
      console.warn('Dynamic content loading failed:', error);
    }
  }

  async loadReadingStats() {
    try {
      const { getDocs, collection, query, orderBy, limit } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');

      const statsQuery = query(
        collection(db, 'reading_progress'),
        orderBy('timestamp', 'desc'),
        limit(100)
      );

      const snapshot = await getDocs(statsQuery);
      const stats = [];

      snapshot.forEach((doc) => {
        stats.push(doc.data());
      });

      this.updateStatsDisplay(stats);
    } catch (error) {
      console.warn('Reading stats loading failed:', error);
    }
  }

  async loadUserFeedback() {
    try {
      const { getDocs, collection, query, orderBy, limit } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');

      const feedbackQuery = query(
        collection(db, 'user_feedback'),
        orderBy('timestamp', 'desc'),
        limit(10)
      );

      const snapshot = await getDocs(feedbackQuery);
      const feedback = [];

      snapshot.forEach((doc) => {
        feedback.push(doc.data());
      });

      this.updateFeedbackDisplay(feedback);
    } catch (error) {
      console.warn('User feedback loading failed:', error);
    }
  }

  async loadContentSuggestions() {
    try {
      const { getDocs, collection, query, orderBy, limit } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');

      const suggestionsQuery = query(
        collection(db, 'content_suggestions'),
        orderBy('priority', 'desc'),
        limit(5)
      );

      const snapshot = await getDocs(suggestionsQuery);
      const suggestions = [];

      snapshot.forEach((doc) => {
        suggestions.push(doc.data());
      });

      this.updateSuggestionsDisplay(suggestions);
    } catch (error) {
      console.warn('Content suggestions loading failed:', error);
    }
  }

  updateStatsDisplay(stats) {
    const statsContainer = document.querySelector('.reading-stats');
    if (!statsContainer) return;

    // Process stats to show popular sections
    const sectionCounts = {};
    stats.forEach(stat => {
      sectionCounts[stat.section] = (sectionCounts[stat.section] || 0) + 1;
    });

    const popularSections = Object.entries(sectionCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    const html = `
      <div class="stats-card">
        <h3>📊 Secciones Más Leídas</h3>
        <ul class="stats-list">
          ${popularSections.map(([section, count]) => `
            <li class="stats-item">
              <span class="section-name">${section}</span>
              <span class="read-count">${count} lecturas</span>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    statsContainer.innerHTML = html;
  }

  updateFeedbackDisplay(feedback) {
    const feedbackContainer = document.querySelector('.user-feedback');
    if (!feedbackContainer) return;

    const html = `
      <div class="feedback-card">
        <h3>💬 Comentarios Recientes</h3>
        <div class="feedback-list">
          ${feedback.slice(0, 3).map(item => `
            <div class="feedback-item">
              <p class="feedback-text">"${item.comment}"</p>
              <small class="feedback-meta">
                ${item.section} • ${new Date(item.timestamp.toDate()).toLocaleDateString()}
              </small>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    feedbackContainer.innerHTML = html;
  }

  updateSuggestionsDisplay(suggestions) {
    const suggestionsContainer = document.querySelector('.content-suggestions');
    if (!suggestionsContainer) return;

    const html = `
      <div class="suggestions-card">
        <h3>💡 Contenido Sugerido</h3>
        <ul class="suggestions-list">
          ${suggestions.map(suggestion => `
            <li class="suggestion-item">
              <strong>${suggestion.title}</strong>
              <p>${suggestion.description}</p>
              <small>Prioridad: ${suggestion.priority}</small>
            </li>
          `).join('')}
        </ul>
      </div>
    `;

    suggestionsContainer.innerHTML = html;
  }

  async submitFeedback(section, comment, rating) {
    if (!this.initialized) return false;

    try {
      const feedbackData = {
        section: section,
        comment: comment,
        rating: rating,
        timestamp: new Date(),
        sessionId: this.getSessionId()
      };

      await this.saveToFirestore('user_feedback', feedbackData);
      return true;
    } catch (error) {
      console.warn('Feedback submission failed:', error);
      return false;
    }
  }

  async saveToFirestore(collection, data) {
    if (!db) return;

    try {
      const { addDoc, collection: firestoreCollection } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');
      await addDoc(firestoreCollection(db, collection), data);
    } catch (error) {
      console.warn('Firestore save failed:', error);
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
  }
}

/**
 * Notification System
 */
class NotificationManager {
  constructor() {
    this.initialized = false;
  }

  async init() {
    const firebaseReady = await initializeFirebase();
    if (firebaseReady) {
      this.initialized = true;
      await this.checkForNotifications();
    }
  }

  async checkForNotifications() {
    if (!this.initialized) return;

    try {
      const { getDocs, collection, query, where, orderBy, limit } = await import('https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js');

      const notificationsQuery = query(
        collection(db, 'notifications'),
        where('active', '==', true),
        orderBy('timestamp', 'desc'),
        limit(5)
      );

      const snapshot = await getDocs(notificationsQuery);
      const notifications = [];

      snapshot.forEach((doc) => {
        notifications.push({ id: doc.id, ...doc.data() });
      });

      this.displayNotifications(notifications);
    } catch (error) {
      console.warn('Notifications check failed:', error);
    }
  }

  displayNotifications(notifications) {
    if (notifications.length === 0) return;

    const notificationContainer = document.querySelector('.notifications');
    if (!notificationContainer) {
      // Create notification container if it doesn't exist
      const container = document.createElement('div');
      container.className = 'notifications';
      document.body.appendChild(container);
    }

    notifications.forEach(notification => {
      this.showNotification(notification);
    });
  }

  showNotification(notification) {
    const notificationElement = document.createElement('div');
    notificationElement.className = `notification notification-${notification.type}`;
    notificationElement.innerHTML = `
      <div class="notification-content">
        <h4>${notification.title}</h4>
        <p>${notification.message}</p>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    const container = document.querySelector('.notifications');
    container.appendChild(notificationElement);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (notificationElement.parentElement) {
        notificationElement.remove();
      }
    }, 5000);
  }
}

// Initialize managers
const analyticsManager = new AnalyticsManager();
const contentManager = new ContentManager();
const notificationManager = new NotificationManager();

// Export for global use
window.AnalyticsManager = analyticsManager;
window.ContentManager = contentManager;
window.NotificationManager = notificationManager;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await analyticsManager.init();
  await contentManager.init();
  await notificationManager.init();
});
