import './output.css';

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
        <div className='output-container'>
            <div className='output-box'>
                <h2 className='output-heading'>Video Details</h2>
                <p className='output-text'>Title: {videoDetails.title}</p>
                <p className='output-text'>Upload Date: {videoDetails.published_at}</p>
                <p className='output-text'>Views: {videoDetails.views}</p>
                <p className='output-text'>Likes: {videoDetails.likes}</p>
                <p className='output-text'>Comments: {videoDetails.comments}</p>
            </div>
        </div>
    );
}

export default Output; 