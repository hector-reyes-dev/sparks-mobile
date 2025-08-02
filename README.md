# Career English Spark - React Native

Una aplicación móvil para mejorar el inglés profesional a través de preguntas diarias y retroalimentación con IA.

## Características

- 📱 **Aplicación móvil nativa** construida con React Native y Expo
- 🎯 **Preguntas diarias** para practicar inglés profesional
- 🤖 **Retroalimentación con IA** para mejorar las respuestas
- 📊 **Seguimiento de progreso** con estadísticas y rachas
- 🏆 **Sistema de logros** para mantener la motivación
- 🔐 **Autenticación segura** con Supabase

## Tecnologías

- **React Native** con Expo
- **TypeScript** para tipado estático
- **React Navigation** para navegación
- **React Query** para manejo de estado y cache
- **React Hook Form** con Zod para validación de formularios
- **Supabase** para backend y autenticación
- **Expo Secure Store** para almacenamiento seguro

## Estructura del Proyecto

```
sparks-mobile/
├── components/
│   └── ui/           # Componentes de UI reutilizables
├── hooks/            # Custom hooks
├── lib/              # Configuraciones y utilidades
├── screens/          # Pantallas principales
├── App.tsx           # Componente principal
└── package.json      # Dependencias
```

## Instalación

1. **Clona el repositorio**
   ```bash
   git clone <repository-url>
   cd sparks-mobile
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   
   Actualiza `lib/supabase.ts` con tus credenciales de Supabase:
   ```typescript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npx expo start
   ```

## Desarrollo

### Comandos disponibles

- `npm start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en web

### Estructura de datos

La aplicación maneja los siguientes tipos de datos principales:

- **Question**: Preguntas diarias con texto y metadatos
- **UserStats**: Estadísticas del usuario (racha, respuestas totales, puntuación promedio)
- **Answer**: Respuestas del usuario con retroalimentación

### Pantallas principales

1. **LandingScreen**: Página de bienvenida con información del app
2. **AuthScreen**: Autenticación (login/registro)
3. **DashboardScreen**: Pantalla principal con preguntas y progreso

## Configuración de Supabase

Para usar la aplicación con Supabase real, necesitarás:

1. Crear un proyecto en [Supabase](https://supabase.com)
2. Configurar las tablas necesarias:
   - `questions` - Preguntas diarias
   - `user_stats` - Estadísticas de usuarios
   - `answers` - Respuestas de usuarios
3. Configurar las políticas de seguridad (RLS)
4. Actualizar las credenciales en `lib/supabase.ts`

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.
