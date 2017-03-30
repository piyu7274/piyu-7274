/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
qualificationService = require('app/services/qualificationService');

var qualification = {
    getQualificationById:getQualificationById,
    deleteQualification:deleteQualification,
    addQualification:addQualification,
    updateQualification:updateQualification,
    getAllQualification:getAllQualification
};


function getQualificationById(req, res) {


    debug('==>Searching qualification  : ');
    var id = req.params.id;
    var condition = {
        where: {qId: id},
        attributes: ['qId', 'eId', 'college', 'university', 'grad_Type','pgrad_Type','marks10','marks12','grad_per_grade']
    }
    qualificationService.getQualificationById(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for qualification : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}


function getAllQualification(req, res) {
    debug('==>Searching qualification  : ');

    var condition={
        attributes: ['qId', 'eId', 'college', 'university', 'grad_Type','pgrad_Type','marks10','marks12','grad_per_grade']
    }
    qualificationService.getAllQualification(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for qualification : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

    function updateQualification(req, res) {
        //var id = req.query.id
       // var input = req.body;


        var payload = {
            qId: 301,
            eId:1,
            college:'NRI Institue',
            university:'RGPV',
            grad_Type:'TEch',
            pgrad_Type: 'Tech',
            marks10:78,
            marks12: 87,
            grad_per_grade:'A',
            updatedAt: moment().unix()

        };
        var condition = {
            where: {
                qId: 301, eId: 1
            },

            attributes: ['qId', 'eId', 'college', 'university', 'grad_Type','pgrad_Type','marks10','marks12','grad_per_grade']
            }


        qualificationService.updateQualification(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for qualification : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }


    function addQualification(req, res) {
//var id = req.query.id
        //var input = req.body;
        //console.log(input);

        var payload = {
            qId: 301,
            eId:1,
            college:'NRI',
            university:'RGPV',
            grad_Type:'TEch',
            pgrad_Type: 'Tech',
            marks10:78,
            marks12: 87,
            grad_per_grade:'A',
            createdAt:moment().unix(),
            updatedAt: moment().unix()

        };
        var condition = {
            where: {
                qId:301,eId:1
            }

            //attributes: ['qId', 'eId', 'college', 'university', 'grad_Type','pgrad_Type','marks10','marks12','grad_per_grade']
        }

        qualificationService.addQualification(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in adding for qualification : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }
    function deleteQualification(req, res) {


        debug('==>Searching qualification : ');
        var id = req.query.id;
        var condition = {
            where: {id: id}
            //attributes: ['qId', 'eId', 'college', 'university', 'grad_Type','pgrad_Type','marks10,'marks12','grad_per_grade']
        }
        qualificationService.deleteQualification(condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for qualification : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);

        });
    }

module.exports = qualification;