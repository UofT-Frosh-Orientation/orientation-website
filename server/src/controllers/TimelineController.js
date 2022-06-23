const TimelineServices = require('../services/TimelineServices');

const TimelineModel = require('../models/TimelineModel');

const TimelineController = {

  async getTimeline(req, res, next) {
    try{
        const items = await TimelineModel
          .find()
          .lean()
          .exec((err, items)=>{
            if(!err){
              return res.json({items: items})
            }
          }); 
    } catch(e) {
      next(e);
    }
  },

  async getTimelineElement(req, res, next) {
    let id = req.params.id;
    try {
      // have a form that automatically fills out fields with current model information
      // gets corresponding timelineelement informaiton to prefill form -> reroutes to edit form
      
      const timelineElement = await TimelineModel.findOne({_id: id})
        .exec((err, timelineElement)=>{
          if(!err){
            return res.json(timelineElement)
          }
        });
    } catch(e) {
      next(e);
    }
  },

  async updateTimelineElement(req, res, next) {
    let timelineData = req.body;    
    let id = req.params.id;

    try {
      timelineRecord = {
        date: timelineData.date,
        name: timelineData.name,
        description: timelineData.description
      }

      await TimelineServices.updateTimelineElement(id, timelineRecord);
      return res.status(204).send({ message: 'Successfully updated timeline element!' });
    } catch (e) {
      next(e);
    }
  },

  async addTimelineElement(req, res, next) {
    const timelineData = req.body;
    
    try {
      //need to change for permissions - which users can access
      // await TimelineServices.validateUser(timelineData);
      timelineRecord = {
        date: timelineData.date,
        name: timelineData.name,
        description: timelineData.description
      }

      await TimelineServices.saveNewTimelineElement(timelineRecord);
      return res.status(200).send({ message: 'Successfully added timeline element!' });
    } catch (e) {
      next(e);
    }
  },

  async deleteTimelineElement(req, res, next) {
    let id = req.params.id;
    
    try {
      await TimelineServices.deleteTimelineElement(id);
      return res.status(200).send({ message: 'Successfully deleted timeline element!' });
    } catch (e) {
      next(e);
    }
  }, 

  // async changeTimelineOrder(req, res, next) {
    
  // }
};

module.exports = TimelineController;
