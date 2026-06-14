from fastapi import APIRouter, Depends, Request
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.crud import listar_eventos, criar_evento
from app import schemas

router = APIRouter()

templates = Jinja2Templates(directory="templates")


@router.get("/", response_class=HTMLResponse)
def home(request: Request, db: Session = Depends(get_db)):
    eventos = listar_eventos(db)
    return templates.TemplateResponse(
        "index.html", {"request": request, "eventos": eventos}
    )


@router.post("/eventos/")
def criar(evento: schemas.EventoCreate, db: Session = Depends(get_db)):
    return criar_evento(db, evento)
