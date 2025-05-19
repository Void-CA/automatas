from typing import Dict, List
from pydantic import BaseModel

class AutomatonInput(BaseModel):
    states: List[str]
    input_symbols: List[str]
    initial: str
    finals: List[str]
    transitions: Dict[str, Dict[str, str]]

class Node(BaseModel):
    id: str
    label: str

class Edge(BaseModel):
    from_: str  # se usa "from_" porque "from" es palabra reservada en Python
    to: str
    label: str

class RecordGraph(BaseModel):
    nodes: List[Node]
    edges: List[Edge]