import * as express from 'express';
import moment from 'moment';
import ReportCategoryController from '../controllers/ReportCategoryController';
import ReportServiceController from '../controllers/ReportServiceController';
import ReportServiceMesController from '../controllers/ReportServiceMesController';
import ReportUserController from '../controllers/ReportUserController';

const dashboard = express.Router();

dashboard.get('/users/quantity', async (req, res)=> {
  const userCtrl = new ReportUserController();
  const result = await userCtrl.get(req.query);    
  const data = result.map(r => r.sum);
  let labels: any = result.map((r) => moment(r._id).format('DD/MM/YYYY')); 
  
    res.statusCode = 200;
    res.json({ 
        labels,
        datasets:[
          {
            label: 'Usuários',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
     });
});

dashboard.get('/producoes/value', async (req, res)=> {
  const producoesMesCtrl = new ReportServiceMesController();
  const result = await producoesMesCtrl.get(req.query);    
  const data = result.map(r => r.sum);
  let labels: any = result.map((r) => moment(r._id).format('DD/MM/YYYY')); 
  
    res.statusCode = 200;
    res.json({ 
        labels,
        datasets:[
          {
            label: 'Produções por dia (R$)',
            data,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          }
        ]
     });
});

dashboard.get('/categories/quantity', async (req, res)=> {
  const categoryCtrl = new ReportCategoryController();
  const result = await categoryCtrl.get(req.query);    
  const data = result.map(r => r.sum);
  const labels = result.map(r => r._id);

  res.statusCode = 200;
  res.json({ 
      labels,
      datasets: [
          {
          label: 'Produções por Categoria',
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