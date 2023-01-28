import { useState, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import { getRandomInt, init, allOddsEvens, isConsecutive } from "./lib";
// import gcd_more_than_two_numbers from "./lib";
// import "./App.css";

function App() {
  const ref = useRef();
  const nums = [
    71, 73, 69, 77, 65, 72, 76, 68, 61, 58, 59, 62, 67, 82, 71, 55, 75, 59, 63,
    56, 59, 61, 61, 64, 65, 64, 67, 58, 65, 65, 63, 70, 65, 74, 67, 59, 70, 74,
    73, 61, 64, 67, 80, 71, 69, 69, 71, 72, 63,
  ];

  const grandNums = [111, 113, 86, 84, 83, 87, 91];

  const [resault, setResault] = useState([]);
  const [numsMap, setNumsMap] = useState(new Map());
  const [grandNumsMap, setGrandNumsMap] = useState(new Map());
  const [errorLog, setErrorLog] = useState([]);

  const generate = () => {
    if (resault.length >= 10) return;
    const res = new Array(5);
    let currentNum = 0;
    for (const [index, n] of res.entries()) {
      currentNum = numsMap.get(getRandomInt(numsMap.size));

      while (res.includes(currentNum)) {
        // console.log("got same " + currentNum);
        currentNum = numsMap.get(getRandomInt(numsMap.size));
      }
      res[index] = currentNum;
    }
    res.sort((a, b) => a - b);

    const evenOdds = allOddsEvens(res);

    if (evenOdds !== true || isConsecutive(res)) {
      let message = "";
      if (evenOdds !== true) {
        message =
          evenOdds.get(0) === false
            ? "All Odd: " + JSON.stringify(res)
            : "All Even: " + JSON.stringify(res);
      } else if (isConsecutive(res)) {
        message = "consecutive: " + JSON.stringify(res);
      }

      setErrorLog((currentlog) => [...currentlog, message]);
      return;
    }

    res[5] = grandNumsMap.get(getRandomInt(grandNumsMap.size));
    setResault((arr) => [...arr, res]);
  };

  useEffect(() => {
    if (ref.current) return;
    setNumsMap(init(nums, numsMap));
    setGrandNumsMap(init(grandNums, grandNumsMap));
    generate();
    ref.current = true;
  }, []);

  return (
    <div className="App">
      <div className="flex outline-dashed outline-2 p-3 rounded-lg mb-5">
        <div className="flex flex-col mr-3">
          <button className="p-3 bg-sky-500 mb-5" onClick={generate}>
            GEN!
          </button>

          <button
            className="p-3 bg-red-500"
            onClick={() => {
              setResault([]);
              setErrorLog([]);
            }}
          >
            CLEAR
          </button>
        </div>

        <main>
          {resault.map((set, i) => (
            <div key={i} className=" odd:bg-gray-300">
              {set.map((num, j) =>
                j === 5 ? (
                  <span
                    key={j}
                    className="w-[25px] inline-block text-red-500 font-bold text-2xl text-center"
                  >
                    {num}
                  </span>
                ) : (
                  <span
                    className="w-[25px] inline-block m-1 text-center"
                    key={j}
                  >
                    {num}
                  </span>
                )
              )}
            </div>
          ))}
        </main>
      </div>

      <div>
        {errorLog.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
