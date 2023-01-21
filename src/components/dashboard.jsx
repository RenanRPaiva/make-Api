import { useState, useEffect } from "react";
import moment from "moment";
import useSWR from 'swr';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, Radar, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  BarElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement
);



const col = {
  width: "50%",
  float: "left",
  boxSizing: "border-box",
  padding: "5px",
};

const item = { 
  width: "100%",
  color: "#fff",
};

const input = {
  padding: '5px',
  fontSize: '1.2em'
};

export const optionsUsersQuantity = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Usuários por dia',
    },
  },
};

export const optionsProducoesQuantity = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Produções (Qtd)',
    },
  },
};

export const optionsCategories = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Categorias por mês (Qtd)',
    },
  },
};

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectDate, setSelectDate] = useState("all");
  const { data: dataUsersQuantity } = useSWR(`http://localhost:3000/dashboard/users/quantity?start_date=${startDate}&end_date=${endDate}&select_date=${selectDate}`, fetcher);
  const { data: dataPorProducoes } = useSWR(`http://localhost:3000/dashboard/producoes/por-servico?start_date=${startDate}&end_date=${endDate}&select_date=${selectDate}`, fetcher);
  const { data: dataProducoesQuantity } = useSWR(`http://localhost:3000/dashboard/producoes/quantity?start_date=${startDate}&end_date=${endDate}&select_date=${selectDate}`, fetcher);
  const { data: dataPorvalues } = useSWR(`http://localhost:3000/dashboard/producoes/value?start_date=${startDate}&end_date=${endDate}&select_date=${selectDate}`, fetcher);
  const { data: dataCategoriesQuantity } = useSWR(`http://localhost:3000/dashboard/categories/quantity?start_date=${startDate}&end_date=${endDate}&select_date=${selectDate}`, fetcher);
  
  useEffect(() => {
    if(selectDate !== 'custom'){
      setStartDate("");
      setEndDate("");
    }
  }, [selectDate])

  return (
    <div className={"container-fluid"}>
      <div style={{ 
        display: 'block',
        textAlign: 'right',
        padding: '15px',
        boxSizing: 'border-box'
       }}>
        <input
          disabled={selectDate !== 'custom'}
          value={startDate}
          type="date" 
          style={input}
          max={endDate !== "" ? endDate : moment().format('YYYY-MM-DD')}
          onChange={(e) => setStartDate(e.target.value)}          
       />
        <input
          disabled={selectDate !== 'custom'} 
          value={endDate}
          type="date" 
          style={input}
          min={startDate != "" ? startDate : null}
          max={moment().format('YYYY-MM-DD')}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select 
          style={input}
          onChange={(e) => setSelectDate(e.target.value)}
          >
          <option value="all">Tudo</option>
          <option value="7">7 dias</option>
          <option value="15">15 dias</option>
          <option value="30">1 mês</option>          
          <option value="180">6 meses</option>
          <option value="360">1 ano</option>
          <option value="custom">Custom</option>
        </select>
      </div>
      <div>
         
        <div style={col}>
          <div style={item}>
          {  dataUsersQuantity ?
           <Bar options={optionsUsersQuantity} data={dataUsersQuantity} />
          : "Não há dados para esse dashboard." }
          </div>
        </div>        
        <div style={col}>
          <div style={item}>{  dataPorvalues ?
           <Bar data={dataPorvalues} />
          : "Não há dados para esse dashboard." }</div>
        </div>       
        
        <div style={col}>
          <div style={item}>
          {  dataProducoesQuantity ? 
              <Radar 
               data={dataProducoesQuantity}
                width={300}
                height={300}
                options={{
                  maintainAspectRatio: false
                }}                
              />              
            : "Não há dados para esse dashboard." }
            </div>
        </div>
        <div style={col}>
          <div style={item}>
          {  dataPorProducoes ? 
            <Pie
            options={optionsProducoesQuantity}
              width={300}
              height={300}
              data={dataPorProducoes}   
            />
          : "Não há dados para esse dashboard." }
          </div>
        </div>
        <div style={{
          ...col,
          width: '100%'
        }}>
          <div style={item}>
          {  dataCategoriesQuantity ?
           <Line options={optionsCategories} data={dataCategoriesQuantity} />
          : "Não há dados para esse dashboard." }
          </div>
        </div>        
      </div>
    </div>
  );
};



export default Dashboard;
