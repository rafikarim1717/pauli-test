import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    timeLeft: number;
    totalTime: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ timeLeft, totalTime }) => {
    const percentage = (timeLeft / totalTime) * 100;

    return (
        <div className="countdown-bar-wrapper">
            <div
                className="countdown-bar"
                style={{ width: `${percentage}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
