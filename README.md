# Portafolio de Marco

Este es el sitio web de portafolio personal de Marco, construido con Next.js 15, Tailwind CSS y componentes de Radix UI. El sitio presenta una interfaz moderna y responsiva con secciones para hero, sobre mí, experiencia, proyectos, habilidades y contacto.

## Características

- **Diseño moderno**: Interfaz limpia y responsiva con animaciones suaves.
- **Optimización de rendimiento**: Carga diferida de componentes pesados y optimización de imágenes.
- **Accesibilidad**: Componentes accesibles con soporte para navegación por teclado.
- **Tema oscuro/claro**: Soporte para cambio de tema.
- **Animaciones**: Partículas de fondo y transiciones suaves.
- **Integración con WhatsApp**: Botón flotante para contacto directo.

## Tecnologías utilizadas

- **Framework**: Next.js 15
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes UI**: Radix UI
- **Iconos**: Lucide React
- **Formularios**: React Hook Form con Zod
- **Animaciones**: Tailwind CSS Animate
- **Análisis**: Vercel Analytics
- **Fuentes**: Geist

## Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/portafolio-marco.git
   cd portafolio-marco
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   pnpm install
   ```

3. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   pnpm dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta ESLint para verificar el código

## Estructura del proyecto

```
├── app/                    # Páginas y layout de Next.js
├── components/             # Componentes reutilizables
├── hooks/                  # Hooks personalizados
├── lib/                    # Utilidades y configuraciones
├── public/                 # Archivos estáticos
├── styles/                 # Estilos globales
└── package.json            # Dependencias y scripts
```

## Despliegue

Este proyecto está configurado para desplegarse en Vercel. Simplemente conecta tu repositorio de GitHub a Vercel y el despliegue se hará automáticamente.

También puedes desplegarlo manualmente ejecutando:
```bash
npm run build
npm run start
```

## Contribución

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Marco - [Tu email o LinkedIn]

Enlace del proyecto: [https://portafolio-marco.vercel.app](https://portafolio-marco.vercel.app)
