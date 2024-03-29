"""empty message

Revision ID: a5e6c91802e1
Revises: f739439210e7
Create Date: 2021-05-30 21:48:17.318322

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a5e6c91802e1'
down_revision = 'f739439210e7'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('discordguilds',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('userid', sa.Text(), nullable=True),
    sa.Column('guildid', sa.BigInteger(), nullable=True),
    sa.Column('raidid', sa.Text(), nullable=True),
    sa.Column('voicechannel', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('discordguilds')
    # ### end Alembic commands ###
