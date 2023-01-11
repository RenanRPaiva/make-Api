import { useState, useEffect } from "react";
import moment from "moment";
import useSWR from 'swr';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
      text: 'Usuários por mês',
    },
  },
};

const fetcher = (...args) => fetch(...args).then(res => res.json());

const Dashboard = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectDate, setSelectDate] = useState("all");
  const { data: dataUsersQuantity } = useSWR('http://localhost:3000/dashboard/users/quantity', fetcher);
  const { data: dataPorProducoes } = useSWR('http://localhost:3000/dashboard/producoes/por-servico', fetcher);


  
  
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
        {  dataUsersQuantity ? 
        <div style={col}>
          <div style={item}>
           <Bar options={optionsUsersQuantity} data={dataUsersQuantity} />
          </div>
        </div>
        : "" }
        {  dataPorProducoes ? 
        <div style={col}>
          <div style={item}>
           <Pie data={dataPorProducoes} />;
          </div>
        </div>
        : "" }
        <div style={col}>
          <div style={item}>3</div>
        </div>
        <div style={col}>
          <div style={item}>4</div>
        </div>       
      </div>
    </div>
  );
};

export default Dashboard;
