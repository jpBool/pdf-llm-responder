from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import shutil

app = FastAPI()

# 1. Setup CORS so Next.js can communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js local URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. File upload endpoint
@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    # The variable name 'file' matches formData.append('file', file) in Next.js
    destination_path = f"./uploads/{file.filename}"
    
    with open(destination_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    return {
        "status": "success",
        "filename": file.filename,
        "content_type": file.content_type
    }
