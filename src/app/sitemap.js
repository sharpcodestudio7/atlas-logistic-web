export default function sitemap() {
  const baseUrl = 'https://atlaslogistic.com.co';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
