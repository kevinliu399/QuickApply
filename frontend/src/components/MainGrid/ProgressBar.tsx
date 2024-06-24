import React from 'react';
import './maingrid.css';

const ProgressBar = ({ status }) => {
    const statuses = ['Watching', 'Applied', 'Interview', 'Decision'];
    const statusIndex = statuses.indexOf(status);

    return (
        <div className="flex h-full w-full justify-center">
            <div className="progress-bar-container">
                <div className="progress-line">
                    <div className="progress-fill" style={{ width: `${(statusIndex / (statuses.length - 1)) * 100}%` }}></div>
                    {statuses.map((step, index) => (
                        <div key={index} className="progress-step" style={{ left: `${(index / (statuses.length - 1)) * 100}%` }}>
                            <div className={`progress-indicator ${index <= statusIndex ? 'active' : ''}`}></div>
                            <div className="progress-label">{step}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default ProgressBar;
