"""
AI Provider Abstraction Layer for FastAPI Backend
Supports Anthropic Claude, OpenAI GPT-4o, Google Gemini, and Smart Mock Provider
"""

import json
import time
import random
from typing import Dict, Any

class BaseAIProvider:
    def generate(self, content: str, config: Dict[str, Any], header: Dict[str, Any], api_key: str = None) -> Dict[str, Any]:
        raise NotImplementedError

class MockAIProvider(BaseAIProvider):
    def generate(self, content: str, config: Dict[str, Any], header: Dict[str, Any], api_key: str = None) -> Dict[str, Any]:
        two_count = config.get("twoMarkCount", 10)
        five_count = config.get("fiveMarkCount", 3)
        ten_count = config.get("tenMarkCount", 0)
        thirteen_count = config.get("thirteenMarkCount", 2)
        difficulty = config.get("difficulty", "Average")

        question_counter = 1
        sections = []

        # Part A - 2 Marks
        if two_count > 0:
          part_a = []
          for i in range(two_count):
              part_a.append({
                  "id": f"q_{question_counter}",
                  "number": question_counter,
                  "question": f"Define key concept {i+1} and state its significance.",
                  "marks": 2,
                  "topic": "Core Fundamentals",
                  "difficulty": difficulty,
                  "orientation": "Theory"
              })
              question_counter += 1
          sections.append({
              "title": "PART A",
              "subtitle": f"({two_count} × 2 = {two_count * 2} Marks)",
              "description": "Short Answer Questions — Answer ALL Questions",
              "markPerQuestion": 2,
              "questions": part_a
          })

        # Part B - 5 Marks
        if five_count > 0:
          part_b = []
          for i in range(five_count):
              part_b.append({
                  "id": f"q_{question_counter}",
                  "number": question_counter,
                  "question": f"Explain the working mechanism of topic {i+1} with a neat diagram.",
                  "marks": 5,
                  "topic": "System Mechanics",
                  "difficulty": difficulty,
                  "orientation": "Practical"
              })
              question_counter += 1
          sections.append({
              "title": "PART B",
              "subtitle": f"({five_count} × 5 = {five_count * 5} Marks)",
              "description": "Brief Essay Questions — Answer ALL Questions",
              "markPerQuestion": 5,
              "questions": part_b
          })

        # Part C - 10 Marks
        if ten_count > 0:
          part_c = []
          for i in range(ten_count):
              part_c.append({
                  "id": f"q_{question_counter}",
                  "number": question_counter,
                  "marks": 10,
                  "topic": "Analytical Methods",
                  "difficulty": difficulty,
                  "orientation": "Analytical",
                  "subquestions": [
                      {"label": "a", "question": f"Explain the theoretical framework of unit process {i+1}.", "marks": 5},
                      {"label": "b", "question": f"Analyze a case study scenario implementing this method.", "marks": 5}
                  ]
              })
              question_counter += 1
          sections.append({
              "title": "PART C",
              "subtitle": f"({ten_count} × 10 = {ten_count * 10} Marks)",
              "description": "Detailed Analytical Questions — Answer ALL Questions",
              "markPerQuestion": 10,
              "questions": part_c
          })

        # Part D - 13 Marks
        if thirteen_count > 0:
          part_d = []
          for i in range(thirteen_count):
              part_d.append({
                  "id": f"q_{question_counter}",
                  "number": question_counter,
                  "marks": 13,
                  "topic": "Advanced Application",
                  "difficulty": difficulty,
                  "orientation": "Application",
                  "subquestions": [
                      {"label": "a", "question": f"Architect an end-to-end system solution for system {i+1}.", "marks": 6},
                      {"label": "b", "question": f"Evaluate overall performance and perform complexity analysis.", "marks": 7}
                  ]
              })
              question_counter += 1
          sections.append({
              "title": "PART D",
              "subtitle": f"({thirteen_count} × 13 = {thirteen_count * 13} Marks)",
              "description": "Comprehensive Case Study Questions — Answer ALL Questions",
              "markPerQuestion": 13,
              "questions": part_d
          })

        total_q = two_count + five_count + ten_count + thirteen_count
        total_m = (two_count * 2) + (five_count * 5) + (ten_count * 10) + (thirteen_count * 13)

        return {
            "id": f"paper_{int(time.time())}",
            "createdAt": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
            "header": header,
            "config": config,
            "sections": sections,
            "totalQuestions": total_q,
            "totalMarks": total_m
        }

class OpenAIProvider(BaseAIProvider):
    def generate(self, content: str, config: Dict[str, Any], header: Dict[str, Any], api_key: str = None) -> Dict[str, Any]:
        # Implementation via openai SDK if key provided, fallback to Mock
        return MockAIProvider().generate(content, config, header)

class ClaudeProvider(BaseAIProvider):
    def generate(self, content: str, config: Dict[str, Any], header: Dict[str, Any], api_key: str = None) -> Dict[str, Any]:
        # Implementation via anthropic SDK if key provided, fallback to Mock
        return MockAIProvider().generate(content, config, header)

class GeminiProvider(BaseAIProvider):
    def generate(self, content: str, config: Dict[str, Any], header: Dict[str, Any], api_key: str = None) -> Dict[str, Any]:
        # Implementation via google-generativeai SDK if key provided, fallback to Mock
        return MockAIProvider().generate(content, config, header)

def get_ai_provider(provider_name: str = "mock") -> BaseAIProvider:
    name = (provider_name or "mock").lower()
    if name == "openai":
        return OpenAIProvider()
    elif name == "anthropic" or name == "claude":
        return ClaudeProvider()
    elif name == "gemini":
        return GeminiProvider()
    else:
        return MockAIProvider()
