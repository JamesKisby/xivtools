"""empty message

Revision ID: ccbf5271f472
Revises: daa0ecadef13
Create Date: 2021-05-24 18:34:06.592655

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ccbf5271f472'
down_revision = 'daa0ecadef13'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('raidcalendar',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Text(), nullable=True),
    sa.Column('raidid', sa.Text(), nullable=True),
    sa.Column('calendarid', sa.Text(), nullable=True),
    sa.Column('owner', sa.ARRAY(sa.Text()), nullable=True),
    sa.Column('day', sa.SMALLINT(), nullable=True),
    sa.Column('starttime', sa.DateTime(), nullable=True),
    sa.Column('endtime', sa.DateTime(), nullable=True),
    sa.Column('isstandard', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('raidcalendar')
    # ### end Alembic commands ###
