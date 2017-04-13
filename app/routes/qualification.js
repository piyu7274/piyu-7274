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
        where: {eId: id},
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
       var id = req.params.id
       var input = req.body;
       var payload = {
        eId:id,
            college:input.college,
            university:input.university,
            grad_Type:input.grad_Type,
            pgrad_Type: input.pgrad_Type,
            marks10:input.marks10,
            marks12: input.marks12,
            grad_per_grade:input.grad_per_grade,
            updatedAt: moment().unix()

        };

        /* var payload = {
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

        };*/
        var condition = {
            where: {
             qId: 1
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
       // var id = req.params.id
        var input = req.body;
        console.log(input);

       var payload = {
            eId:input.eId,
            college:input.college,
            university:input.university,
            grad_Type:input.grad_Type,
            pgrad_Type: input.pgrad_Type,
            marks10:input.marks10,
            marks12: input.marks12,
            grad_per_grade:input.grad_per_grade,
            createdAt:moment().unix(),
            updatedAt: moment().unix()

        };
        /*var payload = {
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

        };*/
        var condition = {
            where: {
               eId:input.eId
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
        var id = req.params.id;
       var condition = {
            where: {eId: id}
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
