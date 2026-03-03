import pytest
from unittest.mock import MagicMock, patch
from fastapi.testclient import TestClient

from src.app.main import app
from src.app.database import get_db


def override_get_db():
    db = MagicMock()
    yield db


app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)


def test_get_all_curriculums():
    with patch("src.app.services.CurriculumService.get_all", return_value=[]):
        response = client.get("/curriculum/")
    assert response.status_code == 200
    assert response.json() == []


def test_create_curriculum():
    from src.app.models import Curriculum

    mock_curriculum = MagicMock(spec=Curriculum)
    mock_curriculum.id = 1
    mock_curriculum.name = "Test User"
    mock_curriculum.email = "test@example.com"
    mock_curriculum.phone = None
    mock_curriculum.address = None
    mock_curriculum.linkedin = None
    mock_curriculum.objetivo = None
    mock_curriculum.educations = []
    mock_curriculum.experiences = []
    mock_curriculum.skills = []

    with patch("src.app.services.CurriculumService.create", return_value=mock_curriculum):
        response = client.post(
            "/curriculum/",
            json={"name": "Test User", "email": "test@example.com"},
        )
    assert response.status_code == 201


def test_get_curriculum_not_found():
    from fastapi import HTTPException

    with patch(
        "src.app.services.CurriculumService.get_by_id",
        side_effect=HTTPException(status_code=404, detail="Curriculum not found"),
    ):
        response = client.get("/curriculum/999")
    assert response.status_code == 404