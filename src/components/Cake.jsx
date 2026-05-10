import { useEffect, useState } from "react";
import "../assets/css/cake.css";
import { CakeSVG, confetti } from "../assets";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Cake() {
  // You may want to tweak these audio codes more to your liking.
  const [candlesBlownOut, setCandlesBlownOut] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [micError, setMicError] = useState("");
  const [showFallbackButton, setShowFallbackButton] = useState(false);

  useEffect(() => {
    let audioContext;
    let analyser;
    let dataArray;
    let blowStartTime = null;
    let fallbackTimer;

    async function initBlowDetection() {
      try {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error("Microphone not supported");
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        const source = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 512;
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        detectBlow();
      } catch (error) {
        console.error("Microphone access failed:", error);
        setMicError("Microphone unavailable or permission denied.");
        setShowFallbackButton(true);
      }
    }

    function detectBlow() {
      if (!analyser || !dataArray) return;
      analyser.getByteFrequencyData(dataArray);
      const lowFrequencyValues = dataArray.slice(0, 15);
      const averageLowFrequency =
        lowFrequencyValues.reduce((sum, value) => sum + value, 0) /
        lowFrequencyValues.length;

      const blowThreshold = 80; // Moderate threshold
      const requiredDuration = 1200; // 1. 3-4 sec blow required

      if (averageLowFrequency > blowThreshold) {
        if (!blowStartTime) {
          blowStartTime = performance.now();
        } else if (performance.now() - blowStartTime > requiredDuration) {
          setCandlesBlownOut(true);
        }
      } else {
        if (blowStartTime && performance.now() - blowStartTime > 200) {
          blowStartTime = null;
        }
      }

      requestAnimationFrame(detectBlow);
    }

    fallbackTimer = setTimeout(() => {
      setShowFallbackButton(true);
    }, 12000);

    setTimeout(() => {
      initBlowDetection();
      setMicPermissionGranted(true);
    }, 10000); //permission delay

    return () => {
      clearTimeout(fallbackTimer);
      if (audioContext) {
        audioContext.close();
      }
    };
  }, []);

  return (
    <>
      <div className="bg-black/80 h-screen w-screen flex items-center justify-center overflow-hidden relative">
        {candlesBlownOut && (
          <div
            className="absolute inset-0 bg-cover bg-center z-50"
            style={{
              backgroundImage: `url(${confetti})`,
            }}
          />
        )}
        {candlesBlownOut && (
          <motion.div
            className="absolute top-20 text-white text-3xl font-bold z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <svg width="800" height="200" viewBox="0 0 400 200">
              <defs>
                <path
                  id="curve"
                  d="M50,150 Q200,50 350,150"
                  fill="transparent"
                  stroke="white"
                />
              </defs>
              <text fontSize="40" fill="white" textAnchor="middle">
                <textPath href="#curve" startOffset="50%">
                  Happy Birthday!
                </textPath>
              </text>
            </svg>
            <Link to="/present" className="flex justify-center items-center">
              <p className="absolute top-[30rem] xs:top-[36rem] s:top-[40rem] px-7 py-3 bg-customBlue text-white rounded-full hover:bg-blue-600 font-medium text-base text-center ">
                Next Page
              </p>
            </Link>
          </motion.div>
        )}
        {showFallbackButton && !candlesBlownOut && (
          <div className="mt-6 text-center">
            <p className="text-white mb-3">
              {micError || "If blowing does not work, tap the button below to light the cake."}
            </p>
            <button
              onClick={() => setCandlesBlownOut(true)}
              className="px-6 py-3 bg-customBlue text-white rounded-full hover:bg-blue-600"
            >
              I can't blow, continue
            </button>
          </div>
        )}
        <div className="relative z-10">
          <div className="absolute -top-48 left-1/2 transform -translate-x-1/2">
            <div className="candle">
              {!candlesBlownOut && (
                <div>
                  <div className="absolute -top-[200px] text-gray-200 text-3xl">
                    <motion.div
                      animate={{ opacity: [0, 0.25, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 8,
                      }}
                      className="block -translate-x-[60px] translate-y-[105px] -rotate-[30deg] text-gray-200 text-xl "
                    >
                      blow
                    </motion.div>
                    <motion.div
                      animate={{ opacity: [0, 0.25, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: 9,
                      }}
                      className="block translate-x-10 translate-y-[80px] rotate-[30deg] text-gray-200 text-xl"
                    >
                      blow
                    </motion.div>
                  </div>
                  <div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                    <div className="flame"></div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <CakeSVG />
        </div>
      </div>
    </>
  );
}

export default Cake;
