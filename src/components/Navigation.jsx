import React from 'react';

const Navigation = ({ currentView, setView, views }) => {
  return (
    <nav style={{ marginBottom: '15px', textAlign: 'center' }}>
      {Object.entries(views).map(([key, label]) => (
        <button
          key={key}
          onClick={() => setView(key)}
          style={{
            margin: '0 10px',
            padding: '8px 15px',
            borderRadius: '5px',
            border: currentView === key ? '2px solid #004a99' : '1px solid #aaa',
            background: currentView === key ? '#004a99' : 'white',
            color: currentView === key ? 'white' : '#004a99',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;
