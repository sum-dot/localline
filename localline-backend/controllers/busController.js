import Bus from "../models/Bus.js";

// Admin-only: full, unfiltered inventory for the dashboard table.
// No limit here — the admin needs to see and manage everything.
export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Public: search results, paginated 5–10 at a time per the teacher's request.
export const searchBuses = async (req, res) => {
  try {
    const { query, field } = req.query;

    if (!query) {
      return res.status(200).json({ results: [], total: 0 });
    }

    // escape regex special characters so a stray ".", "(", etc. in the
    // typed text doesn't break the pattern or match more than intended
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // BusSearch.jsx passes field=name. It matches "name" only (not
    // nameLocal) because BusSearchResult.jsx only ever displays bus.name
    // — matching on nameLocal too could return a bus whose visible name
    // doesn't contain what was typed at all. Anchored to the start ("^")
    // so typing "Ha" only returns buses actually named "Ha...", not
    // every bus with an "ha" anywhere in its name.
    const nameRegex = new RegExp("^" + escaped, "i");

    // RouteFinder.jsx omits "field" and keeps the old, wider substring
    // match across name/from/to/stops, since it searches by stop name
    // which can appear anywhere in that list.
    const regex = new RegExp(escaped, "i");

    const filter =
      field === "name"
        ? { name: nameRegex }
        : {
            $or: [
              { name: regex },
              { nameLocal: regex },
              { from: regex },
              { to: regex },
              { stops: regex },
            ],
          };

    // paginated 5-10 at a time per the teacher's request; reuses the
    // field-aware filter above (name-only, or the wider name/nameLocal/
    // from/to/stops match) instead of rebuilding it
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 10);
    const offset = Math.max(parseInt(req.query.offset) || 0, 0);

    const [results, total] = await Promise.all([
      Bus.find(filter).skip(offset).limit(limit),
      Bus.countDocuments(filter),
    ]);

    res.status(200).json({ results, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Any logged-in user can rate a bus; rating again just updates their
// own entry instead of adding a duplicate.
export const rateBus = async (req, res) => {
  try {
    const stars = parseInt(req.body.stars, 10);
    if (!Number.isInteger(stars) || stars < 1 || stars > 5) {
      return res.status(400).json({ error: "stars must be an integer from 1 to 5" });
    }

    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      return res.status(404).json({ error: "Bus not found" });
    }

    const existing = bus.ratings.find(
      (r) => r.user.toString() === req.user.id
    );
    if (existing) {
      existing.stars = stars;
    } else {
      bus.ratings.push({ user: req.user.id, stars });
    }

    await bus.save();
    res.status(200).json(bus);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createBus = async (req, res) => {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateBus = async (req, res) => {
  try {
    const updated = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ error: "Bus not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteBus = async (req, res) => {
  try {
    const deleted = await Bus.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Bus not found" });
    }
    res.status(200).json({ message: "Bus deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};