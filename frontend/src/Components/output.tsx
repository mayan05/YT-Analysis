interface OutputProps {
    videoDetails: {
        title: string;
        published_at: string;
        views: number;
        likes: number;
        comments: number;
    } | null;
}

function Output({ videoDetails }: OutputProps) {
    if (!videoDetails) return null;

    return (
        // Update Output.tsx
<div className="mt-8 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
  <h2 className="text-xl font-bold text-gray-800 text-center">Video Details</h2>
  <div className="flex flex-col gap-2 mt-4">
    <p className="text-gray-800 font-bold">Title: {videoDetails.title}</p>
    <p className="text-gray-800 font-bold">Upload Date: {videoDetails.published_at}</p>
    <p className="text-gray-800 font-bold">Views: {videoDetails.views}</p>
    <p className="text-gray-800 font-bold">Likes: {videoDetails.likes}</p>
    <p className="text-gray-800 font-bold">Comments: {videoDetails.comments}</p>
  </div>
</div>
    );
}

export default Output;