# 🍽 Restaurante QR - Aplicación Móvil (PPS, 2024)

Este repositorio corresponde a un proyecto de Práctica Profesional Supervisada, hecho en 2024 mientras cursaba la Tecnicatura Universitaria en Programación, en la Universidad Tecnológica Nacional.

Se trata de una aplicación móvil desarrollada en **Ionic + Angular + Firebase + Android Studio + Sass**, que simula el funcionamiento completo de un restaurante basado en **códigos QR**. El proyecto incluye autenticación de usuarios, roles múltiples, ABMs, gestión de pedidos, pagos simulados, notificaciones push y envío de correos electrónicos.

## 👥 Integrantes del grupo

- **Gil Miguel Ángel** – Líder técnico (Alfa) (Yo)
- **Dongo Huaman Juan Pablo** – Beta  
- **Fernández Santiago** – Gamma 

**🔗 Link al Trello del proyecto:** [Trello](https://trello.com/b/K1IVsIYR/prueba-sp-pps)

---

## 🛠️ Tecnologías utilizadas

- **Frontend / App móvil:** Ionic + Angular + Sass  
- **Backend / Persistencia:** Firebase (Auth, Firestore, Storage)  
- **Despliegue:** Android Studio (.apk)  
- **Gestión de equipo:** Trello, metodología ágil (Sprints)

## 🎯 Objetivos del proyecto

1. Crear una aplicación móvil que permita a clientes, mozos, cocineros y administradores interactuar con un restaurante de forma **digital y automatizada**.  
2. Implementar flujos de negocio realistas: **gestión de usuarios, mesas, pedidos, estados de plato y pagos**.  
3. Integrar **códigos QR** para facilitar acceso, pedidos y pagos.  
4. Desarrollar una experiencia móvil funcional y profesional dentro de **tiempo limitado y trabajo en equipo**.

## ⚡ Funcionalidades principales

### Roles y ABMs
- **Cliente:** registro, login, escaneo de QR, selección de mesa, pedido de productos, seguimiento del pedido, encuestas de satisfacción, chat con otros usuarios y pago simulado.  
- **Mozo:** gestión de pedidos y pagos, asignación de mesas.  
- **Cocinero:** visualización de pedidos y cambios de estado de los platos.  
- **Administrador/Dueño:** gestión completa de usuarios, mesas, productos, supervisión general y revisión de estadísticas.  

### Funcionalidades avanzadas
- **Notificaciones push** a los dispositivos móviles según eventos.  
- **Correos electrónicos automáticos** de validación de clientes.  
- **Pagos simulados** dentro de la app.  
- **Gestión de estados de pedidos**: recibido → en elaboración → terminado → entregado.

## ⭐ Rol y contribución personal (Alfa)

- Liderazgo técnico y coordinación del grupo.  
- Creación de la estructura base del proyecto y rutas.
- Diseño del ícono y el Splash de la aplicación.
- Desarrollo de **ABMs** para Dueños, Productos y Clientes.  
- Formularios funcionales con validaciones y estilos.  
- Desarrollo del menú de productos y página de cuenta a pagar.
- Integración de Firebase Auth, Firestore y Storage.  
- Mejoras visuales y consistencia en UI de las pantallas clave.  

## 💡 Aprendizajes y desafíos llevados a cabo en grupo

- Trabajar en distintas ramas individuales en Git.  
- Dividir las tareas de forma equilibrada y clara en el equipo.  
- Aplicar **metodología ágil** en un proyecto grupal con tiempos acotados.  
- Adaptar Angular y Firebase para aplicaciones móviles con **Ionic**.  
- Manejar **roles múltiples y flujos de negocio complejos** en una app móvil.  
- Integrar **notificaciones push y correos automáticos** para usuarios finales.  
- Usar **Android Studio** para configurar y desplegar la aplicación en un archivo .APK.  

## 📱 Pantallas destacadas

- **Login / Registro:**  
<img src="https://github.com/miguecode/brigada-binaria-2024/assets/103081146/cd2ac29d-1276-446a-b45c-6a571258e77e" width="300"/>  

- **Home Cliente (sin mesa / con mesa asignada)**  
<img src="https://github.com/miguecode/brigada-binaria-2024/assets/103081146/ade6e72f-bbb1-4669-971d-d325ae9fff95" width="300"/>  

- **Menú de productos y seguimiento de pedido**  
<img src="https://github.com/miguecode/brigada-binaria-2024/assets/103081146/b5e31bb7-2cae-4272-8c97-9066cee89901" width="300"/>  

- **Chat entre un Cliente y un Mozo**

<img src="https://github.com/miguecode/brigada-binaria-2024/assets/103081146/5604921c-1ad5-4107-9ab2-68405ba2b4f2" width="300"/>

- **Encuestas para el Cliente**

<img src="https://github.com/miguecode/brigada-binaria-2024/assets/103081146/fb1908e7-c8f8-4369-b60d-09fa5a9b61ee" width="300"/>

- **Gráficos de las encuestas**

<img src="https://github.com/miguecode/brigada-binaria-2024/assets/103081146/26692c63-6eea-4653-b1e3-e31804933b15" width="300"/>

## 📌 Aclaraciones

- La aplicación no corresponde a un restaurante de la vida real, es una simulación de un entorno de trabajo real, con necesidades de un cliente.
- Como se ha dicho, es un trabajo realizado en equipo donde cada integrante aportó lo suyo por igual.
- Antes, el README incluía un historial de cambios y tareas completadas con fechas y aclaraciones individuales de cada integrante. Para que todo quede más prolijo, se limpió añadiendo información general de lo que hace la aplicación.
