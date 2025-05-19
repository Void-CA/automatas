const viz = new Viz();

function parseInput() {
  const states = document
    .getElementById("states")
    .value.split(",")
    .map((s) => s.trim());
  const symbols = document
    .getElementById("symbols")
    .value.split(",")
    .map((s) => s.trim());
  const initial = document.getElementById("initial").value.trim();
  const finals = document
    .getElementById("finals")
    .value.split(",")
    .map((s) => s.trim());

  const rawTransitions = document
    .getElementById("transitions")
    .value.trim()
    .split("\n");
  const transitions = {};

  rawTransitions.forEach((line) => {
    const [from, symbol, to] = line.split(",").map((x) => x.trim());
    if (!transitions[from]) transitions[from] = {};
    transitions[from][symbol] = to;
  });

  return { states, input_symbols: symbols, initial, finals, transitions };
}

async function enviar() {
  const data = {
    nodes: [
      {
        id: "0",
        label: "0 | [• S, $]\\n[S → • a S b, $]\\n[S → •, $]",
      },
      {
        id: "1",
        label: "1 | [S •, $]",
      },
    ],
    edges: [{ from_: "0", to: "1", label: "S" }],
  };

  const res = await fetch("http://localhost:8000/generate-dot", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  viz
    .renderSVGElement(json.dot)
    .then((el) => {
      document.getElementById("graph").innerHTML = "";
      document.getElementById("graph").appendChild(el);
    })
    .catch((err) => {
      console.error(err);
      alert("Error al renderizar el gráfico");
    });
}
