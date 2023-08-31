function App() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <center>
        <h1 style={{ fontSize: "4vw", marginTop: "-20vh" }}>
          vite-plugin-svg2icon
        </h1>
        <h2>
          <i style={{ marginRight: "1em" }} className="icon-react"></i>
          <i style={{ marginRight: "1em" }} className="icon-vue"></i>
          <i style={{ marginRight: "1em" }} className="icon-angular"></i>
          <i style={{ marginRight: "1em" }} className="icon-lit"></i>
          <i style={{ marginRight: "1em" }} className="icon-svelte"></i>
        </h2>
        <footer>
          <span>place svg icon into the folder src/assets/svg-icons</span>
        </footer>
      </center>
    </div>
  );
}

export default App;
