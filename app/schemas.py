from pydantic import BaseModel
from datetime import datetime


class EventoCreate(BaseModel):
    titulo: str
    descricao: str
    data: datetime


class EventoOut(EventoCreate):
    id: int

    class Config:
        orm_mode = True
