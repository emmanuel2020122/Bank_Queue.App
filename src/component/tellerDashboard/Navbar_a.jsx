import React, { useState, useEffect } from 'react';
import './Navbar.css'
import axios from 'axios';
import {Document, Page, Text, View, StyleSheet} from 'react-pdf';
import {saveAs,FileSaver} from  'file-saver';
import {PDFDocument , rgb, PDFText, PDFPage,PDFImage, PDFRenderer} from 'pdf-lib'


function Navbar_a(){
      
    const savePDF =()=>{
        try{
             axios.get(`${process.env.REACT_APP_BaseUrl}/analytics/get_report`,{
                responseType: 'arraybuffer',
             }).then(response =>{
                //var str = JSON.stringify(response);
                const file = new Blob([response.data], { type: 'application/pdf' });
                const fileURL = URL.createObjectURL(file);
                saveAs(fileURL, 'Report.pdf');
                //console.log();
                
            }
            )
            
            
        }catch(err){
            console.log(err);
            alert("Error fetching Query Response");
        }
    
   
    }
           
      /*
        const savePDF =()=>{
            try{
                 axios.get(`${process.env.REACT_APP_BaseUrl}/analytics/daily`,{
                    responseType: 'blob',
                 }).then(response =>{
                    const file = new Blob([response.data], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    saveAs(fileURL, 'Report.pdf');
                    console.log(response.data);
                    
                }
                )
                
                
            }catch(err){
                console.log(err);
                alert("Error fetching Query Response");
            }
        
       
        }
      
       */
  
   
 
  
    return(

        <>
        <div className='navbar_a'>
            <div className='Analytics_logo'>
            <p><strong> Smart_Bank_Queue_Analysis</strong> </p>
            </div>
            <div className='Report_drop'>
                <label> Smart_Report_for:</label>
                <select className="">
                <option value="range1" >Today</option>
                <option value="range2">Week</option>
                <option value="range3">Month</option>
                <option value="range4">Year</option>
                <option value="range5">Specific_date</option>
              </select>
              <button onClick={()=>{savePDF()}}>report</button>
            </div>
        
        </div>
        
        </>
    )
}
/* const [queryResponses, setQueryResponses] = useState([]);
   useEffect(()=>{
    const getAllQueryResponses = async () =>{
        try{
            const response = await axios.get(`${process.env.REACT_APP_BaseUrl}/analytics/daily`)
            setQueryResponses(response.data);
        }catch(err){
            console.log(err);
            alert("Error fetching Query Response");
        }
    };
    getAllQueryResponses();
   },[]);
   const savePDF = () =>{
    const doc = pdfjs(
        <Document>
            <Page>
                {queryResponses.map((queryResponses) => (
                    <Outline key={queryResponses.id}>{queryResponses.text}</Outline>
                ))}
            </Page>
        </Document>
         
    );
    const pdfBlob= doc.toBlob();
    saveAs(pdfBlob, 'Smart_daily.pdf');
   }*/
export default Navbar_a;