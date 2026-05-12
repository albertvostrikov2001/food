$dir = "d:\Work Unity\Food\porta\public\images"
$base = "https://images.unsplash.com/photo-"

$photos = [ordered]@{
  "meal-06-borscht.jpg"    = "1547592166-23ac45744acd?w=800&q=80&fit=crop&crop=faces,center"
  "meal-12-kotlety.jpg"    = "1546069901-ba9599a7e63c?w=800&q=80&fit=crop&crop=entropy"
  "meal-13-meatballs.jpg"  = "1574484284002-952d92456975?w=800&q=80&fit=crop&crop=top"
  "meal-15-turkey.jpg"     = "1467003909585-2f8a72700288?w=800&q=80&fit=crop&crop=entropy"
  "set-workweek.jpg"       = "1466637574441-749b8f19452f?w=800&q=80&fit=crop&crop=entropy"
  "set-couple.jpg"         = "1504674900247-0877df9cc836?w=800&q=80&fit=crop&crop=right"
  "set-office.jpg"         = "1509722747041-616f39b57569?w=800&q=80&fit=crop&crop=entropy"
  "gallery-1.jpg"          = "1512058454905-6b841e7ad132?w=900&q=80"
  "b2b-office.jpg"         = "1509722747041-616f39b57569?w=900&q=80&fit=crop&crop=center"
}

foreach ($name in $photos.Keys) {
  $query = $photos[$name]
  $url = "${base}${query}&auto=format"
  $path = "$dir\$name"
  try {
    Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop | Out-Null
    $sz = (Get-Item $path).Length
    Write-Host "OK   $name  ($sz bytes)"
  } catch {
    Write-Host "FAIL $name"
  }
}
Write-Host "Done"
