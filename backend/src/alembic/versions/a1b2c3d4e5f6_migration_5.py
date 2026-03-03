"""migration 5: add linkedin, objetivo to curriculums; add skills table

Revision ID: a1b2c3d4e5f6
Revises: 55b5ed24e139
Create Date: 2026-03-03 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = 'a1b2c3d4e5f6'
down_revision: Union[str, None] = '55b5ed24e139'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('curriculums', sa.Column('linkedin', sa.String(255), nullable=True))
    op.add_column('curriculums', sa.Column('objetivo', sa.String(500), nullable=True))

    op.create_table(
        'skills',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('level', sa.String(length=50), nullable=True),
        sa.Column('curriculum_id', sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(['curriculum_id'], ['curriculums.id']),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index('ix_skills_id', 'skills', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index('ix_skills_id', table_name='skills')
    op.drop_table('skills')
    op.drop_column('curriculums', 'objetivo')
    op.drop_column('curriculums', 'linkedin')
