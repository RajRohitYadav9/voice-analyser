import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import '../History.css'; // Import the CSS file for styling

const History = () => {
    const [historyData, setHistoryData] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get('http://localhost:5000/history', { withCredentials: true });
                setHistoryData(response.data.history); // Update to match the returned data structure
            } catch (error) {
                console.error('Error fetching history', error);
            }
        };

        if (isAuthenticated) {
            fetchHistory();
        }
    }, [isAuthenticated]);

    return (
        <div className="history-container">
            <h2>History</h2>
            {isAuthenticated ? (
                <div>
                    {historyData.length > 0 ? (
                        <table className="history-table">
                            <thead>
                                <tr>
                                    <th>Original Text</th>
                                    <th>Transcribed Text</th>
                                    <th>Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData.map((historyItem, index) => (
                                    <tr key={index}>
                                        <td>{historyItem.original_text}</td>
                                        <td>{historyItem.translated_text}</td>
                                        <td>{new Date(historyItem.timestamp).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No history available.</p>
                    )}
                </div>
            ) : (
                <p>Please log in to view history.</p>
            )}
        </div>
    );
};

export default History;
