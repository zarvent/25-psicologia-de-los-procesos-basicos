/**
 * Interactive Feedback Component
 * Real-time user feedback collection with Firebase integration
 */

class FeedbackComponent {
  constructor() {
    this.currentRating = 0;
    this.initialized = false;
  }

  async init() {
    // Wait for Firebase to be available
    if (window.ContentManager) {
      this.initialized = true;
      this.render();
      this.attachEventListeners();
    } else {
      // Retry after 1 second
      setTimeout(() => this.init(), 1000);
    }
  }

  render() {
    const container = document.querySelector('.feedback-container');
    if (!container) return;

    const currentSection = this.getCurrentSection();
    const html = `
      <div class="feedback-form">
        <h3>💬 Tu Opinión Nos Importa</h3>
        <p>Ayúdanos a mejorar esta sección: <strong>${currentSection}</strong></p>

        <div class="form-group">
          <label>¿Qué te pareció esta sección?</label>
          <div class="rating-group">
            ${[1, 2, 3, 4, 5].map(rating => `
              <span class="rating-star" data-rating="${rating}">★</span>
            `).join('')}
          </div>
        </div>

        <div class="form-group">
          <label for="feedback-comment">Comentario (opcional)</label>
          <textarea id="feedback-comment" placeholder="Comparte tu experiencia o sugerencias..."></textarea>
        </div>

        <button class="submit-btn" id="submit-feedback">
          Enviar Feedback
        </button>
      </div>
    `;

    container.innerHTML = html;
  }

  attachEventListeners() {
    // Rating stars
    document.querySelectorAll('.rating-star').forEach(star => {
      star.addEventListener('click', (e) => {
        const rating = parseInt(e.target.dataset.rating);
        this.setRating(rating);
      });

      star.addEventListener('mouseenter', (e) => {
        const rating = parseInt(e.target.dataset.rating);
        this.highlightStars(rating);
      });
    });

    // Reset highlighting on mouse leave
    document.querySelector('.rating-group').addEventListener('mouseleave', () => {
      this.highlightStars(this.currentRating);
    });

    // Submit button
    document.getElementById('submit-feedback').addEventListener('click', () => {
      this.submitFeedback();
    });
  }

  setRating(rating) {
    this.currentRating = rating;
    this.highlightStars(rating);
  }

  highlightStars(rating) {
    document.querySelectorAll('.rating-star').forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  async submitFeedback() {
    if (!this.initialized) {
      this.showNotification('Sistema no disponible', 'error');
      return;
    }

    const comment = document.getElementById('feedback-comment').value;
    const submitBtn = document.getElementById('submit-feedback');

    if (this.currentRating === 0) {
      this.showNotification('Por favor selecciona una calificación', 'warning');
      return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="loading-spinner"></span> Enviando...';

    try {
      const currentSection = this.getCurrentSection();
      const success = await window.ContentManager.submitFeedback(
        currentSection,
        comment,
        this.currentRating
      );

      if (success) {
        this.showNotification('¡Gracias por tu feedback!', 'success');
        this.resetForm();
      } else {
        this.showNotification('Error al enviar feedback', 'error');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      this.showNotification('Error al enviar feedback', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar Feedback';
    }
  }

  resetForm() {
    this.currentRating = 0;
    this.highlightStars(0);
    document.getElementById('feedback-comment').value = '';
  }

  getCurrentSection() {
    const path = window.location.pathname;
    const matches = path.match(/\/sections\/([^\/]+)/);
    if (matches) {
      return matches[1].replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase());
    }
    return 'Página Principal';
  }

  showNotification(message, type) {
    if (window.NotificationManager) {
      window.NotificationManager.showNotification({
        title: type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : 'Aviso',
        message: message,
        type: type
      });
    }
  }
}

// Initialize feedback component
const feedbackComponent = new FeedbackComponent();
document.addEventListener('DOMContentLoaded', () => {
  feedbackComponent.init();
});

// Export for global use
window.FeedbackComponent = feedbackComponent;
