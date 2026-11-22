# EFA Oretana: Transistores y diagnóstico SMR

Proyecto React + Vite preparado para GitHub Pages con GitHub Actions.

## Cómo publicar

1. Copiar **todos los archivos y carpetas** de este proyecto a la raíz de la rama `main` de un repositorio de GitHub.
2. Ir a `Settings > Pages > Build and deployment` y escoger `GitHub Actions`.
3. GitHub ejecutará el flujo `.github/workflows/deploy-pages.yml` al hacer cambios en `main`.
4. La URL de la web aparecerá en `Settings > Pages` y en el resultado del workflow.

La compilación utiliza `base: './'` para rutas relativas y evita imágenes rotas dentro de un repositorio.
No es necesario configurar claves de API para este proyecto. No añadir credenciales al repositorio.

**Nota:** GitHub Pages sirve contenido web accesible públicamente en su URL; no es una aplicación privada para gestionar notas.
El progreso de cada alumno queda en `localStorage` de su propio navegador.

## Desarrollo local (opcional)

```bash
npm install
npm run dev
```
