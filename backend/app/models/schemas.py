from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class QuestionConfigSchema(BaseModel):
    twoMarkCount: int = Field(default=10, ge=0)
    fiveMarkCount: int = Field(default=3, ge=0)
    tenMarkCount: int = Field(default=0, ge=0)
    thirteenMarkCount: int = Field(default=2, ge=0)
    difficulty: str = Field(default="Average")
    orientations: List[str] = Field(default_factory=lambda: ["Theory", "Practical"])

class HeaderInfoSchema(BaseModel):
    collegeName: str = Field(default="MANAKULA VINAYAGAR INSTITUTE OF TECHNOLOGY")
    department: str = Field(default="Department of Computer Science & Engineering")
    examName: str = Field(default="Internal Assessment Examination - I")
    subjectName: str = Field(default="Data Structures")
    subjectCode: str = Field(default="22CS301")
    duration: str = Field(default="3 Hours")

class GeneratePaperRequest(BaseModel):
    content: str
    config: QuestionConfigSchema
    header: HeaderInfoSchema
    provider: Optional[str] = "mock"
    api_key: Optional[str] = None

class SubQuestionSchema(BaseModel):
    label: str
    question: str
    marks: int

class QuestionSchema(BaseModel):
    id: Optional[str] = None
    number: int
    question: Optional[str] = None
    marks: int
    topic: Optional[str] = None
    difficulty: Optional[str] = None
    orientation: Optional[str] = None
    subquestions: Optional[List[SubQuestionSchema]] = None

class SectionSchema(BaseModel):
    title: str
    subtitle: str
    description: str
    markPerQuestion: int
    questions: List[QuestionSchema]

class QuestionPaperResponse(BaseModel):
    id: str
    createdAt: str
    header: Dict[str, Any]
    config: Dict[str, Any]
    sections: List[SectionSchema]
    totalQuestions: int
    totalMarks: int
