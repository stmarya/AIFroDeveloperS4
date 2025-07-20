# Gemini Flash API

A simple RESTful multimodal API powered by Google’s Gemini AI (gemini-2.0-flash) that can generate text, describe images, summarize documents, and transcribe audio via HTTP endpoints.

## Features

- **Multimodal Input**: Supports text prompts, image uploads, document uploads (PDF/DOCX), and audio uploads (MP3/WAV).
- **Google Gemini Integration**: Uses Google Generative Language API (v1beta) with model `gemini-2.0-flash`.
- **Modular Structure**: Clean separation of routes, controllers, services, and utilities.
- **Error Handling**: Validates inputs and returns clear HTTP status codes.
- **Easy Deployment**: Configurable via `.env`, works locally and on cloud platforms.

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/gemini-flash-api.git
   cd gemini-flash-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment** Copy `.env.example` to `.env` and fill in values:

   ```ini
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
   GEMINI_API_URL=https://generativelanguage.googleapis.com/v1beta
   GEMINI_MODEL=gemini-2.0-flash
   PORT=3000
   ```

4. **Run the server**

   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api`:

| Endpoint                  | Method | Description                            |
| ------------------------- | ------ | -------------------------------------- |
| `/generate-text`          | POST   | Generate text from a prompt.           |
| `/generate-from-image`    | POST   | Describe an image with optional prompt |
| `/generate-from-document` | POST   | Summarize or analyze a document.       |
| `/generate-from-audio`    | POST   | Transcribe or analyze an audio file.   |

### Request & Response Schema

- **Text** (`/generate-text`)

  - Body (JSON):
    ```json
    { "prompt": "Your text prompt here." }
    ```

- **Image** (`/generate-from-image`)

  - Body (form-data):
    - `image`: File (.jpg/.png)
    - `prompt`: Text (optional)

- **Document** (`/generate-from-document`)

  - Body (form-data):
    - `document`: File (.pdf/.docx)
    - `prompt`: Text (optional)

- **Audio** (`/generate-from-audio`)

  - Body (form-data):
    - `audio`: File (.mp3/.wav)
    - `prompt`: Text (optional)

All responses return JSON with `candidates` array and metadata.

## Usage

### Via Terminal (curl)

1. **Health Check**

   ```bash
   curl http://localhost:3000/health
   ```

2. **Generate Text**

   ```bash
   curl -X POST http://localhost:3000/api/generate-text \
     -H "Content-Type: application/json" \
     -d '{"prompt":"Explain relativity in one sentence."}'
   ```

3. **Describe Image**

   ```bash
   curl -X POST http://localhost:3000/api/generate-from-image \
     -F "image=@/path/to/image.jpg" \
     -F "prompt=Describe this image."
   ```

4. **Summarize Document**

   ```bash
   curl -X POST http://localhost:3000/api/generate-from-document \
     -F "document=@/path/to/doc.pdf" \
     -F "prompt=Summarize the main points."
   ```

5. **Transcribe Audio**

   ```bash
   curl -X POST http://localhost:3000/api/generate-from-audio \
     -F "audio=@/path/to/audio.mp3" \
     -F "prompt=Transcribe this audio."
   ```

### Via Postman

1. **Import Collection**: Create a new Postman collection or import this repository's example.
2. **Set URL**: Use `http://localhost:3000/api/...` for each endpoint.
3. **Headers**: Leave `Content-Type` empty for form-data; set `application/json` for raw JSON.
4. **Body**:
   - For `/generate-text`: raw JSON with `prompt`.
   - For file endpoints: choose `form-data`, set file field + prompt field.
5. **Send** and view JSON response.

## Advantages

- **Scalable**: Easily add more modalities or models.
- **Secure**: Configuration via `.env`, no hard-coded secrets.
- **Flexible**: Can be deployed on Heroku, GCP Cloud Run, AWS, etc.
- **Extensible**: Clear separation of concerns makes adding features straightforward.

---

Happy building! 🚀

