function formatNumber(value:any) {
    if (!value) return '0';
  
    // Round the value to two decimal places
    const roundedValue = Math.round(value * 100) / 100;
  
    // Convert to string and format
    const formattedValue = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return formattedValue;
  }

  function formatDate(props: string | null): string {
    if (props === null) return 'Aucune date.';
    const date = new Date(props);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  function startOfDay(dateString) {
    const date = new Date(dateString);
    date.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds to 0
    return date;
  }


  export default {
    formatNumber,
    formatDate,
    startOfDay
  }