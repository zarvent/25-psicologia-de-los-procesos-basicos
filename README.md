🧠 Psicología y Código: Un Experimento Visual
¡Hola! Este es un pequeño repositorio que busca exponer el material que leo y estudio. No es una aplicación compleja, sino más bien un ejercicio de cómo podemos usar la tecnología para presentar y divulgar conocimiento de una forma diferente.

<p align="center">
<a href="https://zarvent.github.io/25-psicologia-de-los-procesos-basicos/" title="Ver Proyecto">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Ver_Proyecto_en_Vivo-23a6d5%3Fstyle%3Dfor-the-badge%26logo%3Dgoogle-chrome%26logoColor%3Dwhite" alt="Ver Proyecto en Vivo"/>
</a>
</p>

🛠️ ¿Cómo está hecho? (La Parte Técnica)
La filosofía detrás del código fue mantenerlo lo más simple y ligero posible. No hay frameworks pesados ni pasos de compilación complejos.

Tecnología

Propósito

🌐 HTML5

Se usó HTML semántico para estructurar el contenido, mejorando la accesibilidad (a11y) y el SEO.

🎨 Tailwind CSS

Un framework "utility-first" para un diseño rápido, consistente y completamente responsivo.

✨ JavaScript (Puro)

Un toque de JS para animaciones sutiles (IntersectionObserver) que mejoran la experiencia sin sacrificar rendimiento.

🚀 GitHub Actions

Un flujo de CI/CD que despliega automáticamente cada cambio de la rama main a GitHub Pages.

El Flujo del Contenido
El proceso es bastante directo y separa el contenido de la presentación:

✍️ La "Materia Prima" (materia-prima.md): Todo el contenido académico vive en un archivo Markdown. Esto es genial porque permite que un experto en la materia pueda editar el texto fácilmente sin tocar una sola línea de código.

🖼️ La Presentación (articulo.html): Este archivo HTML toma el contenido del Markdown y le da formato. Aquí es donde se añaden los colores, las tipografías, los iconos y las pequeñas interacciones.

🚪 La Portada (index.html): Una página de bienvenida sencilla que presenta el proyecto y te invita a leer el artículo.

🔭 ¿Qué vas a encontrar?
🎨 Un diseño limpio: Pensado para que la lectura sea cómoda y sin distracciones.

📊 Pequeñas visualizaciones: Algunos conceptos se apoyan en gráficos SVG para hacerlos más fáciles de digerir.

⚡ Carga rápida: Al no tener grandes librerías, la página carga muy rápido.

📖 Código abierto y simple: El código está aquí para que cualquiera pueda verlo, usarlo o inspirarse en él.

🚀 Ideas para el futuro (o para quien quiera colaborar)
Aunque este es un proyecto pequeño, siempre hay espacio para crecer. Si a alguien le inspira, aquí hay una lista de ideas:

[ ] Añadir más información: Se podrían agregar nuevas cosas que puedan pulir y mejorar el contenido de la pagina.

[ ] Crear un mazo de Anki: Un mazo descargable para repasar los conceptos clave mediante repetición espaciada.

[ ] Hacerlo multilingüe: Ofrecer el mismo contenido en otros idiomas, como inglés.

[ ] Conectar un CMS: Para que la gestión del contenido sea aún más fácil, se podría conectar a un CMS sin cabeza (Headless CMS).

[ ] Crear componentes reutilizables: Las "tarjetas" o los diagramas podrían convertirse en Web Components para usarlos en otros proyectos.

🙌 ¿Quieres usarlo o proponer mejoras?
¡Adelante! Siéntete libre de clonar el repositorio, experimentar con él o proponer cualquier cambio. Toda idea es bienvenida.

<details>
<summary><strong>Haz clic aquí para ver cómo probarlo en tu máquina</strong></summary>

Para probarlo localmente
Clona el repositorio:

git clone [https://github.com/zarvent/25-psicologia-de-los-procesos-basicos.git](https://github.com/zarvent/25-psicologia-de-los-procesos-basicos.git)
cd 25-psicologia-de-los-procesos-basicos

Abre los archivos:
Puedes abrir index.html o articulo.html directamente en tu navegador.

(Opcional) Usa un servidor local:
Para una experiencia más realista, puedes levantar un servidor local simple. Si tienes Python:

# Para Python 3

python -m http.server

Y luego visitas <http://localhost:8000> en tu navegador.

</details>

<details>
<summary><strong>Haz clic aquí para ver cómo contribuir</strong></summary>

Flujo de Contribución
La forma más sencilla es seguir el flujo estándar de GitHub:

Haz un "Fork" del repositorio.

Crea una nueva rama para tu funcionalidad o corrección (git checkout -b feature/mi-idea-genial).

Realiza tus cambios y haz commit de ellos con mensajes claros.

Haz push a tu rama (git push origin feature/mi-idea-genial).

Abre un "Pull Request" hacia la rama main del repositorio original.

</details>

📂 Estructura del Repositorio
.
├── .github/
│   └── workflows/
│       └── gh-pages.yml      # 🤖 El flujo que despliega el sitio
├── articulo.html             # 📄 El artículo principal
├── index.html                # 🏠 La página de bienvenida
├── materia-prima.md          # ✍️ El texto académico original
└── README.md                 # Este archivo que estás leyendo
