import React, { useState, useEffect } from 'react';
import { Wheel } from 'react-custom-roulette';
import { toast } from 'react-toastify';
import axios from 'axios';

import * as constants from '../const';
import './ShitWheel.css';

const ShitWheel = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [spin, setSpin] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            const config = {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            try {
                const response = await axios.get(constants.apiUsers, config);
                const userData = response.data.users.map(user => ({
                    option: user.username
                }));
                setUsers(userData);
            } catch (error) {
                console.error('Failed to fetch users', error);
            }
        };

        fetchUsers();
    }, []);

    const handleSpinClick = () => {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        setSelectedUser(randomUserIndex);
        setSpin(true);
    };

    const handleSpinComplete = () => {
        toast.info(`...and the winner is: ${users[selectedUser].option}`);
        setSpin(false);
    };

    return (
        <div className="wheel-page">
            <div className="wheel-box">
                {users.length > 0 ? (
                    <Wheel
                        mustStartSpinning={spin}
                        prizeNumber={selectedUser}
                        data={users}
                        backgroundColors={['#7991d8', '#bbbbbb', '#00cccc']}
                        textColors={['#ffffff']}
                        onStopSpinning={handleSpinComplete}
                    />
                ) : (
                    <p>Loading users...</p>
                )}
            </div>
            <button className="start-button" onClick={handleSpinClick}>Assegna il merdone!</button>
        </div>
    );
};

export default ShitWheel;
