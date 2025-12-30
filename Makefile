.PHONY: backend-install backend-run frontend-install frontend-run dev run_backend run_frontend install

export PYTHONPATH := .

backend-install:
	python -m pip install -r requirements-backend.txt

install:
	@bash bin/install_with_uv.sh

backend-run:
	uvicorn backend.app.main:app --reload --port 8000

frontend-install:
	cd frontend && npm install

frontend-run:
	cd frontend && npm run dev

install_precommit: ## To install pre-commit hooks > make install_precommit
	@echo "Installing pre-commit hooks"
	@pre-commit install -t pre-commit
	@pre-commit install -t pre-push

run_backend:
	@python backend/main.py

run_frontend:
	@cd frontend && npm run dev

dev:
	@echo "Run backend and frontend in separate terminals:"
	@echo "  make backend-run"
	@echo "  make frontend-run"
