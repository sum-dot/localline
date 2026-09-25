import { useState, useEffect } from "react";
import "./AdminDashboard.css";

const emptyForm = {
  name: "",
  nameLocal: "",
  serviceType: "",
  from: "",
  to: "",
  stops: "", // comma-separated text in the form; converted to an array before sending
};

function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchBuses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/buses", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to load buses");
      }

      setBuses(data);
    } catch (err) {
      setError("Failed to load buses");
      setBuses([]); // ensure buses stays a valid array even on failure
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditClick = (bus) => {
    setEditingId(bus._id);
    setForm({
      name: bus.name || "",
      nameLocal: bus.nameLocal || "",
      serviceType: bus.serviceType || "",
      from: bus.from || "",
      to: bus.to || "",
      stops: (bus.stops || []).join(", "),
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const payload = {
      ...form,
      stops: form.stops
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0),
    };

    const isEditing = editingId !== null;
    const url = isEditing
      ? `http://localhost:4000/buses/${editingId}`
      : "http://localhost:4000/buses";
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setForm(emptyForm);
      setEditingId(null);
      fetchBuses();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Delete this bus?");
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:4000/buses/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Delete failed");
      }

      fetchBuses();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {error && <p className="admin-error">{error}</p>}

      <form className="admin-bus-form" onSubmit={handleSubmit}>
        <h2>{editingId ? "Edit Bus" : "Add New Bus"}</h2>

        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="nameLocal"
          placeholder="Local Name"
          value={form.nameLocal}
          onChange={handleChange}
        />
        <input
          name="serviceType"
          placeholder="Service Type"
          value={form.serviceType}
          onChange={handleChange}
        />
        <input
          name="from"
          placeholder="From"
          value={form.from}
          onChange={handleChange}
        />
        <input
          name="to"
          placeholder="To"
          value={form.to}
          onChange={handleChange}
        />
        <input
          name="stops"
          placeholder="Stops (comma-separated)"
          value={form.stops}
          onChange={handleChange}
        />

        <div className="admin-form-actions">
          <button type="submit">
            {editingId ? "Save Changes" : "Add Bus"}
          </button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2>All Buses ({buses.length})</h2>

      {loading ? (
        <p>Loading buses...</p>
      ) : (
        <table className="admin-bus-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>From</th>
              <th>To</th>
              <th>Service Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {buses.map((bus) => (
              <tr key={bus._id}>
                <td>{bus.name}</td>
                <td>{bus.from}</td>
                <td>{bus.to}</td>
                <td>{bus.serviceType}</td>
                <td>
                  <button onClick={() => handleEditClick(bus)}>Edit</button>
                  <button onClick={() => handleDelete(bus._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminDashboard;
