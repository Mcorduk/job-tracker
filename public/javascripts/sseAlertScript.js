const eventSource = new EventSource("/sse");

eventSource.onmessage = (event) => {
  const job = JSON.parse(event.data);
  alert(`Job "${job.title}" is due!`);
};
