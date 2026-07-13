# Crear carpetas
$folders = @(
    "src",
    "src\modules",
    "src\modules\project",

    # Application
    "src\modules\project\application",
    "src\modules\project\application\dto",
    "src\modules\project\application\mappers",
    "src\modules\project\application\use-cases",

    # Domain
    "src\modules\project\domain",
    "src\modules\project\domain\entities",
    "src\modules\project\domain\events",
    "src\modules\project\domain\repositories",
    "src\modules\project\domain\value-objects",

    # Infrastructure
    "src\modules\project\infrastructure",
    "src\modules\project\infrastructure\mappers",
    "src\modules\project\infrastructure\repositories",

    # Interfaces
    "src\modules\project\interfaces",
    "src\modules\project\interfaces\controllers",
    "src\modules\project\interfaces\routes",
    "src\modules\project\interfaces\validators"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}


# Crear archivos base
$files = @(
    # Application
    "src\modules\project\application\dto\CreateProjectDto.ts",
    "src\modules\project\application\dto\UpdateProjectDto.ts",
    "src\modules\project\application\mappers\ProjectMapper.ts",
    "src\modules\project\application\use-cases\CreateProjectUseCase.ts",
    "src\modules\project\application\use-cases\GetProjectUseCase.ts",
    "src\modules\project\application\use-cases\UpdateProjectUseCase.ts",
    "src\modules\project\application\use-cases\DeleteProjectUseCase.ts",

    # Domain
    "src\modules\project\domain\entities\Project.ts",
    "src\modules\project\domain\events\ProjectCreatedEvent.ts",
    "src\modules\project\domain\repositories\ProjectRepository.ts",
    "src\modules\project\domain\value-objects\ProjectStatus.ts",

    # Infrastructure
    "src\modules\project\infrastructure\mappers\ProjectPersistenceMapper.ts",
    "src\modules\project\infrastructure\repositories\ProjectRepositoryImpl.ts",

    # Interfaces
    "src\modules\project\interfaces\controllers\ProjectController.ts",
    "src\modules\project\interfaces\routes\project.routes.ts",
    "src\modules\project\interfaces\validators\project.validator.ts"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host ""
Write-Host "✅ Project module structure created successfully!" -ForegroundColor Green