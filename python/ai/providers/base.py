from abc import ABC, abstractmethod

class BaseLLMProvider(ABC):
    """Abstract Base Class for LLM Providers."""

    @abstractmethod
    def generate_diagnosis(self, prompt: str, system_prompt: str) -> str:
        """Generates raw text response from LLM given prompt and system prompt."""
        pass
