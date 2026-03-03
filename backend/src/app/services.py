from sqlalchemy.orm import Session
from fastapi import HTTPException

from src.app.models import Curriculum as ModelCurriculum, Education, Experience, Skill
from src.app.schema import CurriculumCreate, CurriculumUpdate
from src.app.logging_config import get_logger

logger = get_logger(__name__)


class CurriculumService:
    def create(self, db: Session, curriculum: CurriculumCreate) -> ModelCurriculum:
        logger.info("Creating curriculum for '%s'", curriculum.name)
        educations = [
            Education(
                degree=edu.degree,
                institution=edu.institution,
                start_date=edu.start_date,
                end_date=edu.end_date,
            )
            for edu in curriculum.educations or []
        ]
        experiences = [
            Experience(
                position=exp.position,
                company=exp.company,
                start_date=exp.start_date,
                end_date=exp.end_date,
            )
            for exp in curriculum.experiences or []
        ]
        skills = [
            Skill(name=s.name, level=s.level)
            for s in curriculum.skills or []
        ]
        db_curriculum = ModelCurriculum(
            name=curriculum.name,
            email=curriculum.email,
            phone=curriculum.phone,
            address=curriculum.address,
            linkedin=curriculum.linkedin,
            objetivo=curriculum.objetivo,
            educations=educations,
            experiences=experiences,
            skills=skills,
        )
        db.add(db_curriculum)
        db.commit()
        db.refresh(db_curriculum)
        logger.info("Curriculum created with id=%d", db_curriculum.id)
        return db_curriculum

    def get_all(self, db: Session) -> list[ModelCurriculum]:
        logger.info("Fetching all curriculums")
        return db.query(ModelCurriculum).all()

    def get_by_id(self, db: Session, curriculum_id: int) -> ModelCurriculum:
        logger.info("Fetching curriculum id=%d", curriculum_id)
        curriculum = db.query(ModelCurriculum).filter(ModelCurriculum.id == curriculum_id).first()
        if not curriculum:
            logger.warning("Curriculum id=%d not found", curriculum_id)
            raise HTTPException(status_code=404, detail="Curriculum not found")
        return curriculum

    def update(self, db: Session, curriculum_id: int, data: CurriculumUpdate) -> ModelCurriculum:
        logger.info("Updating curriculum id=%d", curriculum_id)
        curriculum = self.get_by_id(db, curriculum_id)
        for field in ["name", "email", "phone", "address", "linkedin", "objetivo"]:
            setattr(curriculum, field, getattr(data, field))

        # Replace related collections
        curriculum.educations = [
            Education(degree=e.degree, institution=e.institution, start_date=e.start_date, end_date=e.end_date)
            for e in data.educations or []
        ]
        curriculum.experiences = [
            Experience(position=e.position, company=e.company, start_date=e.start_date, end_date=e.end_date)
            for e in data.experiences or []
        ]
        curriculum.skills = [
            Skill(name=s.name, level=s.level) for s in data.skills or []
        ]
        db.commit()
        db.refresh(curriculum)
        logger.info("Curriculum id=%d updated", curriculum_id)
        return curriculum

    def delete(self, db: Session, curriculum_id: int) -> None:
        logger.info("Deleting curriculum id=%d", curriculum_id)
        curriculum = self.get_by_id(db, curriculum_id)
        db.delete(curriculum)
        db.commit()
        logger.info("Curriculum id=%d deleted", curriculum_id)
