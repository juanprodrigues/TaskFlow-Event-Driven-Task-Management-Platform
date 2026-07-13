# Crear carpetas
$folders = @(
    "src",
    "src\modules",
    "src\modules\workspace",

    # Application
    "src\modules\workspace\application",
    "src\modules\workspace\application\dto",
    "src\modules\workspace\application\mappers",
    "src\modules\workspace\application\use-cases",

    # Domain
    "src\modules\workspace\domain",
    "src\modules\workspace\domain\entities",
    "src\modules\workspace\domain\events",
    "src\modules\workspace\domain\repositories",
    "src\modules\workspace\domain\services",

    # Infrastructure
    "src\modules\workspace\infrastructure",
    "src\modules\workspace\infrastructure\persistence",
    "src\modules\workspace\infrastructure\repositories",

    # Interfaces
    "src\modules\workspace\interfaces",
    "src\modules\workspace\interfaces\controllers",
    "src\modules\workspace\interfaces\routes",
    "src\modules\workspace\interfaces\validators"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder | Out-Null
}


# Crear archivos base
$files = @(
    # Application
    "src\modules\workspace\application\dto\CreateWorkspaceDto.ts",
    "src\modules\workspace\application\dto\UpdateWorkspaceDto.ts",
    "src\modules\workspace\application\mappers\WorkspaceMapper.ts",
    "src\modules\workspace\application\use-cases\CreateWorkspaceUseCase.ts",
    "src\modules\workspace\application\use-cases\GetWorkspaceUseCase.ts",
    "src\modules\workspace\application\use-cases\UpdateWorkspaceUseCase.ts",
    "src\modules\workspace\application\use-cases\DeleteWorkspaceUseCase.ts",

    # Domain
    "src\modules\workspace\domain\entities\Workspace.ts",
    "src\modules\workspace\domain\events\WorkspaceCreatedEvent.ts",
    "src\modules\workspace\domain\repositories\WorkspaceRepository.ts",
    "src\modules\workspace\domain\services\WorkspaceService.ts",

    # Infrastructure
    "src\modules\workspace\infrastructure\persistence\WorkspaceModel.ts",
    "src\modules\workspace\infrastructure\repositories\WorkspaceRepositoryImpl.ts",

    # Interfaces
    "src\modules\workspace\interfaces\controllers\WorkspaceController.ts",
    "src\modules\workspace\interfaces\routes\workspace.routes.ts",
    "src\modules\workspace\interfaces\validators\workspace.validator.ts"
)

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path $file | Out-Null
}

Write-Host ""
Write-Host "✅ Workspace module structure created successfully!" -ForegroundColor Green