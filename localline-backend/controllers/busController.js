import Bus from "../models/Bus.js";

export const getAllBuses = async (req, res) => {
  try {
    const search = req.query.search || "";
    const limit = parseInt(req.query.limit) || 5;
    const offset = parseInt(req.query.offset) || 0;

    const buses = await Bus.find({
      name: { $regex: search, $options: "i" }
    })
      .skip(offset)
      .limit(limit);

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

export const searchBuses = async (req, res) => {
  try {
    const { query, field } = req.query;

    if (!query) {
      return res.status(200).json([]);
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

    const buses = await Bus.find(filter);

    res.status(200).json(buses);
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
    const updated = await Bus.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

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