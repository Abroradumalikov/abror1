const KEY = "c0849b956710be59fda1e20961becc2f";

// rquest get data

const getData = async (city) => {
  const base = `https://api.openweathermap.org/data/2.5/weather`;
  const query = `?q=${city}&units=metric&appid=${KEY}`;
  loader(true);
  const req = await fetch(base + query);
  const data = await req.json();
  loader(false);

  return data;
};
