from typing import List, Optional
from pydantic import BaseModel, Field, field_validator

class DiagnosisResponse(BaseModel):
    """Pydantic Schema for LLM Diagnosis Output."""
    root_cause: str = Field(..., description="Identified network fault root cause")
    confidence: float = Field(..., description="Confidence score between 0.0 and 1.0")
    osi_layer: str = Field(..., description="Corresponding OSI layer (e.g. Layer 2, Layer 3, Layer 7)")
    evidence: List[str] = Field(..., description="Evidence items extracted directly from show outputs")
    next_command: str = Field(..., description="Recommended Cisco CLI diagnostic command")
    fix_steps: List[str] = Field(..., description="Ordered list of CLI commands or steps to resolve fault")
    is_demo: Optional[bool] = Field(default=False, description="Flag if diagnosis generated in Demo Mode")

    @field_validator("confidence")
    @classmethod
    def validate_confidence(cls, v):
        if v < 0.0 or v > 1.0:
            raise ValueError("Confidence score must be strictly between 0.0 and 1.0")
        return v

    @field_validator("root_cause")
    @classmethod
    def validate_root_cause(cls, v):
        if not v or v.strip() == "":
            raise ValueError("Root cause cannot be empty")
        return v

    @field_validator("evidence")
    @classmethod
    def validate_evidence(cls, v):
        if not v or len(v) == 0:
            raise ValueError("Evidence list must contain at least one evidence item")
        return v

class CaseModel(BaseModel):
    case_id: str
    title: str
    category: str
    symptom: str
    topology_note: str
    show_outputs: str
    expected_fault: str
    osi_layer: str
    concept: str
    severity: str
    expected_next_command: str
    expected_fix: str
    verification_method: str

class HumanReviewModel(BaseModel):
    review_id: str
    case_id: str
    ai_root_cause: str
    reviewer_decision: str  # ACCEPTED, EDITED, REJECTED
    corrected_root_cause: str
    reviewer_reason: str
    timestamp: str
    reviewer_name: str

class VerificationResultModel(BaseModel):
    verification_id: str
    case_id: str
    status: str  # VERIFIED_FIXED, NOT_FIXED, NEEDS_MORE_TESTING
    method: str
    command_output: str
    notes: str
    timestamp: str
