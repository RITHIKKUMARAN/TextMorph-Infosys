# TextMorph Backend API

FastAPI backend for TextMorph application.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the `backend` directory:
```
GEMINI_API_KEY=your_gemini_api_key_here
```

3. Run the server:
```bash
python main.py
```

Or using uvicorn directly:
```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

## API Documentation

Once the server is running, visit:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout
- `POST /api/extract/pdf` - Extract text from PDF
- `POST /api/extract/docx` - Extract text from DOCX
- `POST /api/process` - Process text with Gemini AI
- `POST /api/compare` - Compare two texts
- `POST /api/text-to-speech` - Generate audio from text
- `POST /api/export` - Export text in various formats
- `GET /api/history` - Get user history
- `POST /api/history/add` - Add history entry
- `POST /api/history/clear` - Clear user history
- `GET /api/profile` - Get user profile
- `POST /api/profile/update` - Update user profile

