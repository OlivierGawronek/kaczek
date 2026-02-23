# Kaczek

Browser extension designed to analyze OLX advertisements and detect potential scams or fake listings.

## Credits

Extension is made by Koło Naukowe Programistów APIBary

## Architecture

- **Frontend:** Next.js (Exported as a static browser extension)
- **Backend:** FastAPI (Python)

## Prerequisites

- Node.js
- Python 3.8+

## Backend Setup

cd backend
python -m venv venv
source venv/Scripts/activate
pip install -r requirements.txt
uvicorn main:app --reload

## Frontend Setup

cd frontend
npm install
npm run build

Load the `frontend/out` directory into your browser as an unpacked extension.