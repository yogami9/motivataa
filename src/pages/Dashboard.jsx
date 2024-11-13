import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const articleResponse = await axios.get("https://motivata.onrender.com/api/content?contentType=Article");
            const videoResponse = await axios.get("https://motivata.onrender.com/api/content?contentType=Video");
            const podcastResponse = await axios.get("https://motivata.onrender.com/api/content?contentType=Podcast");

            setArticles(articleResponse.data);
            setVideos(videoResponse.data);
            setPodcasts(podcastResponse.data);
        } catch (err) {
            setError("Error fetching content");
        } finally {
            setLoading(false);
        }
    };

    const renderContent = (content, type) => {
        return content.map((item) => (
            <div key={item._id} className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
                {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover" />} {/* Only display image if it exists */}
                <div className="p-4">
                    <h2 className="font-bold text-xl mb-2">{item.title}</h2>
                    <p className="text-gray-700">{item.description}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="p-6 bg-gray-100">
            {loading && <p>Loading content...</p>}
            {error && <p className="text-red-500">{error}</p>}
            
            <h1 className="text-3xl font-bold text-center mb-4">Motivational Content Dashboard</h1>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {articles.length > 0 ? renderContent(articles, "Article") : <p>No articles available.</p>}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Videos</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {videos.length > 0 ? renderContent(videos, "Video") : <p>No videos available.</p>}
                </div>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-2">Podcasts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {podcasts.length > 0 ? renderContent(podcasts, "Podcast") : <p>No podcasts available.</p>}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;