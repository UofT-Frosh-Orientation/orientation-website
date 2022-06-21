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
    let timelineData = req.body;
    let id = req.params.id;
    try {
      // have a form that automatically fills out fields with current model information
      // gets corresponding timelineelement informaiton to prefill form -> reroutes to edit form
      res.render("/:id/edit",
        {
          TimelineElement: TimelineModel.findOne({ _id: id })
        }   
      )
    } catch (e) {
      next(e);
    }
  },

  async editTimelineElement(req, res, next) {
    let timelineData = req.body;
    try {
      //need to change for permissions - which users can access
      // await TimelineServices.validateUser(timelineData);
      // have a form that automatically fills out fields with current model information
      timelineRecord = {
        date: timelineData.date,
        name: timelineData.name,
        description: timelineData.description
      }
      await TimelineServices.updateTimelineElement(timelineRecord);
      res.status(200).send({ message: 'Successfully updated timeline element!' });
      res.redirect('/timeline/:id');
    } catch (e) {
      next(e);
    }
  },

  async addTimelineElement(req, res, next) {
    const { date, name, description } = req.body;
    try {
      //need to change for permissions - which users can access
      // await TimelineServices.validateUser(timelineData);
      
      await TimelineServices.saveNewTimelineElement(date, name, description);
      return res.status(200).send({ message: 'Successfully added new timeline element!' });
    } catch (e) {
      next(e);
    }
    
  },

  async deleteTimelineElement(req, res, next) {
    let id = req.params.id;
    try {
      timelineElement = TimelineModel.findOne({ _id: id })
      timelineElement.date = ''
      timelineElement.name = ''
      timelineElement.description = ''

      await TimelineServices.updateTimelineElement(timelineElement);
      res.status(200).send({ message: 'Successfully deleted timeline element!' });
      res.redirect('/timeline/:id');
    } catch (e) {
      next(e);
    }
  }, 

  // async changeTimelineOrder(req, res, next) {
    
  // }
};

module.exports = TimelineController;
