# AI Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static bilingual single-page AI Engineer portfolio for Phan Trọng Đạt / Dat Brain.

**Architecture:** Use `index.html` for semantic page structure, `styles.css` for the Digital AI Lab visual system, and `script.js` for bilingual content, project filtering, mobile navigation, and DOM rendering. Keep data centralized in JavaScript so Vietnamese and English content stay consistent.

**Tech Stack:** Static HTML, CSS, JavaScript, Node built-in test runner.

---

## File Structure

- Create `index.html`: semantic static shell, section anchors, empty containers populated by JavaScript.
- Create `styles.css`: responsive Digital AI Lab styling, lab visual, grid background, cards, timeline, contact, mobile nav.
- Create `script.js`: bilingual content object, project/category data, render helpers, event wiring, Node exports for tests.
- Create `tests/site.test.js`: Node tests for content identity, project filtering, translation coverage, and hidden empty links.
- Create `README.md`: local usage and customization notes.

## Task 1: Content Data And Behavior Tests

**Files:**
- Create: `tests/site.test.js`
- Create: `script.js`

- [ ] **Step 1: Write failing tests for content and filtering**

Create `tests/site.test.js`:

```js
const test = require('node:test');
const assert = require('node:assert/strict');

const {
  portfolioContent,
  getProjectsByCategory,
  getVisibleContactLinks,
} = require('../script.js');

test('uses approved bilingual hero names', () => {
  assert.equal(portfolioContent.vi.hero.name, 'Phan Trọng Đạt');
  assert.equal(portfolioContent.en.hero.name, 'Dat Brain');
});

test('provides matching top-level sections for both languages', () => {
  assert.deepEqual(Object.keys(portfolioContent.en), Object.keys(portfolioContent.vi));
});

test('filters projects by category and keeps all projects available', () => {
  const allProjects = getProjectsByCategory('all');
  const cvProjects = getProjectsByCategory('computer-vision');

  assert.equal(allProjects.length, 6);
  assert.ok(cvProjects.length >= 3);
  assert.ok(cvProjects.every((project) => project.categories.includes('computer-vision')));
});

test('hides contact links without configured values', () => {
  const links = getVisibleContactLinks({
    email: 'dat@example.com',
    github: '',
    linkedin: 'https://linkedin.com/in/datbrain',
    facebook: '',
    cv: '',
  });

  assert.deepEqual(links.map((link) => link.key), ['email', 'linkedin']);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/site.test.js`

Expected: FAIL because `script.js` does not exist yet.

- [ ] **Step 3: Implement minimal testable content module**

Create `script.js` with:

```js
const contactConfig = {
  email: '',
  github: '',
  linkedin: '',
  facebook: '',
  cv: '',
};

const projects = [
  {
    id: 'parking',
    categories: ['computer-vision', 'web-app', 'deep-learning'],
    vi: {
      title: 'Vision-Language IoT Parking System',
      description: 'Hệ thống bãi đỗ xe thông minh sử dụng Computer Vision, OCR và AI để hỗ trợ quản lý theo thời gian thực.',
    },
    en: {
      title: 'Vision-Language IoT Parking System',
      description: 'A smart parking system using Computer Vision, OCR and AI for realtime parking management.',
    },
    stack: ['YOLO', 'OCR', 'FastAPI', 'MySQL', 'WebSocket', 'Docker'],
  },
  {
    id: 'lane',
    categories: ['computer-vision', 'deep-learning'],
    vi: {
      title: 'Road Lane Detection with Deep Learning',
      description: 'Phát hiện làn đường từ ảnh hoặc video bằng mô hình học sâu cho bài toán giao thông thông minh.',
    },
    en: {
      title: 'Road Lane Detection with Deep Learning',
      description: 'Detects road lanes from images or video with deep learning for intelligent traffic analysis.',
    },
    stack: ['Python', 'OpenCV', 'UNet', 'Video Processing'],
  },
  {
    id: 'yolo',
    categories: ['computer-vision', 'deep-learning'],
    vi: {
      title: 'Custom YOLO Object Detection System',
      description: 'Huấn luyện YOLO trên dữ liệu tùy chỉnh, từ annotation, training, evaluation đến inference.',
    },
    en: {
      title: 'Custom YOLO Object Detection System',
      description: 'Trains custom YOLO detectors from annotation and training to evaluation and inference.',
    },
    stack: ['YOLOv8', 'PyTorch', 'OpenCV', 'Roboflow'],
  },
  {
    id: 'pathfinding',
    categories: ['data-visualization', 'web-app'],
    vi: {
      title: 'A* and Dijkstra Pathfinding Visualization',
      description: 'Trực quan hóa thuật toán tìm đường trên dữ liệu bản đồ thực với node, cạnh và đường đi tối ưu.',
    },
    en: {
      title: 'A* and Dijkstra Pathfinding Visualization',
      description: 'Visualizes shortest-path algorithms on real map data with nodes, edges and optimal routes.',
    },
    stack: ['Python', 'OSMnx', 'NetworkX', 'Leaflet', 'A*', 'Dijkstra'],
  },
  {
    id: 'branddna',
    categories: ['rag-llm', 'web-app'],
    vi: {
      title: 'BrandDNA RAG Copilot',
      description: 'Chatbot RAG giúp đọc hiểu tài liệu thương hiệu, phân tích phong cách và hỗ trợ truyền thông.',
    },
    en: {
      title: 'BrandDNA RAG Copilot',
      description: 'A RAG chatbot for understanding brand documents, voice, culture and communication direction.',
    },
    stack: ['RAG', 'LangChain', 'Vector DB', 'Hybrid Search', 'LLM'],
  },
  {
    id: 'research',
    categories: ['deep-learning'],
    vi: {
      title: 'Deep Learning Model for Research Paper Reproduction',
      description: 'Đọc hiểu bài báo khoa học, xây pipeline dữ liệu, thử nghiệm mô hình học sâu và đánh giá AUC.',
    },
    en: {
      title: 'Deep Learning Model for Research Paper Reproduction',
      description: 'Reimplements a research-paper pipeline with data processing, deep learning experiments and AUC evaluation.',
    },
    stack: ['Python', 'Pandas', 'Deep Learning', 'AUC'],
  },
];

const portfolioContent = {
  vi: {
    nav: ['Trang chủ', 'Giới thiệu', 'Kỹ năng', 'Dự án', 'Hành trình', 'Ghi chú', 'Liên hệ'],
    hero: {
      name: 'Phan Trọng Đạt',
      role: 'AI Engineer | Computer Vision | RAG/LLM | Full-stack AI Products',
      headline: 'Từ mô hình AI đến hệ thống ứng dụng thực tế.',
    },
  },
  en: {
    nav: ['Home', 'About', 'Skills', 'Projects', 'Journey', 'Notes', 'Contact'],
    hero: {
      name: 'Dat Brain',
      role: 'AI Engineer | Computer Vision | RAG/LLM | Full-stack AI Products',
      headline: 'From AI models to real-world systems.',
    },
  },
};

function getProjectsByCategory(category) {
  if (category === 'all') return projects;
  return projects.filter((project) => project.categories.includes(category));
}

function getVisibleContactLinks(config = contactConfig) {
  return Object.entries(config)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => ({ key, value }));
}

if (typeof module !== 'undefined') {
  module.exports = {
    contactConfig,
    portfolioContent,
    projects,
    getProjectsByCategory,
    getVisibleContactLinks,
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/site.test.js`

Expected: PASS.

## Task 2: Static Page Shell

**Files:**
- Create: `index.html`
- Modify: `script.js`

- [ ] **Step 1: Add semantic HTML shell**

Create `index.html` with linked `styles.css` and deferred `script.js`, section anchors, language buttons, mobile menu button, and containers with IDs:

```html
<main>
  <section id="home"></section>
  <section id="about"></section>
  <section id="skills"></section>
  <section id="projects"></section>
  <section id="journey"></section>
  <section id="notes"></section>
  <section id="contact"></section>
</main>
```

- [ ] **Step 2: Expand renderer in `script.js`**

Add DOM functions with these responsibilities:

```js
function renderPage(language = 'vi') {
  // Reads portfolioContent[language], renders hero/about/skills/projects/journey/notes/contact,
  // and calls renderProjects('all', language) for the initial project grid.
}

function setLanguage(language) {
  // Stores currentLanguage, updates the active VI/EN button, sets html[lang],
  // rerenders content, then keeps the current project category active.
}

function bindEvents() {
  // Attaches click handlers for language buttons, project category buttons,
  // mobile menu toggle, and closing the menu after a nav link click.
}
```

The file must guard DOM code with `if (typeof document !== 'undefined')`.

- [ ] **Step 3: Run tests**

Run: `node --test tests/site.test.js`

Expected: PASS.

## Task 3: Digital AI Lab Styling

**Files:**
- Create: `styles.css`
- Modify: `index.html`

- [ ] **Step 1: Implement responsive visual system**

Add CSS for:

- OKLCH dark background and cyan accent.
- Sticky nav with mobile menu.
- Full first viewport hero with visible next-section hint.
- Lab panel visual using CSS grid, scan lines, nodes, and signal rings.
- Responsive cards, filters, timeline, notes, and contact.

- [ ] **Step 2: Check CSS for banned choices**

Run: `Select-String -Path styles.css -Pattern 'background-clip:\\s*text|border-left:\\s*[2-9]|#000|#fff'`

Expected: no output.

## Task 4: README And Local Verification

**Files:**
- Create: `README.md`

- [ ] **Step 1: Add usage notes**

Document:

- Open `index.html` directly, or serve with a static server.
- Update links in `script.js` `contactConfig`.
- Add CV to `assets/` later and set `cv`.

- [ ] **Step 2: Run final verification**

Run:

```powershell
node --test tests/site.test.js
Select-String -Path styles.css -Pattern 'background-clip:\s*text|border-left:\s*[2-9]|#000|#fff'
```

Expected:

- Node tests pass.
- CSS scan returns no matches.

If a local server is started, verify the page at `http://localhost:<port>` for desktop/mobile layout and language/filter interactions.
