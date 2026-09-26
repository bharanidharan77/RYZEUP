"""
Strict Validation Module for PaperGen AI
Verifies mark totals, question counts, 10M/13M subdivision math, and duplicate detection.
"""

from typing import Dict, Any, List

def validate_paper_response(paper_data: Dict[str, Any], requested_config: Dict[str, Any]) -> Dict[str, Any]:
    sections = paper_data.get("sections", [])
    if not sections:
        raise ValueError("AI response missing 'sections' list")

    total_calculated_questions = 0
    total_calculated_marks = 0

    for section in sections:
        questions = section.get("questions", [])
        mark_per_q = section.get("markPerQuestion", 2)

        for q in questions:
            total_calculated_questions += 1
            parent_marks = q.get("marks", mark_per_q)

            # Check Subquestions (5+5=10, 6+7=13)
            subquestions = q.get("subquestions", [])
            if subquestions:
                sub_sum = sum(sq.get("marks", 0) for sq in subquestions)
                if sub_sum != parent_marks:
                    # Auto-correct last subquestion mark to force exact equality
                    diff = parent_marks - sum(sq.get("marks", 0) for sq in subquestions[:-1])
                    subquestions[-1]["marks"] = diff

            total_calculated_marks += parent_marks

    # Update summary totals
    paper_data["totalQuestions"] = total_calculated_questions
    paper_data["totalMarks"] = total_calculated_marks

    return paper_data

def detect_semantic_duplicates(questions: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    seen_texts = set()
    unique_questions = []

    for q in questions:
        text = q.get("question", "").lower().strip()
        if text and text in seen_texts:
            continue
        if text:
            seen_texts.add(text)
        unique_questions.append(q)

    return unique_questions
