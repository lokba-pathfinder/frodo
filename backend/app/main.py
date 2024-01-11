from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from app.routers import (
    search_router,
    summary_script_router,
    full_script_router,
    video_router,
)

app = FastAPI()

origins = [
    "http://127.0.0.1:80",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(search_router.router)
app.include_router(summary_script_router.router)
app.include_router(full_script_router.router)
app.include_router(video_router.router)
