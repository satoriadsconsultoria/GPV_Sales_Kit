param(
    [string]$RootDir = $PSScriptRoot,
    [int]$Port = 8090
)

Add-Type -AssemblyName System.Net.HttpListener -ErrorAction SilentlyContinue

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Output "Serving $RootDir on http://localhost:$Port/"

$mimeMap = @{
    ".html" = "text/html"
    ".css"  = "text/css"
    ".js"   = "application/javascript"
    ".json" = "application/json"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $path = $request.Url.AbsolutePath
    if ($path -eq "/") { $path = "/index.html" }
    $filePath = Join-Path $RootDir ($path -replace "^/", "")

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath)
        $mime = $mimeMap[$ext]
        if (-not $mime) { $mime = "application/octet-stream" }
        $bytes = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentType = $mime
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
    } else {
        $response.StatusCode = 404
        $notFound = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
        $response.OutputStream.Write($notFound, 0, $notFound.Length)
    }
    $response.OutputStream.Close()
}
