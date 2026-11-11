# SprintLab ISP — Mesa de Soporte y Simulación Scrum

Aplicación para la gestión trazable de reportes de fallas de internet en proveedores de servicios (ISP), desarrollada como parte de la investigación académica de la **Corporación Universitaria Tecnológica del Oriente** (Seminario de Actualización N6 Gr B · Daniel Moreno, Jesús Telmo Nene, Astrid Villota · Docente: Leydi Johana Polo Amador · Noviembre de 2026).

---

## 🚀 Requisitos Previos

Asegúrate de tener instalado en tu computadora:
- **Node.js** (versión 18.x o superior, recomendado v20 LTS o v22): [Descargar Node.js](https://nodejs.org/)
- **npm** (viene incluido con Node.js) o gestor alternativo (**pnpm**, **yarn** o **bun**).

---

## 🛠️ Pasos para Ejecutar en Local

### 1. Clonar o descargar el proyecto
Si descargaste el archivo ZIP o clonaste el repositorio, abre la terminal o consola de comandos (Command Prompt / PowerShell / Terminal de macOS o Linux) y sitúate en la carpeta del proyecto:

```bash
cd ruta/a/tu/proyecto
```

### 2. Instalar las dependencias
Ejecuta el siguiente comando para instalar todos los paquetes necesarios (`react`, `vite`, `tailwindcss`, `lucide-react`, etc.):

```bash
npm install
```

### 3. Iniciar el servidor de desarrollo local
Una vez finalizada la instalación, ejecuta:

```bash
npm run dev
```

La consola te mostrará una salida como esta:

```
  VITE v8.3.0  ready in 180 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: http://0.0.0.0:3000/
```

### 4. Abrir en el navegador
Abre tu navegador web favorito (Chrome, Firefox, Edge, Safari) e ingresa a:

👉 **[http://localhost:3000](http://localhost:3000)**

¡Listo! Ya tienes la Mesa de Soporte y el simulador de Scrum funcionando en tu máquina local.

---

## 📦 Comandos Disponibles

- `npm run dev`: Inicia el servidor de desarrollo local con recarga rápida en el puerto 3000.
- `npm run build`: Compila la aplicación optimizada para producción en la carpeta `dist/`.
- `npm run preview`: Permite previsualizar localmente la compilación de producción.
- `npm run lint`: Ejecuta el verificador de tipos de TypeScript (`tsc --noEmit`).

---

## 📋 Módulos y Funcionalidades

1. **Mesa de Soporte Operativa**:
   - Formulario de captura y validación con detección de espacios en blanco (`.trim()`).
   - Asignación secuencial de folios (`INT-001`, `INT-002`, ...).
   - Generación de eventos de auditoría tanto para reportes válidos como rechazados.
   - Búsqueda por folio (PB05), asignación a técnicos (PB07) y cierre documentado (PB08).
   - Exportación de bitácora en CSV y JSON.
   - Selector entre modo memoria volátil (`v0.1` - Sprint 1) y modo persistente con almacenamiento local (`v0.2` - Sprint 2).

2. **Documentación del Sprint & Scrum**:
   - Tablero Kanban con Product Backlog priorizado (PB01 a PB08) y curva Burndown (13 a 0 pts).
   - Actas y diálogos de Planning, Daily Scrums (Días 1 a 5), Review y Retrospectiva.
   - Matriz de pruebas automatizadas en vivo (CP01 a CP04).
   - Marco normativo (Ley 1581 de 2012, CRC Resolución 5111 de 2017) y referencias en formato APA 7.ª edición.
