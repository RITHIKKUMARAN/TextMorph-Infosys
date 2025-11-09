<div align="center">

<div align="center">

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=2800&pause=2000&color=FF6B9D&center=true&vCenter=true&width=700&lines=🤖+AI+Text+Processor+-+TextMorph" alt="Title" />

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=28&duration=2800&pause=2000&color=6366F1&center=true&vCenter=true&width=700&lines=+Transform+•+Translate+•+Transcribe" alt="Subtitle" />

</div>

<p align="center">
  <b>Enterprise-grade text processing powered by Google Gemini AI</b>
</p>

[![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](https://github.com/RITHIKKUMARAN/TextMorph-Infosys/blob/main/LICENSE)

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-usage">Usage</a> •
  <a href="#-contributing">Contributing</a>
</p>

![GitHub Stars](https://img.shields.io/github/stars/RITHIKKUMARAN/TextMorph-Infosys?style=social)
![GitHub Forks](https://img.shields.io/github/forks/RITHIKKUMARAN/TextMorph-Infosys?style=social)
![GitHub Issues](https://img.shields.io/github/issues/RITHIKKUMARAN/TextMorph-Infosys)
![GitHub Last Commit](https://img.shields.io/github/last-commit/RITHIKKUMARAN/TextMorph-Infosys)

</div>

<div align="center">

# TextMorph Overview

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&size=26&duration=3000&pause=2000&color=A855F7&center=true&vCenter=true&width=700&lines=Revolutionizing+Text+Processing+with+AI" alt="Overview" />

**TextMorph** is a comprehensive, enterprise-grade text processing suite that revolutionizes how you interact with text content. Leveraging Google's cutting-edge Gemini API and built with React and TypeScript, it offers advanced summarization, semantic comparison, multilingual capabilities, and personalized AI profiles.

<div align="center">

<a href="https://rithik-text-morph.vercel.app/" target="_blank">
<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&duration=3000&pause=1000&color=FF6B9D&background=FFFFFF00&center=true&vCenter=true&repeat=true&width=800&lines=🚀+Experience+TextMorph+Live!;Transform+Your+Text+with+AI;Click+to+Try+the+App+Now!" alt="Live Demo" />
</a>

[![Open Live Demo](https://img.shields.io/badge/🌟_OPEN_LIVE_DEMO-Click_Here-00D9FF?style=for-the-badge&logo=vercel&logoColor=white&labelColor=6366F1)](https://rithik-text-morph.vercel.app/)

</div>


## Why TextMorph?

<table>
<tr>
<td align="center">

### 🤖 AI-Powered Intelligence

Context-aware processing with Gemini API

</td>
<td align="center">

### 👤 User Personalization

AI remembers your style preferences

</td>
<td align="center">

### 🌍 Multilingual Support

8 languages with natural translation

</td>
</tr>
<tr>
<td align="center">

### ⚙️ Enterprise Features

Semantic analysis & plagiarism detection

</td>
<td align="center">

### 📥 Multiple Formats

Export to PDF, DOCX, HTML, Markdown, JSON

</td>
<td align="center">

### 🚀 Production Ready

Scalable, secure & enterprise-grade

</td>
</tr>
</table>

---

</div>


### 💻 Quick Example

<div align="center">

<table>
<tr>
<td align="center" width="33%">

#### 1️⃣ Initialize

const processor = new TextProcessor({
apiKey: "your_key",
userProfile: "username"
});


</td>
<td align="center" width="33%">

#### 2️⃣ Process

const result = await processor.summarize({
text: yourContent,
depth: "comprehensive",
tone: "professional",
language: "english"
});


</td>
<td align="center" width="34%">

#### 3️⃣ Export

processor.export(
result,
{ format: "pdf" }
);


</td>
</tr>
</table>

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=16&duration=2500&pause=1000&color=A855F7&center=true&vCenter=true&width=600&lines=Initialize+→+Process+→+Export;+Transform+Your+Text+in+3+Steps!" alt="Steps" />

</div>


### 📊 Quick Stats

| Total Operations | Supported Languages | Export Formats | Readability Levels |
|:----------------:|:------------------:|:--------------:|:------------------:|
| **Unlimited** | **8** | **5** | **4** |

## ✨ Features

### 🔐 User Authentication & AI Profiles

<table>
<tr>
<td align="center" width="50%">

#### 🔒 Authentication System

- Secure login and registration
- Individual user profiles
- Session persistence across usage

</td>
<td align="center" width="50%">

#### 🧠 AI Style Memory

- Personalized preferences per user
- Stores tone, style, and language
- Remembers depth level preferences
- Auto-applies saved settings

</td>
</tr>
</table>



> 💡 **Tip:** Set up your AI profile once, and TextMorph adapts all future operations to match your preferences automatically!

</div>

### 📄 Multiple Input Methods

<table>
<tr>
<td align="center" width="33%">

#### 📝 Text Entry

Direct typing/paste with real-time processing

</td>
<td align="center" width="33%">

#### 📎 File Upload

PDF, DOCX, TXT with automatic text extraction

</td>
<td align="center" width="34%">

#### 🎤 Voice Input

Live microphone with speech-to-text transcription

</td>
</tr>
</table>


**🎤 Voice Input Capabilities**
- ✓ Real-time recording with visual feedback
- ✓ Automatic transcription using advanced STT
- ✓ Edit transcribed text before processing
- ✓ Works with any device microphone
- ✓ Multi-language voice recognition support

### 📝 Context-Aware Summarization

**Two Summary Types:**
- **Abstractive** - AI-generated sentences with original phrasing and enhanced clarity
- **Extractive** - Key sentence selection that preserves original text for quick overview

**Three Depth Levels:**
- **Brief** - 1-2 sentences, core message only, Twitter-ready
- **Detailed** - Full paragraph with key points covered and balanced depth
- **Comprehensive** - Multi-section output with complete analysis, report-ready format

**Auto Content-Type Adaptation:**
- **Scientific Papers** - Focus on hypothesis, methods summary, and findings highlight
- **News Articles** - 5W1H approach with lead paragraph style
- **Blog Posts** - Conversational tone with engaging format
- **Legal Documents** - Terminology preserved with structure maintained
- **Technical Docs** - Process-focused with specifications intact

### ✍️ Advanced Text Paraphrasing

- **🔄 Rewrite** - Maintain original meaning with fresh phrasing
- **✨ Enhance** - Improve clarity and readability
- **🎯 Optimize** - Context-aware restructuring

### 🌍 Multilingual Processing

**Supported Languages:**
- 🇬🇧 English
- 🇪🇸 Spanish
- 🇫🇷 French
- 🇩🇪 German
- 🇮🇳 Hindi
- 🇨🇳 Chinese
- 🇯🇵 Japanese
- 🇰🇷 Korean

**Translation Capabilities:**
- ⚡ **Simultaneous Mode** - Summarize + Translate in one operation
- 🎯 **Natural Flow** - Maintains context in target language
- 🔄 **Bidirectional** - Translate to/from any supported language
- 📊 **Quality Metrics** - Translation accuracy scoring

> 🌐 **Use Case:** Process an English research paper and get a comprehensive Spanish summary in seconds!

### 🎯 10 Purpose-Based Presets

**Professional Communication**
- 📧 **Email - Professional** - Formal business tone
- 📧 **Email - Friendly** - Casual, warm communication
- 💼 **Executive Summary** - High-level business overview
- ⚖️ **Legal Brief** - Formal legal documentation
- 📰 **News Article** - Objective, informative reporting

**Content Creation**
- 📱 **Social Media Caption** - Engaging, brief, shareable
- ✍️ **Blog Post** - Conversational, story-driven
- 🎓 **Academic Paper** - Scholarly, research-focused
- 📚 **Technical Documentation** - Precise, detailed
- 👶 **Kids Story** - Simple, age-appropriate, fun

### 📚 Adaptive Readability Levels

| Level | Age Group | Complexity | Vocabulary | Use Case |
|:-----:|:---------:|:----------:|:----------:|:---------|
| 👶 **Kids** | 8-12 | Very Simple | Basic words | Educational content |
| 👦 **Teens** | 13-17 | Moderate | Intermediate | Young adult literature |
| 👥 **General** | All | Balanced | Accessible | Public communications |
| 🎓 **Experts** | Professional | Advanced | Technical | Academic/Industry |

**Adaptive Features:**
- Sentence length optimization
- Vocabulary complexity adjustment
- Example selection based on audience
- Concept simplification when needed

### 🔍 Semantic Comparison Engine

**Analysis Metrics**
- 📊 Semantic Similarity: 0-100% accuracy score
- ✍️ Rephrasing Quality: Excellent/Good/Fair assessment
- 🚨 Plagiarism Risk: Low/Medium/High evaluation
- 🔎 Key Differences: Highlighted and identified
- 💡 Recommendations: Actionable insights provided

**Use Cases**
- ✅ Student work vs. source verification
- ✅ Content originality checking
- ✅ Document version comparison
- ✅ Translation quality assessment
- ✅ Paraphrase effectiveness testing

### 🔊 Audio Output Features

- 🎙️ **Convert** - Text-to-speech in seconds
- 💾 **Download** - Save as MP3 file
- ▶️ **Play** - In-browser playback
- 🌍 **Multi-Lang** - 8 language support

### 📥 Multi-Format Export

| Format | Icon | Best For | Features |
|:------:|:----:|:---------|:---------|
| **PDF** | 📄 | Professional documents | Formatted, printable, universal |
| **DOCX** | 📝 | Editable documents | MS Word compatible, collaborative |
| **Markdown** | #️⃣ | Developer docs | Plain text, version control friendly |
| **HTML** | 🌐 | Web publishing | Styled, responsive, embeddable |
| **JSON** | 🔧 | API integration | Structured data, metadata included |

**Export Features:**
- Automatic title generation
- Timestamp inclusion
- Metadata preservation
- Custom styling options
- Batch export capability

### 📜 Smart History & Versioning

**History Features**
- 💾 Auto-save every operation
- 🏷️ Full parameter tracking (tone, type, length, etc.)
- 👁️ Output preview in list view
- 📋 One-click restore previous outputs
- 🗂️ Last 50 operations per user

**Analytics Dashboard**
- 📊 Total operations count
- 📝 Summaries generated
- ✍️ Paraphrases created
- 🌍 Languages used
- 📅 Activity timeline

> 🔄 **Version Control:** Never lose your work! Access any previous operation with full context and parameters.

### 📊 Detailed Statistics

**Real-time Metrics Available:**
- Word Count
- Character Count
- Language Detected
- Operation Type
- Summary Mode
- Processing Time

## 💻 Tech Stack

### Core Technologies

**React** - Modern UI library for building responsive web applications

**TypeScript** - Type-safe development with enhanced code quality

**Google Gemini** - Advanced AI Engine for natural language processing

**Web Speech API** - Native browser speech-to-text and text-to-speech

**PDF.js** - PDF processing and text extraction capabilities

### Core Dependencies

- react": "^18.2.0"
- typescript: "^5.0.0"
- @google/generative-ai: "^0.3.0"
- pdf-lib: "^1.17.0"
- docx: "^8.0.0"
- file-saver: "^2.0.5"


## 🚀 Quick Start

### Prerequisites

- Node.js 16+ or higher installed on your system
- Google Gemini API Key (free tier available)
- npm or yarn package manager

### Installation

**Option 1: Clone Repository**

Clone the repo<br>
git clone https://github.com/RITHIKKUMARAN/TextMorph-Infosys.git

Navigate to directory<br>
cd TextMorph-Infosys

Install dependencies<br>
npm install




**Option 2: Using npm**

Install from GitHub<br>
npm install git+https://github.com/RITHIKKUMARAN/TextMorph-Infosys.git

Or install locally<br>
cd TextMorph-Infosys<br>
npm install


### Configuration

Create a `.env` file in the root directory:

- API Configuration<br>
VITE_GEMINI_API_KEY=your_gemini_api_key_here

- Application Settings<br>
VITE_APP_NAME=TextMorph<br>
VITE_APP_VERSION=1.0.0

- User Settings<br>
VITE_DEFAULT_LANGUAGE=english<br>
VITE_DEFAULT_TONE=professional



### Running the Application

Start the development server<br>
npm run dev

Or with custom port<br>
npm run dev -- --port 8080

Build for production<br>
npm run build

Preview production build<br>
npm run preview


**Application will launch at `http://localhost:5173`**

### First Time Setup

**Step 1 - Login**

**Step 2 - Setup Your Profile**
- Navigate to Settings
- Configure AI preferences
- Set default language and tone

**Step 3 - Get Your API Key**
- Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- Create a new API key
- Add to `.env` file


## 📊 Feature Comparison Matrix

| Feature | Basic | **Pro** | Enterprise |
|---------|:-----:|:-------:|:----------:|
| **Summarization** | ✓ | ✓ Advanced | ✓ Custom AI |
| **Summary Types** | 1 | 2 (Abstractive + Extractive) | Unlimited |
| **Depth Levels** | ✗ | 3 Levels | Custom |
| **Content Detection** | ✗ | 5 Types | Unlimited |
| **Readability Levels** | ✗ | 4 Levels | Custom |
| **User Profiles** | ✗ | ✓ AI Memory | ✓ Team Profiles |
| **Purpose Presets** | ✗ | 10 Presets | Custom Presets |
| **Text Comparison** | ✗ | ✓ Semantic | ✓ Advanced Analytics |
| **History** | ✗ | 50 Operations | Unlimited |
| **Export Formats** | 1 (PDF) | 5 Formats | All + Custom |
| **Languages** | 1 | 8 Languages | 50+ Languages |
| **API Access** | ✗ | ✗ | ✓ Full API |
| **Team Collaboration** | ✗ | ✗ | ✓ Included |
| **Priority Support** | ✗ | ✗ | ✓ 24/7 |

## 🎨 Use Cases

### 👨‍🎓 For Students & Researchers

- 📚 Summarize research papers quickly and efficiently
- 🔍 Check work for plagiarism and originality
- ✍️ Improve writing quality with AI suggestions
- 🌍 Translate academic content to multiple languages
- 📊 Compare document versions for changes

### 💼 For Business Professionals

- 📧 Generate executive summaries for reports
- ✉️ Draft professional emails with appropriate tone
- 📊 Create reports from raw data and insights
- 🌐 Translate business documents for global teams
- 📝 Maintain brand voice consistency across content

### ✍️ For Content Creators

- 📱 Generate engaging social media captions
- ✏️ Rewrite content for SEO optimization
- 🎨 Adapt tone for different platforms and audiences
- 🌍 Localize content for global markets
- 📈 Optimize readability for target demographics

### 🔬 For Developers & Engineers

- 📖 Generate comprehensive API documentation
- 🐛 Summarize code changes and commit messages
- 📝 Create detailed technical guides and tutorials
- 🔄 Translate documentation for international teams
- 📊 Analyze and process text data at scale

## 🤝 Contributing

I welcome contributions from the community! Here's how you can help make TextMorph better:

| Contribution Type | How to Help |
|-------------------|-------------|
| 🐛 **Bug Reports** | [Open an issue](https://github.com/RITHIKKUMARAN/TextMorph-Infosys/issues) |
| ✨ **Feature Requests** | [Submit your idea](https://github.com/RITHIKKUMARAN/TextMorph-Infosys/issues/new) |
| 🔧 **Code Contributions** | [Create a pull request](https://github.com/RITHIKKUMARAN/TextMorph-Infosys/pulls) |
| 📖 **Documentation** | Improve README or add guides |
| 💬 **Community** | Join discussions and help others |

### Development Setup

Fork and clone the repository<br>
git clone https://github.com/YOUR_USERNAME/TextMorph-Infosys.git

Create a new branch<br>
git checkout -b feature/your-feature-name

Make your changes and commit<br>
git commit -m "Add: your feature description"

Push to your fork<br>
git push origin feature/your-feature-name<br>

Open a Pull Request



**Code Style Guidelines:**
- Follow TypeScript and React best practices
- Add comprehensive JSDoc comments to all functions
- Write unit tests for new features and bug fixes
- Update documentation to reflect changes

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/RITHIKKUMARAN/TextMorph-Infosys/blob/main/LICENSE) file for complete details.

**MIT License** - Free to use, modify, and distribute with attribution

## 👥 Author

<div align="center">

<table>
<tr>
<td align="center" width="100%">
<a href="https://github.com/RITHIKKUMARAN">
<img src="https://avatars.githubusercontent.com/RITHIKKUMARAN?v=4" width="120px" style="border-radius: 50%;" alt="Rithik Kumaran K"/><br>
<img src="https://img.shields.io/badge/Developer-FF6B9D?style=for-the-badge&logo=github&logoColor=white" alt="Developer" style="margin-top: 8px;"/><br>
<b style="display: block; margin-top: 8px;">Rithik Kumaran K</b>
</a>
<br><br>
<a href="https://github.com/RITHIKKUMARAN">
<img src="https://img.shields.io/github/followers/RITHIKKUMARAN?label=Follow&style=social" alt="GitHub"/>
</a>
</td>
</tr>
</table>

<p>
<i>Built with passion by Rithik Kumaran K</i>
</p>

</div>


## 🙏 Acknowledgments

Special thanks to:
- **Google** for providing the powerful Gemini API
- **React team** for the amazing library and community support
- **Open source community** for invaluable tools and contributions that made this project possible

## 📞 Support

<table>
<tr>
<td align="center">
<a href="https://github.com/RITHIKKUMARAN/TextMorph-Infosys/issues">
<img src="https://img.shields.io/badge/Issues-Report_Bug-red?style=for-the-badge&logo=github" alt="Issues"/>
</a>
</td>
<td align="center">
<a href="https://github.com/RITHIKKUMARAN/TextMorph-Infosys/discussions">
<img src="https://img.shields.io/badge/Discussions-Ask_Question-blue?style=for-the-badge&logo=github" alt="Discussions"/>
</a>
</td>
<td align="center">
<a href="https://github.com/RITHIKKUMARAN/TextMorph-Infosys">
<img src="https://img.shields.io/badge/GitHub-Star_Repo-yellow?style=for-the-badge&logo=github" alt="Star"/>
</a>
</td>
</tr>
</table>

### 💖 Show your support

Give a ⭐️ if this project helped you! Your support motivates me to keep improving TextMorph.

### 📈 Project Stats

![GitHub Repo Size](https://img.shields.io/github/repo-size/RITHIKKUMARAN/TextMorph-Infosys)
![GitHub Contributors](https://img.shields.io/github/contributors/RITHIKKUMARAN/TextMorph-Infosys)
![GitHub Commit Activity](https://img.shields.io/github/commit-activity/m/RITHIKKUMARAN/TextMorph-Infosys)

</div>
