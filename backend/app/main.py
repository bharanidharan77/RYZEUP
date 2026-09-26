import os
import sys
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware

# Add app folder to path for imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.schemas import GeneratePaperRequest, QuestionPaperResponse
from ai.providers import get_ai_provider
from validators.paper_validator import validate_paper_response

app = FastAPI(
    title="PaperGen AI API",
    description="AI-Powered University Question Paper Generator Backend",
    version="2.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "PaperGen AI Backend",
        "version": "2.0.0"
    }

@app.post("/api/generate")
def generate_question_paper(request: GeneratePaperRequest):
    try:
        provider = get_ai_provider(request.provider)
        config_dict = request.config.dict()
        header_dict = request.header.dict()

        # Generate raw paper structure
        raw_paper = provider.generate(
            content=request.content,
            config=config_dict,
            header=header_dict,
            api_key=request.api_key
        )

        # Enforce strict validation on counts & mark totals
        validated_paper = validate_paper_response(raw_paper, config_dict)
        return validated_paper

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate question paper: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
