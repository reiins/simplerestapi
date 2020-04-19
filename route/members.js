const express = require('express');
const router = express.Router();
const members = require('../members');


//GetAll
router.get('/', (req, res) => {
    res.json(members);
});

//Select with id
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `no member with id ${req.params.id}` });
    }
});


//Add data
router.post('/', (req, res) => {
    const add = {
        id: members.length + 1,
        name: req.body.name,
        email: req.body.email,
        active: 'active'
    };

    if (!add.name || !add.email) {
        res.status(400).json({ msg: 'please fill name or email' });
    } else {

        const match = members.some(member => req.body.email === member.email);

        if(match){
            res.status(400).json({msg: `already data with email ${req.body.email}`});
        }else{
        members.push(add);
        // res.json(members);
        

        }
    }
});


//update data

router.put('/:id', (req, res) => {
    const find = members.some(member => member.id === parseInt(req.params.id));
    if (find) {
        const upMember = req.body;
        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = upMember.name ? upMember.name : member.name;
                member.email = upMember.email ? upMember.email : member.email;

                res.json({ msg: "data updated", members: member });
            }
        });
    } else {
        res.status(400).json({ msg: `no member with id ${req.params.id}` });
    }
});

router.delete('/:id', (req, res) => {
    const find = members.some(member => member.id === parseInt(req.params.id));
    if(find){

        res.json({ msg: 'member deleted', members: members.filter(member => member.id !== parseInt(req.params.id))});
    
    }else{
        res.status(400).json({msg: `no member with id ${req.params.id}`});
    }
});
module.exports = router;