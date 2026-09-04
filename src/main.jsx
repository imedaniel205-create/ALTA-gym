import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const navItems = ['Club', 'Training', 'Wellness'];

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="ALTA home">
      ALTA<span className="logo-mark" aria-hidden="true">/</span>
    </a>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef(null);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => <a href={`#${item.toLowerCase()}`} key={item}>{item}</a>)}
        </nav>
        <a className="button button--header" href="#cta">Book a free trial</a>
        <button
          ref={menuButtonRef}
          className="menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
          <span className="menu-lines" aria-hidden="true"><i /><i /></span>
        </button>
      </div>
      <div id="mobile-navigation" className={`mobile-nav ${menuOpen ? 'is-open' : ''}`}>
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => <a href={`#${item.toLowerCase()}`} key={item} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="button button--light" href="#cta" onClick={() => setMenuOpen(false)}>Book a free trial</a>
        </nav>
      </div>
    </header>
  );
}

function Button({ children, variant = 'primary', href = '#cta' }) {
  return <a className={`button button--${variant}`} href={href}>{children}</a>;
}

function TypeScale() {
  return (
    <section className="preview-section" aria-labelledby="type-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">02 / Typography</span>
          <h2 id="type-title">A clear, architectural hierarchy.</h2>
        </div>
        <div className="type-grid">
          <div><span className="type-label">Display</span><p className="display">Elevate<br />your everyday.</p></div>
          <div className="type-samples">
            <div><span className="type-label">H2 / H3</span><h3>Training with intention.</h3></div>
            <div><span className="type-label">Body</span><p className="body-large">A considered environment for training, recovery and wellness in Lagos.</p></div>
            <div><span className="type-label">Eyebrow / Metadata</span><p className="eyebrow">Lagos / Nigeria / 06:30 — 22:00</p></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ColorTokens() {
  const colors = [
    ['Obsidian', 'var(--color-obsidian)', '#111111'],
    ['Graphite', 'var(--color-graphite)', '#1C1C1A'],
    ['Warm Ivory', 'var(--color-ivory)', '#F1EEE7'],
    ['Stone', 'var(--color-stone)', '#C8C1B5'],
    ['Muted Bronze', 'var(--color-bronze)', '#9C8565'],
  ];
  return (
    <section className="preview-section preview-section--dark" aria-labelledby="color-title">
      <div className="container">
        <div className="section-heading section-heading--dark">
          <span className="eyebrow">01 / Color system</span>
          <h2 id="color-title">Quiet contrast. Warm restraint.</h2>
        </div>
        <div className="swatches">
          {colors.map(([name, variable, hex]) => <div className="swatch" key={name} style={{ background: variable }}><span>{name}</span><small>{hex}</small></div>)}
        </div>
      </div>
    </section>
  );
}

function Components() {
  return (
    <section className="preview-section" aria-labelledby="components-title">
      <div className="container">
        <div className="section-heading">
          <span className="eyebrow">03 / Components</span>
          <h2 id="components-title">Built once. Used consistently.</h2>
        </div>
        <div className="component-grid">
          <div className="component-card">
            <span className="type-label">Buttons</span>
            <div className="button-row"><Button>Book a free trial</Button><Button variant="secondary">Explore the club</Button></div>
          </div>
          <div className="component-card component-card--dark">
            <span className="type-label">Dark surface</span>
            <p>Train. Recover. Elevate.</p>
            <Button variant="light">Explore the club</Button>
          </div>
          <div className="component-card component-card--image" aria-label="Reserved image surface demonstrating the image system">
            <div className="image-placeholder"><span className="eyebrow">Image system</span><strong>Hero / Landscape / Portrait / Square</strong></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div id="top">
      <Header />
      <main>
        <section className="foundation-intro" aria-labelledby="foundation-title">
          <div className="container intro-grid">
            <div>
              <span className="eyebrow">ALTA / Design Foundation / Stage 01</span>
              <h1 id="foundation-title">Train.<br />Recover.<br /><em>Elevate.</em></h1>
            </div>
            <div className="intro-copy">
              <p className="body-large">A premium visual system for a modern fitness and wellness club in Lagos.</p>
              <p>Spacing, typography, surfaces, controls and responsive behavior are established here before page content is introduced.</p>
            </div>
          </div>
        </section>
        <ColorTokens />
        <TypeScale />
        <Components />
        <section className="foundation-footer" id="cta" aria-label="Foundation status">
          <div className="container footer-grid">
            <div><span className="eyebrow">ALTA / Stage 01</span><h2>Elevate your everyday.</h2></div>
            <div><p>Foundation preview — no homepage content introduced.</p><span className="status">System ready <i aria-hidden="true" /></span></div>
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
