# AgriProfile Banana 🍌

Aplicación web para el registro y análisis de perfiles de racimos de banano en campo. Permite a los operadores capturar mediciones por lote, revisar el historial diario de perfiles y consultar promedios agregados por color de listón/semana de corte.

## Stack

- **React 18** (componentes funcionales + Hooks)
- **React Router v6** (`react-router-dom`) — enrutamiento entre pantallas
- **Vite** — bundler y servidor de desarrollo
- **Tailwind CSS** — estilos utilitarios
- **Material Symbols Outlined** — iconografía
- **Google Fonts (Inter)** — tipografía

## Estructura del proyecto

```
├── index.html                  # HTML raíz (Vite)
├── package.json
├── vite.config.js
├── tailwind.config.js          # Tokens de color/tipografía del design system
├── postcss.config.js
└── src/
    ├── main.jsx                 # Punto de entrada de React
    ├── index.css                # Tailwind + fuentes + scrollbar custom
    ├── App.jsx                  # Definición de rutas
    ├── components/
    │   ├── Icon.jsx              # Wrapper de Material Symbols
    │   ├── TopAppBar.jsx         # Header superior (logo, sync, cuenta)
    │   ├── Sidebar.jsx           # Nav lateral (desktop), usa NavLink
    │   ├── BottomNav.jsx         # Nav inferior (móvil), usa NavLink
    │   └── Layout.jsx            # Envuelve TopAppBar + Sidebar + BottomNav + <Outlet/>
    └── pages/
        ├── DataEntry.jsx         # Formulario de captura de racimo
        ├── DailyHistory.jsx      # Historial de registros del día
        └── AveragesDashboard.jsx # Promedios agregados por listón/semana
```

## Rutas

| Ruta         | Página                | Descripción                                                                 |
|--------------|-----------------------|-------------------------------------------------------------------------------|
| `/`          | Data Entry            | Formulario para capturar un nuevo perfil de racimo (lote, mano sub-basal y apical) |
| `/history`   | Daily History          | Tabla de registros del día con estado de salud por listón                    |
| `/averages`  | Averages Dashboard     | Tarjetas con promedios de grado, largo y dedos por color de listón/semana    |

Todas las rutas comparten el mismo `Layout` (header, sidebar de escritorio, nav inferior móvil).

## Funcionalidades por pantalla

### 1. Data Entry (`/`)
- Captura de **Número de Lote** y **Número de Manos**.
- Selector de **Color de Listón / Semana** (Yellow/8, Blue/9, Red/10, Green/11, Purple/12).
- Medición de **Mano Sub-basal** y **Mano Apical**: Grado (mm), Largo (cm), Número de Dedos.
- Botón "Save Profile" con estados `idle → saving → saved` (simulado con `setTimeout`, listo para conectarse a una API real).

### 2. Daily History (`/history`)
- Widgets resumen: Total de Perfiles, Zona Activa, Eficiencia, Última Sincronización.
- Tabla de registros con:
  - Barra lateral de color según el listón.
  - Badge de estado (Critical / Monitoring / Healthy / Growth) derivado del color de listón.
  - Botón de edición por fila (actualmente navega a `/` pasando el registro en `location.state.editEntry` — pendiente de precargar el formulario).
- Botón "Load Older Entries" (placeholder, listo para paginación).

### 3. Averages Dashboard (`/averages`)
- Toggle **General Averages / Filter by Lot** (el filtro por lote es un placeholder pendiente de implementar).
- Tarjeta por cada color de listón con:
  - Promedio de manos.
  - Promedios de Grado, Largo y Dedos para mano Sub-basal y Apical.
- Widgets decorativos: Yield Forecast (proyección de peso del racimo) y Zone Health Index.

## Datos de ejemplo (mock data)

Actualmente todas las pantallas usan datos estáticos definidos directamente en cada componente:
- `INITIAL_ENTRIES` en `DailyHistory.jsx`
- `RIBBON_DATA` en `AveragesDashboard.jsx`
- Estado inicial vacío del formulario en `DataEntry.jsx`

Estos deben reemplazarse por llamadas a una API/backend real cuando esté disponible.

## Cómo correr el proyecto

```bash
# Instalar dependencias
npm install

# Levantar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Previsualizar el build
npm run preview
```

## Pendientes / próximos pasos

- [ ] Conectar `DataEntry` a un backend (guardar el perfil realmente, no solo simular con `setTimeout`).
- [ ] Precargar el formulario de `DataEntry` cuando se navega desde "editar" en `DailyHistory` (leer `location.state.editEntry`).
- [ ] Implementar la vista "Filter by Lot" en `AveragesDashboard` (selector de lote + sus promedios específicos).
- [ ] Implementar "Load Older Entries" con paginación real en `DailyHistory`.
- [ ] Reemplazar los datos mock (`INITIAL_ENTRIES`, `RIBBON_DATA`) por datos de una API.
- [ ] Agregar autenticación / perfil real de operador (actualmente el avatar es un placeholder con iniciales "FO").
- [ ] Agregar página de Settings y Support (actualmente son enlaces sin funcionalidad en el Sidebar).

## Design tokens

Los colores, radios de borde y tamaños de tipografía originales del diseño (Material 3 style) están declarados en `tailwind.config.js`, tomados del prototipo HTML original de la aplicación.