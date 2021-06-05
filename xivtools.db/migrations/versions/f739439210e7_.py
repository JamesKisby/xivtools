"""empty message

Revision ID: f739439210e7
Revises: 5620ea769782
Create Date: 2021-05-30 21:37:20.472310

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f739439210e7'
down_revision = '5620ea769782'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('discordguilds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Text(), nullable=True),
    sa.Column('guildid', sa.Text(), nullable=True),
    sa.Column('raidid', sa.Text(), nullable=True),
    sa.Column('voicechannel', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('discordguilds')
    # ### end Alembic commands ###