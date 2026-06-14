from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from app.routers import eventos
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS (para permitir requisições do frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Roteador principal
app.include_router(eventos.router)

# Static (se for usar CSS ou favicon, opcional)
app.mount("/static", StaticFiles(directory="app/static"), name="static")
