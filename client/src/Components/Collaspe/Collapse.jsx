import { useState } from "react";
import "./Collapse.scss";

function Collapse({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="collapse">
      <button className="collapse-btn" onClick={() => setOpen((prev) => !prev)}>
        {open ? "▲" : "▼"}
        {title}
      </button>

      {open && <div>{children}</div>}
    </div>
  );
}

export default Collapse;
