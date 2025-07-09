# Psicología de los Procesos Básicos

Un libro digital interactivo sobre la ciencia de la mente, optimizado para GitHub Pages con Jekyll y arquitectura serverless moderna.

## 🚀 Quick Start

### Prerequisites

- **Ruby 3.0+** - Download from [RubyInstaller.org](https://rubyinstaller.org/) for Windows
- **Jekyll and Bundler** - Install with `gem install jekyll bundler`
- **Node.js 18+** - For development tools and linting
- **Firebase Account** - For advanced analytics and real-time features

### Installation

1. **Clone the repository**

   ```powershell
   git clone https://github.com/yourusername/psicologia-procesos-basicos.git
   cd psicologia-procesos-basicos
   ```

2. **Install dependencies**

   ```powershell
   bundle install
   npm install
   ```

3. **Configure Firebase (Optional)**

   ```powershell
   # Edit firebase-config.js with your Firebase project credentials
   # Replace placeholder values with your actual Firebase config
   ```

4. **Start the development server**

   ```powershell
   bundle exec jekyll serve
   ```

5. **Open in browser**
   Navigate to `http://localhost:4000`

> **📖 For detailed setup instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)**

## 📚 Contenido

Este libro digital cubre los fundamentos de la psicología científica:

1. **Introducción** - ¿Qué es la psicología de los procesos básicos?
2. **Historia y Antecedentes** - Explicaciones antes de la ciencia
3. **Psicología del Sentido Común** - Cómo todos intentamos ser psicólogos
4. **El Obstáculo** - Por qué nos cuesta aceptar la psicología científica
5. **Método Científico** - El nacimiento de la psicología experimental
6. **Los Tres Principios** - Empírica, Pública y Replicable
7. **Conclusión** - De la teoría a la práctica

## ✨ Características

### Core Features

- **📱 Responsive Design** - Optimizado para desktop, tablet y móvil
- **🌙 Modo Oscuro/Claro** - Toggle automático con preferencias del usuario
- **🔍 Búsqueda Avanzada** - Búsqueda en tiempo real del contenido
- **📑 Tabla de Contenidos** - Navegación inteligente por secciones
- **📊 Barra de Progreso** - Seguimiento del progreso de lectura
- **🔗 Navegación Secuencial** - Enlaces anterior/siguiente entre capítulos
- **🎯 Accesibilidad** - Cumple estándares WCAG 2.1
- **⚡ Performance** - Optimizado para carga rápida
- **📤 Botones de Compartir** - Fácil compartir en redes sociales

### Advanced Features (Serverless Architecture)

- **🔥 Firebase Integration** - Real-time analytics and user feedback
- **📊 Dynamic Analytics Dashboard** - Live reading statistics and popular sections
- **💬 Interactive Feedback System** - User comments and ratings with real-time updates
- **🔔 Smart Notifications** - Alert system for important updates
- **🤖 Automated CI/CD** - GitHub Actions pipeline with quality checks
- **📈 Performance Monitoring** - Core Web Vitals tracking and optimization

## 🛠️ Tecnologías Utilizadas

- **Jekyll** - Generador de sitios estáticos (compatible con GitHub Pages)
- **HTML5** - Markup semántico
- **CSS3** - Sistema de diseño personalizado con variables CSS
- **JavaScript Vanilla** - Funcionalidad interactiva sin dependencias
- **SVG** - Iconografía escalable
- **Markdown** - Contenido estructurado

## 🏗️ Arquitectura del Proyecto

```
📁 Estructura del Proyecto
├── 📁 _layouts/          # Plantillas Jekyll
│   ├── default.html      # Layout principal
│   └── section.html      # Layout para secciones
├── 📁 _sections/         # Contenido del libro
│   ├── introduccion.md
│   ├── historia.md
│   ├── sentido-comun.md
│   ├── obstaculo.md
│   ├── metodo-cientifico.md
│   ├── principios.md
│   └── conclusion.md
├── 📁 assets/            # Recursos estáticos
│   ├── 📁 css/
│   │   └── main.css      # Estilos principales
│   ├── 📁 js/
│   │   └── main.js       # JavaScript principal
│   └── 📁 images/        # Imágenes y gráficos
├── _config.yml           # Configuración Jekyll
├── index.html            # Página de inicio
├── Gemfile              # Dependencias Ruby
└── README.md            # Este archivo
```

## 🚀 Deployment en GitHub Pages

### Opción 1: Fork y Deploy (Recomendado)

1. **Fork este repositorio** en tu cuenta de GitHub
2. **Renombra el repositorio** a `tu-usuario.github.io` o mantén el nombre actual
3. **Ve a Settings** → **Pages**
4. **Selecciona Source**: Deploy from a branch
5. **Selecciona Branch**: `main` o `master`
6. **Folder**: `/ (root)`
7. **Guarda los cambios**

El sitio estará disponible en:

- Si renombraste: `https://tu-usuario.github.io/`
- Si mantuviste el nombre: `https://tu-usuario.github.io/25-psicologia-de-los-procesos-basicos/`

### Opción 2: Clonar y Personalizar

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/25-psicologia-de-los-procesos-basicos.git
cd 25-psicologia-de-los-procesos-basicos

# Personalizar configuración
# Edita _config.yml con tu información

# Subir cambios
git add .
git commit -m "Personalización inicial"
git push origin main
```

### Opción 3: Desarrollo Local

```bash
# Instalar Jekyll (requiere Ruby)
gem install bundler jekyll

# Instalar dependencias
bundle install

# Servir localmente
bundle exec jekyll serve

# Abrir en navegador
# http://localhost:4000
```

## ⚙️ Configuración

### Archivo `_config.yml`

Personaliza las siguientes variables:

```yaml
# Información del sitio
title: "Tu Título"
description: "Tu descripción"
url: "https://tu-usuario.github.io"
baseurl: "/tu-repositorio"

# Autor
author:
  name: "Tu Nombre"
  email: "tu@email.com"

# Google Analytics (opcional)
google_analytics: "GA_TRACKING_ID"
```

### Personalización del Contenido

1. **Editar secciones**: Modifica los archivos en `_sections/`
2. **Añadir nuevas secciones**: Crea nuevos archivos `.md` con el front matter apropiado
3. **Modificar estilos**: Edita `assets/css/main.css`
4. **Ajustar funcionalidad**: Modifica `assets/js/main.js`

## 🎨 Sistema de Diseño

### Tokens de Diseño

```css
/* Colores principales */
--color-primary: #2563eb;
--color-secondary: #7c3aed;
--color-accent: #f59e0b;

/* Tipografía */
--font-family-serif: 'Crimson Text', Georgia, serif;
--font-family-sans: 'Inter', -apple-system, sans-serif;

/* Espaciado */
--space-4: 1rem;
--space-8: 2rem;
--space-16: 4rem;
```

### Componentes Disponibles

- **Callouts**: `.callout`, `.callout-info`, `.callout-warning`
- **Cards**: `.process-card`, `.feature-card`, `.chapter-card`
- **Grids**: `.process-grid`, `.features-grid`, `.chapters-grid`
- **Buttons**: `.btn`, `.btn-primary`, `.btn-secondary`

## 📱 Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

## ♿ Accesibilidad

El sitio implementa:

- **WCAG 2.1 AA** compliance
- **Navegación por teclado** completa
- **Screen reader** compatible
- **Contraste de colores** adecuado
- **Texto alternativo** para imágenes
- **Landmarks semánticos** ARIA

## 🔧 Mantenimiento

### Actualizar Contenido

1. **Editar archivos Markdown** en `_sections/`
2. **Commit y push** los cambios
3. **GitHub Pages** se actualiza automáticamente

### Añadir Nuevas Funcionalidades

1. **CSS**: Añadir estilos en `assets/css/main.css`
2. **JavaScript**: Extender `assets/js/main.js`
3. **Layouts**: Crear nuevos layouts en `_layouts/`

### Optimización de Performance

- **Imágenes**: Usa formatos WebP/AVIF cuando sea posible
- **CSS**: Los estilos están minificados automáticamente
- **JavaScript**: Código vanilla sin dependencias externas
- **Caching**: GitHub Pages incluye caching automático

## 📊 Analytics

Para habilitar Google Analytics:

1. **Crear cuenta** en Google Analytics
2. **Obtener Tracking ID**
3. **Añadir a `_config.yml`**:

```yaml
google_analytics: "GA_TRACKING_ID"
```

## 🐛 Troubleshooting

### Problemas Comunes

**Error 404 en GitHub Pages:**

- Verifica que `baseurl` en `_config.yml` coincida con el nombre del repositorio
- Asegúrate de que GitHub Pages esté habilitado en Settings

**Estilos no cargan:**

- Verifica la ruta en `_layouts/default.html`
- Asegúrate de que `assets/css/main.css` existe

**JavaScript no funciona:**

- Abre DevTools y revisa errores en Console
- Verifica que `assets/js/main.js` se carga correctamente

### Logs de Build

Si GitHub Pages falla al construir:

1. Ve a **Actions** tab en tu repositorio
2. Revisa el último **pages-build-deployment**
3. Verifica errores en los logs

## 🤝 Contribuir

1. **Fork** el proyecto
2. **Crea** una branch para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Commit** tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. **Push** a la branch (`git push origin feature/AmazingFeature`)
5. **Abre** un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Jekyll** - Generador de sitios estáticos
- **GitHub Pages** - Hosting gratuito
- **Inter & Crimson Text** - Fuentes tipográficas
- **Lucide** - Iconografía SVG

---

**¿Preguntas?** Abre un [Issue](https://github.com/tu-usuario/25-psicologia-de-los-procesos-basicos/issues) en GitHub.
