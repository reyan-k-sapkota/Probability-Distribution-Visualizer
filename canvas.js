var chart;

function do_trials (N){
    var n = Number (N); 
    const values = [];
    var dice_result;
    for (let i = 1; i<=n; i++){
        dice_result = Math.floor (Math.random()*document.getElementById("ranNum").value) +1;
        values.push (dice_result);
    }
    document.getElementById("display_values").innerHTML = values;
    return values;
}

let saved_value;
function save_value(){
    const value = do_trials(document.getElementById("trials").value);
    saved_value = value;
    return saved_value;
}

saved_value = save_value();
function use_value(){
    if (saved_value == null){
        console.log ("not saved any");
    }else{
        return saved_value;
    }
}

function freq(values, n){
    var c = 0;
    for (let i= 0; i<values.length;i++){
        if (n == values[i]){
            c +=1;
        }
    }
    return c;
}

function values_with_frequency (values){
    const value_frequency = [];
    for (let i = 0; i <values.length; i++){
        let FREQUENCY = freq(values, values[i]);
        let VALUE = values [i];
        value_frequency.push ({VALUE, FREQUENCY});
    }

    document.getElementById("display_freq").innerHTML = JSON.stringify(value_frequency);
    return value_frequency;
}

function probability_calc (array, len){
    var f = [];
    var probabilites = []
    var limit = document.getElementById("ranNum").value;
    for (let i =1; i<=limit; i++){
        f.push (freq(array, i));
    }
    for (let j= 0; j<f.length; j++){
        probabilites.push (f[j]/len);
    }
    document.getElementById("display_prob").innerHTML = probabilites;
    return probabilites;    
}

function sum (probabilites){
    let sum = 0;
    for (let j= 0; j<probabilites.length; j++){
        sum+=probabilites [j];
    }
    document.getElementById("display_sum").innerHTML = sum;
    return sum;
}

function compute_plot_data (array, len, ranNum){
    const prob = probability_calc(array, len);
    const s = sum(prob);
    const plot_data = [];
    for (let x = 1; x<=ranNum; x++){
        y = prob [x-1];
        plot_data.push ({x, y});
    }
    document.getElementById("display_pd").innerHTML = JSON.stringify(plot_data);
    return plot_data;
}


function update_graph (array, len, ranNum){
    var ctx = document.getElementById("chart").getContext("2d");
    var freq = values_with_frequency(array);
    var prob = probability_calc(array, len);
    var dataPoints = compute_plot_data(array, len, ranNum);
    var trialNumValue = document.getElementById("trials").value;
    var ranNumValue = document.getElementById("ranNum").value;

    var max_prob = Math.max (...prob);

    const data = {
        datasets: [{
          label: 'Probability',
          data: dataPoints,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          showLine: true,
          fill: false,
          tension: 0.3
        }]
      };

      const config = {
        type: 'bar', 
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          
          scales: {
            x: {
                type: 'linear',
                
              reverse: false, 
              min: 0,
              max: ranNum,
              grid: {
                drawOnChartArea: true,
                
              },
              title: {
                display: true,
                text: 'Number', 
                font: {
                size: 14
            }
              },
              ticks: {
                stepSize: 1
              }
            },


            y: {
              reverse: false,
              display:true,
              beginAtZero: true, 
              min: 0,
              max: max_prob + 0.7*max_prob,
              grid: {
                drawOnChartArea: true
              },
              title: {
                display:true,
                text: 'Probability Distribution',
                font: {
                    size :14
                }
              },
              ticks: {
                stepSize: 0.1,
                display:true,
              }
            }
          },
          plugins: {
            title: {
                display: true,
                text: 'Probability Distribution Chart for Random Numbers drawn between 1 to ' + ranNum + " for " + len + " times." ,
            },
            legend: {
              display: false
            },
            
            
           
          }
        }
      };
    
    if (chart != undefined) {
        chart.destroy();
    }

    chart = new Chart(ctx, config);
}
function sample_array(N, p){
    const values = [];
    var dice_result;
    for (let i =1; i<=N; i++){
        dice_result = Math.floor (Math.random()*p)+1;
        values.push(dice_result);
    }
    return values;
}

update_graph (do_trials(10,10), 10, 10)