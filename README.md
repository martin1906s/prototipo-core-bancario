# 🏦 Core Bancario - BancoEcuador

Aplicación móvil de core bancario desarrollada con React Native y Expo Go. Una solución moderna y completa para la banca digital ecuatoriana.

## 📱 Características Principales

### 🔐 Autenticación
- Sistema de login seguro
- Validación de credenciales
- Sesión persistente

### 💰 Gestión de Cuentas
- Visualización de múltiples cuentas (Ahorros y Corriente)
- Consulta de saldos en tiempo real
- Detalles de cuenta con números de cuenta y tipo

### 💸 Transferencias
- Transferencias entre cuentas propias
- Transferencias a terceros
- Validación de saldo disponible
- Confirmación de transacciones
- Sin comisiones

### 💳 Tarjetas de Crédito
- Gestión de tarjetas Visa y Mastercard
- Visualización de crédito disponible y límite
- Progreso de utilización de cupo
- Opciones de bloqueo y aumento de límite

### 🏠 Préstamos
- Seguimiento de préstamos activos
- Tipos: Hipotecario, Vehicular, Personal, Microcrédito
- Visualización de saldo pendiente
- Cálculo de progreso de pago
- Recordatorio de próximo pago
- Simulador de préstamos

### 💡 Pagos de Servicios
- Pago de servicios básicos (Luz, Agua, Teléfono, Internet, TV)
- Integración con principales proveedores ecuatorianos:
  - **Luz**: CNEL, EEQ, EMELEC, EMCALI
  - **Agua**: ETAPA, EMAPA, EPMAPS, EMAPAG
  - **Teléfono**: CNT, Claro, Movistar, Tuenti
  - **Internet**: Netlife, CNT
  - **TV**: TV Cable, DirecTV, Claro TV
  - **Otros**: Predial, Impuestos, Multas

### 📊 Historial de Transacciones
- Registro completo de movimientos
- Filtros por tipo de transacción
- Búsqueda de transacciones
- Estado de transacciones (Completada, Pendiente, Fallida)

### 👤 Perfil de Usuario
- Información personal completa
- Configuración de seguridad
- Soporte y ayuda 24/7
- Términos y condiciones

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- npm o yarn
- Expo Go instalado en tu dispositivo móvil

### Pasos de Instalación

1. **Navegar al directorio del proyecto**
```bash
cd CoreBancarioApp
```

2. **Instalar dependencias** (si no se instalaron automáticamente)
```bash
npm install
```

3. **Iniciar el servidor de desarrollo**
```bash
npm start
```

4. **Ejecutar en tu dispositivo**
- Escanea el código QR con la app Expo Go (Android) o la cámara (iOS)
- O presiona:
  - `a` para Android
  - `i` para iOS (solo en Mac)
  - `w` para web

## 📱 Uso de la Aplicación

### Login
- **Demo**: Puedes usar cualquier email y contraseña para acceder a la demo
- Ejemplo: `usuario@email.com` / `cualquier_contraseña`

### Navegación
La aplicación cuenta con 4 tabs principales:
- 🏠 **Inicio**: Dashboard con resumen de cuentas y acciones rápidas
- 💳 **Tarjetas**: Gestión de tarjetas de crédito
- 🏦 **Préstamos**: Seguimiento de créditos activos
- ⚙️ **Más**: Opciones adicionales y configuración

### Funcionalidades Demo

#### Datos Precargados:
- **3 Cuentas Bancarias** (2 Ahorros y 1 Corriente)
- **2 Tarjetas de Crédito** (Visa y Mastercard)
- **2 Préstamos Activos** (Vehicular y Personal)
- **10+ Transacciones** en el historial

#### Acciones Disponibles:
- ✅ Realizar transferencias
- ✅ Pagar servicios
- ✅ Ver historial completo
- ✅ Consultar saldos
- ✅ Ver detalles de tarjetas y préstamos

## 🛠️ Tecnologías Utilizadas

- **React Native**: Framework para aplicaciones móviles
- **Expo**: Plataforma de desarrollo
- **TypeScript**: Tipado estático
- **React Navigation**: Navegación entre pantallas
- **Expo Linear Gradient**: Gradientes personalizados
- **Expo Vector Icons**: Iconos

## 📁 Estructura del Proyecto

```
CoreBancarioApp/
├── src/
│   ├── components/         # Componentes reutilizables
│   │   ├── AccountCard.tsx
│   │   ├── CreditCardView.tsx
│   │   ├── QuickActionButton.tsx
│   │   └── TransactionItem.tsx
│   ├── context/           # Context API
│   │   └── AuthContext.tsx
│   ├── navigation/        # Configuración de navegación
│   │   └── AppNavigator.tsx
│   ├── screens/          # Pantallas de la app
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── CardsScreen.tsx
│   │   ├── LoansScreen.tsx
│   │   ├── TransferScreen.tsx
│   │   ├── PayServicesScreen.tsx
│   │   ├── TransactionHistoryScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── MoreScreen.tsx
│   ├── types/            # Definiciones TypeScript
│   │   └── index.ts
│   └── utils/            # Utilidades
│       └── format.ts
├── App.tsx               # Componente principal
├── app.json             # Configuración de Expo
└── package.json         # Dependencias

```

## 🎨 Diseño

### Paleta de Colores
- **Primario**: #667eea (Azul púrpura)
- **Secundario**: #764ba2 (Púrpura)
- **Éxito**: #4CAF50 (Verde)
- **Advertencia**: #FFA500 (Naranja)
- **Error**: #FF6B6B (Rojo)
- **Fondo**: #f8f9fa (Gris claro)

### Características de Diseño
- ✨ Diseño moderno con gradientes
- 🎨 UI/UX intuitiva
- 📱 Totalmente responsive
- 🌙 Iconografía consistente
- 💫 Animaciones suaves

## 🔒 Características de Seguridad

- Autenticación obligatoria
- Validación de saldo antes de transacciones
- Confirmaciones para acciones importantes
- Sesión segura

## 🌐 Características Específicas de Ecuador

- 💵 Moneda: Dólares americanos (USD)
- 🏢 Servicios locales integrados
- 📱 Tipos de cuenta bancaria locales
- 🇪🇨 Interfaz completamente en español

## 📝 Próximas Características

- [ ] Biometría (huella digital / Face ID)
- [ ] Notificaciones push
- [ ] Pago por QR
- [ ] Inversiones y fondos
- [ ] Chat con soporte
- [ ] Solicitud de créditos online
- [ ] Certificados bancarios
- [ ] Mapa de sucursales y cajeros

## 🤝 Soporte

Para ayuda o soporte:
- 📧 Email: soporte@bancoecuador.com
- 📞 Teléfono: 1800-BANCO (24/7)
- 💬 Chat en la app

## 📄 Licencia

Este es un proyecto de demostración educativa.

## 👨‍💻 Desarrollador

Desarrollado como prototipo de core bancario moderno para Ecuador.

---

**Versión**: 1.0.0  
**Última actualización**: Diciembre 2025

¡Disfruta de tu experiencia bancaria digital! 🚀

