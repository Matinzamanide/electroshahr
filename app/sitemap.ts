import { MetadataRoute } from 'next'

async function getProducts() {
  const res = await fetch(
    'https://apitak.ir/electroshahr/getProducts.php',
    { cache: 'no-store' }
  )

  const products = await res.json()
  return Array.isArray(products) ? products : []
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts()

  const productUrls = products.map((product: any) => ({
    url: `https://electroshahr.netlify.app/product/${product.id}/${encodeURIComponent(product.title)}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  return [
    {
      url: 'https://electroshahr.netlify.app',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...productUrls,
  ]
}
