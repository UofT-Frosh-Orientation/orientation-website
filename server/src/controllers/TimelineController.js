const TimelineServices = require('../services/TimelineServices');

const express = require('express');
const TimelineModel = require('../models/TimelineModel');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:5000';

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

    getTimelineElement(req, res, next) {
      let timelineData = req.body;
      let id = req.params.id;
      try {
        // have a form that automatically fills out fields with current model information
        // gets corresponding timelineelement informaiton to prefill form -> reroutes to edit form
        res.render("/:id/edit",
          {
            TimelineElement: TimelineModel.findOne({ id })
          }   
        )
      } catch (e) {
        next(e);
      }
    },

    editTimelineElement(req, res, next) {
      let timelineData = req.body;
      try {
        //need to change for permissions - which users can access
        await TimelineServices.validateUser(timelineData);
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

    addTimelineElement(req, res, next) {
      let timelineData = req.body;
      try {
        //need to change for permissions - which users can access
        await TimelineServices.validateUser(timelineData);
        timelineRecord = {
          date: timelineData.date,
          name: timelineData.name,
          description: timelineData.description
        };
        await TimelineServices.saveNewTimelineElement(timelineRecord);
        res.status(200).send({ message: 'Successfully added new timeline element!' });
        res.redirect('/timeline');
      } catch (e) {
        next(e);
      }
      
    },

    deleteTimelineElement(req, res, next) {
      let id = req.params.id;
      try {
        timelineElement = TimelineModel.findOne({ id })
        timelineElement = {
          date: '',
          name: '',
          description: ''
        }
        await TimelineServices.saveNewTimelineElement(timelineRecord);
        res.status(200).send({ message: 'Successfully deleted timeline element!' });
        res.redirect('/timeline/:id');
      } catch (e) {
        next(e);
      }
    }, 

    changeTimelineOrder(req, res, next) {
      
    }
};
