# 👥 User Management System

Sistema CRUD (Create, Read, Update, Delete) para gestión de usuarios desarrollado con React, TypeScript y Vite.

## 🚀 Características

- ✅ Crear nuevos usuarios
- ✅ Listar todos los usuarios
- ✅ Editar información de usuarios
- ✅ Eliminar usuarios
- ✅ Validación de formularios con Zod
- ✅ Generación de avatares automáticos
- ✅ Interfaz responsiva con Tailwind CSS
- ✅ Integración con API backend

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Librería de interfaz de usuario
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de CSS
- **shadcn/ui** - Componentes de UI

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **Render.com** - Hosting del backend

## 📋 Prerrequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- Backend desplegado en Render.com

## 🔧 Instalación

1. **Clona el repositorio**
```bash
git clone https://github.com/tu-usuario/tu-proyecto.git
cd tu-proyecto
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:
```env
VITE_API_URL=https://tu-backend.onrender.com
```

4. **Inicia el servidor de desarrollo**
```bash
npm run dev
```

5. **Abre tu navegador**
```
http://localhost:5173
```

## 📁 Estructura del Proyecto

```
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # Componentes reutilizables
│   │   └── ui/         # Componentes de UI (shadcn)
│   ├── App.tsx         # Componente principal
│   ├── main.tsx        # Punto de entrada
│   └── index.css       # Estilos globales
├── .env                # Variables de entorno
├── index.html          # HTML principal
├── package.json        # Dependencias
├── tsconfig.json       # Configuración TypeScript
├── vite.config.ts      # Configuración Vite
└── tailwind.config.js  # Configuración Tailwind
```

## 🎯 Uso

### Crear un Usuario
1. Completa el formulario con los datos requeridos
2. Opcionalmente, haz clic en "Boy" o "Girl" para asignar un avatar
3. Haz clic en "Create"

### Editar un Usuario
1. Haz clic en el botón "Edit" del usuario que deseas modificar
2. Actualiza la información en el formulario
3. Haz clic en "Update"

### Eliminar un Usuario
1. Haz clic en el botón "Delete" del usuario
2. El usuario será eliminado inmediatamente

## 🔑 Validaciones del Formulario

- **First Name**: Mínimo 2 caracteres
- **Last Name**: Mínimo 2 caracteres
- **Email**: Formato de email válido
- **Password**: Mínimo 6 caracteres
- **Birthday**: Fecha válida
- **Image URL**: Opcional

## 🌐 API Endpoints

```
GET    /users       # Obtener todos los usuarios
GET    /users/:id   # Obtener un usuario por ID
POST   /users       # Crear un nuevo usuario
PUT    /users/:id   # Actualizar un usuario
DELETE /users/:id   # Eliminar un usuario
```

## 📦 Scripts Disponibles

```bash
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run preview      # Vista previa de la build de producción
npm run lint         # Ejecuta el linter
```

## 🚀 Despliegue

### Opción 1: Vercel
```bash
npm run build
vercel --prod
```

### Opción 2: Netlify
```bash
npm run build
# Arrastra la carpeta 'dist' a Netlify
```

### Opción 3: GitHub Pages
```bash
npm run build
# Configura GitHub Pages para usar la carpeta 'dist'
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Tu Nombre**
- GitHub: [@tu-usuario](https://github.com/tu-usuario)
- Email: tu-email@ejemplo.com

## 🙏 Agradecimientos

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Avatar Generator](https://avatar.iran.liara.run/)

---

⭐️ Si este proyecto te fue útil, considera darle una estrella en GitHub