import { useLocation, useNavigate } from 'react-router-dom';
import * as XLSX from 'xlsx';
import './Result.css';

type Answer = {
    question: string;
    isCorrect: boolean;
    time: number;
};

type LocationState = {
    name: string;
    history: string[];
    answers: Answer[];
};

const Result = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as LocationState | undefined;

    const name = state?.name || 'User';
    const history = state?.history || [];
    const answers = state?.answers || [];

    const correctCount = answers.filter(a => a.isCorrect).length;
    const incorrectCount = answers.length - correctCount;
    const ratio = answers.length > 0 ? (correctCount / answers.length * 100).toFixed(1) + '%' : '0%';
    const totalDuration = answers.reduce((sum, a) => sum + a.time, 0).toFixed(1);
    const avgAnswersPerRound = answers.length > 0 ? (answers.length / 30).toFixed(1) : '0';

    const mean = answers.reduce((sum, a) => sum + a.time, 0) / (answers.length || 1);
    const stdDev = Math.sqrt(
        answers.reduce((sum, a) => sum + Math.pow(a.time - mean, 2), 0) / (answers.length || 1)
    ).toFixed(2);

    const handleDownloadExcel = () => {
        const data = answers.map((ans, i) => {
            const parts = history[i]?.split('=') || [];
            const answerPart = parts[1]?.trim().split(' ')[0];
            const round = Math.floor(i / 30) + 1;
            return {
                No: i + 1,
                Question: ans.question,
                Answer: answerPart || '',
                'Time (s)': ans.time.toFixed(1),
                Status: ans.isCorrect ? 'Correct' : 'Incorrect',
                Round: round,
            };
        });

        const summary = [
            { Metric: 'Correct', Value: correctCount },
            { Metric: 'Incorrect', Value: incorrectCount },
            { Metric: 'Ratio', Value: ratio },
            { Metric: 'Standard Deviation', Value: stdDev },
            { Metric: 'Total Duration', Value: totalDuration + 's' },
            { Metric: 'Answers per Round', Value: avgAnswersPerRound }
        ];

        const wb = XLSX.utils.book_new();
        const summarySheet = XLSX.utils.json_to_sheet(summary);
        const detailSheet = XLSX.utils.json_to_sheet(data);

        XLSX.utils.book_append_sheet(wb, summarySheet, 'Summary');
        XLSX.utils.book_append_sheet(wb, detailSheet, 'Details');

        // Format filename as 'username_result_20_april_2025.xlsx'
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' }).toLowerCase();
        const year = now.getFullYear();
        const formattedDate = `${day}_${month}_${year}`;
        const fileName = `${name.toLowerCase().replace(/\s+/g, '_')}_result_${formattedDate}.xlsx`;

        XLSX.writeFile(wb, fileName);
    };

    return (
        <div className='result-container'>
            <div className='result-header'>
                <h1 className='result-title'>{name}'s Test Result</h1>
                <button onClick={() => navigate('/')} className='back-home-btn'>Home</button>
                <button onClick={handleDownloadExcel} className='back-home-btn'>Download Result</button>
                <button onClick={() => console.log('Save to DB')} className='back-home-btn'>Save Result</button>
            </div>

            <div className="summary-grid">
                <div className="summary-card"><h3>Correct</h3><p>{correctCount}</p></div>
                <div className="summary-card"><h3>Incorrect</h3><p>{incorrectCount}</p></div>
                <div className="summary-card"><h3>Ratio</h3><p>{ratio}</p></div>
                <div className="summary-card"><h3>Standard Deviation</h3><p>{stdDev}</p></div>
                <div className="summary-card"><h3>Total Duration</h3><p>{totalDuration}s</p></div>
                <div className="summary-card"><h3>Answers per Round</h3><p>{avgAnswersPerRound}</p></div>
            </div>

            <div className='history-container'>
                <h2 className='history-title'>History:</h2>
                <div className="history-table-container">
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Time (s)</th>
                                <th>Question</th>
                                <th>Answer</th>
                                <th>Status</th>
                                <th>Round</th>
                            </tr>
                        </thead>
                        <tbody>
                            {answers.map((ans, i) => {
                                const parts = history[i]?.split('=') || [];
                                const answerPart = parts[1]?.trim().split(' ')[0];
                                const round = Math.floor(i / 30) + 1;
                                const isEndOfRound = (i + 1) % 30 === 0;

                                return (
                                    <tr
                                        key={i}
                                        style={isEndOfRound ? { borderBottom: '2px solid #2946D4' } : {}}
                                    >
                                        <td>{i + 1}</td>
                                        <td>{ans.time.toFixed(1)}</td>
                                        <td>{ans.question}</td>
                                        <td>{answerPart}</td>
                                        <td className={ans.isCorrect ? 'correct' : 'incorrect'}>
                                            {ans.isCorrect ? 'Correct' : 'Incorrect'}
                                        </td>
                                        <td>{round}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Result;
