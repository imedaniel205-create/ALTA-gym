import React, { useState } from 'react';
import { Header, Footer } from './supportingPages.jsx';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=2000&q=85',
  relaxation: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=85',
  sauna: 'https://images.unsplash.com/photo-1770573318991-49b9baaec319?auto=format&fit=crop&w=1800&q=85',
  mobility: 'https://images.unsplash.com/photo-1758599879178-e5be0375dee9?auto=format&fit=crop&w=1800&q=85',
  restoration: 'https://images.unsplash.com/photo-1574224299924-06b5cf22f8ce?auto=format&fit=crop&w=1400&q=85'
};

function Img({ src, alt, variant = 'landscape', className = '' }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`image-frame image-frame--${variant} ${className}${failed ? ' image-frame--error' : ''}`}>
      <img src={src} alt={alt} loading="lazy" decoding="async" onError={() => setFailed(true)} />
    </div>
  );
}

function Btn({ children, href = '/trial', variant = 'primary' }) {
  return <a className={`button button--${variant}`} href={href}>{children}</a>;
}

function Hero() {
  return (
    <section className="support-hero wellness-experience__hero">
      <Img src={IMG.hero} alt="Calm wellness environment" variant="hero" className="support-hero__image" />
      <div className="support-hero__overlay" />
      <div className="container support-hero__content">
        <span className="eyebrow">WELLNESS</span>
        <h1>RECOVERY IS PART OF THE TRAINING.</h1>
        <p>Performance is built through the balance between effort, recovery and everyday wellbeing. ALTA gives recovery its own space within the training routine.</p>
      </div>
    </section>
  );
}

function ExperienceSection() {
  return (
    <section className="support-warm wellness-experience__environment">
      <div className="container wellness-editorial">
        <div className="wellness-editorial__copy">
          <span className="eyebrow">THE RECOVERY ENVIRONMENT</span>
          <h2>SLOW DOWN AFTER YOU TRAIN.</h2>
          <p className="body-large">Recovery at ALTA is designed to feel like a natural extension of the club. Quiet spaces, considered materials and room to pause create a calmer transition out of demanding training.</p>
          <p>Stay for a moment after your session. Move through mobility work, take time in the sauna, or simply give yourself space before returning to the pace of the day.</p>
        </div>
        <Img src={IMG.relaxation} alt="Calm relaxation space with warm neutral materials" variant="landscape" className="wellness-editorial__image" />
      </div>
    </section>
  );
}

function SaunaSection() {
  return (
    <section className="support-dark wellness-experience__sauna">
      <div className="container wellness-split">
        <Img src={IMG.sauna} alt="Modern wooden sauna interior" variant="portrait" />
        <div className="wellness-split__copy">
          <span className="eyebrow">SAUNA</span>
          <h2>A QUIET END TO A HARD SESSION.</h2>
          <p className="body-large">The sauna offers a warm, quiet place to slow the pace after training. It can sit naturally within a recovery routine when you want a few unhurried moments before moving on with the rest of your day.</p>
          <p>Exact sauna specifications and session guidance will be confirmed as the ALTA facility is finalized.</p>
        </div>
      </div>
    </section>
  );
}

function RecoverySpaces() {
  const spaces = [
    ['01', 'RECOVERY SPACE', 'Dedicated spaces and tools for mobility, restoration and post-training recovery.'],
    ['02', 'MOBILITY', 'A place to give movement quality attention before you leave the club.'],
    ['03', 'RESTORATION', 'A calmer environment for intentional rest between demanding sessions.']
  ];

  return (
    <section className="support-light wellness-experience__spaces">
      <div className="container">
        <div className="wellness-section-heading">
          <div>
            <span className="eyebrow">RECOVERY, CONSIDERED</span>
            <h2>ROOM FOR THE WORK BETWEEN WORKOUTS.</h2>
          </div>
          <p className="body-large">Not every part of recovery needs to be intense. ALTA creates space for the quieter work that helps training fit into a sustainable routine.</p>
        </div>
        <div className="wellness-spaces-grid">
          <article className="wellness-space-card wellness-space-card--feature">
            <Img src={IMG.mobility} alt="Person practicing a controlled mobility stretch in a studio" variant="landscape" />
            <div className="wellness-space-card__body">
              <span className="wellness-space-card__number">{spaces[0][0]}</span>
              <h3>{spaces[0][1]}</h3>
              <p>{spaces[0][2]}</p>
            </div>
          </article>
          <div className="wellness-space-stack">
            {spaces.slice(1).map(([number, title, copy]) => (
              <article className="wellness-space-row" key={title}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </article>
            ))}
            <Img src={IMG.restoration} alt="Minimal wellness interior detail" variant="landscape" />
          </div>
        </div>
      </div>
    </section>
  );
}

function RoutineSection() {
  return (
    <section className="support-image wellness-experience__routine">
      <div className="container wellness-routine">
        <div>
          <span className="eyebrow">THE ROUTINE</span>
          <h2>TRAIN. RECOVER. RETURN.</h2>
          <p className="body-large">Recovery can be simple: make time to move, create space to rest and give yourself a calmer transition after demanding work.</p>
        </div>
        <div className="wellness-routine__list">
          <div><span>01</span><strong>MOVE</strong><p>Mobility work can help you give movement quality deliberate attention.</p></div>
          <div><span>02</span><strong>RESET</strong><p>Quiet recovery space gives you room to slow down after effort.</p></div>
          <div><span>03</span><strong>RESTORE</strong><p>Build intentional downtime into the rhythm of your training week.</p></div>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="support-final wellness-experience__final">
      <div className="container">
        <span className="eyebrow">ALTA · LAGOS</span>
        <h2>MAKE RECOVERY PART OF YOUR ROUTINE.</h2>
        <p>Come experience the club for yourself.</p>
        <div>
          <Btn variant="light">Book a free trial →</Btn>
          <Btn href="/club" variant="secondary">Explore the club</Btn>
        </div>
      </div>
    </section>
  );
}

export default function WellnessExperience() {
  return (
    <div id="top" className="wellness-experience">
      <Header />
      <Hero />
      <main>
        <ExperienceSection />
        <SaunaSection />
        <RecoverySpaces />
        <RoutineSection />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
