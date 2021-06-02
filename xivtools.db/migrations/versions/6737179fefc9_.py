"""empty message

Revision ID: 6737179fefc9
Revises: a5e6c91802e1
Create Date: 2021-05-30 22:21:19.381575

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '6737179fefc9'
down_revision = 'a5e6c91802e1'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('raidcalendar', sa.Column('guildid', sa.Text(), nullable=True))
    op.drop_column('raidcalendar', 'calendarid')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('raidcalendar', sa.Column('calendarid', sa.TEXT(), autoincrement=False, nullable=True))
    op.drop_column('raidcalendar', 'guildid')
    # ### end Alembic commands ###
