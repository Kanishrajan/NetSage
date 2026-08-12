import pytest
from pydantic import ValidationError
from ai.schema import DiagnosisResponse

def test_valid_diagnosis_response():
    resp = DiagnosisResponse(
        root_cause="VLAN 10 misconfiguration",
        confidence=0.95,
        osi_layer="Layer 2",
        evidence=["Fa0/1 in VLAN 1"],
        next_command="show interface switchport",
        fix_steps=["switchport access vlan 10"]
    )
    assert resp.confidence == 0.95
    assert resp.root_cause == "VLAN 10 misconfiguration"

def test_invalid_confidence_raises():
    with pytest.raises(ValidationError):
        DiagnosisResponse(
            root_cause="VLAN 10 misconfiguration",
            confidence=1.5,  # Invalid: > 1.0
            osi_layer="Layer 2",
            evidence=["Fa0/1 in VLAN 1"],
            next_command="show interface switchport",
            fix_steps=["switchport access vlan 10"]
        )

def test_empty_root_cause_raises():
    with pytest.raises(ValidationError):
        DiagnosisResponse(
            root_cause="",  # Invalid empty
            confidence=0.8,
            osi_layer="Layer 2",
            evidence=["Fa0/1 in VLAN 1"],
            next_command="show interface switchport",
            fix_steps=["switchport access vlan 10"]
        )

def test_empty_evidence_raises():
    with pytest.raises(ValidationError):
        DiagnosisResponse(
            root_cause="VLAN 10 misconfiguration",
            confidence=0.8,
            osi_layer="Layer 2",
            evidence=[],  # Invalid empty list
            next_command="show interface switchport",
            fix_steps=["switchport access vlan 10"]
        )
