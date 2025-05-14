import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { formatTime } from '../utils/formatTime';
import ProgressBar from '../components/ProgressBar';
import './Test.css';

const useQuery = () => new URLSearchParams(useLocation().search);

const Test = () => {
    const totalTime = 1 * 60; // 1 minute for testing
    const questionsPerRound = 30;
    const maxRounds = 30;
    const maxQuestions = questionsPerRound * maxRounds;

    const query = useQuery();
    const userName = query.get('name') || 'User';

    console.log('User Name:', userName);

    const [timeLeft, setTimeLeft] = useState<number>(totalTime);
    const [startTime, setStartTime] = useState<number>(Date.now());
    const [num1, setNum1] = useState<number>(Math.floor(Math.random() * 10));
    const [num2, setNum2] = useState<number>(Math.floor(Math.random() * 10));
    const [history, setHistory] = useState<string[]>([]);
    const [answers, setAnswers] = useState<
        { question: string; isCorrect: boolean; time: number }[]
    >([]);
    const [questionCount, setQuestionCount] = useState<number>(0);
    const [round, setRound] = useState<number>(1);
    const [isFinished, setIsFinished] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsFinished(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (isFinished) {
            navigate('/result', {
                state: {
                    name: userName,
                    history,
                    answers,
                    round,
                    totalQuestions: questionCount,
                },
            });
        }
    }, [isFinished]);

    const generateNewNumbers = () => {
        setNum1(Math.floor(Math.random() * 10));
        setNum2(Math.floor(Math.random() * 10));
        setStartTime(Date.now());
    };

    const handleInput = (input: number) => {
        const correct = (num1 + num2) % 10;
        const isCorrect = input === correct;
        const endTime = Date.now();
        const secondsTaken = ((endTime - startTime) / 1000).toFixed(1);
        const entry = `${num1} + ${num2} = ${input} ${isCorrect ? '✔️' : `❌ (${correct})`} — ${secondsTaken}s`;

        setHistory((prev) => [entry, ...prev]);
        setAnswers((prev) => [
            ...prev,
            {
                question: `${num1} + ${num2}`,
                isCorrect,
                time: parseFloat(secondsTaken),
            },
        ]);

        const newQuestionCount = questionCount + 1;
        setQuestionCount(newQuestionCount);

        if (newQuestionCount % questionsPerRound === 0 && newQuestionCount < maxQuestions) {
            setRound((prev) => prev + 1);
        }

        if (newQuestionCount >= maxQuestions) {
            setIsFinished(true);
        } else {
            generateNewNumbers();
        }
    };

    return (
        <>
            <ProgressBar timeLeft={timeLeft} totalTime={totalTime} />
            <div className="test-container">
                <div className='test-card-1'>
                    <div className='top-box'>
                        <span className='timer'>{formatTime(timeLeft)}</span>
                        <div className='round-question-container'>
                            <span className='round-info'>Round {round} / {maxRounds}</span>
                            <div className="vertical-separator" />
                            <span className='question-info'>Question {questionCount % questionsPerRound + 1} / {questionsPerRound}</span>
                        </div>
                    </div>

                    <span className='history-title'>History</span>
                    <div className='history'>
                        <ul>
                            {history.map((entry, index) => (
                                <li key={index} className={index === 0 ? '' : 'blurred'}>
                                    {entry}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='test-card-2'>
                    <div className="number-display">
                        <span className="number">{num1}</span>
                        <span className="number">{num2}</span>
                    </div>

                    <div className="keyboard">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                            <button key={num} onClick={() => handleInput(num)} className="key-btn">
                                {num}
                            </button>
                        ))}
                        <div className="key-empty" />
                        <button onClick={() => handleInput(0)} className="key-btn">0</button>
                        <div className="key-empty" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Test;
