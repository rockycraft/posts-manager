# Proyecto CRUD de Posts con MSW

Este proyecto es una aplicación web en React que simula un CRUD de posts. Para simular un backend, se utiliza la librería **MSW (Mock Service Worker)**, que intercepta las solicitudes HTTP en el entorno de desarrollo.

## 🚀 Instalación y Ejecución

Para ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:
   ```sh
   git clone <URL_DEL_REPO>
   cd <NOMBRE_DEL_PROYECTO>
   ```

2. Instala las dependencias:
   ```sh
   pnpm install
   ```

3. Inicia el entorno de desarrollo:
   ```sh
   pnpm dev
   ```

📌 **Nota:** La librería **MSW** funciona únicamente en el entorno de desarrollo, ya que está diseñada para esto. Usa un service worker para interceptar las solicitudes HTTP y simular respuestas de un backend.

---

## ⚠️ ¿Por qué los cambios no se guardan en `data.json`?

En el entorno de desarrollo, **MSW solo intercepta y responde a las solicitudes en memoria**, pero no modifica archivos en el sistema. Esto ocurre porque:

1. **Los navegadores no pueden modificar archivos locales directamente**: El navegador puede leer `data.json` si es servido como un recurso estático, pero no tiene permisos para escribir en él sin intervención del usuario.
2. **MSW no persiste los datos en el sistema de archivos**: Al no haber un backend real, cualquier cambio realizado en los posts (crear, editar, eliminar) solo se mantiene en memoria mientras la aplicación está en ejecución. Si la página se recarga, los datos vuelven a su estado original.
3. **Para guardar cambios en `data.json`, se necesita un servidor backend**: Para escribir en el archivo, un backend en **Node.js, Python, u otro lenguaje** debe manejar las solicitudes y modificar el archivo físicamente.

---

## 🛠 Tecnologías Utilizadas
- **React** - Framework de UI
- **MSW (Mock Service Worker)** - Simulación de API REST
- **Vite** - Herramienta de desarrollo rápida

## 📌 Notas Adicionales
Este proyecto está diseñado para fines de prueba. No debe usarse en producción sin un backend real para manejar datos de manera segura y persistente.

¡Gracias por probar el proyecto! 🚀

