import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';

axios.defaults.withCredentials = true;

const Dashboard = () => {
    const [file, setFile] = useState(null);
    const [originalText, setOriginalText] = useState('');
    const [transcription, setTranscription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get('https://voiceanalyserbackend.azurewebsites.net/check-auth');
                if (response.data.isAuthenticated) {
                    setIsAuthenticated(true);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error checking authentication', error);
                navigate('/login');
            }
        };

        checkAuth();
    }, [navigate]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleTranscribe = async () => {
        if (!file) {
            alert('Please select a file to transcribe');
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://voiceanalyserbackend.azurewebsites.net/transcribe', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setOriginalText(response.data.original_text);
            setTranscription(response.data.translated_text);
        } catch (error) {
            console.error('There was an error transcribing the file!', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Dashboard</h2>
            <input type="file" onChange={handleFileChange} />
            <h6>File type should be wav</h6>
            <button onClick={handleTranscribe} disabled={isLoading}>
                {isLoading ? 'Transcribing...' : 'Transcribe'}
            </button>
            {originalText && (
                <div>
                    <h3>Original:</h3>
                    <p>{originalText}</p>
                </div>
            )}
            {transcription && (
                <div>
                    <h3>Transcription:</h3>
                    <p>{transcription}</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
