const defaultHighchartsOptions = {
    chart: {
      backgroundColor: '#FFFFFF',
      type: 'line',
    },
    plotOptions: {
      series: {
        marker: {
          enabled: true
        },
        color: '#4472c4',
        events: {
          legendItemClick: function () { return false; }
        }
      },
    },
    xAxis: {
      title: { text: 'Depth (ft)' },
      gridLineWidth: 1,
      min: 0
    },
    yAxis: {
      tickInterval: 10,
      title: { text: 'Inclination' },
      gridLineWidth: 1,
      min: 0
    },
    credits: { enabled: false },
    exporting: { enabled: false },
  };
  
  export function getHighchartsOptions({ data, dataset }) {
    try {
      data = data["0"].data.stations
    } catch (e) { }
  
    const series = [
      {
        name: "MD vs. Inc",
        data: data.map(stationRecord => ({
          x: stationRecord.measured_depth,
          y: stationRecord.inclination,
          name: "Measured depth vs Inclination",
        })),
        turboThreshold: 20000,
      },
    ];
  
    return {
      ...defaultHighchartsOptions,
      title: { text: `MD vs. Inc`, style: { color: 'black' } },
      series,
    };
  }
  