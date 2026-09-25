import { useState, useEffect, useMemo } from "react";
import "./AdminDashboard.css";

const emptyForm = {
  name: "",
  nameLocal: "",
  serviceType: "",
  from: "",
  to: "",
  stops: "",
};

function AdminDashboard() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");

  const fetchBuses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:4000/buses", {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load buses");
      setBuses(data);
    } catch (err) {
      setError("Failed to load buses");
      setBuses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  // Recomputed only when `buses` or `search` actually change, not on
  // every render — cheap here since we're filtering an in-memory array
  // the admin already legitimately has, not making a network call.
  const filteredBuses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return buses;
    return buses.filter((bus) =>
      [bus.name, bus.nameLocal, bus.from, bus.to, bus.serviceType]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(q)),
    );
  }, [buses, search]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
      if (!res.ok) throw new Error(data.error || "Something went wrong");

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

      <section className="admin-card">
        <h2>{editingId ? "Edit Bus" : "Add New Bus"}</h2>

        <form className="admin-bus-form" onSubmit={handleSubmit}>
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
            <button type="submit" className="btn-primary">
              {editingId ? "Save Changes" : "Add Bus"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="admin-card">
        <div className="admin-list-header">
          <h2>
            All Buses ({filteredBuses.length}
            {search && ` of ${buses.length}`})
          </h2>
          <input
            type="text"
            className="admin-search-input"
            placeholder="🔍 Search by name, route, or service type..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <p className="admin-status">Loading buses...</p>
        ) : filteredBuses.length === 0 ? (
          <p className="admin-status">
            {search ? "No buses match your search." : "No buses yet."}
          </p>
        ) : (
          <div className="admin-table-wrapper">
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
                {filteredBuses.map((bus) => (
                  <tr
                    key={bus._id}
                    className={editingId === bus._id ? "editing-row" : ""}
                  >
                    <td>{bus.name}</td>
                    <td>{bus.from}</td>
                    <td>{bus.to}</td>
                    <td>{bus.serviceType}</td>
                    <td className="admin-actions-cell">
                      <button
                        className="btn-edit"
                        onClick={() => handleEditClick(bus)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(bus._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default AdminDashboard;
