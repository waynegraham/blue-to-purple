/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";

const styles = {
  page: "mx-auto max-w-5xl px-4 sm:px-6 xl:px-0",
  main: "mt-6 flex min-w-0 flex-auto flex-col px-2 pb-8 md:px-2",
  hero: "rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-blue-50 to-purple-50 p-6 shadow-sm dark:border-slate-800 dark:from-slate-900 dark:via-slate-900 dark:to-purple-950/40",
  heroTitle:
    "inline-block bg-gradient-to-r from-blue-500 to-purple-800 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl print:bg-none print:bg-clip-border print:text-black",
  bodyText: "mt-4 text-base leading-7 text-slate-700 dark:text-slate-200/90",
  sectionNav:
    "mt-6 rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70",
  sectionNavLabel:
    "text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400",
  sectionNavLinks: "mt-3 flex flex-wrap gap-2",
  sectionNavLink:
    "rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 transition hover:border-purple-400 hover:text-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:border-slate-600 dark:text-slate-200 dark:hover:border-purple-400",
  contentWrap: "mx-auto mt-6 flex w-full max-w-4xl flex-col gap-6",
  article: "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70",
  sectionHeading: "text-2xl font-bold text-slate-900 dark:text-slate-100",
  sectionList:
    "mt-3 list-disc space-y-2 ps-5 text-base leading-7 text-slate-800 marker:text-purple-500 dark:text-slate-200",
  sectionSubheading: "mt-6 text-xl font-semibold text-slate-900 dark:text-slate-100",
  noteBox:
    "mt-5 rounded-xl border-l-4 border-purple-500 bg-purple-50/80 p-4 text-slate-800 dark:bg-purple-950/30 dark:text-slate-200",
  exampleGrid: "mt-3 grid gap-4 md:grid-cols-2",
  exampleCard: "rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900",
  exampleCardTitle: "font-semibold text-slate-900 dark:text-slate-100",
  cardList:
    "mt-2 list-disc space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200",
  orderedCardList:
    "mt-2 list-decimal space-y-1 ps-5 text-sm leading-6 text-slate-700 marker:text-purple-500 dark:text-slate-200",
  planGrid: "mt-4 grid gap-4 md:grid-cols-2",
  planCard: "rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900",
  planCardHeading: "text-lg font-semibold text-slate-900 dark:text-slate-100",
  backLinkWrap: "mt-2",
  backLink:
    "inline-flex items-center gap-2 rounded-full bg-purple-700 px-5 py-2 text-white shadow-lg shadow-purple-700/30 transition hover:bg-purple-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2",
  guideLead: "mt-4 max-w-3xl text-base leading-7 text-slate-700 dark:text-slate-200/90",
};

function SectionLink({ href, children }) {
  return (
    <a href={href} className={styles.sectionNavLink}>
      {children}
    </a>
  );
}

function GuideArticle({ id, title, children }) {
  return (
    <article id={id} className={styles.article}>
      <h2 className={styles.sectionHeading}>{title}</h2>
      {children}
    </article>
  );
}

function InfoCard({ title, ordered = false, children }) {
  return (
    <div className={styles.exampleCard}>
      <p className={styles.exampleCardTitle}>{title}</p>
      <ol className={ordered ? styles.orderedCardList : styles.cardList}>{children}</ol>
    </div>
  );
}

function PlanWeek({ title, children }) {
  return (
    <div className={styles.planCard}>
      <h3 className={styles.planCardHeading}>{title}</h3>
      <ul className={styles.cardList}>{children}</ul>
    </div>
  );
}

function TestPreparationGuide() {
  return (
    <section className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <header className={styles.hero}>
          <h1 className={styles.heroTitle}>Test Preparation Guide</h1>
          <p className={styles.guideLead}>
            Congratulations, you got <strong>&quot;the email&quot;</strong> (or your
            instructor told you) that it is time to prepare for your test. This
            guide gives some tips to help you structure practice sessions to
            ease your nerves for test day.
          </p>
        </header>

        <nav aria-label="Guide sections" className={styles.sectionNav}>
          <p className={styles.sectionNavLabel}>On This Page</p>
          <div className={styles.sectionNavLinks}>
            <SectionLink href="#overview">Overview</SectionLink>
            <SectionLink href="#technique">Technique</SectionLink>
            <SectionLink href="#show-your-game">Show Your Game</SectionLink>
            <SectionLink href="#thirty-day-plan">30-Day Plan</SectionLink>
            <SectionLink href="#shark-tank">Shark Tank</SectionLink>
          </div>
        </nav>

        <div className={styles.contentWrap}>
          <GuideArticle id="overview" title="Overview">
            <p className={styles.bodyText}>
              The test is structured much like the White-to-Blue test: you will
              demonstrate proficiency in the same techniques, plus a few more
              advanced ones. In addition to the techniques, you will also be
              asked to <strong>show your game</strong>.
            </p>
            <p className={styles.bodyText}>
              At this point in your journey, the &quot;test&quot; is not about adding a
              few more moves. It is about showing how well you connect and apply
              them.
            </p>
            <p className={styles.bodyText}>This test asks:</p>
            <ul className={styles.sectionList}>
              <li>Do you have a system?</li>
              <li>Can you transition with intention?</li>
              <li>Do you react appropriately?</li>
            </ul>
          </GuideArticle>

          <GuideArticle id="technique" title="Technique Portion">
            <p className={styles.bodyText}>
              The structure is similar to White-to-Blue, but expectations shift.
              At blue belt, you need to <strong>do the move</strong>; at purple
              belt, you need to <strong>own the move</strong>. Be intentional,
              smooth, and detail-oriented.
            </p>
            <p className={styles.bodyText}>
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
          </GuideArticle>

          <GuideArticle id="show-your-game" title="Show Your Game">
            <p className={styles.bodyText}>
              This will happen after the technique section and is meant to show
              that you understand positional advancement, attacking sequences,
              and appropriate reactions to your opponent&apos;s movement.
              Demonstrate a clear game plan and execute it under pressure (e.g.
              people watching you).
            </p>
            <p className={styles.bodyText}>
              You will be asked to show your game from specific positions and
              present your attack chains from each. Build a blueprint for Guard,
              Half Guard, Side Control, Mount, and Back Control as well as
              standing. Work with your uke so they can feed realistic reactions
              that let you demonstrate your system. You should be competent
              everywhere, with one position that is clearly your strongest.
            </p>
            <p className={styles.bodyText}>For every position, define:</p>
            <ul className={styles.sectionList}>
              <li>Primary attack</li>
              <li>Secondary attack</li>
              <li>Reaction if defended</li>
              <li>Transition to the next dominant position</li>
            </ul>

            <div className={styles.noteBox}>
              <p className="text-base leading-7">
                This creates decision trees. <strong>You are not improvising.</strong>
                {" "}You are executing a system.
              </p>
            </div>

            <h3 className={styles.sectionSubheading}>Example Structure</h3>
            <div className={styles.exampleGrid}>
              <InfoCard title="Closed Guard" ordered>
                <li>Primary choke (e.g., cross collar).</li>
                <li>Sweep if posture breaks (e.g., scissor or flower).</li>
                <li>Back take if they defend.</li>
                <li>Open guard transition if stacked.</li>
              </InfoCard>
              <InfoCard title="Cross Body" ordered>
                <li>Primary attack (e.g., kimura).</li>
                <li>Secondary option if they hide the arm (e.g., americana).</li>
                <li>Switch to the opposite side as needed.</li>
                <li>Transition to mount.</li>
              </InfoCard>
            </div>

            <h3 className={styles.sectionSubheading}>How to Train Show Your Game</h3>
            <p className="mt-3 text-base leading-7 text-slate-700 dark:text-slate-200/90">
              Twice per week (open mat helps):
            </p>
            <ul className={styles.sectionList}>
              <li>Start in one required position.</li>
              <li>Roll only from that position.</li>
              <li>Exhaust your options.</li>
              <li>Reset and move to the next required position.</li>
              <li>Make notes on what is working for you.</li>
            </ul>
            <p className={styles.bodyText}>
              By week 3, run the full positional sequence in order.
            </p>
          </GuideArticle>

          <GuideArticle id="thirty-day-plan" title="30-Day Plan">
            <div className={styles.planGrid}>
              <PlanWeek title="Week 1 - Organize">
                <li>Drill technique clusters in order.</li>
                <li>Write out positional blueprints.</li>
              </PlanWeek>
              <PlanWeek title="Week 2 - System Build">
                <li>Positional sparring from required test positions.</li>
                <li>Light-resistance chaining.</li>
                <li>Half mock technique run.</li>
              </PlanWeek>
              <PlanWeek title="Week 3 - Integration">
                <li>Full mock technique test.</li>
                <li>Two full &quot;show your game&quot; simulations.</li>
                <li>Before- and after-class rolls.</li>
              </PlanWeek>
              <PlanWeek title="Week 4 - Pressure">
                <li>Two full mock tests.</li>
                <li>Three full positional chain simulations.</li>
                <li>Before- and after-class rolls.</li>
              </PlanWeek>
            </div>
          </GuideArticle>

          <GuideArticle id="shark-tank" title="Shark Tank Strategy">
            <p className={styles.bodyText}>
              You are not being evaluated here. This is to prove you can handle
              pressure and keep composure. It is not about winning.
            </p>
            <ul className={styles.sectionList}>
              <li>No frantic scrambles.</li>
              <li>Defense first.</li>
              <li>Heavy top pressure when available.</li>
              <li>Intelligent guard recovery.</li>
              <li>Structure over strength.</li>
            </ul>
            <div className={styles.noteBox}>
              <p className="text-base leading-7">
                <strong>Control your breathing.</strong>
              </p>
            </div>
          </GuideArticle>

          <div className={styles.backLinkWrap}>
            <Link to="/" className={styles.backLink}>
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
