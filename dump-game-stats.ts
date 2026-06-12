async function main() {
  const url = 'https://flagmag.com/api/games/69f5af6de7729de62249692d/stats/computed?team=&statType=passing';
  console.log('Fetching', url);
  const res = await fetch(url);
  const data = await res.json();
  console.log('Data:', JSON.stringify(data, null, 2));
}

main().catch(console.error);
