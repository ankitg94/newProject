import React from 'react';

const Loadeer = () => {
  return (
    <div style={styles.loaderWrapper}>
      <div className="loader"></div>
      <style>
        {`
          .loader {
            width: 40px;
            height: 30px;
            --c: no-repeat linear-gradient(#000 0 0);
            background:
              var(--c) 0 100%/8px 30px,
              var(--c) 50% 100%/8px 20px,
              var(--c) 100% 100%/8px 10px;
            position: relative;
            clip-path: inset(-100% 0);
          }

          .loader:before {
            content: "";
            position: absolute;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #000;
            left: -16px;
            top: 0;
            animation:
              l5-1 2s linear infinite,
              l5-2 0.5s cubic-bezier(0, 200, .8, 200) infinite;
          }

          @keyframes l5-1 {
            0% {
              left: -16px;
              transform: translateY(-8px);
            }
            100% {
              left: calc(100% + 8px);
              transform: translateY(22px);
            }
          }

          @keyframes l5-2 {
            100% {
              top: -0.1px;
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  loaderWrapper: {
    display: 'flex',
    justifyContent: 'center', 
    alignItems: 'center',     
    height: '90vh',          
    width: '90vw',           
    // backgroundColor: '#f0f0f0', 
  },
};

export default Loadeer;
