import './InstructionVideo.css';

type Props = {
    onClose: () => void;
};

const InstructionVideo = ({ onClose }: Props) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2 className="instruction-title">📺 Watch the Tutorial</h2>
                <div className="video-wrapper">
                    <iframe
                        src="https://www.youtube.com/embed/QWCTbts1MjQ"
                        title="Pauli Test Tutorial"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default InstructionVideo;
