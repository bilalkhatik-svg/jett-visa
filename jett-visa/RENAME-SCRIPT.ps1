# Run this script after manually renaming src/pages to src/features

$files = Get-ChildItem -Path "C:\jett-visa\jett-visa\src" -Recurse -Include "*.tsx","*.ts" | Where-Object { $_.FullName -notmatch "node_modules" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if ($content) {
        $newContent = $content -replace '@/pages/', '@/features/'
        $newContent = $newContent -replace 'from "@pages/', 'from "@features/'
        $newContent = $newContent -replace 'from ''@pages/', 'from ''@features/'
        
        if ($content -ne $newContent) {
            Set-Content $file.FullName $newContent -NoNewline
            Write-Host "Updated: $($file.FullName)"
        }
    }
}

Write-Host "`n✓ All imports updated!"
Write-Host "Now run: npm run build"
