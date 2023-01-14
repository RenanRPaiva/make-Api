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

dashboard.get('/categories/quantity', (req, res)=> {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
   
    res.statusCode = 200;
    res.json({ 
        labels: labels,
        datasets:[
          {
            label: 'Individual',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Pacotes',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
     });
});

dashboard.get('/producoes/por-servico', (req, res)=> {
    res.statusCode = 200;
    res.json({ 
        labels: ['Maquiagem', 'Penteado', 'Atendimento em festa', 'Maquiagem + Cachos', 'Maquiagem + Penteado', 'Noiva/Debutante Maquiagem + Penteado'],
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

dashboard.get('/producoes/quantity', (req, res)=> {
   
  res.statusCode = 200;
  res.json({
    labels: ['Maquiagem', 'Penteado', 'Atendimento em festa', 'Maquiagem + Cachos', 'Maquiagem + Penteado', 'Noiva/Debutante Maquiagem + Penteado'],
    datasets: [
      {
        label: 'Produções mais contratada (R$)',
        data: [5, 8, 3, 5, 9, 12],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
   });   
});

export { dashboard };