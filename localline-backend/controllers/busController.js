
import Bus from "../models/Bus.js";

export const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();

    res.status(200).json(buses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getBusList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      Bus.find().skip(skip).limit(limit),
      Bus.countDocuments(),
    ]);

    res.status(200).json({
      results,
      total,
    });
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

    if (!query || query.trim() === "") {
      return res.status(200).json([]);
    }

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const regex = new RegExp(escaped, "i");

    const filter =
      field === "name"
        ? { name: regex }
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
        runValidators: true,
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

