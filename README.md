# RYZEUP Fitness — Elite Coaching & Workout Platform

PaperGen AI is a full-stack, AI-powered web application designed for **college teachers and university faculty members** to automatically generate balanced, high-quality examination question papers from uploaded PDFs, DOCX files, OCR images, or pasted syllabus text.

---

## 🌟 Key Features

- 📄 **Multi-Format Uploads**: Support for PDF, DOC, DOCX, TXT files, and OCR text extraction for JPG, JPEG, PNG, WEBP images.
- 🎯 **Dynamic Question Configuration**: Real-time count inputs for 2 Marks, 5 Marks, 10 Marks, and 13 Marks with auto-calculated total questions and total marks.
- 🧮 **Strict Subdivision Mark Validation**: Enforces exact mark summation equality for 10-mark and 13-mark subquestions (e.g. `5 + 5 = 10` or `6 + 7 = 13`).
- ⚡ **Difficulty & Bloom Orientation**: Tailor exams for Easy, Average, or Hard cognitive levels and balance Theory, Analytical, Practical, and Application orientations.
- 🎓 **University Exam Header Customization**: Customize Institution Name, Department, Subject Code, Exam Name, Duration, and Instructions.
- ✏️ **Interactive Exam Editor**: Regenerate individual questions with one click (`↻`), inline-edit text/marks, add custom questions, or delete questions with continuous re-numbering.
- 📦 **Multi-Format Export**: Export to formatted Microsoft Word (`.docx`), PDF (`.pdf`), Print layout (`Ctrl+P`), or Copy to Clipboard.
- 💾 **History & Saved Papers**: Persistent local storage to browse, re-open, or duplicate past generated examination papers.
- 🤖 **Multi-Provider AI Engine**: Supports Anthropic Claude, OpenAI GPT-4o, Google Gemini 1.5, and a built-in Smart Mock Provider for zero-config offline usage.

---

## 📁 Project Architecture

```text
papergen-ai/
│
├── frontend/ (Root Vite React Application)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx               # Navigation bar & theme switcher
│   │   │   ├── InputArea.jsx            # Drag-and-drop file/image/text input
│   │   │   ├── QuestionConfig.jsx       # 2M, 5M, 10M, 13M configuration grid
│   │   │   ├── DifficultySelector.jsx   # Cognitive difficulty level selector
│   │   │   ├── OrientationSelector.jsx  # Bloom taxonomy orientation selector
│   │   │   ├── ExamSettingsModal.jsx    # Exam header & metadata drawer
│   │   │   ├── GenerationProgress.jsx   # Live step-by-step progress indicator
│   │   │   ├── QuestionPaperView.jsx    # Printable exam paper layout & editor
│   │   │   ├── HistoryView.jsx          # LocalStorage saved papers manager
│   │   │   └── ApiKeyModal.jsx          # AI Provider API Key configuration
│   │   ├── services/
│   │   │   ├── fileProcessor.js         # PDF, DOCX, TXT & Tesseract OCR reader
│   │   │   ├── exportService.js         # DOCX, PDF, Print & Clipboard exporter
│   │   │   └── ai/
│   │   │       ├── aiProvider.js        # AI prompt assembly & JSON validator
│   │   │       ├── mockProvider.js      # Smart NLP Mock paper generator
│   │   │       └── apiService.js        # Central API routing service
│   │   ├── types/
│   │   │   └── paper.js                 # Data models, constants & calculations
│   │   ├── App.jsx                      # Main application component
│   │   ├── main.jsx                     # Vite React entry point
│   │   └── index.css                    # Glassmorphism & print stylesheet
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── main.py                      # FastAPI application entry point
│   │   ├── models/schemas.py            # Pydantic request/response models
│   │   ├── ai/providers.py              # Python Claude, OpenAI, Gemini providers
│   │   └── validators/paper_validator.py# Mark total & subdivision validator
│   └── requirements.txt
│
├── .env.example
└── README.md
```

---

## 🚀 Quick Start & Local Development

### 1. Frontend Setup (Vite + React)

```bash
# Navigate to project directory
cd papergen-ai

# Install frontend dependencies
npm install

# Start Vite development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### 2. Backend Setup (Optional Python FastAPI Server)

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install backend dependencies
pip install -r requirements.txt

# Start FastAPI dev server
python app/main.py
```

The backend server will run on `http://localhost:8000`.

---

## 🔑 AI API Key Setup

1. Click the **Key icon** in the top right header of the web application.
2. Select your preferred provider (**Anthropic Claude**, **OpenAI**, or **Google Gemini**).
3. Paste your API key (e.g. `sk-...`).
4. Click **Save Preferences**. Keys are stored securely in browser `LocalStorage`.
5. If no API key is provided, the system automatically uses the **Built-in Smart Engine (Mock)** to generate complete realistic papers instantly.

---

## 📄 License

MIT License &copy; 2026 PaperGen AI
