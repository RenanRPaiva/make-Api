import * as express from 'express';
import faker from 'faker';
import ReportCategoryController from '../controllers/ReportCategoryController';
import ReportServiceController from '../controllers/ReportServiceController';

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

dashboard.get('/categories/quantity', async (req, res)=> {
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  const categoryCtrl = new ReportCategoryController();
  const result = await categoryCtrl.get();
  const data = result.map(r => r.sum);
  const label = result.map(r => r._id);

    res.statusCode = 200;
    res.json({ 
        labels: labels,
        datasets:[
          {
            label,
            data,
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(53, 162, 235)',
            ],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(53, 162, 235, 0.5)'
            ],
          }          
        ],
     });
});

dashboard.get('/producoes/por-servico', async (req, res)=> {
    const serviceCtrl = new ReportServiceController();
    const result = await serviceCtrl.get(req.query);    
    const data = result.map(r => r.sum_qtd);
    const labels = result.map(r => r._id);

    res.statusCode = 200;
    res.json({ 
        labels,
        datasets: [
            {
            label: 'Quantidade de Produções',
            data,
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

dashboard.get('/producoes/quantity', async (req: any, res)=> {
  const serviceCtrl = new ReportServiceController();
  const result = await serviceCtrl.get(req.query);  
  const data = result.map(r => r.sum);
  const labels = result.map(r => r._id);

  res.statusCode = 200;
  res.json({
    labels,
    datasets: [
      {
        label: 'Produções (R$)',
        data,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
   });   
});

export { dashboard };