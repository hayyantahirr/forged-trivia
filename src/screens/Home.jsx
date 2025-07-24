import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Home = () => {
  const [questions, setQuestions] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [result, setResult] = useState(0);
  const selectedOptionRef = useRef();
  const [timer, setTimer] = useState(0); // time in seconds
  const [quizEnded, setQuizEnded] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [hasStarted, setHasStarted] = useState(false);

  // Fetch questions
  useEffect(() => {
    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        setQuestions(res.data);
        setTotalMarks(res.data.length * 10);
      })
      .catch((error) => console.log(error));
  }, []);

  // Timer
  useEffect(() => {
    let interval = null;
    if (hasStarted && !quizEnded) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [hasStarted, quizEnded]);

  // Shuffle options once per question
  useEffect(() => {
    if (questions) {
      const currentQ = questions[currentIndex];
      const options = shuffleArray([
        ...currentQ.incorrectAnswers,
        currentQ.correctAnswer,
      ]);
      setShuffledOptions(options);
    }
  }, [currentIndex, questions]);

  function shuffleArray(arr) {
    let newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }

  const formatTime = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const nextQuestion = () => {
    const selectedOption =
      selectedOptionRef.current.querySelector("input:checked");

    if (!selectedOption) return; // no option selected

    if (questions[currentIndex].correctAnswer === selectedOption.value) {
      setResult((prev) => prev + 10);
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setQuizEnded(true);
    }
  };

  const restartQuiz = () => {
    setQuestions(null);
    setCurrentIndex(0);
    setTotalMarks(0);
    setResult(0);
    setTimer(0);
    setQuizEnded(false);
    setHasStarted(false);

    axios("https://the-trivia-api.com/v2/questions")
      .then((res) => {
        setQuestions(res.data);
        setTotalMarks(res.data.length * 10);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <main>
        <div className=" mx-auto w-[80%] my-10">
          <h1 className="text-3xl font-sans font-black mb-5 text-start ">
            Test Your Wit ,
            <span className="text-[#da7e36]"> Forge Your Legacy</span>{" "}
          </h1>
          <p className="text-xl text-[#da7e36] opacity-70">
            {/* Intro paragraph */}
            Welcome to our exciting quiz app where knowledge meets speed! Dive
            into a variety of thought-provoking questions across multiple
            categories. Track your performance with a live timer, score points
            for every correct answer, and challenge yourself to complete the
            quiz before time runs out. Sharpen your mind and have fun learning!
          </p>
        </div>

        <div className="flex flex-col w-[60%] mx-auto border  p-5 mb-5 rounded-xl  border-orange-500 shadow-[0_0_15px_2px_rgba(255,115,0,0.3)]  bg-[#0a0a0a] text-white">
          <div className="flex justify-between ">
            <h1 className="text-xl font-sans font-black">
              <span className="text-2xl mr-5 text-[#da7e36] font-sans font-black mb-5">
                Time Taken :{" "}
              </span>{" "}
              {formatTime(timer)}
            </h1>
            <h1 className=" text-2xl mr-5 text-[#da7e36] font-sans font-black mb-5">
              Result {result} / {totalMarks}
            </h1>
          </div>

          {questions ? (
            <div>
              <h1 className="text-l flex items-center ml-1">
                <span className="text-[#da7e36] font-sans font-black px-3 text-xl">
                  Q{currentIndex + 1}:
                </span>
                {questions[currentIndex].question.text}
              </h1>

              <ul ref={selectedOptionRef} className="uiverse-pixel-radio-group">
                {shuffledOptions.map((item, index) => (
                  <li key={index} className="uiverse-pixel-radio">
                    <input
                      type="radio"
                      value={item}
                      name="pixel-choice"
                      className="cursor-pointer"
                      onChange={() => {
                        if (!hasStarted) {
                          setHasStarted(true);
                        }
                      }}
                    />
                    <label htmlFor="" className="label-text ">
                      {item}
                    </label>
                  </li>
                ))}
              </ul>

              <h1 className="mb-5 text-xl">
                <span className="text-[#da7e36] font-sans font-black px-3 text-xl">
                  Difficulty :
                </span>
                {questions[currentIndex].difficulty}
              </h1>
              <div className="flex items-center">
                <button
                  onClick={nextQuestion}
                  className="relative inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ml-3 mb-5"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
                  <span className="relative z-10 block px-6 py-3 rounded-xl bg-gray-950">
                    <div className="relative z-10 flex items-center space-x-2">
                      <span className="transition-all duration-500 group-hover:translate-x-1">
                        {currentIndex < questions.length - 1
                          ? "Next Question"
                          : "Finish"}
                      </span>
                      <svg
                        className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          clipRule="evenodd"
                          d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 
                          4.25a.75.75 0 0 1 0 1.06l-4.25 
                          4.25a.75.75 0 0 1-1.06-1.06L11.94 
                          10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                          fillRule="evenodd"
                        />
                      </svg>
                    </div>
                  </span>
                </button>
                {quizEnded && (
                  <button
                    onClick={restartQuiz}
                    className="cursor-pointer relative px-9 py-2 bg-black text-white font-semibold rounded-lg border-2 border-purple-500 hover:border-purple-400 transition-all duration-300 hover:shadow-[0_0_20px_10px_rgba(168,85,247,0.6)] active:scale-95 active:shadow-[0_0_10px_5px_rgba(168,85,247,0.4)] group ml-6 mb-5"
                  >
                    <span className="flex items-center space-x-2">
                      <span>restart</span>
                    </span>
                    <span class="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-purple-500/20 to-indigo-500/20"></span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <h1>Loading...</h1>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
