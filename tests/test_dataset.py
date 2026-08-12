import os
import json
from scripts.validate_dataset import validate_dataset

def test_dataset_file_exists():
    assert os.path.exists("data/cases.json")
    assert os.path.exists("data/cases.csv")

def test_dataset_content_and_schema():
    with open("data/cases.json", "r", encoding="utf-8") as f:
        cases = json.load(f)
    assert len(cases) >= 30, f"Expected at least 30 cases, found {len(cases)}"

def test_validate_dataset_script():
    success = validate_dataset("data/cases.json")
    assert success is True
