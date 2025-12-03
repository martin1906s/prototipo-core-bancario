# 🚀 Comandos Útiles - Core Bancario

## 📦 Instalación y Configuración

### Instalar dependencias
```bash
npm install
```

### Limpiar caché de Metro
```bash
npx expo start -c
```

### Reinstalar node_modules
```bash
rm -rf node_modules
npm install
```

---

## 🏃 Ejecutar la Aplicación

### Iniciar el servidor de desarrollo
```bash
npm start
# o
npx expo start
```

### Ejecutar en Android
```bash
npm run android
# o
npx expo start --android
```

### Ejecutar en iOS (solo Mac)
```bash
npm run ios
# o
npx expo start --ios
```

### Ejecutar en Web
```bash
npm run web
# o
npx expo start --web
```

---

## 🔍 Desarrollo

### Ver logs en tiempo real
```bash
npx expo start --dev-client
```

### Modo túnel (para compartir)
```bash
npx expo start --tunnel
```

### Limpiar todo y reiniciar
```bash
npx expo start -c --dev-client
```

---

## 📱 Testing con Expo Go

### Escanear QR desde terminal
1. Ejecuta `npm start`
2. Abre Expo Go en tu dispositivo
3. Escanea el código QR que aparece en la terminal

### Atajos del teclado en terminal:
- `a` - Abrir en Android
- `i` - Abrir en iOS
- `w` - Abrir en web
- `r` - Recargar app
- `m` - Alternar menú
- `j` - Abrir debugger
- `c` - Limpiar terminal

---

## 🛠️ Mantenimiento

### Actualizar Expo
```bash
npx expo upgrade
```

### Verificar versión de Expo
```bash
npx expo --version
```

### Instalar una dependencia nueva
```bash
npm install nombre-paquete
```

### Desinstalar una dependencia
```bash
npm uninstall nombre-paquete
```

---

## 🐛 Debugging

### Abrir React Native Debugger
```bash
npx expo start
# Luego presiona 'j' en la terminal
```

### Ver errores en consola
```bash
npx expo start --dev-client
```

### Limpiar watchman (si hay problemas)
```bash
watchman watch-del-all
```

---

## 📦 Build (Producción)

### Build para Android (EAS Build)
```bash
eas build --platform android
```

### Build para iOS (EAS Build - requiere Mac)
```bash
eas build --platform ios
```

### Build para ambos
```bash
eas build --platform all
```

---

## 🔐 Variables de Entorno

### Crear archivo .env
```bash
# En la raíz del proyecto
touch .env
```

### Ejemplo de .env:
```
API_URL=https://api.tubackend.com
API_KEY=tu_clave_aqui
```

---

## 📊 Análisis de Código

### TypeScript Check
```bash
npx tsc --noEmit
```

### Verificar tamaño del bundle
```bash
npx expo-cli bundle-visualizer
```

---

## 🎨 Assets

### Optimizar imágenes
```bash
npx expo-optimize
```

### Regenerar assets
```bash
npx expo prebuild --clean
```

---

## 🔄 Git (Opcional)

### Inicializar repositorio
```bash
git init
```

### Primer commit
```bash
git add .
git commit -m "Initial commit - Core Bancario"
```

### Crear .gitignore (ya incluido en el proyecto)
El archivo `.gitignore` ya está configurado para ignorar:
- node_modules/
- .expo/
- .env
- otros archivos temporales

---

## 📱 Probar en Dispositivo Real

### Via USB (Android)
1. Habilita "Modo Desarrollador" en tu Android
2. Conecta vía USB
3. Ejecuta: `npm run android`

### Via WiFi (mismo network)
1. Asegúrate que PC y móvil estén en la misma red
2. Ejecuta: `npm start`
3. Escanea el QR con Expo Go

---

## 🆘 Solución de Problemas Comunes

### Error: "Metro bundler not running"
```bash
npx expo start -c
```

### Error: "Module not found"
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Error: Puerto ocupado
```bash
# Cambia el puerto
npx expo start --port 19001
```

### App no actualiza cambios
```bash
# Limpia cache y reinicia
npx expo start -c
# Luego en la app, presiona 'r' para reload
```

### Error de TypeScript
```bash
# Verifica errores
npx tsc --noEmit

# Si persiste, reinicia TypeScript server en tu editor
```

---

## 📝 Notas Importantes

### Para Windows:
- Usa PowerShell o CMD
- Reemplaza `rm -rf` con `rmdir /s /q` o usa Git Bash

### Para ejecutar en dispositivo físico:
- **Android**: Puedes usar USB o Expo Go
- **iOS**: Necesitas Mac y Xcode (o usa Expo Go)

### Modo de desarrollo:
- Los cambios se reflejan automáticamente (Hot Reload)
- Si no se actualiza, presiona `r` en la terminal

---

## 🎯 Comandos Más Usados

```bash
# 1. Iniciar app
npm start

# 2. Limpiar y reiniciar
npx expo start -c

# 3. Instalar nueva dependencia
npm install nombre-paquete

# 4. Ver en Android
npm run android

# 5. Ver en web
npm run web
```

---

## 📞 Soporte

Si encuentras problemas:
1. Verifica que Node.js esté actualizado
2. Limpia cache: `npx expo start -c`
3. Reinstala dependencias: `rm -rf node_modules && npm install`
4. Consulta la documentación de Expo: https://docs.expo.dev

---

¡Feliz desarrollo! 🎉

