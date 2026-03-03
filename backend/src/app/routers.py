from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from src.app.database import get_db
from src.app.schema import CurriculumCreate, CurriculumUpdate, CurriculumResponse
from src.app.services import CurriculumService

router = APIRouter(prefix="/curriculum", tags=["curriculum"])
service = CurriculumService()


@router.post("/", response_model=CurriculumResponse, status_code=201)
def create_curriculum(curriculum: CurriculumCreate, db: Session = Depends(get_db)):
    return service.create(db, curriculum)


@router.get("/", response_model=List[CurriculumResponse])
def get_all_curriculums(db: Session = Depends(get_db)):
    return service.get_all(db)


@router.get("/{curriculum_id}", response_model=CurriculumResponse)
def get_curriculum(curriculum_id: int, db: Session = Depends(get_db)):
    return service.get_by_id(db, curriculum_id)


@router.put("/{curriculum_id}", response_model=CurriculumResponse)
def update_curriculum(curriculum_id: int, curriculum: CurriculumUpdate, db: Session = Depends(get_db)):
    return service.update(db, curriculum_id, curriculum)


@router.delete("/{curriculum_id}", status_code=204)
def delete_curriculum(curriculum_id: int, db: Session = Depends(get_db)):
    service.delete(db, curriculum_id)
