import { getAllCategories, getPaginatedVideos } from '@/lib/videos';
import VideosClient from './VideosClient';
import Pagination from '@/app/components/ui/Pagination';

export const metadata = {
  title: 'ECG Educational Videos - ECG Kid',
  description: 'Master ECG interpretation through our comprehensive video library. Watch expert-guided lessons on cardiac rhythms, arrhythmias, and advanced interpretation techniques.',
  keywords: 'ECG videos, ECG education, cardiac rhythms, arrhythmias, ECG interpretation, medical education',
};

interface SearchParams {
  [key: string]: string | string[] | undefined;
  page?: string;
  category?: string;
  search?: string;
}

export default async function VideosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const category = params.category;
  const search = params.search;

  const { videos, totalVideos, totalPages, currentPage } = getPaginatedVideos(
    page,
    12,
    category,
    search
  );
  
  const categories = await Promise.resolve(getAllCategories());

  return (
    <>
      <VideosClient 
        videos={videos} 
        categories={categories} 
        totalVideos={totalVideos}
        currentPage={currentPage}
        initialCategory={category}
        initialSearch={search}
      />
      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        basePath="/videos"
        searchParams={params}
      />
    </>
  );
}