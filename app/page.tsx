"use client";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";
import { useRef, useEffect, useState, use } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Home() {
  const target = useRef(null);
  const { scrollYProgress } = useScroll({
    target: target,
  });
  const [isMobile, setIsMobile] = useState(false);
  const [scaleYes, setScaleYes] = useState(1);
  const [scaleNo, setScaleNo] = useState(1);
  const [text, setText] = useState("");
  const [count, setCount] = useState(0);
  const messages = [
    "Are you sure you're not a robot?",
    "Are you positively absolutely sure?",
    "Are you as sure as a cat in a sunbeam?",
    "Are you sure you didn't accidentally click 'No'?",
    "Are you as sure as a squirrel with a nut?",
    "Are you sure you're not just guessing?",
    "Are you sure you didn't hit your head?",
    "Are you sure you're not just hungry?",
    "Are you sure you're not sleepwalking?",
    "Are you as sure as a penguin on ice?",
  ];
  const [yesClicked, setYesClicked] = useState(false);

  const handleClick = () => {
    setScaleYes((prev) => prev + 0.1);
    setScaleNo((prev) => prev - 0.1);
    setYesClicked(false);
    if (count < messages.length) {
      setText(messages[count]);
      setCount((prev) => prev + 1);
    } else {
      setText("Are you really really sure?");
    }
  };
  const audioRef = useRef(null);
  useEffect(() => {
    function checkIfMobile() {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsMobile(
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        )
      );
    }
    checkIfMobile();
  }, []);

  const scale1 = useTransform(scrollYProgress, [0, 0.2], [1, 1.3]);
  const opacity1 = useTransform(scrollYProgress, [0.1, 0.2], [1, 0]);

  const scale2 = useTransform(
    scrollYProgress,
    [0.2, 0.4, 0.4, 0.6],
    [0.7, 1, 1, 1.3]
  );
  const opacity2 = useTransform(
    scrollYProgress,
    [0.3, 0.4, 0.5, 0.6],
    [0, 1, 1, 0]
  );

  const scale3 = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.7, 0.8],
    [0.7, 1, 1, 1.3]
  );
  const opacity3 = useTransform(
    scrollYProgress,
    [0.6, 0.7, 0.7, 0.8],
    [0, 1, 1, 0]
  );

  const scale4 = useTransform(scrollYProgress, [0.8, 1], [0.7, 1]);
  const opacity4 = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const bgColors = useTransform(
    scrollYProgress,
    [0, 0.56, 0.6, 0.7, 0.8, 0.83, 0.9],
    ["#fff", "#fff", "#fff017", "#fff017", "#fff", "#fff", "#f5f5f7"]
  );

  const scales1 = useSpring(scale1, { damping: 10 });
  const scales2 = useSpring(scale2, { damping: 10 });
  const scales3 = useSpring(scale3, { damping: 10 });
  const scales4 = useSpring(scale4, { damping: 10 });
  const opacities1 = useSpring(opacity1, { damping: 10 });
  const opacities2 = useSpring(opacity2, { damping: 10 });
  const opacities3 = useSpring(opacity3, { damping: 10 });
  const opacities4 = useSpring(opacity4, { damping: 10 });
  useEffect(() => {
    document.body.classList.add("disable-scroll");
  }, []);
  const handleTease = () => {
    alert("Hihi, pedikanda scroll cheytho😉");
    document.body.classList.remove("disable-scroll");
  };

  useEffect(() => {
    function handleScroll() {
      if (
        scrollYProgress.get() >= 0.5 &&
        scrollYProgress.get() <= 0.9 &&
        audioRef.current
      ) {
        (audioRef.current as unknown as HTMLAudioElement).play();
      } else {
        (audioRef.current as unknown as HTMLAudioElement).pause();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollYProgress]);
  if (isMobile) {
    return (
      <div className="flex h-screen justify-center items-center bg-black">
        <h1 className="text-3xl text-red-500 text-center font-medium">
          Mobile devices are not supported. Please use a desktop browser.
        </h1>
      </div>
    );
  } else
    return (
      <motion.main
        ref={target}
        className="flex h-[1000vh] flex-col items-center text-black"
        style={{ background: bgColors }}
      >
        <div className="sticky top-0 left-0 h-[100vh] w-[100vw]">
          <motion.div
            className="flex flex-col absolute justify-center items-center w-[100vw] h-[100vh]"
            style={{
              scale: scales1,
              opacity: opacities1,
            }}
          >
            <h1 className="text-5xl font-semibold">
              Today&apos;s <span className=" text-pink-700">Valentines ❤️</span>{" "}
              day{" "}
            </h1>
            <button
              className="mt-10 bg-black text-white p-3 rounded-md z-10"
              onClick={handleTease}
            >
              Click me
            </button>
          </motion.div>
          <motion.div
            className="flex absolute justify-center items-center w-[100vw] h-[100vh]"
            style={{
              scale: scales2,
              opacity: opacities2,
            }}
          >
            <h2 className="text-center font-semibold text-5xl">
              I&apos;m not asking to be your valentines.
            </h2>
          </motion.div>
          <motion.div
            className="flex absolute justify-center items-center w-[100vw] h-[100vh]"
            style={{
              scale: scales3,
              opacity: opacities3,
            }}
          >
            <h3 className="text-3xl font-medium">DrumRoll please 🥁</h3>
            <audio
              src={
                "https://joelkgeorge.blob.core.windows.net/web/web/drumroll.mp3"
              }
              ref={audioRef}
            />
          </motion.div>
          <motion.div
            className="flex flex-col absolute justify-center items-center w-[100vw] h-[100vh]"
            style={{
              scale: scales4,
              opacity: opacities4,
            }}
          >
            <div className="bg-white flex flex-col items-center justify-center p-10 rounded-lg z-10">
              <h3 className="text-4xl font-semibold">
                Will you be my best friend? (Nervous)
              </h3>
              <p className="font-regular text-gray-600">{text}</p>
              <div className="flex mt-7 gap-10 items-center">
                <motion.button
                  className="text-center text-xl bg-blue-700 text-white px-2 py-1 rounded-lg transition-all duration-300 ease-in-out"
                  style={{ scale: scaleYes }}
                  onClick={() => setYesClicked(true)}
                >
                  Yes
                </motion.button>
                <motion.button
                  className="text-white text-xl px-2 py-1 rounded-lg bg-black transition-all duration-300 ease-in-out"
                  style={{ scale: scaleNo }}
                  onClick={handleClick}
                >
                  No
                </motion.button>
                {yesClicked ? <Fireworks autorun={{ speed: 1 }} /> : null}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.main>
    );
}
