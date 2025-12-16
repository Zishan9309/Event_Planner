const Event = require("../models/Event");

/**
 * CREATE EVENT
 */
exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create({
      title: req.body.title,
      description: req.body.description,
      dateTime: req.body.dateTime,
      location: req.body.location,
      capacity: req.body.capacity,
      image: req.file ? `/uploads/${req.file.filename}` : null,
      createdBy: req.user.id,
      attendees: []
    });

    res.status(201).json(event);
  } catch {
    res.status(500).json({ message: "Event creation failed" });
  }
};

/**
 * VIEW ALL EVENTS
 */
exports.getEvents = async (req, res) => {
  const events = await Event.find().populate("createdBy", "email");
  res.json(events);
};

/**
 * UPDATE EVENT (ONLY CREATOR)
 */
exports.updateEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event)
    return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(event, req.body);
  if (req.file) event.image = `/uploads/${req.file.filename}`;

  await event.save();
  res.json(event);
};

/**
 * DELETE EVENT (ONLY CREATOR)
 */
exports.deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event)
    return res.status(404).json({ message: "Event not found" });

  if (event.createdBy.toString() !== req.user.id)
    return res.status(403).json({ message: "Not authorized" });

  await event.deleteOne();
  res.json({ message: "Event deleted successfully" });
};
