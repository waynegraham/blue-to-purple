import { useState, useEffect } from "react";
import "./App.css";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import movesData from "./data/moves.json";
// import { MdTitle } from 'react-icons/md';

//https://www.npmjs.com/package/react-ga4
import ReactGA from "react-ga4";

function App() {
  ReactGA.initialize("yG-BY5PHZWJXB");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [modalTitle, setModalTitle] = useState(""); // State for modal title

  const openModal = (videoId, title) => {
    setSelectedVideoId(videoId);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideoId("");
  };

  useEffect(() => {
    ReactGA.initialize("yG-BY5PHZWJXB");

    // Send pageview with a custom path
    ReactGA.send({
      hitType: "pageview",
      page: "/blue-to-purple",
      title: "Blue to Purple",
    });

    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    };
  }, [isModalOpen]);

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Navigation /> {/* Navigation bar */}
      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-2">
        <h1 className="inline-block font-extrabold bg-gradient-to-r from-blue-400 to-purple-800 bg-clip-text text-7xl print:text-5xl text-transparent print:bg-none print:text-black print:bg-clip-border">
          Blue to Purple
        </h1>

        <h2 className="inline-block mt-5 mb-8 text-purple-600 dark:text-purple-300 text-2xl font-semibold tracking-tighter">
          Purple Belt Demonstration
        </h2>

        <p>
          <a target="_blank" className="print:hidden text-purple-600 dark:text-purple-300 underline" href="https://waynegraham.github.io/bjj-study-guide/gracie-jiu-jitsu_compress.pdf">Reference</a>
        </p>

        {/* <h1 className="text-xl text-purple-800 dark:text-purple-400 font-semibold">Test Requirements</h1> */}
        {movesData.map(
          (
            move // Map through moves data
          ) => (
            <div key={move.label}>
              <h2 className="my-3 text-2xl text-gray-900 dark:text-gray-300">
                {move.label}
              </h2>
              <ul className="list-disc ps-5 mt-2 space-y-1 dark:text-gray-300">
                {move.moves.map(
                  (
                    m // Map through each move
                  ) => (
                    <li key={m.name}>
                      <a
                        onClick={() => openModal(m.youtube, m.name)} // Open modal on click
                        className="text-purple-600 dark:text-purple-300 hover:underline"
                      >
                        <span className={m.bold ? "font-bold" : ""}>
                          {m.name}
                        </span>
                      </a>
                      <span className="ml-1 dark:text-gray-300">
                        - {m.note}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>
          )
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-black w-11/12 h-11/12 flex flex-col rounded-lg">
              {" "}
              {/* Modal container */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 dark:text-white"
              >
                X
              </button>
              <h2 className="text-xl font-semibold mb-2">{modalTitle}</h2>{" "}
              {/* Display modal title */}
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                {" "}
                {/* Aspect ratio 16:9 */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full" // Fill the container
                  src={`https://www.youtube.com/embed/${selectedVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex justify-center mt-4">
                {" "}
                {/* Center the button */}
                <button
                  onClick={closeModal}
                  className="bg-indigo-500 text-white px-4 py-2 my-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </section>
  );
}

export default App;
