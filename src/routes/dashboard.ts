import * as express from 'express';
import faker from 'faker';

const dashboard = express.Router();

dashboard.get('/users/quantity', (req, res)=> {
    const labels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   
    res.statusCode = 200;
    res.json({ 
        labels: labels,
        datasets:[
          {
            label: 'Usuários',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
     });
});

dashboard.get('/producoes/value', (req, res)=> {
    const labels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   
    res.statusCode = 200;
    res.json({ 
        labels: labels,
        datasets:[
          {
            label: 'Produções por mês (R$)',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
     });
});

dashboard.get('/producoes/quantity', (req, res)=> {
    const labels: Array<string> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   
    res.statusCode = 200;
    res.json({ 
        labels: labels,
        datasets:[
          {
            label: 'Produções por mês (Quantidade)',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
     });
});

dashboard.get('/producoes/por-servico', (req, res)=> {
    res.statusCode = 200;
    res.json({ 
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
            {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
     });
});
export { dashboard };