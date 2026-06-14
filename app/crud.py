from sqlalchemy.orm import Session
from app import models, schemas


def criar_evento(db: Session, evento: schemas.EventoCreate):
    novo_evento = models.Evento(**evento.dict())
    db.add(novo_evento)
    db.commit()
    db.refresh(novo_evento)
    return novo_evento


def listar_eventos(db: Session):
    return db.query(models.Evento).order_by(models.Evento.data).all()
