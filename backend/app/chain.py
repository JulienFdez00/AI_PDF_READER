"""Main LLM chain."""

from langchain_core.language_models import BaseChatModel
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import Runnable

from backend.app.prompts import EXPERT_EXPLANATION_PROMPT_TEMPLATE


def get_llm_explanation_chain(llm: BaseChatModel) -> Runnable:
    """Extract key info from parsed BVPN file."""
    return EXPERT_EXPLANATION_PROMPT_TEMPLATE | llm | StrOutputParser()
