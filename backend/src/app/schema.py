from pydantic import BaseModel, ConfigDict
from typing import List, Optional


# ── Education ────────────────────────────────────────────────
class EducationBase(BaseModel):
    degree: str
    institution: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class EducationCreate(EducationBase):
    pass


class EducationResponse(EducationBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ── Experience ───────────────────────────────────────────────
class ExperienceBase(BaseModel):
    position: str
    company: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None


class ExperienceCreate(ExperienceBase):
    pass


class ExperienceResponse(ExperienceBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ── Skill ────────────────────────────────────────────────────
class SkillBase(BaseModel):
    name: str
    level: Optional[str] = None


class SkillCreate(SkillBase):
    pass


class SkillResponse(SkillBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# ── Curriculum ───────────────────────────────────────────────
class CurriculumBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    address: Optional[str] = None
    linkedin: Optional[str] = None
    objetivo: Optional[str] = None


class CurriculumCreate(CurriculumBase):
    educations: Optional[List[EducationCreate]] = []
    experiences: Optional[List[ExperienceCreate]] = []
    skills: Optional[List[SkillCreate]] = []


class CurriculumUpdate(CurriculumBase):
    educations: Optional[List[EducationCreate]] = []
    experiences: Optional[List[ExperienceCreate]] = []
    skills: Optional[List[SkillCreate]] = []


class CurriculumResponse(CurriculumBase):
    id: int
    educations: List[EducationResponse] = []
    experiences: List[ExperienceResponse] = []
    skills: List[SkillResponse] = []
    model_config = ConfigDict(from_attributes=True)
