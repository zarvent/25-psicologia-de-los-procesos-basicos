🧠 Psicología y Código: Un Experimento Visual
¡Hola! Este es un pequeño repositorio que busca exponer el material que leo y estudio.

No es una aplicación compleja, sino más bien un ejercicio de cómo podemos usar la tecnología para presentar y divulgar conocimiento de una forma diferente.

Puedes ver el proyecto en vivo aquí: <https://zarvent.github.io/25-psicologia-de-los-procesos-basicos/>

¿Cómo está hecho? (La parte técnica)
La filosofía detrás del código fue mantenerlo lo más simple y ligero posible. No hay frameworks pesados ni pasos de compilación complejos.

HTML5: Usé HTML semántico para estructurar el contenido. Esto ayuda a que sea más accesible y fácil de entender para los navegadores y otras tecnologías.

Tailwind CSS: Para el diseño, utilicé Tailwind. Es un framework que permite construir interfaces de forma rápida y consistente sin escribir mucho CSS personalizado. El diseño se adapta bien a móviles y a pantallas grandes.

JavaScript (puro): Un poquito de JavaScript para añadir algunas animaciones sutiles al hacer scroll. La idea era que la página se sintiera un poco más viva sin sacrificar el rendimiento.

GitHub Actions: Hay un pequeño flujo de trabajo automatizado que publica el sitio en GitHub Pages cada vez que se actualiza la rama main. Así, los cambios se reflejan en vivo de forma automática.

El flujo del contenido
El proceso es bastante directo:

La "Materia Prima" (materia-prima.md): Todo el contenido académico vive en un archivo Markdown. Esto es genial porque permite que alguien (quizás un psicólogo) pueda editar el texto fácilmente sin tener que tocar una sola línea de código.

La Presentación (articulo.html): Este archivo HTML toma el contenido del Markdown y le da formato. Aquí es donde se añaden los colores, las tipografías, los iconos y las pequeñas interacciones.

La Portada (index.html): Una página de bienvenida sencilla que presenta el proyecto y te invita a leer el artículo.

¿Qué vas a encontrar?
Un diseño limpio: Pensado para que la lectura sea cómoda y sin distracciones.

Pequeñas visualizaciones: Algunos conceptos se apoyan en gráficos SVG para hacerlos más fáciles de digerir.

Carga rápida: Al no tener grandes librerías, la página carga muy rápido.

Código abierto y simple: El código está aquí para que cualquiera pueda verlo, usarlo o inspirarse en él.

Ideas para el futuro (o para quien quiera colaborar)
Aunque este es un proyecto pequeño, siempre hay espacio para crecer. Si a alguien le inspira, aquí hay algunas ideas:

Añadir más informacion: Se podrían agregar nuevas cosas que puedan pulir y mejorar el contenido de la pagina.

Crear un mazo de Anki: Un mazo descargable para repasar los conceptos clave.

Hacerlo multilingüe: Ofrecer el mismo contenido en otros idiomas, como inglés.

Conectar un CMS: Para que la gestión del contenido sea aún más fácil, se podría conectar a un CMS sin cabeza (Headless CMS).

Crear componentes reutilizables: Las "tarjetas" o los diagramas podrían convertirse en componentes que se puedan usar en otros proyectos.

¿Quieres usarlo o proponer mejoras?
¡Adelante! Siéntete libre de clonar el repositorio, experimentar con él o proponer cualquier cambio. Toda idea es bienvenida.

Para probarlo en tu máquina
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

Para contribuir
La forma más sencilla es seguir el flujo estándar de GitHub: haz un "fork", crea una nueva rama con tus cambios y luego abre un "Pull Request".

Estructura del Repositorio
.
├── .github/
│   └── workflows/
│       └── gh-pages.yml      # El flujo que despliega el sitio
├── articulo.html             # El artículo principal
├── index.html                # La página de bienvenida
├── materia-prima.md          # El texto académico original
└── README.md                 # Este archivo que estás leyendo
