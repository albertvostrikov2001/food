$dir = "d:\Work Unity\Food\porta\public\images"
$base = "https://images.unsplash.com/photo-"

$photos = [ordered]@{
  "hero-main.jpg"              = "1504674900247-0877df9cc836?w=1400&q=85"
  "hero-side-1.jpg"            = "1546069901-ba9599a7e63c?w=600&q=80"
  "hero-side-2.jpg"            = "1512621776951-a57141f2eefd?w=600&q=80"
  "hero-side-3.jpg"            = "1547592180-85f173990554?w=600&q=80"
  "meal-01-oatmeal.jpg"        = "1517673400267-0251440c45dc?w=800&q=80"
  "meal-02-omelet.jpg"         = "1510693206972-df098062cb71?w=800&q=80"
  "meal-03-casserole.jpg"      = "1565299624946-b28f40a0ae38?w=800&q=80"
  "meal-04-buckwheat.jpg"      = "1547592166-23ac45744acd?w=800&q=80"
  "meal-05-cream-soup.jpg"     = "1547592180-85f173990554?w=800&q=80&fit=crop&crop=top"
  "meal-06-borscht.jpg"        = "1604152756-03b6f5c49d22?w=800&q=80"
  "meal-07-lentil-soup.jpg"    = "1547592166-23ac45744acd?w=800&q=80&fit=crop&crop=entropy"
  "meal-08-chicken-rice.jpg"   = "1512058454905-6b841e7ad132?w=800&q=80"
  "meal-09-beef-potato.jpg"    = "1574484284002-952d92456975?w=800&q=80"
  "meal-10-pasta.jpg"          = "1529042410759-befb1204b468?w=800&q=80"
  "meal-11-salmon.jpg"         = "1519708227418-c8fd9a32b7a2?w=800&q=80"
  "meal-12-kotlety.jpg"        = "1585937421612-70a008356c36?w=800&q=80"
  "meal-13-meatballs.jpg"      = "1528735602780-2552fd46c7d6?w=800&q=80"
  "meal-14-fish-veg.jpg"       = "1467003909585-2f8a72700288?w=800&q=80"
  "meal-15-turkey.jpg"         = "1476224203421-9ac39bcb3d16?w=800&q=80"
  "meal-16-stuffed-pepper.jpg" = "1540189549336-e6e99c3679fe?w=800&q=80"
  "meal-17-greek-salad.jpg"    = "1540420773420-3366772f4999?w=800&q=80"
  "meal-18-tuna-salad.jpg"     = "1490645935967-10de6ba17061?w=800&q=80"
  "meal-19-sandwich.jpg"       = "1509722747041-616f39b57569?w=800&q=80"
  "meal-20-bowl.jpg"           = "1512621776951-a57141f2eefd?w=800&q=80&fit=crop&crop=entropy"
  "set-trial.jpg"              = "1466637574441-749b8f19452f?w=800&q=80"
  "set-workweek.jpg"           = "1543353053-eb7cac573823?w=800&q=80"
  "set-week.jpg"               = "1482049016688-2d3e1b311543?w=800&q=80"
  "set-couple.jpg"             = "1553361371-9b77e3a5c9fc?w=800&q=80"
  "set-office.jpg"             = "1526959341327-cf9c61a60b5c?w=800&q=80"
  "gallery-1.jpg"              = "1543353053-eb7cac573823?w=900&q=80"
  "gallery-2.jpg"              = "1466637574441-749b8f19452f?w=900&q=80"
  "gallery-3.jpg"              = "1504674900247-0877df9cc836?w=900&q=80"
  "gallery-4.jpg"              = "1512621776951-a57141f2eefd?w=900&q=80"
  "gallery-5.jpg"              = "1547592180-85f173990554?w=900&q=80"
  "gallery-6.jpg"              = "1546069901-ba9599a7e63c?w=900&q=80"
  "fridge.jpg"                 = "1482049016688-2d3e1b311543?w=1000&q=80"
  "b2b-office.jpg"             = "1526959341327-cf9c61a60b5c?w=900&q=80"
}

$ok = 0
$fail = 0

foreach ($name in $photos.Keys) {
  $query = $photos[$name]
  $url = "${base}${query}&auto=format"
  $path = "$dir\$name"
  if (Test-Path $path) {
    Write-Host "SKIP $name (exists)"
    $ok++
    continue
  }
  try {
    Invoke-WebRequest -Uri $url -OutFile $path -UseBasicParsing -TimeoutSec 30 -ErrorAction Stop | Out-Null
    $sz = (Get-Item $path).Length
    Write-Host "OK   $name  ($sz bytes)"
    $ok++
  } catch {
    Write-Host "FAIL $name"
    $fail++
  }
}

Write-Host ""
Write-Host "=== Done: $ok ok, $fail failed ==="
