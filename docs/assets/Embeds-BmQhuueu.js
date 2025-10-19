import{j as e,d as p,G as m,r as o,a as g,I as h}from"./index-DfR4J3qm.js";function u({head:t="",html:r,css:a="",js:i="",title:n="Demo",height:s=400,sandbox:d="allow-scripts allow-same-origin",className:l}){const c=`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${n}</title>
      ${t}
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; padding: 20px; }
        ${a}
      </style>
    </head>
    <body>
      ${r}
      <script>
        ${i}
      <\/script>
    </body>
    </html>
  `;return e.jsx("iframe",{srcDoc:c,title:n,style:{width:"100%",height:`${s}px`},className:p(l),sandbox:d})}function b(){const t={head:`
        <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js" defer><\/script>
        <link rel="stylesheet" href="https://unpkg.com/open-props@latest/open-props.min.css">
        <link rel="stylesheet" href="https://unpkg.com/open-props@latest/normalize.light.min.css">
        <link rel="stylesheet" href="https://unpkg.com/open-props@latest/colors.light.min.css">
        <link rel="stylesheet" href="https://unpkg.com/open-props@latest/shadows.light.min.css">
        <link rel="stylesheet" href="https://unpkg.com/open-props@latest/typography.light.min.css">
        <link rel="stylesheet" href="https://unpkg.com/open-props@latest/borders.light.min.css">

        `,html:`
      <div id="input">
        <input
          type="text"
          id="qr-input"
          placeholder="Enter text or URL"
          value="https://polmoneys.com"
        >
        <button id="generate-btn">Generate QR Code</button>
      </div>

      <div id="canvas">
        <div id="qr-container"></div>
        <button id="download-btn" style="display: none;">Download QR Code</button>
      </div>

  `,css:`
    * {
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
    }

    body {
      background:var(--gray-1);
      line-height: var(--font-lineheight-1);
      font-size: var(--font-size-1);
      font-weight: var(--font-weight-5);
      font-family: var(--font-sans);
    }

    #input { display: flex; gap: 10px; margin-bottom: 25px; }
    #qr-input {
      flex: 1;
      padding: 10px;
      border-radius: var(--radius-2);
      border: var(--border-size-1) solid var(--gray-1);
      font-size: 14px;
      &:hover {
        border-color: var(--red-6);
        box-shadow: var(--shadow-3);
      }
      &:focus {
        outline: none;
        border-color: var(--red-6);
        box-shadow: var(--shadow-3);
      }
    }

    button {
      padding: 10px 16px;
      background: var(--gray-4);
      color: var(--gray-8);
      border-radius: var(--radius-2);
      border: var(--border-size-1) solid var(--gray-1);
      cursor: pointer;
      font-weight: var(--font-weight-7);
      transition: background 0.2s;
      text-shadow:none;
      box-shadow: var(--shadow-1);

      &:hover {
        border-color: var(--red-6);
        box-shadow: var(--shadow-3);
       }
       &:focus {
        outline: none;
        border-color: var(--red-6);
        box-shadow: var(--shadow-3);
       }
    }

    #canvas {
      text-align: center;
      padding: 25px;
      background:var(--gray-0);
      border-radius: var(--radius-2);
      margin-bottom: 20px;
    }

    #qr-container {
      background: var(--gray-1);
      padding: 15px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 15px;
    }

    #download-btn {
      width: 100%;
    }
  `,js:`
    const input = document.getElementById('qr-input');
    const generateBtn = document.getElementById('generate-btn');
    const downloadBtn = document.getElementById('download-btn');
    const container = document.getElementById('qr-container');
    const charCount = document.getElementById('char-count');

    function generateQR() {
      const text = input.value.trim();
      if (!text) {
        alert('Please enter some text or a URL');
        return;
      }

      container.innerHTML = '';

      if (typeof QRCode === 'undefined') {
        container.innerHTML = '<p style="color: #ef4444;">QR Code library loading...</p>';
        setTimeout(generateQR, 100);
        return;
      }

      new QRCode(container, {
        text: text,
        width: 256,
        height: 256,
        colorDark: '#222222',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H,
      });

      downloadBtn.style.display = 'block';
    }

    generateBtn.addEventListener('click', generateQR);

    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') generateQR();
    });

    downloadBtn.addEventListener('click', () => {
      const canvas = container.querySelector('canvas');
      if (canvas) {
        try {
          const dataURL = canvas.toDataURL('image/png');
          const link = document.createElement('a');
          link.href = dataURL;
          link.download = 'qr-code.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          return;
        } catch (err) {
          console.error('Canvas toDataURL failed', err);
        }
      }

      const img = container.querySelector('img');
      if (img && img.src) {
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'qr-code.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        return;
      }

      const svg = container.querySelector('svg');
      if (svg) {
        const serializer = new XMLSerializer();
        const svgStr = serializer.serializeToString(svg);
        const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qr-code.svg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        return;
      }

      alert('No QR code found to download.');
    });

    generateQR();
  `};return e.jsx(e.Fragment,{children:e.jsx(m,{dangerous:{maxWidth:"min(800px,60vw)",margin:"0 auto"},children:e.jsx(u,{...t,height:650,title:"QR Code Generator",sandbox:"allow-scripts allow-same-origin allow-downloads",className:"theme-inset"})})})}function v(){return e.jsx(g,{fitContent:!0,children:e.jsx(h.LoadingBar,{})})}const f=o.lazy(()=>Promise.resolve({default:b}));function x(){return e.jsxs(e.Fragment,{children:[e.jsx(o.Suspense,{fallback:e.jsx(v,{}),children:e.jsx(f,{})}),e.jsx("br",{})]})}export{x as default};
