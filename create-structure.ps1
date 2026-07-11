# Crear carpetas
$folders = @(
    "src",
    "src\modules",
    "src\modules\health",
    "src\modules\health\interfaces",
    "src\modules\health\interfaces\controllers",
    "src\modules\health\interfaces\routes",
    "src\modules\health\application",
    "src\modules\health\application\usecases",
    "src\modules\health\domain",
    "src\modules\health\domain\entities",
    "src\modules\health\infrastructure",
    "src\shared",
    "src\shared\config",
    "src\shared\logger",
    "src\shared\middleware"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}

# Crear archivos
$files = @(
    "src\app.ts",
    "src\server.ts",
    "src\modules\health\interfaces\controllers\HealthController.ts",
    "src\modules\health\interfaces\routes\health.routes.ts",
    "src\modules\health\application\usecases\GetHealthUseCase.ts",
    "src\modules\health\domain\entities\Health.ts",
    "src\shared\config\env.ts",
    "src\shared\logger\logger.ts",
    "src\shared\middleware\errorHandler.ts",
    "src\shared\middleware\requestLogger.ts",
    "src\shared\routes.ts"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host ""
Write-Host "✅ Project structure created successfully!" -ForegroundColor Green