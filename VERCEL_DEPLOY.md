# 🚀 Guía de Despliegue en Vercel

Esta guía te ayudará a desplegar tu aplicación React Native (Expo) en Vercel.

## 📋 Requisitos Previos

1. Cuenta en [Vercel](https://vercel.com)
2. Proyecto en GitHub, GitLab o Bitbucket (recomendado)
3. Node.js instalado localmente

## 🔧 Configuración del Proyecto

El proyecto ya está configurado con:
- ✅ `vercel.json` - Configuración de Vercel con rewrites para evitar errores 404
- ✅ Scripts de build en `package.json`
- ✅ `.vercelignore` - Archivos a ignorar en el despliegue

## 📦 Pasos para Desplegar

### Opción 1: Despliegue desde Vercel Dashboard (Recomendado)

1. **Conecta tu repositorio:**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión o crea una cuenta
   - Haz clic en "Add New Project"
   - Conecta tu repositorio de GitHub/GitLab/Bitbucket
   - Selecciona este proyecto

2. **Configuración del proyecto:**
   - **Framework Preset:** Otro (o deja en blanco)
   - **Build Command:** `npm run vercel-build`
   - **Output Directory:** `web-build`
   - **Install Command:** `npm install`

3. **Variables de entorno (si las necesitas):**
   - Agrega cualquier variable de entorno necesaria
   - Ejemplo: `API_URL`, `API_KEY`, etc.

4. **Despliega:**
   - Haz clic en "Deploy"
   - Espera a que termine el build
   - ¡Tu app estará disponible en una URL de Vercel!

### Opción 2: Despliegue desde CLI

1. **Instala Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión:**
   ```bash
   vercel login
   ```

3. **Despliega:**
   ```bash
   vercel
   ```

4. **Para producción:**
   ```bash
   vercel --prod
   ```

## 🔄 Actualizaciones Automáticas

Si conectaste tu repositorio a Vercel, cada push a la rama principal activará un nuevo despliegue automáticamente.

## 🛠️ Solución de Problemas

### Error 404 al refrescar la página

✅ **Ya está solucionado** - El archivo `vercel.json` incluye rewrites que redirigen todas las rutas a `index.html`, evitando el error 404.

### Error de build

Si el build falla, verifica:
1. Que todas las dependencias estén en `package.json`
2. Que el comando `npm run vercel-build` funcione localmente:
   ```bash
   npm run vercel-build
   ```
3. Revisa los logs de build en Vercel Dashboard

### Assets no se cargan

Asegúrate de que:
- Los assets estén en la carpeta `assets/`
- El `app.json` tenga la configuración web correcta
- Los paths sean relativos

## 📝 Notas Importantes

- **Build local:** Puedes probar el build localmente con `npm run build:web`
- **Caché:** Vercel cachea los builds, si hay problemas, haz un redeploy
- **Dominio personalizado:** Puedes agregar un dominio personalizado en la configuración del proyecto en Vercel

## 🔗 Recursos

- [Documentación de Vercel](https://vercel.com/docs)
- [Documentación de Expo Web](https://docs.expo.dev/workflow/web/)
- [React Native Web](https://necolas.github.io/react-native-web/)

