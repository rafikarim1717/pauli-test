import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InstructionVideo from '../components/InstructionsVideo';
import './Home.css';

const Home = () => {
    const [userName, setUserName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showTestOption, setShowTestOption] = useState(false);
    const [showVideoTutorial, setShowVideoTutorial] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handleStart = () => {
        setShowTestOption(true);
    };


    const handleVideoTutorial = () => {
        setShowVideoTutorial(true);
    };

    const handleCloseTestOption = () => {
        setShowTestOption(false);
    };
    const handleInstructions = () => {
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setCurrentPage(1);
    };

    const handleNext = () => {
        if (currentPage < 3) setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className="home-container">
            <div className="card">
                <div className="card-header">
                    <h1 className="title">Sharing Vision</h1>
                    <p className="description">Pauli Test Simulation APP</p>
                </div>

                <div className="buttons">
                    <button className="start-btn" onClick={handleStart}>
                        Start
                    </button>
                    <button className="instructions-btn" onClick={handleInstructions}>
                        Instruction
                    </button>
                    <button className="instructions-btn" onClick={handleVideoTutorial}>
                        Video Turtorial
                    </button>

                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Instruction</h2>
                            <button onClick={handleClose}>✕</button>
                        </div>

                        <div className="modal-content">
                            {currentPage === 1 &&
                                <div className='instruction-page-container'>
                                    <p>Pauli is a psychological test to measure consistency, accuracy, and concentration by calculating the last digit (mod 10) of the sum between two numbers, e.g., 8 + 7 = 15 → 15 % 10 = 5.</p>
                                </div>
                            }

                            {currentPage === 2 &&
                                <div className='instruction-page-container'>
                                    <p> The test will be divided into several rounds. Each round will be
                                        15 minutes each. It is necessary to divide this test into several
                                        rounds to measure your consistency.</p>
                                    <p> You will get a notification when the round is changed. There will
                                        be no difference on your side, you can proceed to answer the
                                        question like you would normally do. You will also be able to see
                                        how much time you have left.</p>
                                    <p> Since this is a digital app, you will only be given 2 numbers at a
                                        time. The numbers will cycle through after you have answered the
                                        question.</p>
                                </div>


                            }
                            {currentPage === 3 &&
                                <div className='instruction-page-container'>
                                    <p>
                                        Here are some rules that you need to keep in mind:
                                    </p>
                                    <ul>
                                        <li>
                                            For each correct answer, you will receive 1 point.
                                        </li>
                                        <li>
                                            If you get a question wrong, your point will be reduced by 1.
                                        </li>
                                        <li>
                                            It's more important to be consistent and accurate rather than
                                            to be quick, but you should aim to be quick and correct for the best
                                            result.
                                        </li>
                                        <li>
                                            You can choose how long do you want to take the test. The
                                            longer you do the test, the more accurate the result will be.
                                        </li>
                                        <li>
                                            You can answer the question either by using the provided numpad
                                            or use your keyboard.
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>

                        <div className="modal-instructions-footer">
                            <button onClick={handlePrev} disabled={currentPage === 1}>
                                Previous
                            </button>

                            {currentPage < 3 ? (
                                <button onClick={handleNext}>
                                    Next
                                </button>
                            ) : (
                                <button onClick={handleClose}>
                                    Finish
                                </button>
                            )}
                        </div>

                    </div>
                </div>
            )}

            {showVideoTutorial && (
                <InstructionVideo onClose={() => setShowVideoTutorial(false)} />
            )}

            {showTestOption && (
                <div className="modal-overlay">
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2>Test Options</h2>
                            <button onClick={handleCloseTestOption}>✕</button>
                        </div>
                        <div className="modal-content">
                            <div className="test-option">
                                <div className='duration-container'>
                                    <label>Duration:</label>
                                    <select disabled>
                                        <option>30 minutes</option>
                                    </select>
                                </div>

                                <div className='rounds-container'>
                                    <label>Rounds:</label>
                                    <select disabled>
                                        <option>30</option>
                                    </select>
                                </div>

                                <div className='name-container'>
                                    <label htmlFor="user-name">Name:</label>
                                    <input
                                        type="text"
                                        id="user-name"
                                        name="user-name"
                                        placeholder="Enter your name"
                                        className="name-input"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                    />
                                </div>
                            </div>

                        </div>
                        <div className="modal-footer">
                            <button
                                disabled={!userName.trim()}
                                className={!userName.trim() ? 'disabled-btn' : ''}
                                onClick={() => {
                                    handleCloseTestOption();
                                    navigate(`/test?name=${encodeURIComponent(userName)}`);
                                }}
                            >
                                Start Test
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
