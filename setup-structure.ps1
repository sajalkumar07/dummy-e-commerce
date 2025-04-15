cd src

$folders = @(
  "app/(auth)/login",
  "app/(auth)/signup",
  "app/cart",
  "app/checkout",
  "app/products/[id]",
  "app/profile",
  "app/wishlist",
  "components"
)

foreach ($folder in $folders) {
  New-Item -ItemType Directory -Path $folder -Force
}

$files = @(
  "app/(auth)/login/page.js",
  "app/(auth)/signup/page.js",
  "app/cart/page.js",
  "app/checkout/page.js",
  "app/products/[id]/page.js",
  "app/products/page.js",
  "app/profile/page.js",
  "app/wishlist/page.js",
  "components/AddToCartButton.js",
  "components/CartItem.js",
  "components/DarkModeToggle.js",
  "components/FilterSortPanel.js",
  "components/Header.js",
  "components/LoadingSkeleton.js",
  "components/ProductCard.js",
  "components/ProductGallery.js",
  "components/QuantityAdjuster.js",
  "components/UserAuthForm.js"
)

foreach ($file in $files) {
  New-Item -ItemType File -Path $file -Force
}

Write-Host "`n✅ Folder structure created inside 'src'!"
