from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Node, Edge, RecordGraph

app = FastAPI()

# CORS: para que puedas consumir desde frontend local
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # cámbialo en producción
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/generate-dot")
def generate_record_dot(data: RecordGraph):
    dot = 'digraph {\n'
    dot += '  graph [rankdir=LR];\n'
    dot += '  node [shape=record];\n'

    for node in data.nodes:
        label = node.label.replace("\n", "\\n").replace('"', '\\"')
        dot += f'  {node.id} [label="{label}"];\n'

    for edge in data.edges:
        dot += f'  {edge.from_} -> {edge.to} [label="{edge.label}"];\n'

    dot += '}'
    return {"dot": dot}
