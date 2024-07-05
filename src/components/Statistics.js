import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../App';
import '../Statistics.css';

const Statistics = () => {
    const [wordFrequencies, setWordFrequencies] = useState({ user_word_count: {}, all_word_count: {} });
    const [uniquePhrases, setUniquePhrases] = useState({});
    const [similarUsers, setSimilarUsers] = useState([]);
    const { isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
        const fetchWordFrequencies = async () => {
            try {
                const response = await axios.get('https://voiceanalyserbackend.azurewebsites.net/word_frequencies', { withCredentials: true });
                setWordFrequencies(response.data);
            } catch (error) {
                console.error('Error fetching word frequencies', error);
            }
        };

        const fetchUniquePhrases = async () => {
            try {
                const response = await axios.get('https://voiceanalyserbackend.azurewebsites.net/unique_phrases', { withCredentials: true });
                setUniquePhrases(response.data.user_unique_phrases);
            } catch (error) {
                console.error('Error fetching unique phrases', error);
            }
        };

        const fetchSimilarUsers = async () => {
            try {
                const response = await axios.get('https://voiceanalyserbackend.azurewebsites.net/similar_users', { withCredentials: true });
                setSimilarUsers(response.data.most_similar_users);
            } catch (error) {
                console.error('Error fetching similar users', error);
            }
        };

        if (isAuthenticated) {
            fetchWordFrequencies();
            fetchUniquePhrases();
            fetchSimilarUsers();
        }
    }, [isAuthenticated]);

    return (
        <div className="statistics-container">
            <div className="column double-column">
                <div className="inner-column">
                    <h3>Your Most Frequent Words</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(wordFrequencies.user_word_count).map(([word, count]) => (
                                <tr key={word}>
                                    <td>{word}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="inner-column">
                    <h3>Overall Most Frequent Words</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Word</th>
                                <th>Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(wordFrequencies.all_word_count).map(([word, count]) => (
                                <tr key={word}>
                                    <td>{word}</td>
                                    <td>{count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="column">
                <h3>Unique Phrases</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Phrase</th>
                            <th>Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(uniquePhrases).map(([phrase, count]) => (
                            <tr key={phrase}>
                                <td>{phrase}</td>
                                <td>{count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h3>Similar Users</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Similarity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {similarUsers.map((user, index) => (
                            <tr key={index}>
                                <td>{user.username}</td>
                                <td>{user.similarity_score.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Statistics;

