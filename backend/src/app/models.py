from sqlalchemy.orm import DeclarativeBase, relationship
from sqlalchemy import Column, Integer, String, ForeignKey


class Base(DeclarativeBase):
    pass


class Curriculum(Base):
    __tablename__ = "curriculums"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(50), nullable=True)
    address = Column(String(255), nullable=True)
    linkedin = Column(String(255), nullable=True)
    objetivo = Column(String(500), nullable=True)
    educations = relationship("Education", back_populates="curriculum", cascade="all, delete-orphan")
    experiences = relationship("Experience", back_populates="curriculum", cascade="all, delete-orphan")
    skills = relationship("Skill", back_populates="curriculum", cascade="all, delete-orphan")


class Education(Base):
    __tablename__ = "educations"

    id = Column(Integer, primary_key=True, index=True)
    degree = Column(String(100))
    institution = Column(String(100))
    start_date = Column(String(10), nullable=True)
    end_date = Column(String(10), nullable=True)
    curriculum_id = Column(Integer, ForeignKey("curriculums.id"))
    curriculum = relationship("Curriculum", back_populates="educations")


class Experience(Base):
    __tablename__ = "experiences"

    id = Column(Integer, primary_key=True, index=True)
    position = Column(String(100))
    company = Column(String(100))
    start_date = Column(String(10), nullable=True)
    end_date = Column(String(10), nullable=True)
    curriculum_id = Column(Integer, ForeignKey("curriculums.id"))
    curriculum = relationship("Curriculum", back_populates="experiences")


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    level = Column(String(50), nullable=True)
    curriculum_id = Column(Integer, ForeignKey("curriculums.id"))
    curriculum = relationship("Curriculum", back_populates="skills")
