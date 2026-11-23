
import { useRef, useState } from "react";

export default function CameraTest() {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [error, setError] = useState("");

    const startCamera = async () => {
        try {
            const mediaStream =
                await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: "environment" },
                    audio: false
                });

            videoRef.current.srcObject = mediaStream;
            setStream(mediaStream);
            setError("");
        } catch (err) {
            setError("Camera access failed: " + err.message);
        }
    };

    const stopCamera = () => {
        stream?.getTracks().forEach(track => track.stop());
        setStream(null);
        videoRef.current.srcObject = null;
    };

    return (
        <div>
            <h2>Camera Test</h2>

            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{ width: "100%", maxWidth: "500px" }}
            />

            <div>
                <button onClick={startCamera}>Start Camera</button>
                <button onClick={stopCamera}>Stop Camera</button>
            </div>

            {error && <p>{error}</p>}
        </div>
    );
}
