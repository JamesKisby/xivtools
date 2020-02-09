"""empty message

Revision ID: d908253d913f
Revises: 8042b1902c64
Create Date: 2020-02-07 12:28:13.133487

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd908253d913f'
down_revision = '8042b1902c64'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('raiddrops',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.Text(), nullable=True),
    sa.Column('classjob', sa.Text(), nullable=True),
    sa.Column('world', sa.Text(), nullable=True),
    sa.Column('isreporter', sa.Boolean(), nullable=True),
    sa.Column('time', sa.Boolean(), nullable=True),
    sa.Column('logmessage', sa.Text(), nullable=True),
    sa.Column('itemid', sa.Integer(), nullable=True),
    sa.Column('itemquantity', sa.SMALLINT(), nullable=True),
    sa.Column('playerid', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('raiddrops')
    # ### end Alembic commands ###
