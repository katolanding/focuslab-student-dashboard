# FocusLab — Estudia con intención

> Landing page + miniaplicación de productividad académica. Proyecto personal de portafolio creado con React, Vite y CSS responsive.

## Funcionalidades

- Landing page con presentación del producto y navegación.
- Panel de tareas: crear, editar, completar, filtrar y eliminar.
- Categorías, fechas de entrega y prioridades.
- Calendario mensual con fechas que contienen tareas.
- Temporizador Pomodoro: enfoque de 25 minutos y descansos de 5 y 15 minutos.
- Resumen de tareas pendientes, completadas, para hoy y porcentaje completado.
- Tema claro/oscuro.
- Persistencia local en el navegador mediante `localStorage`.
- Pruebas de utilidades con Node Test Runner y verificación con GitHub Actions.

## Ejecutar en tu PC

Necesitas **Node.js 20.19+ o 22+** y npm, con conexión a Internet para instalar dependencias la primera vez.

```powershell
npm install
npm run dev
```

Abre la dirección que aparezca en la terminal (habitualmente `http://localhost:5173`).

### Pruebas y versión de producción

```powershell
npm test
npm run build
npm run preview
```

## Publicar en GitHub Pages

1. Crea un repositorio público llamado **`focuslab-student-dashboard`** en tu cuenta de GitHub.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio, incluida la carpeta oculta `.github/workflows`.
3. En el repositorio, abre **Settings → Pages** y selecciona **Build and deployment → Source: GitHub Actions**.
4. Ve a **Actions → Deploy to GitHub Pages** y confirma que el flujo se ejecutó correctamente. Al subir cambios a `main`, la publicación volverá a desplegarse.
5. Tu URL prevista será `https://katolanding.github.io/focuslab-student-dashboard/` una vez que el despliegue termine correctamente.

**Nota:** `vite.config.js` contiene la ruta `/focuslab-student-dashboard/`. Si renombras el repositorio, cambia esa ruta también.

## Estructura

```text
src/App.jsx        Interfaz y funcionalidades del proyecto
src/styles.css     Diseño adaptable y temas claro/oscuro
src/utils.js       Fechas, validaciones y cálculos de tareas
src/main.jsx       Punto de entrada de React
tests/             Pruebas automatizadas
.github/workflows/ CI y despliegue GitHub Pages
```

## Validación actual

Las seis pruebas de `src/utils.js` se ejecutaron correctamente en el entorno de preparación. La compilación web completa debe comprobarse con `npm install` y `npm run build` en un entorno con acceso al registro npm.

## Alcance y privacidad

Esta es una **beta sin autenticación ni backend**. Las tareas se guardan solamente en `localStorage` del navegador que usas: no se sincronizan entre dispositivos ni se respaldan en la nube. El temporizador funciona mientras la pestaña permanece abierta; no pretende ser un cronómetro de precisión en segundo plano. No introduzcas datos sensibles reales. Las tareas iniciales son demostrativas.

## Próximas mejoras

- Accesibilidad: auditoría con Lighthouse y navegación por teclado.
- Filtros por fecha y búsqueda.
- Registro de sesiones Pomodoro y estadísticas históricas.
- Backend y cuentas con autenticación real, si se decide llevar a producción.

## Autoría

Proyecto de práctica y aprendizaje para portafolio de desarrollo frontend. Comprende las funcionalidades y realiza mejoras propias antes de presentarlo en entrevistas.
