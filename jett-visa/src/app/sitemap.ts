import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
<<<<<<< HEAD
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jett-visa.com';

=======
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jettvisa.com';
  
>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
<<<<<<< HEAD
      url: `${baseUrl}/get-help`,
=======
      url: `${baseUrl}/accounts`,
>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
<<<<<<< HEAD
      url: `${baseUrl}/accounts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    // Add more pages as needed
  ];
}
=======
      url: `${baseUrl}/get-help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/inspire-me`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Add more routes as needed
  ];
}

>>>>>>> 0f1ee9dd767d1707b6f0517bfcaf4a5fc9484625
