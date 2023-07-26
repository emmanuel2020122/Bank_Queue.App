import React from 'react';
import  logo1 from './Timages/Tlogo1.png';
import {CiLogout} from 'react-icons/ci';
import {MdAnalytics} from 'react-icons/md';
import {GrNotification} from 'react-icons/gr';
import {GrDashboard} from 'react-icons/gr';
import axios from 'axios';

import '../tellerDashboard/Sidebar.css'
function Sidebar(){
  const handleLogout = () =>{
    axios.post( " ",{

    }

    ).then(
      
    )

  }

    return(
      <div className='sidebar '>
        <div className='top'>
        <img src={logo1} alt="" className="Tlogo"/>
        </div>
        <hr />
        <div className='center'>
           <ul>
                <li><MdAnalytics className="D_icons"/></li>
                <li><GrNotification  className="D_icons"/></li>
                <li><GrDashboard className="D_icons"/></li>
            </ul>
        </div>
        <div className='bottom'>
            <CiLogout onClick={handleLogout}/>Logout 
        </div>
      </div>
    )
}
export default Sidebar;
