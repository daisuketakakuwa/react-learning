import React, { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

type QrScannerProps = {
    onScanSuccess: (decodedText: string) => void;
    onScanFailure?: (errorMessage: string) => void;
    needFileUpload?: boolean;
};

export const QrScanner: React.FC<QrScannerProps> = ({ onScanSuccess, onScanFailure, needFileUpload = true }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [scannable, setScannable] = useState(true);

    useEffect(() => {
        let animationFrameId: number;

        const startCamera = async () => {
            // ブラウザ(外カメ/environment)へカメラ映像を要求 -> OKであればstream取得
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: 300, height: 300 },
            });

            const video = videoRef.current;
            if (!video) return;

            // <video> タグにカメラ映像をリアルタイム表示
            video.srcObject = stream;
            video.setAttribute('playsinline', 'true');
            video.onloadedmetadata = () => {
                video.play();
                tick();
            };
        };

        const tick = () => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (!video || !canvas) return;

            const width = 300;
            const height = 300;

            canvas.width = width;
            canvas.height = height;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            // 土台のcanvas(300✕300)に、video(画面表示されてるカメラ画像)を描画
            ctx.drawImage(video, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height);
            // jsQRでQRコード画像を分析する
            const code = jsQR(imageData.data, width, height);

            if (code && scannable) {
                onScanSuccess(code.data);

                setScannable(false);

                // スキャン実行後、次のtickは3秒後に再開
                setTimeout(() => {
                    setScannable(true);
                    // requestAnimationFrameで、次の再描画タイミングでtickを再実行
                    animationFrameId = requestAnimationFrame(tick);
                }, 3000);
            } else if (scannable) {
                // requestAnimationFrameで、次の再描画タイミングでtickを再実行
                animationFrameId = requestAnimationFrame(tick);
            }
        };

        // 1. 外カメに表示されている画像をvideoタグでリアルタイムに画面表示
        // 2. videoタグに画面表示されたら、
        startCamera();

        // アンマウント(画面遷移)するときに、クリーンアップ処理を行う。
        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            const video = videoRef.current;
            if (video?.srcObject) {
                const tracks = (video.srcObject as MediaStream).getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    // アップロードされた画像ファイルからQRコードを読み取る処理
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !canvasRef.current) return;

        const reader = new FileReader();

        // FileReaderで読み込んだ画像データが準備できたら実行される
        reader.onload = () => {
            const img = new Image();
            img.onload = () => {
                const canvas = canvasRef.current!;
                const ctx = canvas.getContext('2d');
                // canvasサイズを画像に合わせる
                canvas.width = img.width;
                canvas.height = img.height;

                if (!ctx) return;

                // canvasに画像を描画
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);

                // jsQRでQRコード画像を分析する
                const code = jsQR(imageData.data, img.width, img.height);
                if (code) {
                    // コードが検知できた場合、成功としてコールバック
                    onScanSuccess(code.data);
                } else {
                    // 読み取りに失敗した場合、失敗コールバック（オプション）
                    onScanFailure?.('QRコードが検出できませんでした');
                }
            };

            img.src = reader.result as string;
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>
            <video ref={videoRef} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
            {/* あくまでcanvasは解析用なのでdisplay:noneで画面には表示しない */}
            <canvas ref={canvasRef} style={{ width: '300px', height: '300px', display: 'none' }} />

            {/* 画像ファイルからQRコードを読み取るためのinputフォーム */}
            <div style={{ marginTop: '12px', display: needFileUpload ? 'display' : 'none' }}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
        </div>
    );
};
