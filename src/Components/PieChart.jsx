import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const PieChart = ({dataValues}) => {
  return (
    <div className='max-w-xl w-full mx-auto py-10'>
        <h1 className='text-center w-full text-white mb-5 '>Contribution of Each Feature in Prediction</h1>
        <Chart options={dataValues.options} series={dataValues.series} type="donut" />
    </div>
  )
}

export default PieChart
