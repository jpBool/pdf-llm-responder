from fastapi import FastAPI, UploadFile, File, HTTPException
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

# upload file endpoint
@app.post("/upload")
async def upload_pdf(pdfFile: UploadFile = File(...)):
    try:
        # contents = await pdfFile.read()

        destination_path = f"./uploads/{pdfFile.filename}"

        with open(destination_path, "wb") as buffer:
            shutil.copyfileobj(pdfFile.file, buffer)

        return {
            "status": "success",
            "filename": pdfFile.filename,
            "size_bytes": len(contents)
        }
    except Exception as e:
        print(f"Erro ao processar arquivo: {e}")
        raise HTTPException(status_code=500, detail=str(e))
