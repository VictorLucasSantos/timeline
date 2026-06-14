from app.database import Base, engine
from app import models  # isso importa os modelos e garante que o SQLAlchemy os conheça

# Cria as tabelas no banco
Base.metadata.create_all(bind=engine)
