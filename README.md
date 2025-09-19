# OnControl - Sistema de Monitoreo IoT para Pacientes Oncológicos

Bienvenido al frontend de **OnControl**, una plataforma de monitoreo de signos vitales para pacientes oncológicos que utiliza dispositivos IoT.

## 🚀 Empezando

Sigue estos pasos para tener el proyecto corriendo en tu máquina local.

### Prerrequisitos

Asegúrate de tener instalado **Node.js** (versión 18 o superior) y **npm** (que viene con Node.js).

### 🛠️ Instalación

1.  Clona el repositorio en tu máquina local:

    ```bash
    git clone https://github.com/WiJeGo/OnControlFrontedPrueba.git
    ```

2.  Navega al directorio del proyecto:

    ```bash
    cd OnControlFrontedPrueba
    ```

3.  Instala las dependencias del proyecto usando `npm`:

    ```bash
    npm install
    ```

-----

## 🏃 Corriendo el Proyecto

Una vez que las dependencias estén instaladas, puedes iniciar el servidor de desarrollo.

1.  Inicia la aplicación en modo de desarrollo:

    ```bash
    npm run dev
    ```

2.  Abre tu navegador y visita la siguiente dirección:
    `http://localhost:3000`

El proyecto se recargará automáticamente al hacer cambios en el código.

-----

## 📂 Estructura del Proyecto

La arquitectura del proyecto está basada en Next.js, con la siguiente estructura de carpetas principal:

  * **`app/`**: Contiene las rutas y páginas de la aplicación.
  * **`components/`**: Componentes reutilizables, organizados por funcionalidad (`auth`, `layout`, `wireframes`).
  * **`data/`**: Archivos de datos locales, como `db.json`, utilizados para maquetar la interfaz.
  * **`public/`**: Archivos estáticos como imágenes y assets.

-----

## 🔧 Tecnologías Usadas

  * **Next.js**: Framework de React para el desarrollo de la aplicación.
  * **TypeScript**: Para un desarrollo más seguro y escalable.
  * **Tailwind CSS**: Para el estilizado rápido y modular.
  * **shadcn/ui**: Componentes de UI accesibles y personalizables.
  * **Recharts**: Para la visualización de datos en gráficos.
  * **Lucide React**: Iconos vectoriales para la interfaz.
