import React, { useState } from 'react';

function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)} style={{ fontSize: '24px' }}>
        ☰
      </button>
      {open && (
        <nav
          style={{
            position: 'absolute',
            top: '30px',
            left: '0',
            backgroundColor: '#eee',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            zIndex: 100,
          }}
        >
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li><a href="#home" onClick={() => setOpen(false)}>Home</a></li>
            <li><a href="#about" onClick={() => setOpen(false)}>About</a></li>
            <li><a href="#contact" onClick={() => setOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default HamburgerMenu;