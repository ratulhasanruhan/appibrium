const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const OUTPUT_DIR = path.resolve(__dirname, '..');

// Helper to create directories recursively
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Ensure all target directories exist
ensureDir(path.join(OUTPUT_DIR, 'icon'));
ensureDir(path.join(OUTPUT_DIR, 'wordmark'));
ensureDir(path.join(OUTPUT_DIR, 'lockup'));
ensureDir(path.join(OUTPUT_DIR, 'stacked'));

const BASE_HTML_HEAD = `
<!DOCTYPE html>
<html>
<head>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Jost', sans-serif;
      background: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      overflow: hidden;
    }
    :root {
      --night:  #0A1A10;
      --forest: #152B1C;
      --deep:   #0D2317;
      --mint:   #00E090;
      --mintlo: #00B872;
      --sage:   #7FFFD4;
      --snow:   #F2FFF9;
      --white:  #FAFCFA;
    }
  </style>
</head>
<body>
`;

const BASE_HTML_FOOT = `
</body>
</html>
`;

// Helper to get CSS for custom icon size
function getIconCSS(size) {
  const borderRadius = Math.round(size * 0.25);
  const fontSize = Math.round(size * 0.75);
  const marginBottom = Math.round(size * -0.0729);
  const dotSize = Math.round(size * 0.1875);
  const dotTopRight = Math.round(size * 0.177);
  const dcSize = Math.round(dotSize * 0.5);

  return `
    .icon-custom {
      width: ${size}px;
      height: ${size}px;
      border-radius: ${borderRadius}px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .icon-custom .a {
      font-family: 'Jost', sans-serif;
      font-weight: 800;
      line-height: 1;
      display: block;
      font-size: ${fontSize}px;
      margin-bottom: ${marginBottom}px;
    }
    .icon-custom .dot {
      position: absolute;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      width: ${dotSize}px;
      height: ${dotSize}px;
      top: ${dotTopRight}px;
      right: ${dotTopRight}px;
    }
    .icon-custom .dc {
      border-radius: 50%;
      width: ${dcSize}px;
      height: ${dcSize}px;
    }
    
    /* Themes */
    .theme-mint {
      background: var(--mint);
    }
    .theme-mint .a { color: var(--night); }
    .theme-mint .dot { background: var(--night); }
    .theme-mint .dc { background: var(--mint); }

    .theme-night {
      background: var(--night);
    }
    .theme-night .a { color: var(--mint); }
    .theme-night .dot { background: var(--mint); }
    .theme-night .dc { background: var(--night); }

    .theme-outline {
      background: transparent;
      border: ${Math.max(2, Math.round(size * 0.03))}px solid var(--mint);
    }
    .theme-outline .a { color: var(--mint); }
    .theme-outline .dot { background: var(--mint); top: ${dotTopRight - Math.max(2, Math.round(size * 0.03))}px; right: ${dotTopRight - Math.max(2, Math.round(size * 0.03))}px; }
    .theme-outline .dc { background: var(--night); }
  `;
}

// Helper to get CSS for wordmark
function getWordmarkCSS(scale = 1) {
  const nameSize = Math.round(64 * scale);
  const tagSize = Math.round(8.5 * scale);
  const gap = Math.round(16 * scale);
  const tagGap = Math.round(10 * scale);
  const dashWidth = Math.round(24 * scale);
  const dashHeight = Math.round(2 * scale);
  const nameMarginBottom = 0;

  return `
    .wm-custom {
      display: flex;
      flex-direction: column;
      gap: ${gap}px;
      align-items: center;
      padding: ${Math.round(20 * scale)}px;
    }
    .name-custom {
      font-family: 'Jost', sans-serif;
      font-weight: 800;
      letter-spacing: -0.042em;
      line-height: 1;
      font-size: ${nameSize}px;
      margin-bottom: ${nameMarginBottom}px;
    }
    .tag-row-custom {
      display: flex;
      align-items: center;
      gap: ${tagGap}px;
      width: 100%;
    }
    .tl-custom {
      height: ${scale >= 2 ? 1.5 : 0.75}px;
      flex: 1;
    }
    .tag-custom {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 400;
      letter-spacing: .46em;
      font-size: ${tagSize}px;
      text-transform: uppercase;
      white-space: nowrap;
    }
    
    /* Horizontal Lockup styles */
    .lockup-custom {
      display: flex;
      align-items: center;
      gap: ${Math.round(20 * scale)}px;
      padding: ${Math.round(20 * scale)}px;
    }
    .lockup-tag-row {
      display: flex;
      align-items: center;
      gap: ${tagGap}px;
      margin-top: ${Math.round(12 * scale)}px;
    }
    .dash-custom {
      width: ${dashWidth}px;
      height: ${dashHeight}px;
      border-radius: ${Math.round(1 * scale)}px;
      flex-shrink: 0;
    }

    /* Stacked styles */
    .stacked-custom {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: ${Math.round(16 * scale)}px;
      text-align: center;
      padding: ${Math.round(30 * scale)}px;
    }
  `;
}

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: EDGE_PATH,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  async function exportElement(htmlContent, selector, outputPath, width, height) {
    await page.setContent(htmlContent);
    // Wait for fonts to load
    await page.evaluate(async () => {
      await document.fonts.ready;
    });

    const element = await page.$(selector);
    if (!element) {
      throw new Error(`Selector ${selector} not found`);
    }

    // Set viewport to accommodate
    await page.setViewport({
      width: width || 1200,
      height: height || 1200,
      deviceScaleFactor: 1
    });

    // Capture screenshot of element with transparent background
    await element.screenshot({
      path: outputPath,
      omitBackground: true
    });
    console.log(`Exported: ${path.relative(__dirname, outputPath)}`);
  }

  // --- 1. STANDALONE ICONS ---
  const iconSizes = [1024, 512, 256, 128, 96, 64];
  for (const size of iconSizes) {
    const iconCSS = getIconCSS(size);

    // Primary (Mint BG, Dark A)
    const primaryHtml = `
      ${BASE_HTML_HEAD}
      <style>${iconCSS}</style>
      <div id="target" class="icon-custom theme-mint">
        <span class="a">a</span>
        <div class="dot"><div class="dc"></div></div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      primaryHtml,
      '#target',
      path.join(OUTPUT_DIR, 'icon', `icon_mint_on_transparent_${size}.png`),
      size + 40,
      size + 40
    );

    // Dark Variant (Night BG, Mint A)
    const darkHtml = `
      ${BASE_HTML_HEAD}
      <style>${iconCSS}</style>
      <div id="target" class="icon-custom theme-night">
        <span class="a">a</span>
        <div class="dot"><div class="dc"></div></div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      darkHtml,
      '#target',
      path.join(OUTPUT_DIR, 'icon', `icon_night_on_transparent_${size}.png`),
      size + 40,
      size + 40
    );

    // Outline Variant (Transparent BG, Mint border & A)
    const outlineHtml = `
      ${BASE_HTML_HEAD}
      <style>${iconCSS}</style>
      <div id="target" class="icon-custom theme-outline">
        <span class="a">a</span>
        <div class="dot"><div class="dc"></div></div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      outlineHtml,
      '#target',
      path.join(OUTPUT_DIR, 'icon', `icon_outline_mint_${size}.png`),
      size + 40,
      size + 40
    );
  }

  // --- 2. WORDMARKS ---
  const wmScales = [
    { name: 'large', scale: 2 },
    { name: 'medium', scale: 1.5 },
    { name: 'small', scale: 1 }
  ];

  for (const { name, scale } of wmScales) {
    const wmCSS = getWordmarkCSS(scale);

    // Dark Mode Wordmark (Light Text, Mint a)
    const darkHtml = `
      ${BASE_HTML_HEAD}
      <style>${wmCSS}</style>
      <div id="target" class="wm-custom">
        <div class="name-custom" style="color: var(--white);"><span style="color: var(--mint);">a</span>ppibrium</div>
        <div class="tag-row-custom">
          <div class="tl-custom" style="background: var(--mint); opacity: 0.25;"></div>
          <div class="tag-custom" style="color: var(--mint); opacity: 0.75;">Engineering the Future</div>
          <div class="tl-custom" style="background: var(--mint); opacity: 0.25;"></div>
        </div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      darkHtml,
      '#target',
      path.join(OUTPUT_DIR, 'wordmark', `wordmark_light_on_transparent_${name}.png`),
      Math.round(700 * scale),
      Math.round(200 * scale)
    );

    // Light Mode Wordmark (Dark Text, Green a)
    const lightHtml = `
      ${BASE_HTML_HEAD}
      <style>${wmCSS}</style>
      <div id="target" class="wm-custom">
        <div class="name-custom" style="color: var(--night);"><span style="color: var(--mintlo);">a</span>ppibrium</div>
        <div class="tag-row-custom">
          <div class="tl-custom" style="background: var(--night); opacity: 0.15;"></div>
          <div class="tag-custom" style="color: var(--night); opacity: 0.5;">Engineering the Future</div>
          <div class="tl-custom" style="background: var(--night); opacity: 0.15;"></div>
        </div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      lightHtml,
      '#target',
      path.join(OUTPUT_DIR, 'wordmark', `wordmark_dark_on_transparent_${name}.png`),
      Math.round(700 * scale),
      Math.round(200 * scale)
    );
  }

  // --- 3. HORIZONTAL LOCKUPS ---
  for (const { name, scale } of wmScales) {
    const wmCSS = getWordmarkCSS(scale);
    const iconCSS = getIconCSS(Math.round(72 * scale));

    // Dark Mode Lockup (Green Icon, White Text)
    const darkHtml = `
      ${BASE_HTML_HEAD}
      <style>
        ${wmCSS}
        ${iconCSS}
      </style>
      <div id="target" class="lockup-custom">
        <div class="icon-custom theme-mint">
          <span class="a">a</span>
          <div class="dot"><div class="dc"></div></div>
        </div>
        <div class="wm-custom" style="align-items: flex-start; padding: 0; gap: 0;">
          <div class="name-custom" style="color: var(--white);"><span style="color: var(--mint);">a</span>ppibrium</div>
          <div class="lockup-tag-row">
            <div class="dash-custom" style="background: var(--mint);"></div>
            <div class="tag-custom" style="color: var(--mint); opacity: 0.7;">Engineering the Future</div>
          </div>
        </div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      darkHtml,
      '#target',
      path.join(OUTPUT_DIR, 'lockup', `lockup_dark_on_transparent_${name}.png`),
      Math.round(850 * scale),
      Math.round(200 * scale)
    );

    // Light Mode Lockup (Dark Icon, Dark Text)
    const lightHtml = `
      ${BASE_HTML_HEAD}
      <style>
        ${wmCSS}
        ${iconCSS}
      </style>
      <div id="target" class="lockup-custom">
        <div class="icon-custom theme-night">
          <span class="a">a</span>
          <div class="dot"><div class="dc"></div></div>
        </div>
        <div class="wm-custom" style="align-items: flex-start; padding: 0; gap: 0;">
          <div class="name-custom" style="color: var(--night);"><span style="color: var(--mintlo);">a</span>ppibrium</div>
          <div class="lockup-tag-row">
            <div class="dash-custom" style="background: var(--mintlo);"></div>
            <div class="tag-custom" style="color: var(--night); opacity: 0.5;">Engineering the Future</div>
          </div>
        </div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      lightHtml,
      '#target',
      path.join(OUTPUT_DIR, 'lockup', `lockup_light_on_transparent_${name}.png`),
      Math.round(850 * scale),
      Math.round(200 * scale)
    );
  }

  // --- 4. STACKED LOGOS ---
  for (const { name, scale } of wmScales) {
    const wmCSS = getWordmarkCSS(scale);
    const iconCSS = getIconCSS(Math.round(96 * scale));

    // Dark Mode Stacked (Green Icon, White Text)
    const darkHtml = `
      ${BASE_HTML_HEAD}
      <style>
        ${wmCSS}
        ${iconCSS}
      </style>
      <div id="target" class="stacked-custom">
        <div class="icon-custom theme-mint">
          <span class="a">a</span>
          <div class="dot"><div class="dc"></div></div>
        </div>
        <div>
          <div class="name-custom" style="color: var(--white); font-size: ${Math.round(32 * scale)}px; letter-spacing: 0.08em; text-transform: uppercase;"><span style="color: var(--mint);">A</span>ppibrium</div>
          <div class="tag-custom" style="color: var(--mint); opacity: 0.55; font-size: ${Math.round(10 * scale)}px; margin-top: ${Math.round(6 * scale)}px;">Technology Co.</div>
        </div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      darkHtml,
      '#target',
      path.join(OUTPUT_DIR, 'stacked', `stacked_dark_on_transparent_${name}.png`),
      Math.round(400 * scale),
      Math.round(450 * scale)
    );

    // Light Mode Stacked (Dark Icon, Dark Text)
    const lightHtml = `
      ${BASE_HTML_HEAD}
      <style>
        ${wmCSS}
        ${iconCSS}
      </style>
      <div id="target" class="stacked-custom">
        <div class="icon-custom theme-night">
          <span class="a">a</span>
          <div class="dot"><div class="dc"></div></div>
        </div>
        <div>
          <div class="name-custom" style="color: var(--night); font-size: ${Math.round(32 * scale)}px; letter-spacing: 0.08em; text-transform: uppercase;">Appibrium</div>
          <div class="tag-custom" style="color: var(--night); opacity: 0.4; font-size: ${Math.round(10 * scale)}px; margin-top: ${Math.round(6 * scale)}px;">Technology Co.</div>
        </div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      lightHtml,
      '#target',
      path.join(OUTPUT_DIR, 'stacked', `stacked_light_on_transparent_${name}.png`),
      Math.round(400 * scale),
      Math.round(450 * scale)
    );
  }

  // --- 5. W4 EDITORIAL LOCKUPS ---
  for (const { name, scale } of wmScales) {
    const wmCSS = getWordmarkCSS(scale);
    
    // W4 Dark
    const w4DarkHtml = `
      ${BASE_HTML_HEAD}
      <style>
        ${wmCSS}
      </style>
      <div id="target" style="display:flex;align-items:center;gap:${Math.round(20 * scale)}px;padding:${Math.round(20 * scale)}px;">
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:${Math.round(3 * scale)}px;flex-shrink:0;">
          <div class="tag-custom" style="color:var(--mint);opacity:.7;font-size:${Math.round(7.5 * scale)}px;letter-spacing:.3em;white-space:nowrap;">ENGINEERING</div>
          <div class="tag-custom" style="color:var(--mint);opacity:.7;font-size:${Math.round(7.5 * scale)}px;letter-spacing:.3em;white-space:nowrap;">THE FUTURE</div>
        </div>
        <div style="width:${Math.round(1 * scale)}px;height:${Math.round(52 * scale)}px;background:var(--mint);opacity:.3;flex-shrink:0;"></div>
        <div class="name-custom" style="font-size:${Math.round(68 * scale)}px;color:var(--white);margin-bottom:0;padding:0;letter-spacing:-0.04em;"><span style="color:var(--mint);">a</span>ppibrium</div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      w4DarkHtml,
      '#target',
      path.join(OUTPUT_DIR, 'lockup', `lockup_w4_dark_on_transparent_${name}.png`),
      Math.round(750 * scale),
      Math.round(200 * scale)
    );

    // W4 Light
    const w4LightHtml = `
      ${BASE_HTML_HEAD}
      <style>
        ${wmCSS}
      </style>
      <div id="target" style="display:flex;align-items:center;gap:${Math.round(20 * scale)}px;padding:${Math.round(20 * scale)}px;">
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:${Math.round(3 * scale)}px;flex-shrink:0;">
          <div class="tag-custom" style="color:var(--night);opacity:.5;font-size:${Math.round(7.5 * scale)}px;letter-spacing:.3em;white-space:nowrap;">ENGINEERING</div>
          <div class="tag-custom" style="color:var(--night);opacity:.5;font-size:${Math.round(7.5 * scale)}px;letter-spacing:.3em;white-space:nowrap;">THE FUTURE</div>
        </div>
        <div style="width:${Math.round(1 * scale)}px;height:${Math.round(52 * scale)}px;background:var(--night);opacity:.2;flex-shrink:0;"></div>
        <div class="name-custom" style="font-size:${Math.round(68 * scale)}px;color:var(--night);margin-bottom:0;padding:0;letter-spacing:-0.04em;"><span style="color:var(--mintlo);">a</span>ppibrium</div>
      </div>
      ${BASE_HTML_FOOT}
    `;
    await exportElement(
      w4LightHtml,
      '#target',
      path.join(OUTPUT_DIR, 'lockup', `lockup_w4_light_on_transparent_${name}.png`),
      Math.round(750 * scale),
      Math.round(200 * scale)
    );
  }

  await browser.close();
  console.log('All branding assets exported successfully!');
}

run().catch(console.error);
