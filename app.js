const fs = require('fs'); 
const express = require('express'); 
const morgan = require('morgan'); 

const app = express(); 
app.use(morgan('dev')); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.status(200).send('hello from the server side!')
})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)); 

const getAllTour = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: {
            tours
        }
    });
}; 

const createTour = (req, res) => {
    //console.log(req.body); 
    const newId = tours[tours.length-1].id+1; 
    const newTour = Object.assign({id: newId}, req.body); 

    tours.push(newTour); 
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err =>{
        res.status(201).json({
            status: 'success',
            data: {
                tours: newTour
            }
        }); 
    }); 
  
}; 

app.get('/api/v1/tours', getAllTour ); 
app.post('api/v1/tours', createTour);


app.post('api/v1/tours', (req, res) => {
    
    const id = req.params.id*1;
    const tour = tours.find(el => el.id === id);

        res.status(201).json({
            status: 'success',
            data: {
                tour
            }
        });  
  
});




const port = 3000; 
app.listen(port, () => {
    console.log('app runing')
}); 