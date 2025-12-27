import { redirect } from 'next/navigation';

export default function WatchPage() {
  // Redirect /watch to /videos since this is where all videos are listed
  redirect('/videos');
}