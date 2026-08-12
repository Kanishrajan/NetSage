import os
import json
import httpx
from .base import BaseLLMProvider

class GeminiLLMProvider(BaseLLMProvider):
    """Google Gemini LLM Provider utilizing API key."""

    def __init__(self, api_key=None, model="gemini-3.6-flash"):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY")
        self.model = model or os.environ.get("LLM_MODEL", "gemini-3.6-flash")

    def generate_diagnosis(self, prompt: str, system_prompt: str) -> str:
        if not self.api_key or self.api_key == "your_gemini_api_key_here":
            raise ValueError("GEMINI_API_KEY is missing or unconfigured. Demo mode enabled.")

        url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        payload = {
            "contents": [
                {
                    "parts": [
                        {"text": f"{system_prompt}\n\n{prompt}"}
                    ]
                }
            ],
            "generationConfig": {
                "responseMimeType": "application/json"
            }
        }

        try:
            with httpx.Client(timeout=15.0) as client:
                response = client.post(url, json=payload)
                response.raise_for_status()
                data = response.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"]
                return text
        except Exception as e:
            raise RuntimeError(f"Gemini API request failed: {str(e)}")

class LLMProviderFactory:
    """Factory to instantiate provider or return demo fallback."""

    @staticmethod
    def get_provider():
        api_key = os.environ.get("GEMINI_API_KEY")
        if api_key and api_key != "your_gemini_api_key_here":
            return GeminiLLMProvider(api_key=api_key)
        return None
