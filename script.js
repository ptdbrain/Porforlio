const contactConfig = {
  email: '',
  github: '',
  linkedin: '',
  facebook: '',
  cv: '',
};

const categoryOptions = [
  { id: 'all', vi: 'Tất cả', en: 'All' },
  { id: 'computer-vision', vi: 'Computer Vision', en: 'Computer Vision' },
  { id: 'deep-learning', vi: 'Deep Learning', en: 'Deep Learning' },
  { id: 'rag-llm', vi: 'RAG/LLM', en: 'RAG/LLM' },
  { id: 'web-app', vi: 'Web App', en: 'Web App' },
  { id: 'security', vi: 'Security', en: 'Security' },
  { id: 'data-visualization', vi: 'Data Visualization', en: 'Data Visualization' },
];

const projects = [
  {
    id: 'parking',
    categories: ['computer-vision', 'web-app', 'deep-learning'],
    vi: {
      title: 'Vision-Language IoT Parking System',
      description: 'Hệ thống bãi đỗ xe thông minh sử dụng Computer Vision, OCR và AI để nhận diện xe, biển số, trạng thái bãi đỗ và hỗ trợ quản lý theo thời gian thực.',
      points: ['Nhận diện xe và biển số', 'Theo dõi slot realtime', 'Backend FastAPI và WebSocket'],
    },
    en: {
      title: 'Vision-Language IoT Parking System',
      description: 'A smart parking system using Computer Vision, OCR and AI to detect vehicles, plates, parking states and realtime operations.',
      points: ['Vehicle and plate detection', 'Realtime slot tracking', 'FastAPI and WebSocket backend'],
    },
    stack: ['YOLO', 'OCR', 'FastAPI', 'MySQL', 'WebSocket', 'Docker'],
  },
  {
    id: 'lane',
    categories: ['computer-vision', 'deep-learning'],
    vi: {
      title: 'Road Lane Detection with Deep Learning',
      description: 'Dự án phát hiện làn đường từ ảnh hoặc video bằng mô hình học sâu, hướng đến bài toán xe tự hành và phân tích giao thông.',
      points: ['Xử lý video đầu vào', 'Segment làn đường', 'Mở rộng được cho realtime inference'],
    },
    en: {
      title: 'Road Lane Detection with Deep Learning',
      description: 'Detects road lanes from images or video with deep learning for autonomous-driving and traffic-analysis scenarios.',
      points: ['Video input processing', 'Lane segmentation', 'Ready for realtime inference extension'],
    },
    stack: ['Python', 'OpenCV', 'UNet', 'Deep Learning'],
  },
  {
    id: 'yolo',
    categories: ['computer-vision', 'deep-learning'],
    vi: {
      title: 'Custom YOLO Object Detection System',
      description: 'Huấn luyện mô hình YOLO trên dữ liệu tùy chỉnh, từ chuẩn bị dataset, annotation, training, evaluation đến inference.',
      points: ['Fine-tune YOLO', 'Đánh giá mAP, Precision, Recall', 'Xuất kết quả ảnh và video'],
    },
    en: {
      title: 'Custom YOLO Object Detection System',
      description: 'Trains custom YOLO detectors from dataset preparation and annotation to evaluation and inference.',
      points: ['YOLO fine-tuning', 'mAP, Precision and Recall evaluation', 'Image and video outputs'],
    },
    stack: ['YOLOv8', 'PyTorch', 'OpenCV', 'Roboflow'],
  },
  {
    id: 'pathfinding',
    categories: ['data-visualization', 'web-app'],
    vi: {
      title: 'A* and Dijkstra Pathfinding Visualization',
      description: 'Ứng dụng mô phỏng thuật toán tìm đường trên dữ liệu bản đồ thực, trực quan hóa node, cạnh và đường đi ngắn nhất.',
      points: ['Trích xuất graph từ bản đồ', 'Animation quá trình duyệt node', 'Hỗ trợ blocked edges'],
    },
    en: {
      title: 'A* and Dijkstra Pathfinding Visualization',
      description: 'Visualizes shortest-path algorithms on real map data with nodes, edges and optimal routes.',
      points: ['Map graph extraction', 'Animated node traversal', 'Blocked-edge support'],
    },
    stack: ['Python', 'OSMnx', 'NetworkX', 'Leaflet', 'A*', 'Dijkstra'],
  },
  {
    id: 'branddna',
    categories: ['rag-llm', 'web-app'],
    vi: {
      title: 'BrandDNA RAG Copilot',
      description: 'Chatbot RAG giúp doanh nghiệp đọc hiểu tài liệu thương hiệu, phân tích phong cách, văn hóa và định hướng truyền thông.',
      points: ['Text, image và OCR RAG', 'Hybrid Search và reranking', 'Web chatbot deployment'],
    },
    en: {
      title: 'BrandDNA RAG Copilot',
      description: 'A RAG chatbot for understanding brand documents, voice, culture and communication direction.',
      points: ['Text, image and OCR RAG', 'Hybrid Search and reranking', 'Web chatbot deployment'],
    },
    stack: ['RAG', 'LangChain', 'Vector DB', 'Hybrid Search', 'LLM'],
  },
  {
    id: 'research',
    categories: ['deep-learning'],
    vi: {
      title: 'Deep Learning Model for Research Paper Reproduction',
      description: 'Dự án đọc hiểu bài báo khoa học, xây pipeline dữ liệu, thử nghiệm mô hình học sâu và đánh giá hiệu năng.',
      points: ['Phân tích paper gốc', 'Thiết kế pipeline tiền xử lý', 'Tối ưu chỉ số AUC'],
    },
    en: {
      title: 'Deep Learning Model for Research Paper Reproduction',
      description: 'Reimplements a research-paper pipeline with data processing, deep learning experiments and model evaluation.',
      points: ['Original paper analysis', 'Preprocessing pipeline design', 'AUC optimization'],
    },
    stack: ['Python', 'Pandas', 'Deep Learning', 'AUC'],
  },
];

const portfolioContent = {
  vi: {
    metaTitle: 'Phan Trọng Đạt | AI Engineer Portfolio',
    nav: ['Trang chủ', 'Giới thiệu', 'Kỹ năng', 'Dự án', 'Hành trình', 'Ghi chú', 'Liên hệ'],
    hero: {
      name: 'Phan Trọng Đạt',
      role: 'AI Engineer | Computer Vision | RAG/LLM | Full-stack AI Products',
      headline: 'Từ mô hình AI đến hệ thống ứng dụng thực tế.',
      body: 'Tôi xây dựng hệ thống AI hoàn chỉnh: từ xử lý dữ liệu, huấn luyện mô hình, đánh giá kết quả, xây dựng API, thiết kế giao diện đến triển khai sản phẩm.',
      primaryCta: 'Xem dự án',
      secondaryCta: 'Liên hệ',
    },
    about: {
      eyebrow: 'AI systems builder',
      title: 'Tôi tập trung vào AI có khả năng ứng dụng thật.',
      body: 'Tôi định hướng trở thành AI Engineer, tập trung vào Computer Vision, Deep Learning, RAG/LLM và triển khai các hệ thống AI có giao diện sử dụng được. Điểm mạnh của tôi là học nhanh, đào sâu bản chất kỹ thuật và kết hợp AI với phần mềm thực tế.',
      stats: [
        ['6+', 'project nổi bật'],
        ['CV', 'YOLO, OCR, segmentation'],
        ['RAG', 'LangChain, Vector DB'],
        ['Deploy', 'Docker, API, VPS'],
      ],
    },
    direction: {
      title: 'Định hướng nghề nghiệp',
      body: 'Ngắn hạn, tôi nâng cao năng lực Deep Learning, Computer Vision, RAG/LLM, Backend API và Deployment. Dài hạn, tôi muốn phát triển các sản phẩm AI hoàn chỉnh kết hợp mô hình học sâu, dữ liệu đa phương thức, giao diện người dùng và hệ thống triển khai ổn định.',
    },
    skills: {
      title: 'Kỹ năng',
      groups: [
        ['AI / Machine Learning', ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'PyTorch', 'TensorFlow']],
        ['Computer Vision', ['YOLO', 'CNN', 'UNet', 'OCR', 'Object Detection', 'Image Segmentation']],
        ['GenAI / RAG / LLM', ['LangChain', 'RAG Pipeline', 'Vector Database', 'FAISS', 'Hybrid Search']],
        ['Backend / Web', ['FastAPI', 'Flask', 'REST API', 'WebSocket', 'SQLAlchemy', 'MySQL']],
        ['Frontend', ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'UI Animation']],
        ['Deployment / Tools', ['Docker', 'Git', 'GitHub', 'VPS', 'Linux', 'Conda']],
        ['Security', ['SQL Injection', 'XSS', 'CSRF', 'JWT', 'CORS', 'Cryptography Basics']],
      ],
    },
    projects: {
      title: 'Dự án nổi bật',
      intro: 'Các dự án cho thấy cách tôi đi từ model, dữ liệu, thuật toán đến sản phẩm có thể sử dụng.',
      stackLabel: 'Công nghệ',
      featureLabel: 'Điểm chính',
    },
    journey: {
      title: 'Hành trình học tập',
      items: [
        ['01', 'Python & Data Processing', 'Nền tảng xử lý dữ liệu, làm sạch dữ liệu và xây pipeline thử nghiệm.'],
        ['02', 'OpenCV & Computer Vision', 'Xử lý ảnh, video, feature extraction và bài toán thị giác máy tính.'],
        ['03', 'CNN, YOLO, UNet', 'Huấn luyện và đánh giá mô hình detection, segmentation, OCR.'],
        ['04', 'RAG, LLM, Vector Database', 'Thiết kế pipeline hỏi đáp tài liệu và tìm kiếm lai.'],
        ['05', 'Backend, API, Deployment', 'Biến mô hình thành API, giao diện và hệ thống triển khai được.'],
      ],
    },
    notes: {
      title: 'Technical Notes & Research',
      items: [
        ['Deep Learning', 'Activation, Backpropagation, CNN, Optimizer'],
        ['Object Detection', 'YOLOv2, YOLOv3, RoI Pooling, Bounding Box'],
        ['GenAI', 'VAE, GAN, RAG, Transformer, LLM'],
        ['Security', 'SQLi, XSS, CSRF, JWT, Cryptography'],
        ['DevOps', 'Docker, Linux, VPS, Deployment'],
        ['Big Data', 'Hadoop, HDFS, Kafka'],
      ],
    },
    contact: {
      title: 'Cùng xây dựng hệ thống AI thông minh.',
      body: 'Tôi mở với các cơ hội AI Engineer, Computer Vision, Backend AI, RAG/LLM và full-stack AI product.',
      empty: 'Thông tin liên hệ có thể được cập nhật trong script.js.',
    },
  },
  en: {
    metaTitle: 'Dat Brain | AI Engineer Portfolio',
    nav: ['Home', 'About', 'Skills', 'Projects', 'Journey', 'Notes', 'Contact'],
    hero: {
      name: 'Dat Brain',
      role: 'AI Engineer | Computer Vision | RAG/LLM | Full-stack AI Products',
      headline: 'From AI models to real-world systems.',
      body: 'I build end-to-end AI systems: from data preprocessing, model training and evaluation to backend APIs, interface design and deployment.',
      primaryCta: 'View Projects',
      secondaryCta: 'Contact',
    },
    about: {
      eyebrow: 'AI systems builder',
      title: 'I focus on AI that can become real software.',
      body: 'I am developing toward AI Engineering with a focus on Computer Vision, Deep Learning, RAG/LLM and usable AI systems. My strength is learning quickly, studying technical fundamentals deeply and combining AI with practical software.',
      stats: [
        ['6+', 'featured projects'],
        ['CV', 'YOLO, OCR, segmentation'],
        ['RAG', 'LangChain, Vector DB'],
        ['Deploy', 'Docker, API, VPS'],
      ],
    },
    direction: {
      title: 'Career Direction',
      body: 'In the short term, I am strengthening Deep Learning, Computer Vision, RAG/LLM, Backend API and Deployment. In the long term, I want to build complete AI products that combine deep models, multimodal data, user interfaces and stable deployment.',
    },
    skills: {
      title: 'Skills',
      groups: [
        ['AI / Machine Learning', ['Python', 'NumPy', 'Pandas', 'Scikit-learn', 'PyTorch', 'TensorFlow']],
        ['Computer Vision', ['YOLO', 'CNN', 'UNet', 'OCR', 'Object Detection', 'Image Segmentation']],
        ['GenAI / RAG / LLM', ['LangChain', 'RAG Pipeline', 'Vector Database', 'FAISS', 'Hybrid Search']],
        ['Backend / Web', ['FastAPI', 'Flask', 'REST API', 'WebSocket', 'SQLAlchemy', 'MySQL']],
        ['Frontend', ['HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'UI Animation']],
        ['Deployment / Tools', ['Docker', 'Git', 'GitHub', 'VPS', 'Linux', 'Conda']],
        ['Security', ['SQL Injection', 'XSS', 'CSRF', 'JWT', 'CORS', 'Cryptography Basics']],
      ],
    },
    projects: {
      title: 'Featured Projects',
      intro: 'Projects that show how I move from models, data and algorithms into usable software.',
      stackLabel: 'Stack',
      featureLabel: 'Highlights',
    },
    journey: {
      title: 'Learning Journey',
      items: [
        ['01', 'Python & Data Processing', 'Data foundations, cleaning workflows and experimental pipelines.'],
        ['02', 'OpenCV & Computer Vision', 'Image, video, feature extraction and computer vision problem solving.'],
        ['03', 'CNN, YOLO, UNet', 'Training and evaluating detection, segmentation and OCR models.'],
        ['04', 'RAG, LLM, Vector Database', 'Question-answering pipelines and hybrid retrieval over documents.'],
        ['05', 'Backend, API, Deployment', 'Turning models into APIs, interfaces and deployable systems.'],
      ],
    },
    notes: {
      title: 'Technical Notes & Research',
      items: [
        ['Deep Learning', 'Activation, Backpropagation, CNN, Optimizer'],
        ['Object Detection', 'YOLOv2, YOLOv3, RoI Pooling, Bounding Box'],
        ['GenAI', 'VAE, GAN, RAG, Transformer, LLM'],
        ['Security', 'SQLi, XSS, CSRF, JWT, Cryptography'],
        ['DevOps', 'Docker, Linux, VPS, Deployment'],
        ['Big Data', 'Hadoop, HDFS, Kafka'],
      ],
    },
    contact: {
      title: 'Let us build intelligent systems together.',
      body: 'I am open to AI Engineer, Computer Vision, Backend AI, RAG/LLM and full-stack AI product opportunities.',
      empty: 'Contact details can be updated in script.js.',
    },
  },
};

let currentLanguage = 'vi';
let currentCategory = 'all';

function getProjectsByCategory(category) {
  if (category === 'all') return projects;
  return projects.filter((project) => project.categories.includes(category));
}

function getVisibleContactLinks(config = contactConfig) {
  return Object.entries(config)
    .filter(([, value]) => Boolean(value))
    .map(([key, value]) => ({ key, value }));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function renderTags(tags) {
  return tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join('');
}

function renderHome(content) {
  const home = document.querySelector('#home');
  home.innerHTML = `
    <div class="hero-copy">
      <p class="eyebrow">Digital AI Lab Portfolio</p>
      <h1>${escapeHtml(content.hero.name)}</h1>
      <p class="hero-role">${escapeHtml(content.hero.role)}</p>
      <p class="hero-headline">${escapeHtml(content.hero.headline)}</p>
      <p class="hero-body">${escapeHtml(content.hero.body)}</p>
      <div class="hero-actions">
        <a class="button primary" href="#projects">${escapeHtml(content.hero.primaryCta)}</a>
        <a class="button ghost" href="#contact">${escapeHtml(content.hero.secondaryCta)}</a>
      </div>
    </div>
    <div class="lab-panel" aria-label="AI lab visualization">
      <div class="panel-topline"><span>VISION</span><span>RAG</span><span>DEPLOY</span></div>
      <div class="scanner">
        <span class="node n1"></span>
        <span class="node n2"></span>
        <span class="node n3"></span>
        <span class="node n4"></span>
      </div>
      <div class="signal-ring"></div>
      <div class="panel-readout">
        <span>YOLO</span>
        <span>FastAPI</span>
        <span>Vector DB</span>
      </div>
    </div>
  `;
}

function renderAbout(content) {
  document.querySelector('#about').innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">${escapeHtml(content.about.eyebrow)}</p>
      <h2>${escapeHtml(content.about.title)}</h2>
    </div>
    <div class="about-grid">
      <p>${escapeHtml(content.about.body)}</p>
      <div class="stat-grid">
        ${content.about.stats.map(([value, label]) => `
          <div class="stat">
            <strong>${escapeHtml(value)}</strong>
            <span>${escapeHtml(label)}</span>
          </div>
        `).join('')}
      </div>
    </div>
    <div class="direction">
      <h3>${escapeHtml(content.direction.title)}</h3>
      <p>${escapeHtml(content.direction.body)}</p>
    </div>
  `;
}

function renderSkills(content) {
  document.querySelector('#skills').innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Capabilities</p>
      <h2>${escapeHtml(content.skills.title)}</h2>
    </div>
    <div class="skill-grid">
      ${content.skills.groups.map(([title, skills]) => `
        <article class="skill-card">
          <h3>${escapeHtml(title)}</h3>
          <div class="tag-list">${renderTags(skills)}</div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderProjectFilters(language) {
  return categoryOptions.map((category) => `
    <button class="filter-button${category.id === currentCategory ? ' active' : ''}" type="button" data-category="${category.id}">
      ${escapeHtml(category[language])}
    </button>
  `).join('');
}

function renderProjects(category = currentCategory, language = currentLanguage) {
  currentCategory = category;
  const content = portfolioContent[language];
  const projectCards = getProjectsByCategory(category).map((project, index) => {
    const localized = project[language];
    return `
      <article class="project-card" style="--delay:${index * 70}ms">
        <div class="project-index">${String(index + 1).padStart(2, '0')}</div>
        <h3>${escapeHtml(localized.title)}</h3>
        <p>${escapeHtml(localized.description)}</p>
        <div>
          <span class="mini-label">${escapeHtml(content.projects.stackLabel)}</span>
          <div class="tag-list">${renderTags(project.stack)}</div>
        </div>
        <div>
          <span class="mini-label">${escapeHtml(content.projects.featureLabel)}</span>
          <ul>
            ${localized.points.map((point) => `<li>${escapeHtml(point)}</li>`).join('')}
          </ul>
        </div>
      </article>
    `;
  }).join('');

  document.querySelector('.project-filters').innerHTML = renderProjectFilters(language);
  document.querySelector('.project-grid').innerHTML = projectCards;
}

function renderProjectsSection(content, language) {
  document.querySelector('#projects').innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Selected work</p>
      <h2>${escapeHtml(content.projects.title)}</h2>
      <p>${escapeHtml(content.projects.intro)}</p>
    </div>
    <div class="project-filters" aria-label="Project filters"></div>
    <div class="project-grid"></div>
  `;
  renderProjects(currentCategory, language);
}

function renderJourney(content) {
  document.querySelector('#journey').innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Learning path</p>
      <h2>${escapeHtml(content.journey.title)}</h2>
    </div>
    <div class="timeline">
      ${content.journey.items.map(([number, title, body]) => `
        <article class="timeline-item">
          <span>${escapeHtml(number)}</span>
          <div>
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(body)}</p>
          </div>
        </article>
      `).join('')}
    </div>
  `;
}

function renderNotes(content) {
  document.querySelector('#notes').innerHTML = `
    <div class="section-heading">
      <p class="eyebrow">Research memory</p>
      <h2>${escapeHtml(content.notes.title)}</h2>
    </div>
    <div class="notes-grid">
      ${content.notes.items.map(([title, body]) => `
        <article class="note-card">
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(body)}</p>
        </article>
      `).join('')}
    </div>
  `;
}

function renderContact(content) {
  const links = getVisibleContactLinks();
  document.querySelector('#contact').innerHTML = `
    <div class="contact-panel">
      <div>
        <p class="eyebrow">Contact</p>
        <h2>${escapeHtml(content.contact.title)}</h2>
        <p>${escapeHtml(content.contact.body)}</p>
      </div>
      <div class="contact-links">
        ${links.length ? links.map((link) => `
          <a href="${escapeHtml(link.value)}">${escapeHtml(link.key)}</a>
        `).join('') : `<p class="muted">${escapeHtml(content.contact.empty)}</p>`}
      </div>
    </div>
  `;
}

function renderPage(language = currentLanguage) {
  const content = portfolioContent[language];
  document.title = content.metaTitle;
  document.documentElement.lang = language;
  renderHome(content);
  renderAbout(content);
  renderSkills(content);
  renderProjectsSection(content, language);
  renderJourney(content);
  renderNotes(content);
  renderContact(content);
}

function setLanguage(language) {
  currentLanguage = language;
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.classList.toggle('active', button.dataset.language === language);
  });
  document.querySelectorAll('[data-nav-label]').forEach((link, index) => {
    link.textContent = portfolioContent[language].nav[index];
  });
  renderPage(language);
}

function bindEvents() {
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.addEventListener('click', () => setLanguage(button.dataset.language));
  });

  document.addEventListener('click', (event) => {
    const filterButton = event.target.closest('[data-category]');
    if (filterButton) {
      renderProjects(filterButton.dataset.category, currentLanguage);
    }
  });

  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuButton.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    renderPage(currentLanguage);
    setLanguage(currentLanguage);
    bindEvents();
  });
}

if (typeof module !== 'undefined') {
  module.exports = {
    categoryOptions,
    contactConfig,
    portfolioContent,
    projects,
    getProjectsByCategory,
    getVisibleContactLinks,
  };
}
