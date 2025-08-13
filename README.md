# Career English Spark - React Native

Una aplicación móvil para mejorar el inglés profesional a través de preguntas diarias y retroalimentación con IA.

## Características

- 📱 Aplicación móvil nativa construida con React Native y Expo
- 🎯 Preguntas diarias para practicar inglés profesional
- 🤖 Retroalimentación con IA para mejorar las respuestas
- 📊 Seguimiento de progreso con estadísticas y rachas
- 🏆 Sistema de logros para mantener la motivación
- 🔐 Autenticación segura con Supabase

## Tecnologías

- React Native con Expo
- TypeScript para tipado estático
- Expo Router para navegación basada en archivos
- TanStack React Query para manejo de estado y cache
- React Hook Form con Zod para validación de formularios
- Supabase para backend y autenticación
- Expo Secure Store para almacenamiento seguro

## Arquitectura y Estructura del Proyecto

El proyecto utiliza Expo Router como único sistema de navegación. La carpeta `app/` contiene el árbol de rutas.

```
sparks-mobile/
├── app/
│   ├── _layout.tsx       # Layout raíz con Stack de navegación (Expo Router)
│   ├── index.tsx         # Pantalla inicial (Landing / Home)
│   ├── auth.tsx          # Pantalla de autenticación (login/registro)
│   └── dashboard.tsx     # Pantalla principal con preguntas y progreso
├── components/
│   ├── ui/               # Componentes de UI reutilizables (Button, Card, Input, etc.)
│   ├── ExternalLink.tsx
│   ├── HapticTab.tsx
│   └── ...
├── hooks/                # Custom hooks (useSupabaseAuth, useDailyQuestion, etc.)
├── lib/                  # Configuraciones y utilidades (por ejemplo Supabase)
├── constants/            # Colores y constantes compartidas
├── assets/               # Imágenes, fuentes y recursos estáticos
├── app.json              # Configuración de la app Expo
├── package.json          # Dependencias (main: "expo-router/entry")
└── tsconfig.json         # Configuración de TypeScript
```

Notas importantes:
- La entrada de la app está configurada con Expo Router mediante `"main": "expo-router/entry"` en `package.json`.
- No se utiliza `React Navigation` ni la carpeta `screens/`. Toda la navegación vive en `app/`.
- El Stack se declara en `app/_layout.tsx` y las rutas se mapean por archivo.

## Navegación (Expo Router)

- Rutas principales:
  - `/` → `app/index.tsx`
  - `/auth` → `app/auth.tsx`
  - `/dashboard` → `app/dashboard.tsx`
- El layout raíz define un Stack sin headers por defecto en `app/_layout.tsx`.
- Para navegar entre pantallas, utiliza los helpers de Expo Router (`router.push`, `router.replace`, etc.).

## Instalación

1. Clona el repositorio
   ```bash
   git clone <repository-url>
   cd sparks-mobile
   ```

2. Instala las dependencias
   ```bash
   npm install
   ```

3. Configura las variables de entorno (Supabase)
   Actualiza `lib/supabase.ts` con tus credenciales de Supabase:
   ```ts
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
   ```

4. Inicia el servidor de desarrollo
   ```bash
   npx expo start
   ```

Sugerencia: Si ves comportamientos extraños por caché, reincia con `expo start -c`.

## Desarrollo

### Comandos disponibles

- `npm start` - Inicia el servidor de desarrollo de Expo
- `npm run android` - Ejecuta en Android
- `npm run ios` - Ejecuta en iOS
- `npm run web` - Ejecuta en web
- `npm run lint` - Linter de código

## Estructura de datos

La aplicación maneja los siguientes tipos de datos principales:

- Question: Preguntas diarias con texto y metadatos
- UserStats: Estadísticas del usuario (racha, respuestas totales, puntuación promedio)
- Answer: Respuestas del usuario con retroalimentación

## Configuración de Supabase

Para usar la aplicación con Supabase real, necesitarás:

1. Crear un proyecto en https://supabase.com
2. Configurar las tablas necesarias:
   - `questions` - Preguntas diarias
   - `user_stats` - Estadísticas de usuarios
   - `answers` - Respuestas de usuarios
3. Configurar las políticas de seguridad (RLS)
4. Actualizar las credenciales en `lib/supabase.ts`

## Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.
