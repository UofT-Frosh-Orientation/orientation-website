const OlympikEvent = require('../models/OlympiksEventModel');

exports.signupForEvent = async (req, res) => {
  const { eventId, discipline } = req.body;

  try {
    const event = await OlympikEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const currentField = `current${discipline}`;
    const maxField = `max${discipline}`;

    if (event[currentField] >= event[maxField]) {
      return res.status(400).json({ message: 'No spots lef for this event.' });
    }

    event[currentField] += 1;
    await event.save();

    return res.status(200).json({ message: 'Signed up successfully!' });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};

exports.updateEventSpots = async (req, res) => {
  const { id } = req.params;
  const { maxSpots, currentSpots } = req.body;

  try {
    const event = await OlympikEvent.findById(id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // udate spots
    for (const discipline in maxSpots) {
      event[`max${discipline}`] = maxSpots[discipline];
    }
    for (const discipline in currentSpots) {
      event[`current${discipline}`] = currentSpots[discipline];
    }

    await event.save();

    return res.status(200).json({ message: 'Event updated successfully!', event });
  } catch (error) {
    return res.status(500).json({ message: 'An error occurred', error });
  }
};
