import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaVideo, FaPodcast, FaFileAlt } from 'react-icons/fa'; // Assuming you're using react-icons for icons

const Dashboard = () => {
    const [articles, setArticles] = useState([]);
    const [videos, setVideos] = useState([]);
    const [podcasts, setPodcasts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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

    const renderContent = (content) => {
        return content.map((item) => (
            <div key={item._id} className="bg-white shadow-lg hover:shadow-2xl rounded-lg overflow-hidden mb-4 transition duration-300">
                {item.thumbnail && <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover transform transition-transform duration-500 hover:scale-105" />}
                <div className="p-4">
                    <h2 className="font-bold text-xl mb-2 text-blue-500">{item.title}</h2>
                    <p className="text-gray-600">{item.description}</p>
                </div>
            </div>
        ));
    };

    return (
        <div className="p-6 bg-gray-200 min-h-screen">
            {loading && <p className="text-center text-lg">Loading content...</p>}
            {error && <p className="text-center text-red-600">{error}</p>}
            
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">Motivational Content Dashboard</h1>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4 flex items-center">
                    <FaFileAlt className="mr-2 text-blue-500" /> Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.length > 0 ? renderContent(articles) : <p>No articles available.</p>}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4 flex items-center">
                    <FaVideo className="mr-2 text-blue-500" /> Videos
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {videos.length > 0 ? renderContent(videos) : <p>No videos available.</p>}
                </div>
            </section>

            <section className="mb-10">
                <h2 className="text-3xl font-semibold mb-4 flex items-center">
                    <FaPodcast className="mr-2 text-blue-500" /> Podcasts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {podcasts.length > 0 ? renderContent(podcasts) : <p>No podcasts available.</p>}
                </div>
            </section>
        </div>
    );
};

export default Dashboard;