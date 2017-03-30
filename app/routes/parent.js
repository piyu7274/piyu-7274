/**
 * Created by piyush on 22/2/17.
 */
_=require('rootpath');
var
    moment = require('moment'),
    debug = require('debug')('app.routes.employee');
parentService = require('app/services/parentService');

var parent = {
    getParentById:getParentById,
    deleteParent:deleteParent,
    addParent:addParent,
    updateParent:updateParent,
    getAllParent:getAllParent
};


function getParentById(req, res) {


    debug('==>Searching parent  : ');
    var id = req.params.id;
    var condition = {
        where: {pId: id},
        attributes: ['pId','eId','fatherName', 'motherName', 'parentAddress', 'city', 'state', 'parentContact']
    }
    parentService.getParentById(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}


function getAllParent(req, res) {
    debug('==>Searching devices  : ');

    var condition={
        attributes: ['pId','eId','fatherName', 'motherName', 'parentAddress', 'city', 'state', 'parentContact']
    }
    parentService.getAllParent(condition, function (err, result) {
        if (err) {
            debug('==>caught error in searching for employees : ');
            return res.status(err.code).json({message: err.message});
        }
        return res.status(result.code).json(result.message);

    });
}

    function updateParent(req, res) {
        //var id = req.query.id
        var input = req.body;
        console.log(input);
       /* var payload = {
            id: input.id,
            e_fname: input.efname,
            e_mname: input.emname,
            eaddress: input.address,
            city: input.city,
            state:input.state,
            e_pcontact:input.contact,
            updatedAt: moment().unix()

        };*/

        var payload = {
            pId: 501,
            eId:1,
            fatherName:'Rajesh Sharma',
            motherName:'Priya Sharma',
            parentAddress:'Tilak Nagar',
            city: 'Indore',
            state:'MP',
            parentContact:'9191919191',
            updatedAt: moment().unix()

        };
        var condition = {
            where: {
                pId: 501, eId: 1
            },

                attributes: ['pId','eId','fatherName', 'motherName', 'parentAddress', 'city', 'state', 'parentContact']
            }


        parentService.updateParent(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for parent : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }


    function addParent(req, res) {
//var id = req.query.id
        //var input = req.body;
        //console.log(input);
       /* var payload = {
            id: input.id,
            e_fname: input.efname,
            e_mname: input.emname,
            eaddress: input.address,
            city: input.city,
            state:input.state,
            e_pcontact:input.contact,
            createdAt: moment().unix(),
            updatedAt: moment().unix()
        };*/

        var payload = {
            pId: 501,
            eId:1,
            fatherName:'Rajesh Sharma',
            motherName:'Priya Sharma',
            eaddress:'Tilak Nagar',
            city: 'Indore',
            state:'MP',
            e_pcontact:'9998887779',
            createdAt:moment().unix(),
            updatedAt: moment().unix()

        };
        var condition = {
            where: {
                pId:501,eId:1
            }

            //attributes: ['pId','eId','fatherName', 'motherName', 'parentAddress', 'city', 'state', 'parentConatct']
        }

        parentService.addParent(payload, condition, function (err, result) {
            if (err) {
                debug('==>caught error in adding for parent : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);
        });


    }
    function deleteParent(req, res) {


        debug('==>Searching parent : ');
        var id = req.query.id;
        var condition = {
            where: {id: id}
            //attributes: ['id', 'name', 'age', 'address', 'salary']
        }
        parentService.deleteParent(condition, function (err, result) {
            if (err) {
                debug('==>caught error in searching for parent : ');
                return res.status(err.code).json({message: err.message});
            }
            return res.status(result.code).json(result.message);

        });
    }

module.exports = parent;
