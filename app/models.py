from sqlalchemy import Column, Integer, String, DateTime
from app.database import Base
from datetime import datetime


class Evento(Base):
    __tablename__ = "eventos"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    descricao = Column(String)
    data = Column(DateTime, default=datetime.utcnow)
