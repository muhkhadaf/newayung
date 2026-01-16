import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'https://ayungproject.com'; // Replace with actual domain if different

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch all services
    const { data: services } = await supabase
        .from('services')
        .select('slug, updated_at');

    const serviceUrls = (services || []).map((service) => ({
        url: `${BASE_URL}/services/${service.slug}`,
        lastModified: new Date(service.updated_at || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/#services`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/#portfolio`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/#about`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.5,
        },
        ...serviceUrls,
    ];
}
