import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import movesData from "../data/moves.json";
import ReactGA from "react-ga4";

function HomePage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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
    ReactGA.send({
      hitType: "pageview",
      page: "/blue-to-purple",
      title: "Blue to Purple",
    });

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isModalOpen) {
        closeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const filteredData = movesData
    .map((section) => {
      const labelMatch = section.label
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const moves = section.moves.filter((m) =>
        `${m.name} ${m.note}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (labelMatch) {
        return section;
      }
      if (moves.length > 0) {
        return { ...section, moves };
      }
      return null;
    })
    .filter(Boolean);

  const toAnchorId = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Navigation />
      <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-2">
        <h1 className="inline-block font-extrabold bg-gradient-to-r from-blue-400 to-purple-800 bg-clip-text text-7xl print:text-5xl text-transparent print:bg-none print:text-black print:bg-clip-border">
          Blue to Purple <span className="text-3xl">Curriculum Techniques</span>
        </h1>

        <h2
          id="purple-belt-demonstration"
          className="inline-block mt-5 mb-6 text-purple-600 dark:text-purple-300 text-2xl font-semibold tracking-tighter"
        >
          <a href="#purple-belt-demonstration" className="hover:underline">
            Purple Belt Demonstration
          </a>
        </h2>

        <div className="mb-6 flex flex-wrap items-center gap-3">
          <Link
            to="/test-mode"
            className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2 text-white shadow-lg shadow-purple-700/30 transition hover:bg-purple-600"
          >
            Start Test Mode
          </Link>
          <Link
            to="/test-preparation-guide"
            className="inline-flex items-center gap-2 rounded-full border border-purple-700 px-5 py-2 text-purple-700 transition hover:bg-purple-50"
          >
            Test Preperation Guide
          </Link>
        </div>

        <p>
          <a
            target="_blank"
            className="print:hidden text-purple-600 dark:text-purple-300 underline"
            href="https://waynegraham.github.io/bjj-study-guide/gracie-jiu-jitsu_compress.pdf"
            rel="noreferrer"
          >
            Reference
          </a>
        </p>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-4 mb-4 rounded border p-2 text-black dark:text-black print:hidden"
        />

        {filteredData.map((move) => (
          <div key={move.label}>
            <h2
              id={toAnchorId(move.label)}
              className="my-3 text-2xl text-gray-900 dark:text-gray-300"
            >
              <a href={`#${toAnchorId(move.label)}`} className="hover:underline">
                {move.label}
              </a>
            </h2>
            <ul className="list-disc ps-5 mt-2 space-y-1 dark:text-gray-300">
              {move.moves.map((m) => (
                <li key={m.name}>
                  <button
                    type="button"
                    onClick={() => openModal(m.youtube, m.name)}
                    className="hover:underline print:text-black"
                  >
                    <span
                      className={
                        m.bold
                          ? "text-purple-600 dark:text-purple-300 dark:hover:text-purple-200"
                          : "text-blue-600 dark:text-blue-400 dark:hover:text-blue-200"
                      }
                    >
                      {m.name}
                    </span>
                  </button>
                  <span className="ml-1 dark:text-gray-300">- {m.note}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="relative bg-white dark:bg-black w-11/12 h-11/12 flex flex-col rounded-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="video-modal-title"
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute top-2 right-2 dark:text-white"
                aria-label="Close modal"
              >
                X
              </button>
              <h2 id="video-modal-title" className="text-xl font-semibold mb-2">
                {modalTitle}
              </h2>
              <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${selectedVideoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="flex justify-center mt-4">
                <button
                  type="button"
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

export default HomePage;
