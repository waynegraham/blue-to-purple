import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

function TestPreparationGuide() {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 xl:px-0">
      <Navigation />
      <main className="mt-6 flex min-w-0 flex-auto flex-col px-2 pb-8 md:px-2">
        <header className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/40">
          <h1 className="inline-block bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl print:bg-none print:bg-clip-border print:text-black">
            Test Preparation Guide
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-200/90">
            Congratulations, you got <strong>&quot;the email&quot;</strong> (or
            your instructor told you) that it is time to prepare for your test.
            This guide gives some tips to help you structure practice sessions
            to ease your nerves for test day.
          </p>
        </header>

        <nav
          aria-label="Guide sections"
          className="mt-6 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            On This Page
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <a
              href="#overview"
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-purple-400 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-purple-400"
            >
              Overview
            </a>
            <a
              href="#technique"
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-purple-400 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-purple-400"
            >
              Technique
            </a>
            <a
              href="#show-your-game"
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-purple-400 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-purple-400"
            >
              Show Your Game
            </a>
            <a
              href="#thirty-day-plan"
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-purple-400 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-purple-400"
            >
              30-Day Plan
            </a>
            <a
              href="#shark-tank"
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-purple-400 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-purple-400"
            >
              Shark Tank
            </a>
          </div>
        </nav>

        <div className="mx-auto mt-6 flex w-full max-w-4xl flex-col gap-6">
          <article
            id="overview"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Overview
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              The test is structured much like the White-to-Blue test: you will
              demonstrate proficiency in the same techniques, plus a few more
              advanced ones. In addition to the techniques, you will also be
              asked to <strong>show your game</strong>.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              At this point in your journey, the "test" is not about adding a
              few more moves. It is about showing how well you connect and apply
              them.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              This test asks:
            </p>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-base leading-7 text-slate-800 marker:text-purple-500 dark:text-slate-200">
              <li>Do you have a system?</li>
              <li>Can you transition with intention?</li>
              <li>Do you react appropriately?</li>
            </ul>
          </article>

          <article
            id="technique"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Technique Portion
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              The structure is similar to White-to-Blue, but expectations shift.
              At blue belt, you need to <strong>do the move</strong>; at purple
              belt, you need to <strong>own the move</strong>. Be intentional,
              smooth, and detail-oriented.
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              You will likely demonstrate all White-to-Blue techniques first,
              then move to the{" "}
              <Link
                className="text-purple-700 underline transition hover:text-purple-600 dark:text-purple-300 dark:hover:text-purple-200"
                to={{
                  pathname: "/",
                  hash: "#standing-defenses-from-the-front",
                }}
              >
                purple-belt additions
              </Link>
              .
            </p>
          </article>

          <article
            id="show-your-game"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Show Your Game
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              This will happen after the technique section and is meant to show
              that you understand positional advancement, attacking sequences,
              and appropriate reactions to your opponent&apos;s movement.
              Demonstrate a clear game plan and execute it under pressure (e.g.
              people watching you).
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              You will be asked to show your game from specific positions and
              present your attack chains from each. Build a blueprint for Guard,
              Half Guard, Side Control, Mount, and Back Control as well as
              standing. Work with your uke so they can feed realistic reactions
              that let you demonstrate your system. You should be competent
              everywhere, with one position that is clearly your strongest. 
            </p>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              For every position, define:
            </p>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-base leading-7 text-slate-800 marker:text-purple-500 dark:text-slate-200">
              <li>Primary attack</li>
              <li>Secondary attack</li>
              <li>Reaction if defended</li>
              <li>Transition to the next dominant position</li>
            </ul>

            <div className="mt-5 rounded-xl border-l-4 border-purple-500 bg-purple-50/80 p-4 text-slate-800 dark:bg-purple-950/30 dark:text-slate-200">
              <p className="text-base leading-7">
                This creates decision trees.{" "}
                <strong>You are not improvising.</strong> You are executing a
                system.
              </p>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
              Example Structure
            </h3>
            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Closed Guard
                </p>
                <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200">
                  <li>Primary choke (e.g., cross collar).</li>
                  <li>Sweep if posture breaks (e.g., scissor or flower).</li>
                  <li>Back take if they defend.</li>
                  <li>Open guard transition if stacked.</li>
                </ol>
              </div>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <p className="font-semibold text-slate-900 dark:text-slate-100">
                  Cross Body
                </p>
                <ol className="mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200">
                  <li>Primary attack (e.g., kimura).</li>
                  <li>
                    Secondary option if they hide the arm (e.g., americana).
                  </li>
                  <li>Switch to the opposite side as needed.</li>
                  <li>Transition to mount.</li>
                </ol>
              </div>
            </div>

            <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100">
              How to Train Show Your Game
            </h3>
            <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              Twice per week (open mat helps):
            </p>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-base leading-7 text-slate-800 marker:text-purple-500 dark:text-slate-200">
              <li>Start in one required position.</li>
              <li>Roll only from that position.</li>
              <li>Exhaust your options.</li>
              <li>Reset and move to the next required position.</li>
              <li>Make notes on what is working for you.</li>
            </ul>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              By week 3, run the full positional sequence in order.
            </p>
          </article>

          <article
            id="thirty-day-plan"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              30-Day Plan
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Week 1 - Organize
                </h3>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200">
                  <li>Drill technique clusters in order.</li>
                  <li>Write out positional blueprints.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Week 2 - System Build
                </h3>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200">
                  <li>Positional sparring from required test positions.</li>
                  <li>Light-resistance chaining.</li>
                  <li>Half mock technique run.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Week 3 - Integration
                </h3>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200">
                  <li>Full mock technique test.</li>
                  <li>Two full &quot;show your game&quot; simulations.</li>
                  <li>Before- and after-class rolls.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Week 4 - Pressure
                </h3>
                <ul className="mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200">
                  <li>Two full mock tests.</li>
                  <li>Three full positional chain simulations.</li>
                  <li>Before- and after-class rolls.</li>
                </ul>
              </div>
            </div>
          </article>

          <article
            id="shark-tank"
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Shark Tank Strategy
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              You are not being evaluated here. This is to prove you can handle
              pressure and keep composure. It is not about winning.
            </p>
            <ul className="mt-3 list-disc space-y-2 ps-5 text-base leading-7 text-slate-800 marker:text-purple-500 dark:text-slate-200">
              <li>No frantic scrambles.</li>
              <li>Defense first.</li>
              <li>Heavy top pressure when available.</li>
              <li>Intelligent guard recovery.</li>
              <li>Structure over strength.</li>
            </ul>
            <div className="mt-5 rounded-xl border-l-4 border-purple-500 bg-purple-50/80 p-4 text-slate-800 dark:bg-purple-950/30 dark:text-slate-200">
              <p className="text-base leading-7">
                <strong>Control your breathing.</strong>
              </p>
            </div>
          </article>

          <div className="mt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2 text-white shadow-lg shadow-purple-700/30 transition hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
            >
              Back to Curriculum
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </section>
  );
}

export default TestPreparationGuide;
