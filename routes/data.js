const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/news agg', (req, res)=>{
    
    res.sendFile(path.join(__dirname, '../data/news agg.json'))
})

router.get('/news', (req, res)=>{

    res.sendFile(path.join(__dirname, '../data/news.json'))
})

module.exports = router